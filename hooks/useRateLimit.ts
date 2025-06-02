import { useState, useEffect } from 'react';

type RateLimitInfo = {
  isLimited: boolean;
  resetAt: Date | null;
  limitValue: number | null;
  retryAfterMs: number | null;
  retryAfterText: string;
};

const defaultState: RateLimitInfo = {
  isLimited: false,
  resetAt: null,
  limitValue: null,
  retryAfterMs: null,
  retryAfterText: ''
};

/**
 * Hook to handle API rate limiting in the UI
 * Use this to show friendly messages when rate limits are exceeded
 */
export function useRateLimit() {
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo>(defaultState);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Format the time remaining into a human-readable string
  const formatTimeRemaining = (ms: number): string => {
    if (ms <= 0) return 'now';
    
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ${
        remainingSeconds > 0 ? `and ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}` : ''
      }`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    return `${hours} hour${hours !== 1 ? 's' : ''} ${
      remainingMinutes > 0 ? `and ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}` : ''
    }`;
  };

  // Handle rate limit errors from the API
  const handleRateLimitError = (error: any) => {
    if (error && error.status === 429 && error.data) {
      const { resetAt, limit, retryAfter } = error.data;
      
      setRateLimitInfo({
        isLimited: true,
        resetAt: resetAt ? new Date(resetAt) : null,
        limitValue: limit || null,
        retryAfterMs: retryAfter || null,
        retryAfterText: retryAfter ? formatTimeRemaining(retryAfter) : 'some time'
      });
      
      if (retryAfter) {
        setCountdown(Math.ceil(retryAfter / 1000));
      }
      
      return true;
    }
    
    return false;
  };

  // Reset the rate limit state
  const resetRateLimit = () => {
    setRateLimitInfo(defaultState);
    setCountdown(null);
  };

  // Update the countdown timer
  useEffect(() => {
    if (countdown === null || countdown <= 0) return;
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          resetRateLimit();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [countdown]);

  return {
    rateLimitInfo,
    handleRateLimitError,
    resetRateLimit,
    countdown,
    
    // Convenience computed properties
    isRateLimited: rateLimitInfo.isLimited,
    retryAfterText: rateLimitInfo.retryAfterText,
    rateLimitValue: rateLimitInfo.limitValue,
    resetAtTime: rateLimitInfo.resetAt,
    
    // User-friendly message
    rateLimitMessage: rateLimitInfo.isLimited
      ? `Rate limit exceeded. You can try again in ${
          countdown ? countdown + ' seconds' : rateLimitInfo.retryAfterText
        }.`
      : ''
  };
}
