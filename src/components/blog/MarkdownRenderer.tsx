import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/tokyo-night-dark.css';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mermaidLoaded, setMermaidLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mermaidRef = useRef<any>(null);

  // Dynamically import mermaid when needed
  useEffect(() => {
    const hasMermaid = content.includes('```mermaid');
    if (hasMermaid && !mermaidLoaded) {
      import('mermaid').then((module) => {
        mermaidRef.current = module.default;
        mermaidRef.current.initialize({
          startOnLoad: false, // Disable auto-start
          theme: 'base',
          themeVariables: {
            // Node backgrounds - dark theme文字色に統一
            primaryColor: '#c0caf5', // Dark theme primary text color
            primaryTextColor: '#343b59', // Light theme primary text color
            primaryBorderColor: '#c0caf5', // Same as background (no border)

            secondaryColor: '#c0caf5', // Dark theme primary text color
            secondaryTextColor: '#343b59', // Light theme primary text color
            secondaryBorderColor: '#c0caf5', // Same as background (no border)

            tertiaryColor: '#c0caf5', // Dark theme primary text color
            tertiaryTextColor: '#343b59', // Light theme primary text color
            tertiaryBorderColor: '#c0caf5', // Same as background (no border)

            quaternaryColor: '#c0caf5', // Dark theme primary text color
            quaternaryTextColor: '#343b59', // Light theme primary text color
            quaternaryBorderColor: '#c0caf5', // Same as background (no border)

            // Lines and arrows - Tokyo Night comment color
            lineColor: '#565f89', // Tokyo Night muted color
            arrowheadColor: '#565f89', // Tokyo Night muted color

            // Background colors
            background: '#16161e', // Same as code block
            mainBkg: '#c0caf5', // Dark theme text color
            secondBkg: '#c0caf5', // Dark theme text color
            tertiaryBkg: '#c0caf5', // Dark theme text color

            // Text colors
            textColor: '#343b59', // Light theme text color
            darkTextColor: '#343b59', // Light theme text color
            lightTextColor: '#343b59', // Light theme text color

            // Sequence diagram specific
            actorBkg: '#c0caf5', // Dark theme text color
            actorBorder: '#c0caf5', // Same as background (no border)
            actorTextColor: '#343b59', // Light theme text color
            actorLineColor: '#565f89', // Tokyo Night muted
            signalColor: '#565f89', // Tokyo Night muted
            signalTextColor: '#787c99', // Tokyo Night secondary text
            labelBoxBkgColor: '#a9b1d6', // Tokyo Night secondary text (slightly darker)
            labelBoxBorderColor: '#a9b1d6', // Same as background (no border)
            labelTextColor: '#343b59', // Light theme text color
            loopTextColor: '#787c99', // Tokyo Night secondary text
            noteTextColor: '#343b59', // Light theme text color
            noteBkgColor: '#a9b1d6', // Tokyo Night secondary text (background)
            noteBorderColor: '#a9b1d6', // Same as background (no border)
            activationBkgColor: '#bb9af7', // Tokyo Night magenta (subtle accent)
            activationBorderColor: '#bb9af7', // Same as background (no border)
          },
        });
        setMermaidLoaded(true);
      });
    }
  }, [content, mermaidLoaded]);

  // Process mermaid diagrams after render
  useEffect(() => {
    if (containerRef.current && mermaidLoaded && mermaidRef.current) {
      const mermaidElements = containerRef.current.querySelectorAll('code.language-mermaid');
      
      mermaidElements.forEach((element, index) => {
        const code = element.textContent || '';
        const id = `mermaid-${Date.now()}-${index}`;
        const wrapper = element.parentElement?.parentElement; // pre -> div wrapper
        
        if (wrapper && !wrapper.querySelector('.mermaid')) {
          // Create new div element instead of using innerHTML for better React compatibility
          const mermaidDiv = document.createElement('div');
          mermaidDiv.id = id;
          mermaidDiv.className = 'mermaid';
          mermaidDiv.textContent = code;
          
          // Replace the wrapper content
          wrapper.innerHTML = '';
          wrapper.appendChild(mermaidDiv);
        }
      });

      // Re-initialize and render mermaid using the newer API
      if (mermaidElements.length > 0) {
        // Use async rendering for better error handling
        const mermaidDivs = containerRef.current.querySelectorAll('.mermaid');
        mermaidDivs.forEach(async (div, index) => {
          try {
            const id = `mermaid-rendered-${Date.now()}-${index}`;
            div.id = id;
            await mermaidRef.current.run({ nodes: [div] });
          } catch (error) {
            console.error('Mermaid rendering error:', error);
            // Fallback: show the raw text
            div.innerHTML = `<pre class="text-tn-red bg-tn-bg-tertiary p-4 rounded">${div.textContent}</pre>`;
          }
        });
      }
    }
  }, [content, mermaidLoaded]);

  // Define custom components first so we can reference them
  const customParagraph = ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-tn-text-secondary" {...props}>
      {children}
    </p>
  );

  return (
    <div ref={containerRef} className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex, rehypeHighlight]}
        components={{
          // カスタムコンポーネント
          h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h1
              className="mb-6 border-b border-tn-border pb-3 text-3xl font-bold text-tn-text-primary"
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h2 className="mb-4 mt-8 text-2xl font-semibold text-tn-text-primary" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h3 className="mb-3 mt-6 text-xl font-semibold text-tn-text-primary" {...props}>
              {children}
            </h3>
          ),
          p: customParagraph,
          a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-tn-accent-blue hover:underline"
              {...props}
            >
              {children}
            </a>
          ),
          ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
            <ul
              className="mb-4 ml-4 list-inside list-disc space-y-2 text-tn-text-secondary"
              {...props}
            >
              {children}
            </ul>
          ),
          ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
            <ol
              className="mb-4 ml-4 list-inside list-decimal space-y-2 text-tn-text-secondary"
              {...props}
            >
              {children}
            </ol>
          ),
          li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
            <li className="leading-relaxed" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ..._props }: React.HTMLAttributes<HTMLQuoteElement>) => {
            const childrenArray = React.Children.toArray(children);

            // Find the first React element (skip whitespace text nodes)
            const firstElement = childrenArray.find((child) => React.isValidElement(child));

            // Check if first element is a paragraph with alert format
            if (React.isValidElement(firstElement) && firstElement.type === customParagraph) {
              const pChildren = React.Children.toArray(
                (firstElement.props as { children: React.ReactNode }).children
              );
              const firstText = pChildren[0];

              if (React.isValidElement(firstText) && firstText.type === 'strong') {
                const alertType = React.Children.toArray(
                  (firstText.props as { children: React.ReactNode }).children
                )[0];

                if (typeof alertType === 'string') {
                  // Use Tokyo Night colors for alerts
                  switch (alertType) {
                    case 'Note':
                      return (
                        <div className="alert-note bg-tn-blue/10 my-4 rounded-lg border-l-4 border-tn-blue p-4">
                          <div className="flex items-start">
                            <div className="mr-3 mt-0.5 shrink-0 text-lg text-tn-blue">ℹ️</div>
                            <div className="text-tn-text-primary">{children}</div>
                          </div>
                        </div>
                      );
                    case 'Tip':
                      return (
                        <div className="alert-tip bg-tn-green/10 my-4 rounded-lg border-l-4 border-tn-green p-4">
                          <div className="flex items-start">
                            <div className="mr-3 mt-0.5 shrink-0 text-lg text-tn-green">💡</div>
                            <div className="text-tn-text-primary">{children}</div>
                          </div>
                        </div>
                      );
                    case 'Warning':
                      return (
                        <div className="alert-warning bg-tn-yellow/10 my-4 rounded-lg border-l-4 border-tn-yellow p-4">
                          <div className="flex items-start">
                            <div className="mr-3 mt-0.5 shrink-0 text-lg text-tn-yellow">⚠️</div>
                            <div className="text-tn-text-primary">{children}</div>
                          </div>
                        </div>
                      );
                    case 'Danger':
                      return (
                        <div className="alert-danger bg-tn-red/10 my-4 rounded-lg border-l-4 border-tn-red p-4">
                          <div className="flex items-start">
                            <div className="mr-3 mt-0.5 shrink-0 text-lg text-tn-red">🚨</div>
                            <div className="text-tn-text-primary">{children}</div>
                          </div>
                        </div>
                      );
                  }
                }
              }
            }

            // Default blockquote
            return (
              <blockquote className="my-4 rounded-lg border-l-4 border-tn-comment bg-tn-bg-tertiary p-4 italic">
                <div className="text-tn-text-secondary">{children}</div>
              </blockquote>
            );
          },
          code: ({
            className: codeClassName,
            children,
            ...props
          }: React.HTMLAttributes<HTMLElement> & { className?: string }) => {
            const inline = !codeClassName;
            const match = /language-(\w+)/.exec(codeClassName || '');
            const language = match ? match[1] : '';

            if (inline) {
              return <code {...props}>{children}</code>;
            }

            return (
              <div className="relative">
                {language && (
                  <div className="absolute right-0 top-0 z-10 rounded-bl bg-tn-bg-primary px-3 py-1 text-xs text-tn-text-muted">
                    {language}
                  </div>
                )}
                <pre className="overflow-x-auto rounded-lg p-4">
                  <code className={codeClassName} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          },
          table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
            <div className="my-4 overflow-x-auto">
              <table
                className="min-w-full border-separate border-spacing-0 rounded-lg border border-tn-border"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
            <thead className="bg-tn-bg-tertiary" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
            <th
              className="border-b border-r border-tn-border px-4 py-2 text-left font-semibold text-tn-text-primary first:rounded-tl-lg last:rounded-tr-lg last:border-r-0"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
            <td
              className="border-b border-r border-tn-border px-4 py-2 text-tn-text-secondary last:border-r-0"
              {...props}
            >
              {children}
            </td>
          ),

          // 画像の処理
          img: ({ src, alt, title, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
            <img
              src={src}
              alt={alt || ''}
              title={title}
              className="my-6 h-auto max-w-full rounded-lg shadow-lg"
              {...props}
            />
          ),

          // タスクリストの処理
          input: ({ type, checked, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
            if (type === 'checkbox') {
              return (
                <input
                  type="checkbox"
                  checked={checked}
                  disabled
                  className="mr-2 accent-tn-accent-green"
                  {...props}
                />
              );
            }
            return <input type={type} {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
