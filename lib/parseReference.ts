import books from "../data/books.ts";
import contents from "../data/contents.ts";
import { distance } from "fastest-levenshtein";
import { Book, Reference, VerseRange } from "../types.ts";

/**
 * Takes a fuzzy string scripture references and returns a structured reference object
 * @param input A string representing a reference, e.g. "genesis 1:1-3,5"
 * @returns Reference object containing parsed information
 * @example
 * parseReference("Genesis 1:1-3,5");
 * // Returns:
 * // {
 * //   book: { name: "Genesis", path: "/study/scriptures/ot/gen", abbr: "Gen", chapters: [1, 2, ...] },
 * //   chapter: 1,
 * //   verses: [[1, 3], 5]
 */
export function parseReference(input: string): Reference {
  input = input.trim();
  const digits = [...input.matchAll(/\d+/g)];

  // get chapter
  let chapter: undefined | number;

  if (digits.length) {
    if (digits[0].index === 0) {
      chapter = Number(digits[1]);
    } else {
      chapter = Number(digits[0]);
    }
  }

  // get verses
  const colonIdx = /:/.exec(input)?.index;
  const ranges: VerseRange = [];

  if (colonIdx && colonIdx > 0) {
    const vStrings = input.slice(colonIdx + 1);
    const verses = vStrings.split(",");

    for (const v of verses) {
      if (v.match(/-|–/)) {
        const vNums = v.match(/\d+/g);
        if (vNums?.length && vNums.length === 2) {
          const range: number[] = [];
          for (const vn of vNums) {
            range.push(Number(vn));
          }
          ranges.push(range.toSorted((a, b) => a - b) as [number, number]);
        } else if (vNums?.length && vNums.length === 1) {
          ranges.push(Number(vNums[0]));
        } else if (vNums?.length && vNums.length > 2) {
          for (const n of vNums) {
            ranges.push(Number(n));
          }
        }
      } else if (v) {
        const vNum = v.match(/\d+/);
        ranges.push(Number(vNum));
      }
    }

    ranges.sort((a, b) => {
      const minA = Math.min(Array.isArray(a) ? (a[0], a[1]) : a);
      const minB = Math.min(Array.isArray(b) ? (b[0], b[1]) : b);

      if (minA > minB) {
        return 1;
      }
      if (minA < minB) {
        return -1;
      }
      return 0;
    });
  }

  const bookEndIdx = digits.length ? digits[1]?.index : undefined;
  const bookText = input.slice(0, bookEndIdx).toLocaleLowerCase();
  const book = parseBook(bookText);

  // makes sure no chapter is too high
  if (chapter && book?.chapters?.length && book.chapters.length < chapter) {
    chapter = undefined;
    ranges.length = 0;
  }

  // makes sure no verse is too high
  if (ranges.length && chapter) {
    for (const [idx, range] of ranges.entries()) {
      if (Array.isArray(range)) {
        for (const [idx2, verse] of range.entries()) {
          if (verse > book.chapters[chapter - 1]) {
            (ranges[idx] as [number, number])[idx2] = book.chapters.at(
              -1
            ) as number;
          }
        }
      } else {
        if (range > book.chapters[chapter - 1]) {
          ranges[idx] = book.chapters.at(-1) as number;
        }
      }
    }
  }

  // When there's only one chapter
  if (!chapter && book?.chapters?.length === 1) {
    chapter = 1;
  }

  const { reference, abbr, link, content } = formatReference({
    book,
    chapter,
    ranges,
  });

  return {
    book: { name: book.name, abbr: book.abbr },
    chapter,
    verses: ranges,
    reference,
    abbr,
    link,
    content,
  };
}

/**
 * A function to parse a book name or abbreviation and return the corresponding Book object
 * @param bookText A string representing a book name or abbreviation, e.g. "Genesis", "Gen", "Mosiah"
 * @returns Book object containing the name, path, abbreviation, and chapters
 */
function parseBook(bookText: string): Book {
  const sorted = (books as Book[]).toSorted((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    const abbrA = a.abbr.toLocaleLowerCase();
    const nameA = a.name.toLocaleLowerCase();

    const minA = Math.min(distance(abbrA, bookText), distance(nameA, bookText));

    const abbrB = b.abbr.toLocaleLowerCase();
    const nameB = b.name.toLocaleLowerCase();

    const minB = Math.min(distance(abbrB, bookText), distance(nameB, bookText));

    if (minA < minB) {
      scoreA += 50;
    }

    if (minB < minA) {
      scoreB += 50;
    }

    if (nameA[0] === bookText[0]) {
      scoreA += 10;
      if (nameA[1] === bookText[1]) {
        scoreA += 20;
        if (nameA[2] === bookText[2]) {
          scoreA += 50;
        }
      }
    }

    if (nameB[0] === bookText[0]) {
      scoreB += 15;
      if (nameB[1] === bookText[1]) {
        scoreB += 20;
        if (nameB[2] === bookText[2]) {
          scoreB += 50;
        }
      }
    }

    const dA = Math.min(
      Math.abs(abbrA.length - bookText.length),
      Math.abs(nameA.length - bookText.length)
    );

    const dB = Math.min(
      Math.abs(abbrB.length - bookText.length),
      Math.abs(nameB.length - bookText.length)
    );

    if (dA < dB) {
      scoreA += 5;
    }

    if (dB < dA) {
      scoreB += 5;
    }

    if (scoreA < scoreB) {
      return 1;
    }

    if (scoreB < scoreA) {
      return -1;
    }

    return 0;
  });

  return sorted[0];
}

const domain = "https://www.churchofjesuschrist.org";
const lang = "?lang=eng";

/**
 * Returns formatted strings for the reference
 * @param opts
 * @returns
 */
export function formatReference({
  book,
  chapter,
  ranges,
}: {
  book: Book;
  chapter: number | undefined;
  ranges: VerseRange;
}): { reference: string; abbr: string; link: string; content: string } {
  const chapterPath = chapter ? "/" + chapter : "";

  const firstRange = ranges[0];
  const anchor = firstRange
    ? "#p" +
      (Array.isArray(firstRange)
        ? (firstRange as [number, number])[0]
        : firstRange)
    : "";

  const ps: string[] = [];
  const verses: string[] = [];
  let content = "";
  for (const r of ranges) {
    if (Array.isArray(r)) {
      ps.push(`p${r[0]}-p${r[1]}`);
      verses.push(`${r[0]}-${r[1]}`);

      for (let i = r[0]; i < r[1]; i++) {
        const idx = i - 1;
        content +=
          contents[book.name as keyof typeof contents][
            (chapter as number) - 1
          ]?.[idx];
        content += " ";
      }
    } else {
      ps.push(`p${r}`);
      verses.push(r.toString());

      content +=
        contents[book.name as keyof typeof contents][(chapter as number) - 1]?.[
          r - 1
        ];

      content += " ";
    }
  }

  if (
    !ranges.length &&
    chapter &&
    contents[book.name as keyof typeof contents]
  ) {
    const chapterContent =
      contents[book.name as keyof typeof contents][chapter - 1];
    content = chapterContent.join(" ");
  }

  content = content.trim();

  const highlights = ranges.length ? "&id=" + ps.join(",") : "";

  const link = `${domain}${book.path}${chapterPath}${lang}${highlights}${anchor}`;

  const numbers = `${chapter || ""}${verses.length ? ":" : ""}${verses.join(
    ", "
  )}`;

  const long = `${book.name} ${numbers}`.trim();

  return {
    reference: long,
    abbr: `${book.abbr} ${numbers}`.trim(),
    link,
    content,
  };
}
