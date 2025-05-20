import contents from "../data/contents.ts";
import { Book, Reference, VerseRange } from "../types.ts";

const domain = "https://www.churchofjesuschrist.org";
const lang = "?lang=eng";

/**
 * Formats a scripture reference into a structured object, including a readable string,
 * abbreviation, hyperlink, and extracted text content.
 *
 * Sorts verses in chronological order
 * Checks if chapters and verses exist and fixes
 * If opts.content is passed, it will be used rather than doing a lookup
 *
 * @param {Object} opts - The options object for formatting the reference.
 * @param {Book} opts.book - The book of scripture being referenced.
 * @param {number | undefined} opts.chapter - The chapter number, if applicable.
 * @param {VerseRange} opts.verses - An array of verse numbers or ranges.
 * @param {string} [opts.content] - Optional pre-provided content for the passage.
 *
 * @returns {Object} An object containing the formatted reference.
 * @returns {string} return.reference - Full reference string (e.g., "John 3:16").
 * @returns {string} return.abbr - Abbreviated reference (e.g., "Jn 3:16").
 * @returns {string} return.link - URL linking to the passage on the church website.
 * @returns {string} return.content - The extracted text content of the referenced verses.
 * @returns {number | undefined} return.chapter - The chapter number (if applicable).
 * @returns {VerseRange} return.verses - The validated and sorted list of verse numbers.
 */
export function formatRef({
  book,
  chapter,
  content: contentInput,
  verses = [],
}: {
  book: Book;
  chapter?: number;
  content?: string;
  verses?: VerseRange;
}): Reference {
  // makes sure chapter exists
  if (chapter && book?.chapters?.length && book.chapters.length < chapter) {
    chapter = undefined;
    verses.length = 0;
  }

  // When there's only one chapter
  if (!chapter && book?.chapters?.length === 1) {
    chapter = 1;
  }

  // handle verses
  verses.sort((a, b) => {
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

  const ps: string[] = [];
  const vs: string[] = [];
  let content: string | undefined = "";

  if (verses.length && chapter) {
    for (const [idx, range] of verses.entries()) {
      if (Array.isArray(range)) {
        for (const [idx2, verse] of range.entries()) {
          // If the verse doesn't exist, change it to show the highest verse
          if (verse > book.chapters[chapter - 1]) {
            (verses[idx] as [number, number])[idx2] = book.chapters[
              chapter - 1
            ] as number;
          }
        }

        ps.push(`p${range[0]}-p${range[1]}`);
        vs.push(`${range[0]}-${range[1]}`);

        if (!contentInput) {
          for (let i = range[0]; i < range[1]; i++) {
            const idx = i - 1;
            content += contents[book.name as keyof typeof contents][
              (chapter as number) - 1
            ]?.[idx];
            content += " ";
          }
        }
      } else {
        // If the verse doesn't exist, change it to show the highest verse
        if (range > book.chapters[chapter - 1]) {
          verses[idx] = book.chapters[chapter - 1] as number;
        }

        ps.push(`p${range}`);
        vs.push(range.toString());

        if (!contentInput) {
          content += contents[book.name as keyof typeof contents][
            (chapter as number) - 1
          ]?.[range - 1];

          content += " ";
        }
      }
    }
  }

  // entire chapter
  if (
    chapter &&
    !verses.length &&
    !contentInput &&
    contents[book.name as keyof typeof contents]
  ) {
    const chapterContent =
      contents[book.name as keyof typeof contents][chapter - 1];
    content = chapterContent.join(" ");
  }

  content = contentInput || content.trim() || undefined;

  const chapterPath = chapter ? "/" + chapter : "";

  const firstVerse = verses[0];
  const anchor = firstVerse
    ? "#p" +
      (Array.isArray(firstVerse)
        ? (firstVerse as [number, number])[0]
        : firstVerse)
    : "";

  const highlights = verses.length ? "&id=" + ps.join(",") : "";

  const link =
    `${domain}${book.path}${chapterPath}${lang}${highlights}${anchor}`;

  const numberPortion = `${chapter || ""}${vs.length ? ":" : ""}${
    vs.join(
      ", ",
    )
  }`;

  const reference = `${book.name} ${numberPortion}`.trim();
  const abbr = `${book.abbr} ${numberPortion}`.trim();

  return {
    abbr,
    book: { name: book.name, abbr: book.abbr },
    chapter,
    content,
    link,
    reference,
    verses,
  };
}
