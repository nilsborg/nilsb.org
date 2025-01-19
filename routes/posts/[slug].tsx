import { Handlers, PageProps } from "$fresh/server.ts";
import { getPage, getPostBySlug, renderBlock } from "../../utils/notion.ts";

interface Post {
  name: string;
  stars: number;
}

export const handler: Handlers<Post> = {
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

export default function BlogPost(props: PageProps<Post>) {
  const { page } = props.data;
  console.log(page);

  return (
    <div class="max-w-4xl mx-auto py-8">
      <h1 class="text-4xl font-bold mb-8">
        {page.properties.Name.title[0].plain_text}
      </h1>
      {
        /* <div class="prose">
        {blocks.map((block) => (
          <div dangerouslySetInnerHTML={{ __html: renderBlock(block) }} />
        ))}
      </div> */
      }
    </div>
  );
}
