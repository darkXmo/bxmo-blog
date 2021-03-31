declare namespace model {
  interface Tag {
    value: string;
    id?: number;
  }

  interface ArticleToPublish {
    title: string;
    author: string | null;
    abstract: string;
    content: string;
    category: string;
    book: string;
    tags: Array<string>;
  }

  interface ArticleToModify {
    title: string;
    author: string | null;
    abstract: string;
    content: string;
    category?: string;
    book?: string;
    tags?: Array<string>;
  }
}

export = model;
