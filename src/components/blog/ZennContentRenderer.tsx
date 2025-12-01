import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - no type definitions available
import "zenn-content-css";

interface ZennContentRendererProps {
  html: string;
  className?: string;
}

export function ZennContentRenderer({ html, className = "" }: ZennContentRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [processedHtml, setProcessedHtml] = useState(html);

  useEffect(() => {
    // サーバー側で生成されたHTMLを加工してから表示する
    const processHtml = async () => {
      // DOMパーサーを使用してHTMLを解析
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // 1. Mermaid iframeを検索して置き換え準備
      const mermaidIframes = doc.querySelectorAll(".zenn-embedded-mermaid iframe[data-content]");

      mermaidIframes.forEach((iframe) => {
        const dataContent = iframe.getAttribute("data-content");
        if (!dataContent) return;

        const code = decodeURIComponent(dataContent);
        const placeholder = doc.createElement("div");
        placeholder.className = "mermaid-placeholder";
        placeholder.setAttribute("data-mermaid-code", code);
        placeholder.textContent = "Loading diagram...";

        const parent = iframe.parentElement;
        if (parent) {
          parent.replaceChild(placeholder, iframe);
        }
      });

      // 2. すべての埋め込み要素を削除（YouTube、Twitter、CodePenなど）
      // クラスベースの削除
      const embedClasses = [
        ".embed-block",
        ".embed-youtube",
        ".embed-codepen",
        ".embed-twitter",
        "span.embed-block",
        "span.embed-youtube",
        "span.embed-codepen",
        "p > span.embed-block",
      ];

      embedClasses.forEach((selector) => {
        const elements = doc.querySelectorAll(selector);
        elements.forEach((el) => {
          el.remove();
        });
      });

      // 3. リンクカード要素を削除
      const linkCards = doc.querySelectorAll(".zenn-link-card");
      linkCards.forEach((card) => {
        card.remove();
      });

      // 4. 隠しリンクを削除
      const hiddenLinks = doc.querySelectorAll('a[style*="display:none"], a[style*="display: none"]');
      hiddenLinks.forEach((link) => {
        link.remove();
      });

      // 加工したHTMLを文字列として取得
      const newHtml = doc.body.innerHTML;
      setProcessedHtml(newHtml);
    };

    processHtml();
  }, [html]);

  // DOM挿入後の処理（Mermaidレンダリング）
  useEffect(() => {
    if (!containerRef.current) return;

    // Mermaidレンダリング
    const renderMermaid = async () => {
      const placeholders = containerRef.current?.querySelectorAll(".mermaid-placeholder");
      if (!placeholders || placeholders.length === 0) return;

      const mermaid = await import("mermaid");
      mermaid.default.initialize({
        startOnLoad: false,
        theme: "base",
        themeVariables: {
          // Tokyo Night カラースキーム
          primaryColor: "#7aa2f7",
          primaryTextColor: "#1a1b26",
          primaryBorderColor: "#7aa2f7",
          lineColor: "#bb9af7",
          secondaryColor: "#bb9af7",
          tertiaryColor: "#7dcfff",

          // 背景色
          background: "#1a1b26",
          mainBkg: "#7aa2f7",
          secondBkg: "#bb9af7",
          tertiaryBkg: "#7dcfff",

          // テキスト色
          textColor: "#c0caf5",
          darkTextColor: "#1a1b26",
          lightTextColor: "#c0caf5",

          // ノード・エッジ色
          nodeBorder: "#7aa2f7",
          clusterBkg: "#24283b",
          clusterBorder: "#565f89",
          defaultLinkColor: "#bb9af7",

          // シーケンス図専用
          actorBkg: "#7aa2f7",
          actorBorder: "#7aa2f7",
          actorTextColor: "#1a1b26",
          actorLineColor: "#bb9af7",
          signalColor: "#c0caf5",
          signalTextColor: "#c0caf5",
          labelBoxBkgColor: "#7aa2f7",
          labelBoxBorderColor: "#7aa2f7",
          labelTextColor: "#1a1b26",
          loopTextColor: "#c0caf5",
          noteBorderColor: "#7dcfff",
          noteBkgColor: "#24283b",
          noteTextColor: "#c0caf5",
          activationBorderColor: "#bb9af7",
          activationBkgColor: "#bb9af7",
          sequenceNumberColor: "#1a1b26",

          // フローチャート専用
          edgeLabelBackground: "#24283b",

          // グリッド
          gridColor: "#565f89",
        },
      });

      for (const placeholder of Array.from(placeholders)) {
        try {
          const code = placeholder.getAttribute("data-mermaid-code");
          if (!code) continue;

          const mermaidDiv = document.createElement("div");
          mermaidDiv.className = "mermaid";
          mermaidDiv.textContent = code;

          placeholder.replaceWith(mermaidDiv);
          await mermaid.default.run({ nodes: [mermaidDiv] });
        } catch (error) {
          const errorDiv = document.createElement("pre");
          errorDiv.className = "bg-tn-bg-tertiary text-tn-red p-4 rounded border border-tn-red overflow-x-auto";
          errorDiv.textContent = `Mermaid rendering failed:\n${error instanceof Error ? error.message : String(error)}`;
          placeholder.replaceWith(errorDiv);
        }
      }
    };

    const timer = setTimeout(renderMermaid, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML is sanitized by zenn-markdown-html library at build time
    <div ref={containerRef} className={`znc ${className}`} dangerouslySetInnerHTML={{ __html: processedHtml }} />
  );
}
