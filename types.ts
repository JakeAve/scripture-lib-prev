export interface Book {
  name: string;
  path: string;
  abbr: string;
  chapters: number[];
}

export type VerseRange = (number | [number, number])[];

export interface Reference {
  book: Book;
  chapter?: number;
  ranges: VerseRange;
  reference: string;
  abbr: string;
  link: string;
  content: string;
}
