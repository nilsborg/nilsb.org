import { Handlers, PageProps } from "$fresh/server.ts";
import type { NotionBlock } from "../../components/NotionBlock/types.d.ts";
import type { NotionPage } from "../../components/NotionPage/types.d.ts";
import Block from "../../components/NotionBlock/Block.tsx";
import { getPostBySlug } from "../../utils/notion.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const data = await getPostBySlug(ctx.params.slug);
    if (!data) {
      return ctx.renderNotFound({
        message: "Blog post does not exist",
      });
    }
    return ctx.render(data);
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
