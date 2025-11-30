import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - no type definitions available
import "zenn-content-css";
import ogpDataJson from "../../generated/ogp-data.json";
import type { OGPData } from "../../utils/ogp";

interface ZennContentRendererProps {
  html: string;
  className?: string;
}

// OGPデータをMapに変換
const ogpDataMap = new Map<string, OGPData>(Object.entries(ogpDataJson));

/**
 * OGP情報を使ってリッチなカードを作成
 */
function createRichCard(url: string, ogp?: OGPData): HTMLAnchorElement {
  const card = document.createElement("a");
  card.href = url;
  card.className = "zenn-link-card";
  card.setAttribute("target", "_blank");
  card.setAttribute("rel", "nofollow noopener noreferrer");

  // 左側：テキスト情報
  const textSection = document.createElement("div");

  // タイトル（1行制限）
  const title = document.createElement("div");
  title.className = "ogp-card-title";
  title.textContent = ogp?.title || url;
  textSection.appendChild(title);

  // 説明文（1行制限）
  if (ogp?.description) {
    const description = document.createElement("div");
    description.className = "ogp-card-description";
    description.textContent = ogp.description;
    textSection.appendChild(description);
  }

  // ドメイン表示（ファビコンなし）
  const domain = document.createElement("div");
  domain.className = "ogp-card-domain";
  try {
    domain.textContent = new URL(url).hostname;
  } catch {
    domain.textContent = url;
  }
  textSection.appendChild(domain);

  card.appendChild(textSection);

  // 右側：サムネイル画像
  if (ogp?.image) {
    const imageSection = document.createElement("div");
    const image = document.createElement("img");
    image.src = ogp.image;
    //image.alt = ogp.title || '';
    imageSection.appendChild(image);
    card.appendChild(imageSection);
  }
  return card;
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

      // 2. Twitter iframeの処理はDOM挿入後に行うため、ここではスキップ

      // 3. リンクカードの処理はDOM挿入後に行うため、ここではスキップ
      // 4. 残っている隠しリンクをすべて削除（念のため）
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

  // DOM挿入後の処理（カード変換とMermaidレンダリング）
  useEffect(() => {
    if (!containerRef.current) return;

    // Twitter埋め込みを通常のカードに変換
    const processTweets = () => {
      const tweetSpans = containerRef.current?.querySelectorAll(".zenn-embedded-tweet");
      if (!tweetSpans || tweetSpans.length === 0) return;

      tweetSpans.forEach((span) => {
        const iframe = span.querySelector("iframe[data-content]");
        if (!iframe) return;

        const dataContent = iframe.getAttribute("data-content");
        if (!dataContent) return;

        const url = decodeURIComponent(dataContent);

        // 親要素（p要素）内の隠しリンクを削除
        const parentElement = span.parentElement;
        if (parentElement) {
          const allLinksInParent = parentElement.querySelectorAll("a");
          allLinksInParent.forEach((link) => {
            link.remove();
          });
        }

        // OGP情報を取得してリッチカードを作成
        const ogp = ogpDataMap.get(url);
        const card = createRichCard(url, ogp);

        // span要素全体を置き換え
        span.replaceWith(card);
      });
    };

    processTweets();

    // リンクカードをReact DOMで直接変換
    const processCards = () => {
      const cardSpans = containerRef.current?.querySelectorAll(".zenn-embedded-card");
      if (!cardSpans || cardSpans.length === 0) return;

      cardSpans.forEach((span) => {
        const iframe = span.querySelector("iframe[data-content]");
        if (!iframe) return;

        const dataContent = iframe.getAttribute("data-content");
        if (!dataContent) return;

        const url = decodeURIComponent(dataContent);

        // 親要素（p要素）内の隠しリンクを削除
        const parentElement = span.parentElement;
        if (parentElement) {
          const allLinksInParent = parentElement.querySelectorAll("a");
          allLinksInParent.forEach((link) => {
            link.remove();
          });
        }

        // OGP情報を取得してリッチカードを作成
        const ogp = ogpDataMap.get(url);
        const card = createRichCard(url, ogp);

        // span要素全体を置き換え
        span.replaceWith(card);
      });
    };

    processCards();

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
