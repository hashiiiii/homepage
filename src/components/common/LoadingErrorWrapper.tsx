import React from 'react';

interface LoadingErrorWrapperProps {
  loading: boolean;
  error: string | null;
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
    return (
      <div className="animate-fade-in">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-tn-red">{error}</p>
        </div>
      </div>
    );
  }

  return children;
};
