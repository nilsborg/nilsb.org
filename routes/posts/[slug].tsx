import { Handlers, PageProps } from "$fresh/server.ts";
import type { NotionBlock } from "../../components/NotionBlock/types.d.ts";
import type { NotionPage } from "../../components/NotionPage/types.d.ts";
import Block from "../../components/NotionBlock/Block.tsx";
import { getPostBySlug } from "../../utils/notion.ts";
import { createHandler } from "../../utils/handlers.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    return createHandler(
      req,
      ctx,
      (refresh, slug) => getPostBySlug(refresh, slug),
      ctx.params.slug,
    );
  },
};

export default function PostPage(props: PageProps) {
  const page: NotionPage = props.data.page;
  const blocks: NotionBlock[] = props.data.blocks;

  return (
    <article class="grid gap-4">
      <h1 class="text-4xl">
        {page.properties.Name.title[0].plain_text}
      </h1>
      <div>
        {blocks.map((block) => <Block {...block} />)}
      </div>
    </article>
  );
}
