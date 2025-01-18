import { Client } from "https://deno.land/x/notion_sdk/src/mod.ts";

export const notion = new Client({
  auth: Deno.env.get("NOTION_TOKEN"),
});

export async function getPage(pageId: string) {
  const page = await notion.pages.retrieve({ page_id: pageId });
  const blocks = await notion.blocks.children.list({ block_id: pageId });

  return {
    page,
    blocks: blocks.results,
  };
}
