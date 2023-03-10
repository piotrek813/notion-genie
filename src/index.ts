import {
  NotionRichText,
  NotionEmail,
  NotionPhone,
  NotionCheckbox,
  NotionDate,
  NotionNumber,
  NotionUrl,
  NotionTitle,
  NotionSelect,
  NotionStatus,
  NotionMultiSelect,
  NotionFiles,
  NotionCover,
} from "./NotionType";
import { assertIsType } from "../utils/assertIsType";

const notionTypeMap = {
  text: NotionRichText,
  email: NotionEmail,
  phone: NotionPhone,
  checkbox: NotionCheckbox,
  date: NotionDate,
  number: NotionNumber,
  url: NotionUrl,
  title: NotionTitle,
  select: NotionSelect,
  status: NotionStatus,
  multiselect: NotionMultiSelect,
  files: NotionFiles,
};

type PageParent = { databaseId: string } | { page_id: string };

type NotionTypeMap = typeof notionTypeMap;
type NotionTypeAlias = keyof NotionTypeMap;
type NotionType = InstanceType<NotionTypeMap[NotionTypeAlias]>;
type NotionTypeValue<T extends NotionTypeAlias> = ConstructorParameters<NotionTypeMap[T]>;

function assertIsTypeAlias(x: string): asserts x is NotionTypeAlias {
  if (!(x in notionTypeMap)) throw new Error(`${x} is not a valid type`);
}

function createNotionType<T extends NotionTypeAlias>(type: T, ...args: NotionTypeValue<T>) {
  assertIsTypeAlias(type);

  if (
    type === "phone" ||
    type === "email" ||
    type === "url" ||
    type === "select" ||
    type === "status"
  ) {
    const [value] = args;

    assertIsType(value, "string", "null");

    return new notionTypeMap[type](value);
  }

  if (type === "number") {
    const [value] = args;
    assertIsType(value, "number", "null");

    return new notionTypeMap[type](value);
  }

  if (type === "date") {
    const [start, end] = args;
    assertIsType(start, "string", "null");
    assertIsType(end, "string", "undefined");

    return new notionTypeMap[type](start, end);
  }

  if (type === "checkbox") {
    const [value] = args;
    assertIsType(value, "boolean");

    return new notionTypeMap[type](value);
  }

  if (type === "text" || type === "title") {
    const [value] = args;
    assertIsType(value, "string");

    return new notionTypeMap[type](value);
  }

  if (type === "multiselect" || type === "files") {
    const [values] = args;
    if (!Array.isArray(values)) {
      assertIsType(values, "string");
    } else if (!values.every((v) => typeof v === "string"))
      throw new Error("Array should only contain string value");

    return new notionTypeMap[type](values);
  }

  throw new Error(`Implement type ${type}`);
}

class NotionPage {
  public parent: PageParent;
  public page_id: string;
  public properties: Record<string, NotionType>;
  public cover?: NotionCover;

  constructor(parent: PageParent, coverUrl?: string);
  constructor(page_id: string, coverUrl?: string);
  constructor(parentOrPageId: PageParent | string, coverUrl?: string) {
    if (typeof parentOrPageId === "string") {
      this.page_id = parentOrPageId;
      this.parent = { databaseId: "" };
    } else {
      this.parent = parentOrPageId;
      this.page_id = "";
    }
    if (coverUrl) this.cover = new NotionCover(coverUrl);
    this.properties = {};
  }

  public setCover(url: string) {
    this.cover = new NotionCover(url);
  }

  public setProperty<T extends NotionTypeAlias>(
    type: T,
    name: string,
    ...args: NotionTypeValue<T>
  ): NotionPage {
    assertIsTypeAlias(type);

    const notionProperty = createNotionType(type, ...args);
    this.properties[name] = notionProperty;

    return this;
  }

  public getProperty(name: string) {
    return this.properties[name];
  }
}

export { NotionPage };
const page = new NotionPage("cds");
page.setProperty("number", "string", null);
