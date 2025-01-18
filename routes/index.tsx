import { getPage, notion } from "../utils/notion.ts";

export default async function Home() {
  const { page, blocks } = await getPage("17f10633a51e804a8fe4e3f6b3c852d9");

  return (
    <div class="p-2">
      <pre>{JSON.stringify(page, null, 2)}</pre>
      <pre>{JSON.stringify(blocks, null, 2)}</pre>
    </div>
  );
}
