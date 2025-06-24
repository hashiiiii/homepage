import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/tokyo-night-dark.css'
import 'katex/dist/katex.min.css'

interface MarkdownRendererProps {
  content: string
  className?: string
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
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        // Node backgrounds - dark theme文字色に統一
        primaryColor: '#c0caf5',           // Dark theme primary text color
        primaryTextColor: '#343b59',       // Light theme primary text color
        primaryBorderColor: '#c0caf5',     // Same as background (no border)
        
        secondaryColor: '#c0caf5',         // Dark theme primary text color
        secondaryTextColor: '#343b59',     // Light theme primary text color  
        secondaryBorderColor: '#c0caf5',   // Same as background (no border)
        
        tertiaryColor: '#c0caf5',          // Dark theme primary text color
        tertiaryTextColor: '#343b59',      // Light theme primary text color
        tertiaryBorderColor: '#c0caf5',    // Same as background (no border)
        
        quaternaryColor: '#c0caf5',        // Dark theme primary text color
        quaternaryTextColor: '#343b59',    // Light theme primary text color
        quaternaryBorderColor: '#c0caf5',  // Same as background (no border)
        
        // Lines and arrows - Tokyo Night comment color
        lineColor: '#565f89',              // Tokyo Night muted color
        arrowheadColor: '#565f89',         // Tokyo Night muted color
        
        // Background colors
        background: '#16161e',             // Same as code block
        mainBkg: '#c0caf5',               // Dark theme text color
        secondBkg: '#c0caf5',             // Dark theme text color
        tertiaryBkg: '#c0caf5',           // Dark theme text color
        
        // Text colors
        textColor: '#343b59',             // Light theme text color
        darkTextColor: '#343b59',         // Light theme text color
        lightTextColor: '#343b59',        // Light theme text color
        
        // Sequence diagram specific
        actorBkg: '#c0caf5',              // Dark theme text color
        actorBorder: '#c0caf5',           // Same as background (no border)
        actorTextColor: '#343b59',        // Light theme text color
        actorLineColor: '#565f89',        // Tokyo Night muted
        signalColor: '#565f89',           // Tokyo Night muted
        signalTextColor: '#787c99',       // Tokyo Night secondary text
        labelBoxBkgColor: '#a9b1d6',      // Tokyo Night secondary text (slightly darker)
        labelBoxBorderColor: '#a9b1d6',   // Same as background (no border)
        labelTextColor: '#343b59',        // Light theme text color
        loopTextColor: '#787c99',         // Tokyo Night secondary text
        noteTextColor: '#343b59',         // Light theme text color
        noteBkgColor: '#a9b1d6',          // Tokyo Night secondary text (background)
        noteBorderColor: '#a9b1d6',       // Same as background (no border)
        activationBkgColor: '#bb9af7',    // Tokyo Night magenta (subtle accent)
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
        if (wrapper) {
          wrapper.innerHTML = `<div id="${id}" class="mermaid">${code}</div>`;
        }
      });
      
      // Re-initialize and render mermaid
      if (mermaidElements.length > 0) {
        mermaidRef.current.run();
      }
    }
  }, [content, mermaidLoaded]);

  // Define custom components first so we can reference them
  const customParagraph = ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-tn-text-secondary mb-4 leading-relaxed" {...props}>
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
            <h1 className="text-3xl font-bold text-tn-text-primary mb-6 border-b border-tn-border pb-3" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h2 className="text-2xl font-semibold text-tn-text-primary mb-4 mt-8" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h3 className="text-xl font-semibold text-tn-text-primary mb-3 mt-6" {...props}>
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
            <ul className="list-disc list-inside mb-4 space-y-2 text-tn-text-secondary ml-4" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-tn-text-secondary ml-4" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
            <li className="leading-relaxed" {...props}>{children}</li>
          ),
          blockquote: ({ children, ..._props }: React.HTMLAttributes<HTMLQuoteElement>) => {
            const childrenArray = React.Children.toArray(children);
            
            // Find the first React element (skip whitespace text nodes)
            const firstElement = childrenArray.find(child => React.isValidElement(child));
            
            // Check if first element is a paragraph with alert format
            if (React.isValidElement(firstElement) && firstElement.type === customParagraph) {
              const pChildren = React.Children.toArray((firstElement.props as { children: React.ReactNode }).children);
              const firstText = pChildren[0];
              
              if (React.isValidElement(firstText) && firstText.type === 'strong') {
                const alertType = React.Children.toArray((firstText.props as { children: React.ReactNode }).children)[0];
                
                if (typeof alertType === 'string') {
                  // Use Tokyo Night colors for alerts
                  switch (alertType) {
                    case 'Note':
                      return (
                        <div className="alert-note border-l-4 border-tn-blue bg-tn-blue/10 p-4 my-4 rounded-lg">
                          <div className="flex items-start">
                            <div className="text-tn-blue mr-3 text-lg flex-shrink-0 mt-0.5">ℹ️</div>
                            <div className="text-tn-text-primary">{children}</div>
                          </div>
                        </div>
                      );
                    case 'Tip':
                      return (
                        <div className="alert-tip border-l-4 border-tn-green bg-tn-green/10 p-4 my-4 rounded-lg">
                          <div className="flex items-start">
                            <div className="text-tn-green mr-3 text-lg flex-shrink-0 mt-0.5">💡</div>
                            <div className="text-tn-text-primary">{children}</div>
                          </div>
                        </div>
                      );
                    case 'Warning':
                      return (
                        <div className="alert-warning border-l-4 border-tn-yellow bg-tn-yellow/10 p-4 my-4 rounded-lg">
                          <div className="flex items-start">
                            <div className="text-tn-yellow mr-3 text-lg flex-shrink-0 mt-0.5">⚠️</div>
                            <div className="text-tn-text-primary">{children}</div>
                          </div>
                        </div>
                      );
                    case 'Danger':
                      return (
                        <div className="alert-danger border-l-4 border-tn-red bg-tn-red/10 p-4 my-4 rounded-lg">
                          <div className="flex items-start">
                            <div className="text-tn-red mr-3 text-lg flex-shrink-0 mt-0.5">🚨</div>
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
              <blockquote className="border-l-4 border-tn-comment bg-tn-bg-tertiary p-4 my-4 italic rounded-lg">
                <div className="text-tn-text-secondary">{children}</div>
              </blockquote>
            );
          },
          code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement> & { className?: string }) => {
            const inline = !className;
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''
            
            if (inline) {
              return (
                <code {...props}>
                  {children}
                </code>
              )
            }
            
            return (
              <div className="relative">
                {language && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-tn-bg-primary text-tn-text-muted text-xs rounded-bl z-10">
                    {language}
                  </div>
                )}
                <pre className="p-4 rounded-lg overflow-x-auto">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            )
          },
          table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border-separate border-spacing-0 border border-tn-border rounded-lg" {...props}>
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
            <th className="border-r border-b border-tn-border px-4 py-2 text-left text-tn-text-primary font-semibold first:rounded-tl-lg last:rounded-tr-lg last:border-r-0" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
            <td className="border-r border-b border-tn-border px-4 py-2 text-tn-text-secondary last:border-r-0" {...props}>
              {children}
            </td>
          ),
          
          // 画像の処理
          img: ({ src, alt, title, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
            <img 
              src={src} 
              alt={alt || ''}
              title={title}
              className="max-w-full h-auto rounded-lg my-6 shadow-lg"
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
              )
            }
            return <input type={type} {...props} />
          },
          
          
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}