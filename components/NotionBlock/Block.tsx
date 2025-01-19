import type { NotionBlock } from "./types.d.ts";
import Heading2Block from "./blocks/Heading2Block.tsx";
import ParagraphBlock from "./blocks/ParagraphBlock.tsx";
import BulletedListItemBlock from "./blocks/BulletedListItemBlock.tsx";

export default function NotionBlock(block: NotionBlock) {
  const { type } = block;

  switch (type) {
    case "heading_2":
      return <Heading2Block block={block} />;
    case "paragraph":
      return <ParagraphBlock block={block} />;
    case "bulleted_list_item":
      return <BulletedListItemBlock block={block} />;
    // case "callout":
    //   return <CalloutBlock block={block} />;
    // case "image":
    //   return <ImageBlock block={block} />;
    default:
      return <div>Unknown block type: {type}</div>;
  }
}
