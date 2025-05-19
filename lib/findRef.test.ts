import { assertEquals } from "@std/assert";
import { findRef } from "./findRef.ts";

Deno.test("Can find references", () => {
  const maxResults = 1;
  const options = { maxResults };

  assertEquals(findRef("I am not ashamed", options), [
    {
      book: {
        name: "Romans",
        abbr: "Rom.",
      },
      chapter: 1,
      verses: [16],
      reference: "Romans 1:16",
      abbr: "Rom. 1:16",
      link: "https://www.churchofjesuschrist.org/study/scriptures/nt/rom/1?lang=eng&id=p16#p16",
      content:
        "For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth; to the Jew first, and also to the Greek.",
      match: "I AM NOT ASHAMED",
    },
  ]);

  assertEquals(findRef("I will go and do", options), [
    {
      book: {
        name: "1 Nephi",
        abbr: "1 Ne.",
      },
      chapter: 3,
      verses: [7],
      reference: "1 Nephi 3:7",
      abbr: "1 Ne. 3:7",
      link: "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/3?lang=eng&id=p7#p7",
      content:
        "And it came to pass that I, Nephi, said unto my father: I will go and do the things which the Lord hath commanded, for I know that the Lord giveth no commandments unto the children of men, save he shall prepare a way for them that they may accomplish the thing which he commandeth them.",
      match: "I WILL GO AND DO",
    },
  ]);

  assertEquals(findRef("peace been as a river", options), [
    {
      book: {
        name: "Isaiah",
        abbr: "Isa.",
      },
      chapter: 48,
      verses: [18],
      reference: "Isaiah 48:18",
      abbr: "Isa. 48:18",
      link: "https://www.churchofjesuschrist.org/study/scriptures/ot/isa/48?lang=eng&id=p18#p18",
      content:
        "O that thou hadst hearkened to my commandments! then had thy peace been as a river, and thy righteousness as the waves of the sea:",
      match: "PEACE BEEN AS A RIVER",
    },
  ]);

  assertEquals(findRef("take my yoke upon you", options), [
    {
      book: {
        name: "Matthew",
        abbr: "Matt.",
      },
      chapter: 11,
      verses: [29],
      reference: "Matthew 11:29",
      abbr: "Matt. 11:29",
      link: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/11?lang=eng&id=p29#p29",
      content:
        "Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls.",
      match: "TAKE MY YOKE UPON YOU",
    },
  ]);

  assertEquals(findRef("by small and simple things", options), [
    {
      book: {
        name: "Alma",
        abbr: "Alma",
      },
      chapter: 37,
      verses: [6],
      reference: "Alma 37:6",
      abbr: "Alma 37:6",
      link: "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/37?lang=eng&id=p6#p6",
      content:
        "Now ye may suppose that this is foolishness in me; but behold I say unto you, that by small and simple things are great things brought to pass; and small means in many instances doth confound the wise.",
      match: "BY SMALL AND SIMPLE THINGS",
    },
  ]);

  assertEquals(findRef("art thou greater than he?", options), [
    {
      book: {
        name: "Doctrine and Covenants",
        abbr: "D&C",
      },
      chapter: 122,
      verses: [8],
      reference: "Doctrine and Covenants 122:8",
      abbr: "D&C 122:8",
      link: "https://www.churchofjesuschrist.org/study/scriptures/dc-testament/dc/122?lang=eng&id=p8#p8",
      content:
        "The Son of Man hath descended below them all. Art thou greater than he?",
      match: "ART THOU GREATER THAN HE",
    },
  ]);

  assertEquals(findRef("I am more intelligent than they all", options), [
    {
      book: {
        name: "Abraham",
        abbr: "Abr.",
      },
      chapter: 3,
      verses: [19],
      reference: "Abraham 3:19",
      abbr: "Abr. 3:19",
      link: "https://www.churchofjesuschrist.org/study/scriptures/pgp/abr/3?lang=eng&id=p19#p19",
      content:
        "And the Lord said unto me: These two facts do exist, that there are two spirits, one being more intelligent than the other; there shall be another more intelligent than they; I am the Lord thy God, I am more intelligent than they all.",
      match: "I AM MORE INTELLIGENT THAN THEY ALL",
    },
  ]);
});
