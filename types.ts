import type contents from "./data/contents.ts";

export interface Book {
  abbr: string;
  api?: string;
  chapters: number[];
  name: string;
  path: string;
}

export type VerseRange = (number | [number, number])[];

export interface BookRef {
  abbr: string;
  name: string;
}

export interface Reference {
  abbr: string;
  api?: string;
  book: BookRef;
  chapter?: number;
  content?: string;
  link: string;
  reference: string;
  verses: VerseRange;
}

export interface ReferenceMatch extends Reference {
  match: string;
}

export type BookName = keyof typeof contents;
