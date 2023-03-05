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

// export class NotionText {
//   private rich_text: [
//     {
//       text: {
//         content: string;
//       };
//     }
//   ];

//   constructor(value: string) {
//     this.rich_text = [
//       {
//         text: {
//           content: value,
//         },
//       },
//     ];
//   }
// }
// export class NotionTitle {
//   private title: [
//     {
//       text: {
//         content: string;
//       };
//     }
//   ];

//   constructor(value: string) {
//     this.title = [
//       {
//         text: {
//           content: value,
//         },
//       },
//     ];
//   }
// }
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

  constructor(value: boolean | null) {
    this.checkbox = value ?? false;
  }
}
// export class NotionDate {
//   private date: {
//     start: string;
//     end?: string;
//   };

//   constructor(start: Date, end?: Date) {
//     this.date = {
//       start: start.toISOString(),
//       end: end?.toISOString(),
//     };
//   }
// }

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
type NotionSelactable = {
  name: string;
  id?: string;
  color?: SelectColor;
} | null;
interface INotionSelect {
  select: NotionSelactable;
  type?: "select";
}
export class NotionSelect implements INotionSelect {
  public select: NotionSelactable;
  public type?: "select";

  constructor(value: string | null) {
    if (!value) this.select = null;
    else
      this.select = {
        name: value,
      };
  }
}
// export class NotionStatus {
//   private status: {
//     name: string;
//   };

//   constructor(value: string) {
//     this.status = {
//       name: value,
//     };
//   }
// }
// export class NotionMultiSelect {
//   private multi_select: Record<"name", string>[];

//   constructor(value: string | string[]) {
//     if (typeof value === "string") this.multi_select = [{ name: value }];
//     else if (Array.isArray(value))
//       this.multi_select = value.map((option) => ({
//         name: option,
//       }));
//     else this.multi_select = [];
//   }
// }
// class NotionExternalFile {
//   public name: string;
//   public external: {
//     url: string;
//   };

//   constructor(value: string) {
//     this.name = value;
//     this.external = {
//       url: value,
//     };
//   }
// }

// export class NotionFiles {
//   private files: NotionExternalFile[];

//   constructor(value: string | string[]) {
//     if (typeof value === "string") this.files = [new NotionExternalFile(value)];
//     else if (Array.isArray(value)) this.files = value.map((file) => new NotionExternalFile(file));
//     else this.files = [];
//   }
// }
