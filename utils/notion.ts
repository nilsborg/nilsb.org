import {
  Client,
  isNotionClientError,
} from "https://deno.land/x/notion_sdk/src/mod.ts";

const postsDbId = Deno.env.get("NOTION_POSTS_DB_ID");

export const notion = new Client({
  auth: Deno.env.get("NOTION_TOKEN"),
});

export async function getPage(pageId: string) {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    const blocks = await notion.blocks.children.list({ block_id: pageId });

    return {
      page,
      blocks: blocks.results,
    };
  } catch (error: unknown) {
    if (
      isNotionClientError(error)
    ) {
      console.error("Notion API error:", error);
    } else {
      // Other error handling code
      console.error(error);
    }
  }
}

export async function getPosts() {
  if (!postsDbId) throw new Error("Database ID not found");
  try {
    const response = await notion.databases.query({
      database_id: postsDbId,
    });

    return response.results;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
}

export async function getPostBySlug(slug: string) {
  if (!postsDbId) throw new Error("Database ID not found");
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
    const page = await notion.pages.retrieve({ page_id: pageId });
    const blocks = await notion.blocks.children.list({ block_id: pageId });

    return {
      page,
      blocks: blocks.results,
    };
  } catch (error) {
    console.error("Failed to fetch post:", error);
    throw error;
  }
}
