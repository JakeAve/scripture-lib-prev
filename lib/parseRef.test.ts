import { assertEquals } from "@std/assert";
import { parseRef } from "./parseRef.ts";

Deno.test("Is fine without an end of range", () => {
  const ref = parseRef("1 Nephi 3:7");

  assertEquals(ref, {
    book: {
      name: "1 Nephi",
      abbr: "1 Ne.",
    },
    chapter: 3,
    verses: [7],
    reference: "1 Nephi 3:7",
    abbr: "1 Ne. 3:7",
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/3?lang=eng&id=p7#p7",
    content:
      "And it came to pass that I, Nephi, said unto my father: I will go and do the things which the Lord hath commanded, for I know that the Lord giveth no commandments unto the children of men, save he shall prepare a way for them that they may accomplish the thing which he commandeth them.",
  });
});

Deno.test("Finds the end", () => {
  const ref = parseRef("1 Corinthians 15:40-46");

  assertEquals(ref, {
    book: {
      name: "1 Corinthians",
      abbr: "1 Cor.",
    },
    chapter: 15,
    verses: [[40, 46]],
    reference: "1 Corinthians 15:40-46",
    abbr: "1 Cor. 15:40-46",
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/nt/1-cor/15?lang=eng&id=p40-p46#p40",
    content:
      "There are also celestial bodies, and bodies terrestrial: but the glory of the celestial is one, and the glory of the terrestrial is another. There is one glory of the sun, and another glory of the moon, and another glory of the stars: for one star differeth from another star in glory. So also is the resurrection of the dead. It is sown in corruption; it is raised in incorruption: It is sown in dishonour; it is raised in glory: it is sown in weakness; it is raised in power: It is sown a natural body; it is raised a spiritual body. There is a natural body, and there is a spiritual body. And so it is written, The first man Adam was made a living soul; the last Adam was made a quickening spirit.",
  });
});

Deno.test("Finds without verses", () => {
  const ref = parseRef("Jacob 5");

  assertEquals(ref, {
    book: {
      name: "Jacob",
      abbr: "Jacob",
    },
    chapter: 5,
    verses: [],
    reference: "Jacob 5",
    abbr: "Jacob 5",
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/bofm/jacob/5?lang=eng",
    content:
      "Behold, my brethren, do ye not remember to have read the words of the prophet Zenos, which he spake unto the house of Israel, saying: Hearken, O ye house of Israel, and hear the words of me, a prophet of the Lord. For behold, thus saith the Lord, I will liken thee, O house of Israel, like unto a tame olive tree, which a man took and nourished in his vineyard; and it grew, and waxed old, and began to decay. And it came to pass that the master of the vineyard went forth, and he saw that his olive tree began to decay; and he said: I will prune it, and dig about it, and nourish it, that perhaps it may shoot forth young and tender branches, and it perish not. And it came to pass that he pruned it, and digged about it, and nourished it according to his word. And it came to pass that after many days it began to put forth somewhat a little, young and tender branches; but behold, the main top thereof began to perish. And it came to pass that the master of the vineyard saw it, and he said unto his servant: It grieveth me that I should lose this tree; wherefore, go and pluck the branches from a wild olive tree, and bring them hither unto me; and we will pluck off those main branches which are beginning to wither away, and we will cast them into the fire that they may be burned. And behold, saith the Lord of the vineyard, I take away many of these young and tender branches, and I will graft them whithersoever I will; and it mattereth not that if it so be that the root of this tree will perish, I may preserve the fruit thereof unto myself; wherefore, I will take these young and tender branches, and I will graft them whithersoever I will. Take thou the branches of the wild olive tree, and graft them in, in the stead thereof; and these which I have plucked off I will cast into the fire and burn them, that they may not cumber the ground of my vineyard. And it came to pass that the servant of the Lord of the vineyard did according to the word of the Lord of the vineyard, and grafted in the branches of the wild olive tree. And the Lord of the vineyard caused that it should be digged about, and pruned, and nourished, saying unto his servant: It grieveth me that I should lose this tree; wherefore, that perhaps I might preserve the roots thereof that they perish not, that I might preserve them unto myself, I have done this thing. Wherefore, go thy way; watch the tree, and nourish it, according to my words. And these will I place in the nethermost part of my vineyard, whithersoever I will, it mattereth not unto thee; and I do it that I may preserve unto myself the natural branches of the tree; and also, that I may lay up fruit thereof against the season, unto myself; for it grieveth me that I should lose this tree and the fruit thereof. And it came to pass that the Lord of the vineyard went his way, and hid the natural branches of the tame olive tree in the nethermost parts of the vineyard, some in one and some in another, according to his will and pleasure. And it came to pass that a long time passed away, and the Lord of the vineyard said unto his servant: Come, let us go down into the vineyard, that we may labor in the vineyard. And it came to pass that the Lord of the vineyard, and also the servant, went down into the vineyard to labor. And it came to pass that the servant said unto his master: Behold, look here; behold the tree. And it came to pass that the Lord of the vineyard looked and beheld the tree in the which the wild olive branches had been grafted; and it had sprung forth and begun to bear fruit. And he beheld that it was good; and the fruit thereof was like unto the natural fruit. And he said unto the servant: Behold, the branches of the wild tree have taken hold of the moisture of the root thereof, that the root thereof hath brought forth much strength; and because of the much strength of the root thereof the wild branches have brought forth tame fruit. Now, if we had not grafted in these branches, the tree thereof would have perished. And now, behold, I shall lay up much fruit, which the tree thereof hath brought forth; and the fruit thereof I shall lay up against the season, unto mine own self. And it came to pass that the Lord of the vineyard said unto the servant: Come, let us go to the nethermost part of the vineyard, and behold if the natural branches of the tree have not brought forth much fruit also, that I may lay up of the fruit thereof against the season, unto mine own self. And it came to pass that they went forth whither the master had hid the natural branches of the tree, and he said unto the servant: Behold these; and he beheld the first that it had brought forth much fruit; and he beheld also that it was good. And he said unto the servant: Take of the fruit thereof, and lay it up against the season, that I may preserve it unto mine own self; for behold, said he, this long time have I nourished it, and it hath brought forth much fruit. And it came to pass that the servant said unto his master: How comest thou hither to plant this tree, or this branch of the tree? For behold, it was the poorest spot in all the land of thy vineyard. And the Lord of the vineyard said unto him: Counsel me not; I knew that it was a poor spot of ground; wherefore, I said unto thee, I have nourished it this long time, and thou beholdest that it hath brought forth much fruit. And it came to pass that the Lord of the vineyard said unto his servant: Look hither; behold I have planted another branch of the tree also; and thou knowest that this spot of ground was poorer than the first. But, behold the tree. I have nourished it this long time, and it hath brought forth much fruit; therefore, gather it, and lay it up against the season, that I may preserve it unto mine own self. And it came to pass that the Lord of the vineyard said again unto his servant: Look hither, and behold another branch also, which I have planted; behold that I have nourished it also, and it hath brought forth fruit. And he said unto the servant: Look hither and behold the last. Behold, this have I planted in a good spot of ground; and I have nourished it this long time, and only a part of the tree hath brought forth tame fruit, and the other part of the tree hath brought forth wild fruit; behold, I have nourished this tree like unto the others. And it came to pass that the Lord of the vineyard said unto the servant: Pluck off the branches that have not brought forth good fruit, and cast them into the fire. But behold, the servant said unto him: Let us prune it, and dig about it, and nourish it a little longer, that perhaps it may bring forth good fruit unto thee, that thou canst lay it up against the season. And it came to pass that the Lord of the vineyard and the servant of the Lord of the vineyard did nourish all the fruit of the vineyard. And it came to pass that a long time had passed away, and the Lord of the vineyard said unto his servant: Come, let us go down into the vineyard, that we may labor again in the vineyard. For behold, the time draweth near, and the end soon cometh; wherefore, I must lay up fruit against the season, unto mine own self. And it came to pass that the Lord of the vineyard and the servant went down into the vineyard; and they came to the tree whose natural branches had been broken off, and the wild branches had been grafted in; and behold all sorts of fruit did cumber the tree. And it came to pass that the Lord of the vineyard did taste of the fruit, every sort according to its number. And the Lord of the vineyard said: Behold, this long time have we nourished this tree, and I have laid up unto myself against the season much fruit. But behold, this time it hath brought forth much fruit, and there is none of it which is good. And behold, there are all kinds of bad fruit; and it profiteth me nothing, notwithstanding all our labor; and now it grieveth me that I should lose this tree. And the Lord of the vineyard said unto the servant: What shall we do unto the tree, that I may preserve again good fruit thereof unto mine own self? And the servant said unto his master: Behold, because thou didst graft in the branches of the wild olive tree they have nourished the roots, that they are alive and they have not perished; wherefore thou beholdest that they are yet good. And it came to pass that the Lord of the vineyard said unto his servant: The tree profiteth me nothing, and the roots thereof profit me nothing so long as it shall bring forth evil fruit. Nevertheless, I know that the roots are good, and for mine own purpose I have preserved them; and because of their much strength they have hitherto brought forth, from the wild branches, good fruit. But behold, the wild branches have grown and have overrun the roots thereof; and because that the wild branches have overcome the roots thereof it hath brought forth much evil fruit; and because that it hath brought forth so much evil fruit thou beholdest that it beginneth to perish; and it will soon become ripened, that it may be cast into the fire, except we should do something for it to preserve it. And it came to pass that the Lord of the vineyard said unto his servant: Let us go down into the nethermost parts of the vineyard, and behold if the natural branches have also brought forth evil fruit. And it came to pass that they went down into the nethermost parts of the vineyard. And it came to pass that they beheld that the fruit of the natural branches had become corrupt also; yea, the first and the second and also the last; and they had all become corrupt. And the wild fruit of the last had overcome that part of the tree which brought forth good fruit, even that the branch had withered away and died. And it came to pass that the Lord of the vineyard wept, and said unto the servant: What could I have done more for my vineyard? Behold, I knew that all the fruit of the vineyard, save it were these, had become corrupted. And now these which have once brought forth good fruit have also become corrupted; and now all the trees of my vineyard are good for nothing save it be to be hewn down and cast into the fire. And behold this last, whose branch hath withered away, I did plant in a good spot of ground; yea, even that which was choice unto me above all other parts of the land of my vineyard. And thou beheldest that I also cut down that which cumbered this spot of ground, that I might plant this tree in the stead thereof. And thou beheldest that a part thereof brought forth good fruit, and a part thereof brought forth wild fruit; and because I plucked not the branches thereof and cast them into the fire, behold, they have overcome the good branch that it hath withered away. And now, behold, notwithstanding all the care which we have taken of my vineyard, the trees thereof have become corrupted, that they bring forth no good fruit; and these I had hoped to preserve, to have laid up fruit thereof against the season, unto mine own self. But, behold, they have become like unto the wild olive tree, and they are of no worth but to be hewn down and cast into the fire; and it grieveth me that I should lose them. But what could I have done more in my vineyard? Have I slackened mine hand, that I have not nourished it? Nay, I have nourished it, and I have digged about it, and I have pruned it, and I have dunged it; and I have stretched forth mine hand almost all the day long, and the end draweth nigh. And it grieveth me that I should hew down all the trees of my vineyard, and cast them into the fire that they should be burned. Who is it that has corrupted my vineyard? And it came to pass that the servant said unto his master: Is it not the loftiness of thy vineyard--have not the branches thereof overcome the roots which are good? And because the branches have overcome the roots thereof, behold they grew faster than the strength of the roots, taking strength unto themselves. Behold, I say, is not this the cause that the trees of thy vineyard have become corrupted? And it came to pass that the Lord of the vineyard said unto the servant: Let us go to and hew down the trees of the vineyard and cast them into the fire, that they shall not cumber the ground of my vineyard, for I have done all. What could I have done more for my vineyard? But, behold, the servant said unto the Lord of the vineyard: Spare it a little longer. And the Lord said: Yea, I will spare it a little longer, for it grieveth me that I should lose the trees of my vineyard. Wherefore, let us take of the branches of these which I have planted in the nethermost parts of my vineyard, and let us graft them into the tree from whence they came; and let us pluck from the tree those branches whose fruit is most bitter, and graft in the natural branches of the tree in the stead thereof. And this will I do that the tree may not perish, that, perhaps, I may preserve unto myself the roots thereof for mine own purpose. And, behold, the roots of the natural branches of the tree which I planted whithersoever I would are yet alive; wherefore, that I may preserve them also for mine own purpose, I will take of the branches of this tree, and I will graft them in unto them. Yea, I will graft in unto them the branches of their mother tree, that I may preserve the roots also unto mine own self, that when they shall be sufficiently strong perhaps they may bring forth good fruit unto me, and I may yet have glory in the fruit of my vineyard. And it came to pass that they took from the natural tree which had become wild, and grafted in unto the natural trees, which also had become wild. And they also took of the natural trees which had become wild, and grafted into their mother tree. And the Lord of the vineyard said unto the servant: Pluck not the wild branches from the trees, save it be those which are most bitter; and in them ye shall graft according to that which I have said. And we will nourish again the trees of the vineyard, and we will trim up the branches thereof; and we will pluck from the trees those branches which are ripened, that must perish, and cast them into the fire. And this I do that, perhaps, the roots thereof may take strength because of their goodness; and because of the change of the branches, that the good may overcome the evil. And because that I have preserved the natural branches and the roots thereof, and that I have grafted in the natural branches again into their mother tree, and have preserved the roots of their mother tree, that, perhaps, the trees of my vineyard may bring forth again good fruit; and that I may have joy again in the fruit of my vineyard, and, perhaps, that I may rejoice exceedingly that I have preserved the roots and the branches of the first fruit-- Wherefore, go to, and call servants, that we may labor diligently with our might in the vineyard, that we may prepare the way, that I may bring forth again the natural fruit, which natural fruit is good and the most precious above all other fruit. Wherefore, let us go to and labor with our might this last time, for behold the end draweth nigh, and this is for the last time that I shall prune my vineyard. Graft in the branches; begin at the last that they may be first, and that the first may be last, and dig about the trees, both old and young, the first and the last; and the last and the first, that all may be nourished once again for the last time. Wherefore, dig about them, and prune them, and dung them once more, for the last time, for the end draweth nigh. And if it be so that these last grafts shall grow, and bring forth the natural fruit, then shall ye prepare the way for them, that they may grow. And as they begin to grow ye shall clear away the branches which bring forth bitter fruit, according to the strength of the good and the size thereof; and ye shall not clear away the bad thereof all at once, lest the roots thereof should be too strong for the graft, and the graft thereof shall perish, and I lose the trees of my vineyard. For it grieveth me that I should lose the trees of my vineyard; wherefore ye shall clear away the bad according as the good shall grow, that the root and the top may be equal in strength, until the good shall overcome the bad, and the bad be hewn down and cast into the fire, that they cumber not the ground of my vineyard; and thus will I sweep away the bad out of my vineyard. And the branches of the natural tree will I graft in again into the natural tree; And the branches of the natural tree will I graft into the natural branches of the tree; and thus will I bring them together again, that they shall bring forth the natural fruit, and they shall be one. And the bad shall be cast away, yea, even out of all the land of my vineyard; for behold, only this once will I prune my vineyard. And it came to pass that the Lord of the vineyard sent his servant; and the servant went and did as the Lord had commanded him, and brought other servants; and they were few. And the Lord of the vineyard said unto them: Go to, and labor in the vineyard, with your might. For behold, this is the last time that I shall nourish my vineyard; for the end is nigh at hand, and the season speedily cometh; and if ye labor with your might with me ye shall have joy in the fruit which I shall lay up unto myself against the time which will soon come. And it came to pass that the servants did go and labor with their mights; and the Lord of the vineyard labored also with them; and they did obey the commandments of the Lord of the vineyard in all things. And there began to be the natural fruit again in the vineyard; and the natural branches began to grow and thrive exceedingly; and the wild branches began to be plucked off and to be cast away; and they did keep the root and the top thereof equal, according to the strength thereof. And thus they labored, with all diligence, according to the commandments of the Lord of the vineyard, even until the bad had been cast away out of the vineyard, and the Lord had preserved unto himself that the trees had become again the natural fruit; and they became like unto one body; and the fruits were equal; and the Lord of the vineyard had preserved unto himself the natural fruit, which was most precious unto him from the beginning. And it came to pass that when the Lord of the vineyard saw that his fruit was good, and that his vineyard was no more corrupt, he called up his servants, and said unto them: Behold, for this last time have we nourished my vineyard; and thou beholdest that I have done according to my will; and I have preserved the natural fruit, that it is good, even like as it was in the beginning. And blessed art thou; for because ye have been diligent in laboring with me in my vineyard, and have kept my commandments, and have brought unto me again the natural fruit, that my vineyard is no more corrupted, and the bad is cast away, behold ye shall have joy with me because of the fruit of my vineyard. For behold, for a long time will I lay up of the fruit of my vineyard unto mine own self against the season, which speedily cometh; and for the last time have I nourished my vineyard, and pruned it, and dug about it, and dunged it; wherefore I will lay up unto mine own self of the fruit, for a long time, according to that which I have spoken. And when the time cometh that evil fruit shall again come into my vineyard, then will I cause the good and the bad to be gathered; and the good will I preserve unto myself, and the bad will I cast away into its own place. And then cometh the season and the end; and my vineyard will I cause to be burned with fire.",
  });
});

Deno.test("Finds book and adds chapter 1 when there is only 1", () => {
  const ref = parseRef("Omni");

  assertEquals(ref, {
    book: {
      name: "Omni",
      abbr: "Omni",
    },
    chapter: 1,
    verses: [],
    reference: "Omni 1",
    abbr: "Omni 1",
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/bofm/omni/1?lang=eng",
    content:
      "Behold, it came to pass that I, Omni, being commanded by my father, Jarom, that I should write somewhat upon these plates, to preserve our genealogy-- Wherefore, in my days, I would that ye should know that I fought much with the sword to preserve my people, the Nephites, from falling into the hands of their enemies, the Lamanites. But behold, I of myself am a wicked man, and I have not kept the statutes and the commandments of the Lord as I ought to have done. And it came to pass that two hundred and seventy and six years had passed away, and we had many seasons of peace; and we had many seasons of serious war and bloodshed. Yea, and in fine, two hundred and eighty and two years had passed away, and I had kept these plates according to the commandments of my fathers; and I conferred them upon my son Amaron. And I make an end. And now I, Amaron, write the things whatsoever I write, which are few, in the book of my father. Behold, it came to pass that three hundred and twenty years had passed away, and the more wicked part of the Nephites were destroyed. For the Lord would not suffer, after he had led them out of the land of Jerusalem and kept and preserved them from falling into the hands of their enemies, yea, he would not suffer that the words should not be verified, which he spake unto our fathers, saying that: Inasmuch as ye will not keep my commandments ye shall not prosper in the land. Wherefore, the Lord did visit them in great judgment; nevertheless, he did spare the righteous that they should not perish, but did deliver them out of the hands of their enemies. And it came to pass that I did deliver the plates unto my brother Chemish. Now I, Chemish, write what few things I write, in the same book with my brother; for behold, I saw the last which he wrote, that he wrote it with his own hand; and he wrote it in the day that he delivered them unto me. And after this manner we keep the records, for it is according to the commandments of our fathers. And I make an end. Behold, I, Abinadom, am the son of Chemish. Behold, it came to pass that I saw much war and contention between my people, the Nephites, and the Lamanites; and I, with my own sword, have taken the lives of many of the Lamanites in the defence of my brethren. And behold, the record of this people is engraven upon plates which is had by the kings, according to the generations; and I know of no revelation save that which has been written, neither prophecy; wherefore, that which is sufficient is written. And I make an end. Behold, I am Amaleki, the son of Abinadom. Behold, I will speak unto you somewhat concerning Mosiah, who was made king over the land of Zarahemla; for behold, he being warned of the Lord that he should flee out of the land of Nephi, and as many as would hearken unto the voice of the Lord should also depart out of the land with him, into the wilderness-- And it came to pass that he did according as the Lord had commanded him. And they departed out of the land into the wilderness, as many as would hearken unto the voice of the Lord; and they were led by many preachings and prophesyings. And they were admonished continually by the word of God; and they were led by the power of his arm, through the wilderness until they came down into the land which is called the land of Zarahemla. And they discovered a people, who were called the people of Zarahemla. Now, there was great rejoicing among the people of Zarahemla; and also Zarahemla did rejoice exceedingly, because the Lord had sent the people of Mosiah with the plates of brass which contained the record of the Jews. Behold, it came to pass that Mosiah discovered that the people of Zarahemla came out from Jerusalem at the time that Zedekiah, king of Judah, was carried away captive into Babylon. And they journeyed in the wilderness, and were brought by the hand of the Lord across the great waters, into the land where Mosiah discovered them; and they had dwelt there from that time forth. And at the time that Mosiah discovered them, they had become exceedingly numerous. Nevertheless, they had had many wars and serious contentions, and had fallen by the sword from time to time; and their language had become corrupted; and they had brought no records with them; and they denied the being of their Creator; and Mosiah, nor the people of Mosiah, could understand them. But it came to pass that Mosiah caused that they should be taught in his language. And it came to pass that after they were taught in the language of Mosiah, Zarahemla gave a genealogy of his fathers, according to his memory; and they are written, but not in these plates. And it came to pass that the people of Zarahemla, and of Mosiah, did unite together; and Mosiah was appointed to be their king. And it came to pass in the days of Mosiah, there was a large stone brought unto him with engravings on it; and he did interpret the engravings by the gift and power of God. And they gave an account of one Coriantumr, and the slain of his people. And Coriantumr was discovered by the people of Zarahemla; and he dwelt with them for the space of nine moons. It also spake a few words concerning his fathers. And his first parents came out from the tower, at the time the Lord confounded the language of the people; and the severity of the Lord fell upon them according to his judgments, which are just; and their bones lay scattered in the land northward. Behold, I, Amaleki, was born in the days of Mosiah; and I have lived to see his death; and Benjamin, his son, reigneth in his stead. And behold, I have seen, in the days of king Benjamin, a serious war and much bloodshed between the Nephites and the Lamanites. But behold, the Nephites did obtain much advantage over them; yea, insomuch that king Benjamin did drive them out of the land of Zarahemla. And it came to pass that I began to be old; and, having no seed, and knowing king Benjamin to be a just man before the Lord, wherefore, I shall deliver up these plates unto him, exhorting all men to come unto God, the Holy One of Israel, and believe in prophesying, and in revelations, and in the ministering of angels, and in the gift of speaking with tongues, and in the gift of interpreting languages, and in all things which are good; for there is nothing which is good save it comes from the Lord: and that which is evil cometh from the devil. And now, my beloved brethren, I would that ye should come unto Christ, who is the Holy One of Israel, and partake of his salvation, and the power of his redemption. Yea, come unto him, and offer your whole souls as an offering unto him, and continue in fasting and praying, and endure to the end; and as the Lord liveth ye will be saved. And now I would speak somewhat concerning a certain number who went up into the wilderness to return to the land of Nephi; for there was a large number who were desirous to possess the land of their inheritance. Wherefore, they went up into the wilderness. And their leader being a strong and mighty man, and a stiffnecked man, wherefore he caused a contention among them; and they were all slain, save fifty, in the wilderness, and they returned again to the land of Zarahemla. And it came to pass that they also took others to a considerable number, and took their journey again into the wilderness. And I, Amaleki, had a brother, who also went with them; and I have not since known concerning them. And I am about to lie down in my grave; and these plates are full. And I make an end of my speaking.",
  });
});

Deno.test("Finds D&C", () => {
  const ref = parseRef("D&C 20:1");

  assertEquals(ref, {
    book: {
      name: "Doctrine and Covenants",
      abbr: "D&C",
    },
    chapter: 20,
    verses: [1],
    reference: "Doctrine and Covenants 20:1",
    abbr: "D&C 20:1",
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/dc-testament/dc/20?lang=eng&id=p1#p1",
    content:
      "The rise of the Church of Christ in these last days, being one thousand eight hundred and thirty years since the coming of our Lord and Savior Jesus Christ in the flesh, it being regularly organized and established agreeable to the laws of our country, by the will and commandments of God, in the fourth month, and on the sixth day of the month which is called April--",
  });
});

Deno.test("Finds single verse", () => {
  const ref = parseRef("Exodus 20:13");

  assertEquals(ref, {
    book: {
      name: "Exodus",
      abbr: "Ex.",
    },
    chapter: 20,
    verses: [13],
    reference: "Exodus 20:13",
    abbr: "Ex. 20:13",
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/ot/ex/20?lang=eng&id=p13#p13",
    content: "Thou shalt not kill.",
  });
});

Deno.test("Finds range of verses", () => {
  const ref = parseRef("Mosiah 4:15-19");

  assertEquals(ref, {
    book: {
      name: "Mosiah",
      abbr: "Mosiah",
    },
    chapter: 4,
    verses: [[15, 19]],
    reference: "Mosiah 4:15-19",
    abbr: "Mosiah 4:15-19",
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/4?lang=eng&id=p15-p19#p15",
    content:
      "But ye will teach them to walk in the ways of truth and soberness; ye will teach them to love one another, and to serve one another. And also, ye yourselves will succor those that stand in need of your succor; ye will administer of your substance unto him that standeth in need; and ye will not suffer that the beggar putteth up his petition to you in vain, and turn him out to perish. Perhaps thou shalt say: The man has brought upon himself his misery; therefore I will stay my hand, and will not give unto him of my food, nor impart unto him of my substance that he may not suffer, for his punishments are just-- But I say unto you, O man, whosoever doeth this the same hath great cause to repent; and except he repenteth of that which he hath done he perisheth forever, and hath no interest in the kingdom of God.",
  });
});

Deno.test("Finds ranges of verses", () => {
  const ref = parseRef("Ether 12:4-27, 28-30, 31");

  assertEquals(ref, {
    book: {
      name: "Ether",
      abbr: "Ether",
    },
    chapter: 12,
    verses: [[4, 27], [28, 30], 31],
    reference: "Ether 12:4-27, 28-30, 31",
    abbr: "Ether 12:4-27, 28-30, 31",
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/bofm/ether/12?lang=eng&id=p4-p27,p28-p30,p31#p4",
    content:
      "Wherefore, whoso believeth in God might with surety hope for a better world, yea, even a place at the right hand of God, which hope cometh of faith, maketh an anchor to the souls of men, which would make them sure and steadfast, always abounding in good works, being led to glorify God. And it came to pass that Ether did prophesy great and marvelous things unto the people, which they did not believe, because they saw them not. And now, I, Moroni, would speak somewhat concerning these things; I would show unto the world that faith is things which are hoped for and not seen; wherefore, dispute not because ye see not, for ye receive no witness until after the trial of your faith. For it was by faith that Christ showed himself unto our fathers, after he had risen from the dead; and he showed not himself unto them until after they had faith in him; wherefore, it must needs be that some had faith in him, for he showed himself not unto the world. But because of the faith of men he has shown himself unto the world, and glorified the name of the Father, and prepared a way that thereby others might be partakers of the heavenly gift, that they might hope for those things which they have not seen. Wherefore, ye may also have hope, and be partakers of the gift, if ye will but have faith. Behold it was by faith that they of old were called after the holy order of God. Wherefore, by faith was the law of Moses given. But in the gift of his Son hath God prepared a more excellent way; and it is by faith that it hath been fulfilled. For if there be no faith among the children of men God can do no miracle among them; wherefore, he showed not himself until after their faith. Behold, it was the faith of Alma and Amulek that caused the prison to tumble to the earth. Behold, it was the faith of Nephi and Lehi that wrought the change upon the Lamanites, that they were baptized with fire and with the Holy Ghost. Behold, it was the faith of Ammon and his brethren which wrought so great a miracle among the Lamanites. Yea, and even all they who wrought miracles wrought them by faith, even those who were before Christ and also those who were after. And it was by faith that the three disciples obtained a promise that they should not taste of death; and they obtained not the promise until after their faith. And neither at any time hath any wrought miracles until after their faith; wherefore they first believed in the Son of God. And there were many whose faith was so exceedingly strong, even before Christ came, who could not be kept from within the veil, but truly saw with their eyes the things which they had beheld with an eye of faith, and they were glad. And behold, we have seen in this record that one of these was the brother of Jared; for so great was his faith in God, that when God put forth his finger he could not hide it from the sight of the brother of Jared, because of his word which he had spoken unto him, which word he had obtained by faith. And after the brother of Jared had beheld the finger of the Lord, because of the promise which the brother of Jared had obtained by faith, the Lord could not withhold anything from his sight; wherefore he showed him all things, for he could no longer be kept without the veil. And it is by faith that my fathers have obtained the promise that these things should come unto their brethren through the Gentiles; therefore the Lord hath commanded me, yea, even Jesus Christ. And I said unto him: Lord, the Gentiles will mock at these things, because of our weakness in writing; for Lord thou hast made us mighty in word by faith, but thou hast not made us mighty in writing; for thou hast made all this people that they could speak much, because of the Holy Ghost which thou hast given them; And thou hast made us that we could write but little, because of the awkwardness of our hands. Behold, thou hast not made us mighty in writing like unto the brother of Jared, for thou madest him that the things which he wrote were mighty even as thou art, unto the overpowering of man to read them. Thou hast also made our words powerful and great, even that we cannot write them; wherefore, when we write we behold our weakness, and stumble because of the placing of our words; and I fear lest the Gentiles shall mock at our words. And when I had said this, the Lord spake unto me, saying: Fools mock, but they shall mourn; and my grace is sufficient for the meek, that they shall take no advantage of your weakness; Behold, I will show unto the Gentiles their weakness, and I will show unto them that faith, hope and charity bringeth unto me--the fountain of all righteousness. And I, Moroni, having heard these words, was comforted, and said: O Lord, thy righteous will be done, for I know that thou workest unto the children of men according to their faith; For thus didst thou manifest thyself unto thy disciples; for after they had faith, and did speak in thy name, thou didst show thyself unto them in great power.",
  });
});

Deno.test("Sorts verse ranges", () => {
  const ref = parseRef("John 17:9-10,6-1, ");

  assertEquals(ref, {
    book: {
      name: "John",
      abbr: "John",
    },
    chapter: 17,
    verses: [
      [1, 6],
      [9, 10],
    ],
    reference: "John 17:1-6, 9-10",
    abbr: "John 17:1-6, 9-10",
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/nt/john/17?lang=eng&id=p1-p6,p9-p10#p1",
    content:
      "These words spake Jesus, and lifted up his eyes to heaven, and said, Father, the hour is come; glorify thy Son, that thy Son also may glorify thee: As thou hast given him power over all flesh, that he should give eternal life to as many as thou hast given him. And this is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent. I have glorified thee on the earth: I have finished the work which thou gavest me to do. And now, O Father, glorify thou me with thine own self with the glory which I had with thee before the world was. I pray for them: I pray not for the world, but for them which thou hast given me; for they are thine.",
  });
});

Deno.test("Only book", () => {
  const ref = parseRef("Mormon");

  assertEquals(ref, {
    book: {
      name: "Mormon",
      abbr: "Morm.",
    },
    chapter: undefined,
    verses: [],
    reference: "Mormon",
    abbr: "Morm.",
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/bofm/morm?lang=eng",
    content: undefined,
  });
});

Deno.test("Can pick up other symbols", () => {
  const ref = parseRef("1 Corinthians 12:12–27");

  assertEquals(ref, {
    book: {
      name: "1 Corinthians",
      abbr: "1 Cor.",
    },
    chapter: 12,
    verses: [[12, 27]],
    reference: "1 Corinthians 12:12-27",
    abbr: "1 Cor. 12:12-27",
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/nt/1-cor/12?lang=eng&id=p12-p27#p12",
    content:
      "For as the body is one, and hath many members, and all the members of that one body, being many, are one body: so also is Christ. For by one Spirit are we all baptized into one body, whether we be Jews or Gentiles, whether we be bond or free; and have been all made to drink into one Spirit. For the body is not one member, but many. If the foot shall say, Because I am not the hand, I am not of the body; is it therefore not of the body? And if the ear shall say, Because I am not the eye, I am not of the body; is it therefore not of the body? If the whole body were an eye, where were the hearing? If the whole were hearing, where were the smelling? But now hath God set the members every one of them in the body, as it hath pleased him. And if they were all one member, where were the body? But now are they many members, yet but one body. And the eye cannot say unto the hand, I have no need of thee: nor again the head to the feet, I have no need of you. Nay, much more those members of the body, which seem to be more feeble, are necessary: And those members of the body, which we think to be less honourable, upon these we bestow more abundant honour; and our uncomely parts have more abundant comeliness. For our comely parts have no need: but God hath tempered the body together, having given more abundant honour to that part which lacked: That there should be no schism in the body; but that the members should have the same care one for another. And whether one member suffer, all the members suffer with it; or one member be honoured, all the members rejoice with it.",
  });
});

Deno.test("Will show a single verse for an incomplete range", () => {
  const ref = parseRef("1 John 1:7-");

  assertEquals(ref, {
    book: {
      name: "1 John",
      abbr: "1 Jn.",
    },
    chapter: 1,
    verses: [7],
    reference: "1 John 1:7",
    abbr: "1 Jn. 1:7",
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/nt/1-jn/1?lang=eng&id=p7#p7",
    content:
      "But if we walk in the light, as he is in the light, we have fellowship one with another, and the blood of Jesus Christ his Son cleanseth us from all sin.",
  });
});

Deno.test("Will coerce a weird range", () => {
  const ref = parseRef("1 John 1:7-8-9");

  assertEquals(ref, {
    book: {
      name: "1 John",
      abbr: "1 Jn.",
    },
    chapter: 1,
    verses: [7, 8, 9],
    reference: "1 John 1:7, 8, 9",
    abbr: "1 Jn. 1:7, 8, 9",
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/nt/1-jn/1?lang=eng&id=p7,p8,p9#p7",
    content:
      "But if we walk in the light, as he is in the light, we have fellowship one with another, and the blood of Jesus Christ his Son cleanseth us from all sin. If we say that we have no sin, we deceive ourselves, and the truth is not in us. If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
  });
});

Deno.test("Will use the last verse if verse numbers are too high", () => {
  const ref = parseRef("D&C 138:59-80");

  assertEquals(ref, {
    book: {
      name: "Doctrine and Covenants",
      abbr: "D&C",
    },
    chapter: 138,
    verses: [[59, 60]],
    reference: "Doctrine and Covenants 138:59-60",
    abbr: "D&C 138:59-60",
    link:
      "https://www.churchofjesuschrist.org/study/scriptures/dc-testament/dc/138?lang=eng&id=p59-p60#p59",
    content:
      "And after they have paid the penalty of their transgressions, and are washed clean, shall receive a reward according to their works, for they are heirs of salvation.",
  });
});
