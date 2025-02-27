import type { NotionPage } from "../components/NotionPage/types.d.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts } from "../utils/notion.ts";
import { formatDate } from "../utils/formatDate.ts";
import { isSignificantUpdate } from "../utils/isSignificantUpdate.ts";
import { createHandler } from "../utils/handlers.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    return createHandler(
      req,
      ctx,
      (refresh) => getPosts(refresh),
    );
  },
};

export default function Home(props: PageProps) {
  const posts: NotionPage[] = props.data;

  return (
    <section class="grid gap-4">
      <h1 class="text-4xl">Blog Posts</h1>
      <ul class="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.properties.slug.url}`}>
              <h2 class="text-xl font-semibold">
                {post.properties.Name.title[0].plain_text}
              </h2>
            </a>
            <time datetime={post.created_time}>
              {formatDate(post.created_time)}
            </time>
            {isSignificantUpdate(post.created_time, post.last_edited_time) && (
              <span>
                Updated at: <time>{formatDate(post.last_edited_time)}</time>
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
