declare global {
  type ArticleContent = {
    readonly id: number;
    readonly by: string;
    readonly score: number;
    readonly url: string;
    readonly title: string;
    readonly time: number;
  };

  type Articles = {
    readonly loading?: boolean;
    readonly error?: boolean;
    readonly list?: number[];
    readonly content?: {
      readonly [id: number]: ArticleContent;
    };
  }

  type State = {
    readonly articles: Articles;
  }
}

export {};
