import { assertEquals } from "@std/assert";
import { formatRef } from "./formatRef.ts";
import books from "../data/books.ts";
import { Book, Reference } from "../types.ts";

Deno.test("Puts verses in chronological order", () => {
  const ref = formatRef({
    book: books[76] as Book,
    chapter: 3,
    verses: [7, [1, 2], [12, 10]],
  });

  const expected = {
    abbr: "1 Ne. 3:1-2, 7, 12-10",
    book: { name: "1 Nephi", abbr: "1 Ne." },
    chapter: 3,
    content:
      "And it came to pass that I, Nephi, returned from speaking with the Lord, to the tent of my father. And it came to pass that I, Nephi, said unto my father: I will go and do the things which the Lord hath commanded, for I know that the Lord giveth no commandments unto the children of men, save he shall prepare a way for them that they may accomplish the thing which he commandeth them.",
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/3?lang=eng&id=p1-p2,p7,p12-p10#p1",
    reference: "1 Nephi 3:1-2, 7, 12-10",
    verses: [[1, 2], 7, [12, 10]],
  } as Reference;

  assertEquals(ref, expected);
});

Deno.test("Will set chapter to 1 when there's only one chapter", () => {
  const ref = formatRef({
    book: books[32] as Book,
  });

  const expected = {
    abbr: "Obad. 1",
    book: { name: "Obadiah", abbr: "Obad." },
    chapter: 1,
    content:
      "The vision of Obadiah. Thus saith the Lord God concerning Edom; We have heard a rumour from the Lord, and an ambassador is sent among the heathen, Arise ye, and let us rise up against her in battle. Behold, I have made thee small among the heathen: thou art greatly despised. The pride of thine heart hath deceived thee, thou that dwellest in the clefts of the rock, whose habitation is high; that saith in his heart, Who shall bring me down to the ground? Though thou exalt thyself as the eagle, and though thou set thy nest among the stars, thence will I bring thee down, saith the Lord. If thieves came to thee, if robbers by night, (how art thou cut off!) would they not have stolen till they had enough? if the grapegatherers came to thee, would they not leave some grapes? How are the things of Esau searched out! how are his hidden things sought up! All the men of thy confederacy have brought thee even to the border: the men that were at peace with thee have deceived thee, and prevailed against thee; they that eat thy bread have laid a wound under thee: there is none understanding in him. Shall I not in that day, saith the Lord, even destroy the wise men out of Edom, and understanding out of the mount of Esau? And thy mighty men, O Teman, shall be dismayed, to the end that every one of the mount of Esau may be cut off by slaughter. For thy violence against thy brother Jacob shame shall cover thee, and thou shalt be cut off for ever. In the day that thou stoodest on the other side, in the day that the strangers carried away captive his forces, and foreigners entered into his gates, and cast lots upon Jerusalem, even thou wast as one of them. But thou shouldest not have looked on the day of thy brother in the day that he became a stranger; neither shouldest thou have rejoiced over the children of Judah in the day of their destruction; neither shouldest thou have spoken proudly in the day of distress. Thou shouldest not have entered into the gate of my people in the day of their calamity; yea, thou shouldest not have looked on their affliction in the day of their calamity, nor have laid hands on their substance in the day of their calamity; Neither shouldest thou have stood in the crossway, to cut off those of his that did escape; neither shouldest thou have delivered up those of his that did remain in the day of distress. For the day of the Lord is near upon all the heathen: as thou hast done, it shall be done unto thee: thy reward shall return upon thine own head. For as ye have drunk upon my holy mountain, so shall all the heathen drink continually, yea, they shall drink, and they shall swallow down, and they shall be as though they had not been. But upon mount Zion shall be deliverance, and there shall be holiness; and the house of Jacob shall possess their possessions. And the house of Jacob shall be a fire, and the house of Joseph a flame, and the house of Esau for stubble, and they shall kindle in them, and devour them; and there shall not be any remaining of the house of Esau; for the Lord hath spoken it. And they of the south shall possess the mount of Esau; and they of the plain the Philistines: and they shall possess the fields of Ephraim, and the fields of Samaria: and Benjamin shall possess Gilead. And the captivity of this host of the children of Israel shall possess that of the Canaanites, even unto Zarephath; and the captivity of Jerusalem, which is in Sepharad, shall possess the cities of the south. And saviours shall come up on mount Zion to judge the mount of Esau; and the kingdom shall be the Lord's.",
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/ot/obad/1?lang=eng",
    reference: "Obadiah 1",
    verses: [],
  } as Reference;

  assertEquals(ref, expected);
});

Deno.test("Will link to book if no chapter or verses are provided", () => {
  const ref = formatRef({
    book: books[45] as Book,
  });

  const expected = {
    abbr: "John",
    book: { name: "John", abbr: "John" },
    chapter: undefined,
    content: undefined,
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/nt/john?lang=eng",
    reference: "John",
    verses: [],
  } as Reference;

  assertEquals(ref, expected);
});

Deno.test("Will remove chapter if it doesn't exist", () => {
  const ref = formatRef({
    book: books[58] as Book,
    chapter: 5,
    verses: [1],
  });

  const expected = {
    abbr: "Titus",
    book: { name: "Titus", abbr: "Titus" },
    chapter: undefined,
    content: undefined,
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/nt/titus?lang=eng",
    reference: "Titus",
    verses: [],
  } as Reference;

  assertEquals(ref, expected);
});

Deno.test("Will lower verses if they do not exist in the chapter", () => {
  const ref = formatRef({
    book: books[96] as Book,
    chapter: 2,
    verses: [[1, 6]],
  });

  const expected = {
    abbr: "D&C 2:1-3",
    book: { name: "Doctrine and Covenants", abbr: "D&C" },
    chapter: 2,
    content:
      "Behold, I will reveal unto you the Priesthood, by the hand of Elijah the prophet, before the coming of the great and dreadful day of the Lord. And he shall plant in the hearts of the children the promises made to the fathers, and the hearts of the children shall turn to their fathers.",
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/dc-testament/dc/2?lang=eng&id=p1-p3#p1",
    reference: "Doctrine and Covenants 2:1-3",
    verses: [[1, 3]],
  } as Reference;

  assertEquals(ref, expected);
});

Deno.test(
  "Passing in content will eliminate the need for an additional lookup",
  () => {
    const ref = formatRef({
      book: books[79] as Book,
      chapter: 2,
      verses: [[1, 6]],
      content: "hi",
    });

    const expected = {
      abbr: "Enos 1",
      book: { name: "Enos", abbr: "Enos" },
      chapter: 1,
      content: "hi",
      link:
        "https://www.churchofjesuschrist.org/study/scriptures/bofm/enos/1?lang=eng",
      reference: "Enos 1",
      verses: [],
    } as Reference;

    assertEquals(ref, expected);
  },
);
