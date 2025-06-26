'use client';

import { useState } from 'react';
import styles from './styles.module.css';
import Navigation from '@/components/Navigation';

export default function DonatePage() {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Here you would typically integrate with a payment gateway
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setAmount('');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className={styles['donate-page']}>
        <div className={styles['donate-content']}>
          <div className={styles['donate-header']}>
            <h1>Support Our Cause</h1>
            <p>Your contribution makes a real difference in our community</p>
          </div>

          <div className={styles['donate-grid']}>
            <div className={styles['donate-info']}>
              <div className={styles['impact-section']}>
                <h2>Your Impact</h2>
                <div className={styles['impact-stats']}>
                  <div className={styles['stat-card']}>
                    <div className={styles['stat-icon']}>🎓</div>
                    <h3>Education</h3>
                    <p>Supporting educational programs for underprivileged children</p>
                  </div>
                  <div className={styles['stat-card']}>
                    <div className={styles['stat-icon']}>🏥</div>
                    <h3>Healthcare</h3>
                    <p>Providing medical assistance to those in need</p>
                  </div>
                  <div className={styles['stat-card']}>
                    <div className={styles['stat-icon']}>🤝</div>
                    <h3>Community</h3>
                    <p>Building stronger, more resilient communities</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles['donate-form-container']}>
              <form onSubmit={handleSubmit} className={styles['donate-form']}>
                {submitStatus === 'success' && (
                  <div className={`${styles['submit-status']} ${styles['success']}`}>
                    Thank you for your generous donation! Your support means the world to us.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className={`${styles['submit-status']} ${styles['error']}`}>
                    There was an error processing your donation. Please try again.
                  </div>
                )}

                <div className={styles['form-group']}>
                  <label htmlFor="amount">Donation Amount</label>
                  <div className={styles['amount-input']}>
                    <span className={styles['currency']}>$</span>
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      required
                      min="1"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className={styles['form-group']}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className={styles['form-group']}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className={styles['form-group']}>
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share why you're donating..."
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className={styles['donate-button']}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles['loading-spinner']}></span>
                      Processing...
                    </>
                  ) : (
                    'Donate Now'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
