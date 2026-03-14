export default function (eleventyConfig) {
  // Passthrough copy
  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.addPassthroughCopy({ styles: "/styles/" });
  eleventyConfig.addPassthroughCopy({
    "node_modules/zenn-content-css/lib/index.css": "/styles/zenn-content.css",
  });

  // TypeScript data files (requires bunx --bun to run)
  eleventyConfig.addDataExtension("ts", {
    parser: async (_contents, filePath) => {
      const mod = await import(filePath);
      if (typeof mod.default === "function") return mod.default();
      return mod.default;
    },
  });

  // Watch targets
  eleventyConfig.addWatchTarget("styles/");

  // Filters
  eleventyConfig.addFilter("formatDate", (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  });

  eleventyConfig.addFilter("jsonify", (value) => {
    return JSON.stringify(value);
  });

  eleventyConfig.addFilter("encodeURIComponent", (value) => {
    return encodeURIComponent(value);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
}
