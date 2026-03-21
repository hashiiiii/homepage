export default function (eleventyConfig) {
  // 静的アセットを _site 配下にコピー
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy({
    "node_modules/zenn-content-css/lib/index.css": "css/zenn-content.css",
  });

  // _data 配下の .ts データファイルを読み込むために必須
  // また 11ty はデフォルトで Node.js で動作するため
  // bunx --bun で実行しないと .ts を解釈できず import() でエラーになる
  eleventyConfig.addDataExtension("ts", {
    parser: async (_, path) => (await import(path)).default(),
  });

  // ユーザー定義のフィルター
  // built-in:
  // https://liquidjs.com/filters/overview.html
  // https://www.11ty.dev/docs/filters/
  //
  // Liquid の date フィルターは記述が面倒なので自前で定義する
  // see: https://liquidjs.com/filters/date.html
  eleventyConfig.addFilter("formatDate", (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "liquid",
  };
}
