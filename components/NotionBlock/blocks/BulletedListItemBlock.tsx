import type { BulletedListItemBlock } from "../types.d.ts";

export default function BulletedListItemBlock(
  { block }: { block: BulletedListItemBlock },
) {
  return (
    <li>
      {block.bulleted_list_item.rich_text.map((text) => text.plain_text).join(
        "",
      )}
    </li>
  );
}
