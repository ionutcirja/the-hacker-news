declare global {
  type Articles = {
    readonly loading?: boolean;
    readonly error?: boolean;
    readonly list?: number[];
  }

  type State = {
    readonly articles: Articles;
  }
}

export {};
