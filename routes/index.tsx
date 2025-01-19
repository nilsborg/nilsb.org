import { getPosts } from "../utils/notion.ts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div class="p-2">
      <h1 class="text-3xl font-bold mb-8">Blog Posts</h1>
      <div class="space-y-4">
        {posts.map((post) => (
          <article key={post.id}>
            <a
              href={`/posts/${post.properties.slug.url}`}
              class="block p-4 border rounded hover:bg-gray-50"
            >
              <h2 class="text-xl font-semibold">
                {post.properties.Name.title[0].plain_text}
              </h2>
            </a>
            {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
          </article>
        ))}
      </div>
    </div>
  );
}
