// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - no type definitions available
import "zenn-content-css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - no type definitions available
import "zenn-embed-elements";

interface ZennContentRendererProps {
  html: string;
  className?: string;
}

export function ZennContentRenderer({ html, className = "" }: ZennContentRendererProps) {
  // Zennのデフォルト動作に完全に任せる - クライアント側でのカスタム処理は一切行わない
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML is sanitized by zenn-markdown-html library at build time
    <div className={`znc ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
