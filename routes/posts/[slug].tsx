import { Handlers, PageProps } from "$fresh/server.ts";
import NotionBlock from "../../components/NotionBlock/NotionBlock.tsx";
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
  const { page, blocks } = props.data;

  return (
    <div class="max-w-4xl mx-auto py-8">
      <h1 class="text-4xl font-bold mb-8">
        {page.properties.Name.title[0].plain_text}
      </h1>
      <div class="grid gap-4">
        {blocks.map((block) => <NotionBlock {...block} />)}
      </div>
    </div>
  );
}
