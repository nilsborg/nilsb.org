import type { ParagraphBlock } from "../types.d.ts";

export default function ParagraphBlock({ block }: { block: ParagraphBlock }) {
  return (
    <p>{block.paragraph.rich_text.map((text) => text.plain_text).join("")}</p>
  );
}
