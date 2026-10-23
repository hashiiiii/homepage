import { readFile } from "node:fs/promises";
import { load } from "cheerio";
import { Liquid } from "liquidjs";
import Parser from "rss-parser";
import { describe, expect, it } from "vitest";
import { zennItemsToPosts } from "./blog";

describe("RSS blog rendering", () => {
  it("renders feed titles and tags as text in HTML and attributes", async () => {
    const feed = await new Parser().parseString(`
      <rss version="2.0"><channel><title>Feed</title><link>https://zenn.dev/hashiiiii</link>
        <item>
          <title><![CDATA[<img src=x onerror="alert(1)"> & news]]></title>
          <link>https://zenn.dev/hashiiiii/articles/example?x=1&amp;y=2</link>
          <pubDate>Thu, 22 Oct 2026 00:00:00 GMT</pubDate>
          <category><![CDATA[x' onmouseover='alert(2)]]></category>
        </item>
      </channel></rss>`);
    const posts = zennItemsToPosts(feed.items);
    const engine = new Liquid();
    engine.registerFilter("json", JSON.stringify);
    engine.registerFilter("formatDate", (value: string) => new Date(value).toLocaleDateString("en-US"));
    const template = await readFile(new URL("../src/blog/index.liquid", import.meta.url), "utf8");
    const html = await engine.parseAndRender(template, { blog: { posts, allTags: posts[0].tags } });
    const $ = load(html);

    expect($(".post-title").text()).toBe('<img src=x onerror="alert(1)"> & news');
    expect($(".post-title").children()).toHaveLength(0);
    expect($(".tag-btn").last().attr("data-tag")).toBe("x' onmouseover='alert(2)");
    expect(JSON.parse($("#post-list li").attr("data-tags") || "[]")).toEqual(["x' onmouseover='alert(2)"]);
    expect($("[onmouseover], [onerror], img")).toHaveLength(0);
    expect($(".post-row").attr("href")).toBe("https://zenn.dev/hashiiiii/articles/example?x=1&y=2");
  });

  it("omits feed entries with unsafe or invalid link schemes", async () => {
    const feed = await new Parser().parseString(`
      <rss version="2.0"><channel><title>Feed</title><link>https://zenn.dev/hashiiiii</link>
        <item><title>HTTPS</title><link>https://zenn.dev/article</link></item>
        <item><title>HTTP</title><link>http://example.com/article</link></item>
        <item><title>Script</title><link>JaVaScRiPt:alert(1)</link></item>
        <item><title>Obfuscated</title><link>java&#9;script:alert(1)</link></item>
        <item><title>Data</title><link>data:text/html,unsafe</link></item>
        <item><title>Relative</title><link>/article</link></item>
        <item><title>Invalid</title><link>https://</link></item>
        <item><title>Missing</title></item>
      </channel></rss>`);

    expect(zennItemsToPosts(feed.items).map((post) => post.externalUrl)).toEqual([
      "https://zenn.dev/article",
      "http://example.com/article",
    ]);
  });
});
