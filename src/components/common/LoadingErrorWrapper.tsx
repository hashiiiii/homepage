import React from 'react';

interface LoadingErrorWrapperProps {
  loading: boolean;
  error: string | Error | null;
  loadingText?: string;
  children: React.ReactNode;
}

export const LoadingErrorWrapper: React.FC<LoadingErrorWrapperProps> = ({
  loading,
  error,
  loadingText = 'Loading...',
  children,
}) => {
  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-tn-fg-secondary">{loadingText}</p>
        </div>
      </div>
    );
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : error;
    return (
      <div className="animate-fade-in">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-tn-red">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return children;
};
