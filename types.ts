export interface Book {
  name: string;
  path: string;
  abbr: string;
  chapters: number[];
}

export type VerseRange = (number | [number, number])[];

export interface BookRef {
  name: string;
  abbr: string;
}

export interface Reference {
  book: BookRef;
  chapter?: number;
  verses: VerseRange;
  reference: string;
  abbr: string;
  link: string;
  content: string;
}

export interface ReferenceMatch extends Reference {
  match: string;
}
