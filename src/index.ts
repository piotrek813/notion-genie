import {
  NotionType,
  NotionText,
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
} from "./NotionType";
import { assertIsType } from "../utils/assertIsType";

const notionTypeMap = {
  text: NotionText,
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
type NotionTypeMap = typeof notionTypeMap;
type NotionTypeAlias = keyof NotionTypeMap;
type NotionTypeValue<T extends NotionTypeAlias> = ConstructorParameters<NotionTypeMap[T]>;

function assertIsTypeAlias(x: string): asserts x is NotionTypeAlias {
  if (!(x in notionTypeMap)) throw new Error(`${x} is not a valid type`);
}

function createNotionType<T extends NotionTypeAlias>(
  type: T,
  ...args: NotionTypeValue<T>
): NotionType {
  assertIsTypeAlias(type);

  if (
    type === "phone" ||
    type === "email" ||
    type === "text" ||
    type === "url" ||
    type === "title" ||
    type === "select" ||
    type === "status"
  ) {
    const [value] = args;
    assertIsType(value, "string");

    return new notionTypeMap[type](value);
  } else if (type === "number") {
    const [value] = args;
    assertIsType(value, "number");

    return new notionTypeMap[type](value);
  } else if (type === "date") {
    const [start, end] = args;
    assertIsType(start, Date);
    assertIsType(end, Date, "undefined");

    return new notionTypeMap[type](start, end);
  } else if (type === "checkbox") {
    const [value] = args;
    assertIsType(value, "boolean");

    return new notionTypeMap[type](value);
  } else if (type === "multiselect" || type === "files") {
    const [values] = args;
    if (!Array.isArray(values)) {
      assertIsType(values, "string");
    } else if (!values.every((v) => typeof v === "string"))
      throw new Error("Array should only contain string value");

    return new notionTypeMap[type](values);
  }
}

class NotionPage {
  private parent: { database_id: string };
  public properties: Record<string, NotionType>;

  constructor(databaseId: string) {
    this.parent = { database_id: databaseId };
    this.properties = {};
  }

  public addProperty<T extends NotionTypeAlias>(
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
