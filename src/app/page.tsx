"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./loading_screen.css";

export default function LoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    // Add loading screen classes
    document.documentElement.classList.add('loading-screen-html');
    document.body.classList.add('loading-screen-body');

    const timer = setTimeout(() => {
      // Remove loading screen classes before navigation
      document.documentElement.classList.remove('loading-screen-html');
      document.body.classList.remove('loading-screen-body');
      router.push("/home");
    }, 5000);

    return () => {
      clearTimeout(timer);
      // Clean up classes if component unmounts
      document.documentElement.classList.remove('loading-screen-html');
      document.body.classList.remove('loading-screen-body');
    };
  }, [router]);

  return (
    <div className="loading-container">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="loading-logo" />
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
        <p className="loading-text redirecting">Redirecting</p>
      </div>
    </div>
  );
}
//arpit here
