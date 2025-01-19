import { Handlers, PageProps } from "$fresh/server.ts";
import type { NotionBlock } from "../../components/NotionBlock/types.d.ts";
import type { NotionPage } from "../../components/NotionPage/types.d.ts";
import Block from "../../components/NotionBlock/Block.tsx";
import { getPostBySlug } from "../../utils/notion.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const url = new URL(_req.url);
    const refresh = url.searchParams.get("refresh") === "true";
    const { data, version } = await getPostBySlug(ctx.params.slug, refresh);

    if (!data) {
      return ctx.renderNotFound({
        message: "Blog post does not exist",
      });
    }
    const resp = await ctx.render(data);
    const headers = new Headers(resp.headers);
    // Set cache headers
    headers.set(
      "Cache-Control",
      "public, max-age=60, stale-while-revalidate=3600",
    );
    // Set ETag based on content version
    headers.set("ETag", `"${version}"`);

    return new Response(resp.body, {
      status: resp.status,
      headers,
    });
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
