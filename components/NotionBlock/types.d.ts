export type NotionBlock =
  | Heading2Block
  | ParagraphBlock
  | BulletedListItemBlock
  | CalloutBlock
  | ImageBlock;

export interface User {
  object: "user";
  id: string;
}

export interface Parent {
  type: "page_id";
  page_id: string;
}

export interface TextAnnotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface RichText {
  type: "text";
  text: {
    content: string;
    link: string | null;
  };
  annotations: TextAnnotations;
  plain_text: string;
  href: string | null;
}

interface BlockBase {
  object: "block";
  id: string;
  parent: Parent;
  created_time: string;
  last_edited_time: string;
  created_by: User;
  last_edited_by: User;
  has_children: boolean;
  archived: boolean;
  in_trash: boolean;
}

export interface Heading2Block extends BlockBase {
  type: "heading_2";
  heading_2: {
    rich_text: RichText[];
    is_toggleable: boolean;
    color: string;
  };
}

export interface ParagraphBlock extends BlockBase {
  type: "paragraph";
  paragraph: {
    rich_text: RichText[];
    color: string;
  };
}

export interface BulletedListItemBlock extends BlockBase {
  type: "bulleted_list_item";
  bulleted_list_item: {
    rich_text: RichText[];
    color: string;
  };
}

export interface CalloutBlock extends BlockBase {
  type: "callout";
  callout: {
    rich_text: RichText[];
    icon: {
      type: "emoji";
      emoji: string;
    };
    color: string;
  };
}

export interface ImageBlock extends BlockBase {
  type: "image";
  image: {
    caption: RichText[];
    type: "external";
    external: {
      url: string;
    };
  };
}
