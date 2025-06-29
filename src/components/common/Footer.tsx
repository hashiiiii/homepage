import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-tn-border">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-tn-fg-muted sm:px-6 sm:py-8 lg:px-8">
        <p className="text-sm">&copy; {new Date().getFullYear()} hashiiiii. All rights reserved.</p>
      </div>
    </footer>
  );
};
