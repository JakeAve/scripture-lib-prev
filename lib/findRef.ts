import { distance } from "fastest-levenshtein";
import contents, * as volumes from "../data/contents.ts";
import { Book, ReferenceMatch } from "../types.ts";
import bookRefs from "../data/books.ts";
import { formatReference } from "./parseReference.ts";

interface FindRefOptions {
  volume?: "ot" | "nt" | "bom" | "dc" | "pgp";
  books?: (keyof typeof contents)[];
  maxResults?: number;
  minLevDist?: number;
  minSubstr?: number;
}

interface Result {
  lev: number;
  sub: number;
  score: number;
  string: string;
  verse: number;
  bookName: string;
  chapter: number;
  content: string;
}

export function findRef(
  rawInput: string,
  opts: FindRefOptions = {}
): ReferenceMatch[] {
  const {
    volume,
    books,
    maxResults = 5,
    minLevDist = 0.9,
    minSubstr = 5,
  } = opts;
  const arr: Result[] = [];
  const input = normalizeString(rawInput);
  const minLev = Math.ceil(input.length * minLevDist);
  const minSub = minSubstr;

  let data: Partial<typeof contents> = {};

  if (volume) {
    data = volumes[volume];
  }

  if (books) {
    for (const b of books) {
      data[b] = contents[b];
    }
  }

  if (!volume && !books) {
    data = contents;
  }

  for (const b in data) {
    const book = data[b as keyof typeof contents];
    if (!book) continue;
    const iLen = book.length;

    for (let i = 0; i < iLen; i++) {
      const chapter = book[i];
      const jLen = chapter.length;
      for (let j = 0; j < jLen; j++) {
        const rawVerse = chapter[j];
        const verse = normalizeString(rawVerse);
        const d = distance(input, verse);
        const diff = verse.length - d;

        if (diff < minLev) {
          continue;
        }

        const subStr = longestCommonSubstring(input, verse);

        if (subStr.length < minSub) {
          continue;
        }

        const result: Result = {
          lev: diff,
          sub: subStr.length,
          score: diff + subStr.length,
          string: subStr,
          content: rawVerse,
          bookName: b,
          chapter: i + 1,
          verse: j + 1,
        };

        arr.push(result);
      }
    }
  }

  arr.sort((a, b) => {
    return b.score - a.score;
  });

  const results = arr.slice(0, maxResults);

  return results.map((r) => {
    const book = bookRefs.find((b) => b.name === r.bookName) as Book;
    const chapter = r.chapter;
    const verses = [r.verse];

    const { reference, abbr, link, content } = formatReference({
      book,
      chapter,
      ranges: verses,
    });

    return {
      book: { name: book.name, abbr: book.abbr },
      chapter,
      verses,
      reference,
      abbr,
      link,
      content,
      match: r.string,
    };
  });
}

function longestCommonSubstring(input: string, verse: string) {
  const m = input.length,
    n = verse.length;
  const dp = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));
  let maxLength = 0,
    endIndex = 0;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (input[i - 1] === verse[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > maxLength) {
          maxLength = dp[i][j];
          endIndex = i;
        }
      }
    }
  }
  return input.substring(endIndex - maxLength, endIndex);
}

function normalizeString(str: string): string {
  return str.replace(/\s+/g, " ").replace(/\p{P}/gu, "").toUpperCase();
}
