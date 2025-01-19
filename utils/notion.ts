/// <reference lib="deno.unstable" />

import { Client } from "https://deno.land/x/notion_sdk/src/mod.ts";

const postsDbId = Deno.env.get("NOTION_POSTS_DB_ID");
const notion = new Client({
  auth: Deno.env.get("NOTION_TOKEN"),
});
const kv = await Deno.openKv();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

async function getCachedOrFetch<T>(
  key: string[],
  refresh: boolean,
  fetchFn: () => Promise<T>,
): Promise<{ data: T; version: string }> {
  const cached = await kv.get<{ value: T; timestamp: number; version: string }>(
    key,
  );

  if (!refresh && cached.value) {
    const age = Date.now() - cached.value.timestamp;
    if (age < CACHE_TTL) {
      return {
        data: cached.value.value,
        version: cached.value.version,
      };
    }
  }

  const fresh = await fetchFn();
  const newVersion = Date.now().toString();
  await kv.set(key, {
    value: fresh,
    timestamp: Date.now(),
    version: newVersion,
  });

  return { data: fresh, version: newVersion };
}

export async function getPosts(refresh: boolean) {
  if (!postsDbId) throw new Error("Database ID not provided");

  return await getCachedOrFetch(["posts"], refresh, async () => {
    try {
      const response = await notion.databases.query({
        database_id: postsDbId,
      });
      return response.results;
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      throw error;
    }
  });
}

export async function getPostBySlug(slug: string, refresh: boolean) {
  if (!postsDbId) throw new Error("Database ID not found");

  return await getCachedOrFetch(["posts", slug], refresh, async () => {
    try {
      const response = await notion.databases.query({
        database_id: postsDbId,
        filter: {
          property: "slug",
          rich_text: {
            equals: slug,
          },
        },
      });

      if (!response.results[0]) {
        throw new Error(`Post not found: ${slug}`);
      }

      const pageId = response.results[0].id;

      const [page, blocks] = await Promise.all([
        notion.pages.retrieve({ page_id: pageId }),
        notion.blocks.children.list({ block_id: pageId }),
      ]);

      return {
        page,
        blocks: blocks.results,
      };
    } catch (error) {
      console.error("Failed to fetch post:", error);
      throw error;
    }
  });
}
