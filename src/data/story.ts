// ─── Photo imports (only files that have a companion .asset.json) ─────────────
import photoEarly1 from "@/assets/IMG-20220314-WA0000.jpg.asset.json";
import photoEarly2 from "@/assets/IMG-20221211-WA0000.jpg.asset.json";
import photoHand from "@/assets/20251116_153234.jpg.asset.json";
import photoPeace from "@/assets/20251116_153623.jpg.asset.json";
import photoCliff from "@/assets/20251116_162716.jpg.asset.json";
import photoShillong from "@/assets/20251116_220246.jpg.asset.json";
import photoDate1 from "@/assets/IMG_20241205_224704677_HDR.jpg.asset.json";
import photoDate2 from "@/assets/IMG_20241208_172308343_HDR.jpg.asset.json";
import photoDate3 from "@/assets/IMG_20241209_212803491_HDR.jpg.asset.json";
import photoDate4 from "@/assets/IMG_20241213_132418208_HDR.jpg.asset.json";
import photoNewYear from "@/assets/IMG_20250101_133159029_HDR.jpg.asset.json";
import photoTrip1 from "@/assets/IMG_20250202_133004512_HDR.jpg.asset.json";
import photoTrip2 from "@/assets/IMG_20250202_140651315_HDR.jpg.asset.json";
import photoTrip3 from "@/assets/IMG_20250202_141530112_HDR.jpg.asset.json";
import photoTrip4 from "@/assets/IMG_20250202_142714411_HDR.jpg.asset.json";
import photoCelebration1 from "@/assets/IMG_20251221_152637102_HDR_AE.jpg.asset.json";
import photoCelebration2 from "@/assets/IMG_20251221_152705173_HDR_AE.jpg.asset.json";
import photoCelebration3 from "@/assets/IMG_20251221_152818829_HDR_AE.jpg.asset.json";

export type FrameStyle =
  | "polaroid"
  | "hanging"
  | "glass"
  | "filmstrip"
  | "scrap"
  | "scrapbook";

export type Photo = {
  src: string;
  caption?: string;
  frame: FrameStyle;
  tilt?: number;
  dateStamp?: string;
};

export type Chapter = {
  id: string;
  label: string;
  title: string;
  date?: string;
  emotion: string;
  emotionColor?: string;
  story: string;
  message: string;
  /** 0 morning, 1 afternoon, 2 golden, 3 sunset, 4 dusk, 5 night, 6 stars */
  phase: number;
  photos?: Photo[];
  align?: "left" | "right" | "center";
};

export const HER = "Jaan";
export const HIM = "Akash";

export const chapters: Chapter[] = [
  {
    id: "first-office",
    label: "Chapter One",
    title: "The First Office",
    date: "Where it all quietly began",
    emotion: "Curiosity",
    emotionColor: "sky",
    story:
      "My first office. New building, new badge, a chair that squeaked, and a hundred faces I did not know yet. I remember walking in that morning thinking the day would be about work. It was not. It was about you walking past me, and something in my chest deciding to pay attention.",
    message:
      "I did not know your name yet. I only knew the room felt different when you were in it.",
    phase: 0,
    align: "left",
  },
  {
    id: "first-words",
    label: "Chapter Two",
    title: "The First Office Trip",
    emotion: "Playful annoyance",
    emotionColor: "rose",
    story:
      "We went on an office trip for the first time, and you got really angry with me there because I didn't take your picture. You kept asking me repeatedly to take a photo of you, but I didn't. Finally, I did take one photo, and here it is.",
    message:
      "I might have made you wait for it, but at least I captured the moment.",
    phase: 0,
    align: "right",
    photos: [
      {
        src: "/1639321268161.jpg",
        caption: "the one photo I finally took",
        frame: "polaroid",
        tilt: 3,
      }
    ]
  },
  {
    id: "early-days",
    label: "Chapter Three",
    title: "The First Hug",
    date: "Your Birthday, 2022",
    emotion: "Realization",
    emotionColor: "rose",
    story:
      "It was your birthday, and we had drinks on the office terrace. You got completely intoxicated, and when I dropped you home, you hugged me. That was the first time I truly experienced what a hug feels like. In that exact moment, wrapped in your arms, I realized with absolute certainty that I wanted to be with you.",
    message:
      "I didn't know a single hug could change the entire trajectory of my life.",
    phase: 0,
    align: "left",
    photos: [
      {
        src: photoEarly1.url,
        caption: "the beginning of us",
        frame: "polaroid",
        tilt: -3,
        dateStamp: "Mar 2022",
      },
      {
        src: photoEarly2.url,
        caption: "still learning your smile",
        frame: "polaroid",
        tilt: 4,
        dateStamp: "Dec 2022",
      },
    ],
  },
  {
    id: "first-date",
    label: "Chapter Four",
    title: "Our First Date",
    date: "December 2024",
    emotion: "Butterflies",
    emotionColor: "pink",
    story:
      "I planned it far too much and then forgot every plan the moment you arrived. We walked longer than we needed to. I remember checking the time only to see how much of it was left with you. December light on your face. I already knew.",
    message:
      "That was the evening I stopped imagining a life and started recognising one.",
    phase: 1,
    align: "right",
    photos: [
      {
        src: photoDate1.url,
        caption: "december, that night",
        frame: "glass",
        tilt: -2,
        dateStamp: "Dec 2024",
      },
      {
        src: photoDate2.url,
        caption: "the city was ours",
        frame: "hanging",
        tilt: 3,
        dateStamp: "Dec 2024",
      },
      {
        src: photoDate3.url,
        caption: "I kept looking at you",
        frame: "polaroid",
        tilt: -4,
        dateStamp: "Dec 2024",
      },
    ],
  },
  {
    id: "winter-moments",
    label: "Chapter Five",
    title: "Winter Moments",
    date: "Mid-December 2024",
    emotion: "Warmth",
    emotionColor: "amber",
    story:
      "Cold air and warm hands. Those days in December when every ordinary outing felt like something worth keeping. We were not doing anything extraordinary — just existing in the same frame, in the same season, happy to be there.",
    message:
      "The best moments are rarely the ones you plan. They are the ones that sneak up and stay forever.",
    phase: 1,
    align: "left",
    photos: [
      {
        src: photoDate4.url,
        caption: "mid-december, mid-magic",
        frame: "filmstrip",
        tilt: 2,
        dateStamp: "Dec 2024",
      },
    ],
  },
  {
    id: "new-year",
    label: "Chapter Six",
    title: "New Year, Same Us",
    date: "January 2025",
    emotion: "Hope",
    emotionColor: "lavender",
    story:
      "The world was counting down to something new. I was just quietly grateful we were stepping into it together. A whole year ahead, unwritten. You in it already made it feel like enough.",
    message:
      "Every new year is only worth something if you get to spend it with the right person. I had the right person.",
    phase: 2,
    align: "center",
    photos: [
      {
        src: photoNewYear.url,
        caption: "first day of a year with you",
        frame: "glass",
        tilt: -1,
        dateStamp: "Jan 2025",
      },
    ],
  },
  {
    id: "places",
    label: "Chapter Seven",
    title: "The Trip",
    date: "February 2025",
    emotion: "Nostalgia",
    emotionColor: "amber",
    story:
      "Hills that went on forever, wind that would not sit still, and your hand pulling mine forward on a slope I would never have climbed alone. You pointed at the valley like you were introducing me to an old friend. February light. All of it ours.",
    message: "I have seen beautiful places. I have only ever wanted to see them with you.",
    phase: 2,
    align: "center",
    photos: [
      {
        src: photoTrip1.url,
        caption: "somewhere up there",
        frame: "hanging",
        tilt: -3,
        dateStamp: "Feb 2025",
      },
      {
        src: photoTrip2.url,
        caption: "the view was you",
        frame: "hanging",
        tilt: 4,
        dateStamp: "Feb 2025",
      },
      {
        src: photoTrip3.url,
        caption: "keep going",
        frame: "scrapbook",
        tilt: -2,
        dateStamp: "Feb 2025",
      },
      {
        src: photoTrip4.url,
        caption: "all of that and you",
        frame: "polaroid",
        tilt: 3,
        dateStamp: "Feb 2025",
      },
    ],
  },
  {
    id: "funny",
    label: "Chapter Eight",
    title: "Ridiculous, Both Of Us",
    date: "November 2025",
    emotion: "Laughter",
    emotionColor: "lime",
    story:
      "Your terrible poses. My worse ones. The peace sign you throw at the sky like it owes you something. The inside jokes nobody else would find funny, which is exactly why they are ours. The Shillong trip that gave us three months of references.",
    message:
      "You made my life lighter. That is not a small thing. That is the whole thing.",
    phase: 2,
    align: "left",
    photos: [
      {
        src: photoHand.url,
        caption: "come on, keep up",
        frame: "scrapbook",
        tilt: -3,
        dateStamp: "Nov 2025",
      },
      {
        src: photoPeace.url,
        caption: "certified nonsense",
        frame: "filmstrip",
        tilt: 2,
        dateStamp: "Nov 2025",
      },
      {
        src: photoCliff.url,
        caption: "look — all of that",
        frame: "hanging",
        tilt: 4,
        dateStamp: "Nov 2025",
      },
    ],
  },
  {
    id: "hard-days",
    label: "Chapter Nine",
    title: "The Days That Were Hard",
    emotion: "Ache",
    emotionColor: "blue",
    story:
      "There were nights the messages got shorter. Small things became loud. I said things carelessly and you carried them longer than you should have had to. The silence between us was the only silence I have ever been afraid of.",
    message:
      "I am sorry for the days I made you doubt something that was never actually in doubt.",
    phase: 3,
    align: "right",
  },
  {
    id: "apart",
    label: "Chapter Ten",
    title: "When We Broke",
    emotion: "Sadness",
    emotionColor: "blue",
    story:
      "The world did not stop. That was the strange part. Traffic still moved, phones still rang, and I still reached for you a hundred times a day out of habit. Everything worked. Nothing meant anything.",
    message: "I learned exactly how much of my life had your name written on it.",
    phase: 4,
    align: "left",
  },
  {
    id: "back",
    label: "Chapter Eleven",
    title: "Coming Back To You",
    emotion: "Hope",
    emotionColor: "lavender",
    story:
      "It was not dramatic. It was one honest sentence, then another. We chose each other again — this time knowing exactly what it costs and exactly what it is worth.",
    message:
      "Falling in love was an accident. Coming back was a decision. I would make it again every single day.",
    phase: 4,
    align: "right",
  },
  {
    id: "celebrate",
    label: "Chapter Twelve",
    title: "Celebrations & Small Surprises",
    date: "December 2025",
    emotion: "Romance",
    emotionColor: "pink",
    story:
      "Lights over a square, your face glowing under them, the way you laugh with your whole self when something delights you. December again — but a different December, a better one. The cake, the noise, the cold air, your hand finding mine without looking.",
    message:
      "You turn ordinary evenings into things I will still remember when I am old.",
    phase: 5,
    align: "center",
    photos: [
      {
        src: photoCelebration1.url,
        caption: "that light, that night, you",
        frame: "glass",
        tilt: -2,
        dateStamp: "Dec 2025",
      },
      {
        src: photoCelebration2.url,
        caption: "your smile does this to me",
        frame: "polaroid",
        tilt: 3,
        dateStamp: "Dec 2025",
      },
      {
        src: photoCelebration3.url,
        caption: "remember this one",
        frame: "hanging",
        tilt: -4,
        dateStamp: "Dec 2025",
      },
      {
        src: photoShillong.url,
        caption: "the night we lit everything up",
        frame: "scrapbook",
        tilt: 2,
        dateStamp: "Nov 2025",
      },
    ],
  },
  {
    id: "dreams",
    label: "Chapter Thirteen",
    title: "The Life I Keep Imagining",
    emotion: "Deep love",
    emotionColor: "crimson",
    story:
      "A slow morning. Your side of the bed. Bad coffee that we drink anyway. A door with both our names behind it. More hills, more wind, more of you pulling me somewhere I would not have gone alone. The whole future — every version of it — has you already standing in the middle.",
    message:
      "Every future I build in my head has you standing in the middle of it, already at home.",
    phase: 5,
    align: "left",
  },
];

export const finale = {
  label: "The Last Page",
  title: "A Letter For You",
  photo: photoCelebration1.url,
  lines: [
    `${HER},`,
    "You walked into an ordinary office on an ordinary day and rearranged everything quietly, without asking permission.",
    "Thank you for the laughter, for the patience, for staying through the version of me that was still learning how to love you properly.",
    "Thank you for the trip in February, for December nights, for every photo that now lives in my phone and every memory that lives somewhere even I can't reach.",
    "If I had to do all of it again — the hills, the silences, the coming back — I would not change a single day, because every one of them led here.",
  ],
  signature: HIM,
  closing: "I will always choose you.",
};