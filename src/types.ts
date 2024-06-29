export interface Quote {
  category: string,
  author: string,
  text: string,
}

export interface QuoteMutation {
  id: string;
  category: string,
  author: string,
  text: string,
}

export interface ApiQuotes {
  [id: string]: Quote;
}

export interface Category {
  title: string,
  id: string,
}