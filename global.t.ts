import 'styled-components';

declare module 'styled-components' {
  export type Theme = {
    colors: {
      darkGrey: string;
      grey: string;
      blue: string;
      darkBlue: string;
      red: string;
      turquoise: string;
      white: string;
    };
    breakpoints: {
      xxsmall: string;
      xsmall: string;
      small: string;
      medium: string;
      large: string;
    };
  }
}

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
