'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from './services/authService';
import Link from 'next/link';

export default function ControlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if user is authenticated
        if (!authService.isAuthenticated()) {
          // Redirect to login with the current path as redirect parameter
          router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
          return;
        }

        // If we have a token, assume user is authorized for control pages
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error verifying authentication status:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [router, pathname]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="control-loading">
        Verifying access...
        <style jsx>{`
          .control-loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-size: 1.2rem;
            color: white;
            background: linear-gradient(
              to bottom,
              rgb(13, 17, 23),
              rgb(26, 26, 46)
            );
          }
        `}</style>
      </div>
    );
  }

  // If not authenticated, don't render anything (redirect should happen)
  if (!isAuthenticated) {
    return null;
  }

  // If authenticated, render the control pages
  return (
    <div className="control-layout">
      <header className="control-header">
        <nav className="control-nav">
          <Link 
            href="/media_control" 
            className={pathname === '/media_control' ? 'nav-link active' : 'nav-link'}
          >
            Media Control
          </Link>
          <Link 
            href="/member_control" 
            className={pathname === '/member_control' ? 'nav-link active' : 'nav-link'}
          >
            Member Control
          </Link>
          <Link 
            href="/event_control" 
            className={pathname === '/event_control' ? 'nav-link active' : 'nav-link'}
          >
            Event Control
          </Link>
        </nav>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>
      
      <main className="control-content">
        {children}
      </main>
      
      <style jsx>{`
        .control-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .control-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: rgba(15, 23, 42, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .control-nav {
          display: flex;
          gap: 1.5rem;
        }
        
        .nav-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 0;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
        }
        
        .nav-link:hover {
          color: white;
        }
        
        .nav-link.active {
          color: white;
          border-bottom-color: #3b82f6;
        }
        
        .logout-button {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        
        .logout-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .control-content {
          flex: 1;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
} 