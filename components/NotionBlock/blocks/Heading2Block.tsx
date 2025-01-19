import type { Heading2Block } from "../types.d.ts";

export default function Heading2Block({ block }: { block: Heading2Block }) {
  return (
    <h2 class="text-2xl">
      {block.heading_2.rich_text.map((text) => text.plain_text).join("")}
    </h2>
  );
}
