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

export interface NotionType {}
export class NotionText implements NotionType {
  private rich_text: [
    {
      text: {
        content: string;
      };
    }
  ];

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
export class NotionTitle implements NotionType {
  private title: [
    {
      text: {
        content: string;
      };
    }
  ];

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
export class NotionEmail implements NotionType {
  private email: string;

  constructor(value: string) {
    this.email = value;
  }
}
export class NotionPhone implements NotionType {
  private phone_number: string;

  constructor(value: string) {
    this.phone_number = value;
  }
}
export class NotionUrl implements NotionType {
  private url: string;

  constructor(value: string) {
    this.url = value;
  }
}
export class NotionCheckbox implements NotionType {
  private checkbox: boolean;

  constructor(value: boolean) {
    this.checkbox = value;
  }
}
export class NotionDate implements NotionType {
  private date: {
    start: string;
    end?: string;
  };

  constructor(start: Date, end?: Date) {
    this.date = {
      start: start.toISOString(),
      end: end?.toISOString(),
    };
  }
}
export class NotionNumber implements NotionType {
  private number: number;

  constructor(value: number) {
    this.number = value;
  }
}
export class NotionSelect implements NotionType {
  private select: {
    name: string;
  };

  constructor(value: string) {
    this.select = {
      name: value,
    };
  }
}
export class NotionStatus implements NotionType {
  private status: {
    name: string;
  };

  constructor(value: string) {
    this.status = {
      name: value,
    };
  }
}
export class NotionMultiSelect implements NotionType {
  private multi_select: Record<"name", string>[];

  constructor(value: string | string[]) {
    if (typeof value === "string") this.multi_select = [{ name: value }];
    else if (Array.isArray(value))
      this.multi_select = value.map((option) => ({
        name: option,
      }));
    else this.multi_select = [];
  }
}
class NotionExternalFile {
  private name: string;
  private external: {
    url: string;
  };

  constructor(value: string) {
    this.name = value;
    this.external = {
      url: value,
    };
  }
}

export class NotionFiles implements NotionType {
  private files: NotionExternalFile[];

  constructor(value: string | string[]) {
    if (typeof value === "string") this.files = [new NotionExternalFile(value)];
    else if (Array.isArray(value)) this.files = value.map((file) => new NotionExternalFile(file));
    else this.files = [];
  }
}
