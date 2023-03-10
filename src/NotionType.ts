/* TODO implement
Created by
Created time
Formula
Last edited by
Last edited time
People
Relation
Rollup
*/

type RichTextItem = {
  text: {
    content: string;
    link?: {
      url: string;
    } | null;
  };
  type?: "text";
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
    color?:
      | "default"
      | "gray"
      | "brown"
      | "orange"
      | "yellow"
      | "green"
      | "blue"
      | "purple"
      | "pink"
      | "red"
      | "gray_background"
      | "brown_background"
      | "orange_background"
      | "yellow_background"
      | "green_background"
      | "blue_background"
      | "purple_background"
      | "pink_background"
      | "red_background";
  };
};

interface INotionRichText {
  rich_text: Array<RichTextItem>;
  type?: "rich_text";
}
export class NotionRichText implements INotionRichText {
  public rich_text: [
    {
      text: {
        content: string;
      };
    }
  ];
  public type?: "rich_text";

  constructor(value: string) {
    this.rich_text = [
      {
        text: {
          content: value,
        },
      },
    ];
  }
}
interface INotionTitle {
  title: Array<RichTextItem>;
  type?: "title";
}
export class NotionTitle implements INotionTitle {
  public title: [
    {
      text: {
        content: string;
      };
    }
  ];
  public type?: "title";

  constructor(value: string) {
    this.title = [
      {
        text: {
          content: value,
        },
      },
    ];
  }
}
interface INotionEmail {
  email: string | null;
  type?: "email";
}
export class NotionEmail implements INotionEmail {
  public email: string | null;
  public type?: "email";

  constructor(value: string | null) {
    this.email = value;
  }
}
interface INotionPhone {
  phone_number: string | null;
  type?: "phone_number";
}
export class NotionPhone implements INotionPhone {
  public phone_number: string | null;
  type?: "phone_number";

  constructor(value: string | null) {
    this.phone_number = value;
  }
}
interface INotionUrl {
  url: string | null;
  type?: "url";
}
export class NotionUrl implements INotionUrl {
  public url: string | null;
  public type?: "url";

  constructor(value: string | null) {
    this.url = value;
  }
}
interface INotionCheckbox {
  checkbox: boolean;
  type?: "checkbox";
}
export class NotionCheckbox implements INotionCheckbox {
  public checkbox: boolean;
  public type?: "checkbox";

  constructor(value: boolean) {
    this.checkbox = value;
  }
}

interface INotionDate {
  date: {
    start: string;
    end?: string | null;
  } | null;
  type?: "date";
}
export class NotionDate implements INotionDate {
  public date: {
    start: string;
    end?: string;
  } | null;

  constructor(start: string | null, end?: string) {
    if (!start) this.date = null;
    else
      this.date = {
        start: start,
        end: end,
      };
  }
}

export interface INotionNumber {
  number: number | null;
  type?: "number";
}

export class NotionNumber implements INotionNumber {
  public number: number | null;
  public type?: "number";

  constructor(value: number | null) {
    this.number = value;
  }
}
type SelectColor =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red";
type NotionSelectable = {
  name: string;
  id?: string;
  color?: SelectColor;
};
interface INotionSelect {
  select: NotionSelectable | null;
  type?: "select";
}
export class NotionSelect implements INotionSelect {
  public select: NotionSelectable | null;
  public type?: "select";

  constructor(value: string | null) {
    if (!value) this.select = null;
    else
      this.select = {
        name: value,
      };
  }
}
interface INotionStatus {
  status: NotionSelectable | null;
  type?: "status";
}
export class NotionStatus implements INotionStatus {
  public status: NotionSelectable | null;
  public type?: "status";

  constructor(value: string | null) {
    if (!value) this.status = null;
    else
      this.status = {
        name: value,
      };
  }
}
interface INotionMultiSelect {
  multi_select: Array<NotionSelectable>;
  type?: "multi_select";
}
export class NotionMultiSelect implements INotionMultiSelect {
  public multi_select: Array<NotionSelectable>;
  public type?: "multi_select";

  constructor(value: string | string[]) {
    if (typeof value === "string") this.multi_select = [{ name: value }];
    else if (Array.isArray(value))
      this.multi_select = value.map((option) => ({
        name: option,
      }));
    else this.multi_select = [];
  }
}

interface INotionExternal {
  external: {
    url: string;
  };
  type?: "external";
}

interface INotionExternalFile extends INotionExternal {
  name: string;
}

interface INotionFiles {
  files: Array<INotionExternalFile>;
  type?: "files";
}

class NotionExternalFile implements INotionExternalFile {
  public name: string;
  public external: {
    url: string;
  };
  public type?: "external";

  constructor(value: string) {
    this.name = value;
    this.external = {
      url: value,
    };
  }
}

export class NotionFiles implements INotionFiles {
  public files: NotionExternalFile[];

  constructor(value: string | string[]) {
    if (typeof value === "string") this.files = [new NotionExternalFile(value)];
    else if (Array.isArray(value)) this.files = value.map((file) => new NotionExternalFile(file));
    else this.files = [];
  }
}

export class NotionCover implements INotionExternal {
  public external: { url: string };
  public type?: "external";

  constructor(url: string) {
    this.external = {
      url: url,
    };
  }
}
