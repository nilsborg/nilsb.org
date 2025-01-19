export interface NotionPage {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: NotionUser;
  last_edited_by: NotionUser;
  cover: null | any;
  icon: null | any;
  parent: NotionParent;
  archived: boolean;
  in_trash: boolean;
  properties: NotionProperties;
  url: string;
  public_url: null | string;
}

interface NotionUser {
  object: "user";
  id: string;
}

interface NotionParent {
  type: "database_id";
  database_id: string;
}

interface NotionAnnotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

interface NotionTextContent {
  content: string;
  link: null | string;
}

interface NotionText {
  type: "text";
  text: NotionTextContent;
  annotations: NotionAnnotations;
  plain_text: string;
  href: null | string;
}

interface NotionTitle {
  id: "title";
  type: "title";
  title: NotionText[];
}

interface NotionUrl {
  id: string;
  type: "url";
  url: string;
}

interface NotionProperties {
  slug: NotionUrl;
  Name: NotionTitle;
}
