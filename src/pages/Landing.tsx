import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';

export const Landing: React.FC = () => {
  usePageTitle(undefined, true); // Home page uses only domain name

  return (
    <div className="flex h-full items-start justify-center px-4 pt-40">
      <div className="w-full max-w-sm space-y-4 text-center">
        {/* Profile Icon */}
        <div className="relative mx-auto h-40 w-40 md:h-48 md:w-48">
          <img
            src="/images/landing/icon_395px-395px.png"
            alt="hashiiiii profile icon"
            className="ring-tn-accent-blue/20 h-full w-full rounded-full object-cover shadow-lg ring-4"
          />
        </div>

        {/* Name & Title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold leading-relaxed text-tn-text-primary">hashiiiii</h1>
          <p className="text-base leading-relaxed text-tn-text-secondary">
            <span className="font-medium text-tn-text-primary">Engineer</span>
            <span className="mx-2 text-tn-text-muted">·</span>
            <span className="text-tn-text-muted">Jack of all trades</span>
          </p>
        </div>

        {/* SNS Links with Icons */}
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/hashiiiii"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-tn-accent-blue/10 rounded-full bg-tn-bg-tertiary p-3 text-tn-text-muted transition-all duration-200 hover:scale-110 hover:text-tn-accent-blue"
            aria-label="GitHub"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="https://x.com/hashin5572"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-tn-accent-blue/10 rounded-full bg-tn-bg-tertiary p-3 text-tn-text-muted transition-all duration-200 hover:scale-110 hover:text-tn-accent-blue"
            aria-label="X (Twitter)"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11.9 8.3L19.3 0h-1.7l-6.4 7.4L6.9 0H0l7.8 11.3L0 20.6h1.7l6.8-7.9 5.4 7.9H20L11.9 8.3zM9.7 11.9l-.8-1.1L2.4 1.3h2.7l5.2 7.4.8 1.1 6.6 9.5h-2.7l-5.5-7.9z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/shinnosuke-hashimoto-7b2607369/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-tn-accent-blue/10 rounded-full bg-tn-bg-tertiary p-3 text-tn-text-muted transition-all duration-200 hover:scale-110 hover:text-tn-accent-blue"
            aria-label="LinkedIn"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="https://zenn.dev/hashiiiii"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-tn-accent-blue/10 rounded-full bg-tn-bg-tertiary p-3 text-tn-text-muted transition-all duration-200 hover:scale-110 hover:text-tn-accent-blue"
            aria-label="Zenn"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.614.874c.176-.293-.029-.645-.381-.645h-4.72c-.235 0-.44.117-.557.323L.03 23.361c-.088.176.029.41.234.41zM17.445 23.419l6.479-10.408c.205-.323-.029-.733-.41-.733h-4.691c-.176 0-.352.088-.44.235l-6.655 10.643c-.176.264.029.616.352.616h4.779c.234-.001.468-.118.586-.353z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
