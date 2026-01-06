function makeSlug(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export type ProjectVideo = {
  title?: string;
  embedUrl: string;
  thumbnailUrl?: string;
};

export type ProjectVideoSection = {
  title: string;
  videos: ProjectVideo[];
};

export type Project = {
  slug: string;
  title: string;
  date?: string; // ✅ you’re using this on many projects
  year?: number;
  tags: string[];

  // ✅ keep the original fields
  thumbnailUrl: string; // points to an image
  description: string;

  // ✅ optional (some projects use heroEmbedUrl + sections, or videos[])
  embedUrl?: string;

  // ✅ for Job Hunters / special multi-section pages
  heroEmbedUrl?: string;
  heroAspectRatio?: number;
  videoSections?: ProjectVideoSection[];

  // ✅ for multi-video pages like Xbox Podcast
  videos?: ProjectVideo[];

  // ✅ optional labels/content
  accoladesLabel?: string;
  accolades?: string[];
  videosLayout?: "carousel" | "grid-two";
  longDescriptionAfterMedia?: boolean;
  embedHtml?: string;
};

export const projects: Project[] = [
  {
  title: "Job Hunters",
  slug: "job-hunters",
  date: "2012-03-07",
  year: 2012,
  tags: ["Series", "Original"],
  description: "A comedic dystopian web series",
  heroEmbedUrl: "https://www.youtube.com/embed/i1Z9poBq764",
  thumbnailUrl: "/thumbnails/JobHunters.webp",

  // Long description (2 paragraphs). In your Project page, split by "\n\n" to render paragraphs.
  longDescription: `[Job Hunters](https://www.youtube.com/user/watchjobhunters) is a Seattle-based web series set in the near future, where college graduates must literally fight (potentially to the death) for jobs. After battling in an arena from 9-to-5 each day, graduates spend the rest of their time in government-run Safe Houses. Our series follows a particular set of Job Hunters as they struggle with adjusting to life in the Safe Houses, dealing with roommate issues, as well as sorting through feelings of their own impending doom.

Three years of production and 18 episodes later, Cinesaurus produced two full seasons of Job Hunters. The dark comedy, incorporating futuristic sci-fi VFX, beautiful Pacific Northwest locations, and stellar editing, attracted a dedicated fan following of over 17,000 for the weekly videos. With the show’s Executive Producers, we premiered this ambitious series in Los Angeles and set the stage for more long-form narrative content in the hopefully-not-so-ominous near future.`,

  accolades: [
    "Winner of LA WebFest 2012 (Outstanding Ensemble Cast)",
    "Winner of LA WebFest 2012 (Outstanding Series Concept)",
  ],

  credits: [
    { role: "Co-produced by", name: "Cinesaurus" },
    { role: "Producers", name: "Forest Gibson, Kristina Horner, Liz Leo, Tara Theoharis" },
    { role: "Director", name: "Alexander JL Theoharis" },
    { role: "Production Manager", name: "Danielle Sparks" },
    { role: "Writers", name: "Alexander JL Theoharis, Rob Whitehead" },
    { role: "Post-production by", name: "Cinesaurus" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Assistant Editors", name: "Riley O’Callaghan, Dennis Tran" },
    { role: "Post-production Supervisor", name: "David Zimmermann" },
    { role: "Lead Visual Effects", name: "Steven Hudson" },
    { role: "Compositors", name: "Gabe Conroy, David Zimmermann" },
    { role: "Additional VFX", name: "Robert Bojorquez, David Hudson" },
    { role: "Opening Title Sequence", name: "Cinesaurus" },
    { role: "Music", name: "Jordan Brokaw, Johnny Stark" },
    { role: "Sound Design", name: "HearBy Sound" },
  ],

  cast: [
    { role: "Avery", name: "Kristina Horner" },
    { role: "Devon", name: "Forest Gibson" },
    { role: "Max", name: "Joe Homes" },
    { role: "Paige", name: "Meagan Karimi-Naser" },
    { role: "Tiffany", name: "Tara Theoharis" },
  ],

  videoSections: [
    {
      title: "Season One",
      videos: [
        {
          title: "Job Hunters - S1 Ep 1: Safe House",
          embedUrl: "https://www.youtube.com/embed/shhPwitFW2g",
        },
        {
          title: "Job Hunters - S1 Ep 2: Rules of Engagement",
          embedUrl: "https://www.youtube.com/embed/M8Hno8oe86M",
        },
        {
          title: "Job Hunters - S1 Ep 3: Shell Shock",
          embedUrl: "https://www.youtube.com/embed/uwzFp91PEe8",
        },
        {
          title: "Job Hunters - S1 Ep 4: Tactical Assessment",
          embedUrl: "https://www.youtube.com/embed/GxyjtrbC0rk",
        },
        {
          title: "Job Hunters - S1 Ep 5: Evasive Action",
          embedUrl: "https://www.youtube.com/embed/rgHVmnhmtYs",
        },
        {
          title: "Job Hunters - S1 Ep 6: Friendly Fire",
          embedUrl: "https://www.youtube.com/embed/_LDwCgq4BP4",
        },
        {
          title: "Job Hunters - MAEWIN Instructional Video (Full Version)",
          embedUrl: "https://www.youtube.com/embed/NE9F01EqDBs",
        },
      ],
    },
    {
      title: "Season Two",
      videos: [
        {
          title: "Job Hunters – S2 Ep 1: Aftermath",
          embedUrl: "https://www.youtube.com/embed/K4uEwaQQ4PM",
        },
        {
          title: "Job Hunters – S2 Ep 2: A Familiar Face",
          embedUrl: "https://www.youtube.com/embed/RsA5K9q0Svc",
        },
        {
          title: "Job Hunters – S2 Ep 3: The Heist",
          embedUrl: "https://www.youtube.com/embed/L44YMBxJf6U",
        },
        {
          title: "Job Hunters – S2 Ep 4: Reunited",
          embedUrl: "https://www.youtube.com/embed/ikZRNnRmzDI",
        },
        {
          title: "Job Hunters – S2 Ep 5: Dead Weight",
          embedUrl: "https://www.youtube.com/embed/TgjmU74RP4A",
        },
        {
          title: "Job Hunters – S2 Ep 6: MAE Day",
          embedUrl: "https://www.youtube.com/embed/zsKpDjBVW_I",
        },
        {
          title: "Job Hunters – S2 Ep 7: Night Terrors",
          embedUrl: "https://www.youtube.com/embed/XSGSpdWqy_U",
        },
        {
          title: "Job Hunters – S2 Ep 8: Secret Keeper",
          embedUrl: "https://www.youtube.com/embed/Pjpp0mlR5-8",
        },
        {
          title: "Job Hunters – S2 Ep 9: Mercury Rises",
          embedUrl: "https://www.youtube.com/embed/R3wTY4M3lGQ",
        },
        {
          title: "Job Hunters – S2 Ep 10: Person of Interest",
          embedUrl: "https://www.youtube.com/embed/PX3bOCezkOs",
        },
        {
          title: "Job Hunters – S2 Ep 11: Countdown",
          embedUrl: "https://www.youtube.com/embed/aJwrHyvZQ0E",
        },
        {
          title: "Job Hunters – S2 Ep 12: Fired",
          embedUrl: "https://www.youtube.com/embed/05gQ6Jsdlb0",
        },
      ],
    },
  ],
},

  {
    slug: "iphone-5-a-taller-change",
    title: "iPhone 5: A Taller Change",
    date: "2012-09-19",
    year: 2012,
    tags: ["Original", "Parody"],
    embedUrl: "https://www.youtube.com/embed/XNBP18nrRdw",
    thumbnailUrl: "/thumbnails/iPhone5ATallerChange.webp",
    description: "Apple iPhone 5 Parody Ad",
    longDescription: `With the announcement of Apple’s newest, biggest iPhone in the fall of 2012, we decided to create a video parodying this groundbreaking “feature”.

The result was a comically long iPhone which resonated with tech savvy viewers. While Apple spends years designing their tech, we worked feverishly for six days to concept and film as many clever uses as we could for a three-foot long smart phone. The video collected millions of views in the first couple days after its release, and has since climbed well over the 15 million view mark. This, due in part to the thousands of shares across Facebook and Twitter, in addition to much acclaim from websites including [Adweek](https://www.adweek.com/creativity/iphone-5s-giant-screen-truly-game-changer-143963/), [Gizmodo](https://gizmodo.com/maybe-the-iphone-5-isnt-tall-enough-5944870), [Huffington Post](https://www.huffingtonpost.co.uk/2012/09/26/satire-iphone-5-a-taller-challenge-spoof_n_1915516.html), and [CNET](https://www.cnet.com/culture/iphone-5-spoof-video-features-a-795-percent-taller-screen/).`,
    
credits: [
    { role: "Director", name: "Alexander JL Theoharis" },
    { role: "Producer", name: "Danielle Sparks" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Visual Effects", name: "David Hudson, Steven Hudson" },
    { role: "Prop Designer", name: "Liz Leo, Satabdi Chakrabarti" },
    { role: "Digital Strategy", name: "Tara Theoharis" },
  ],

  cast: [
    { role: "Talking Heads", name: "Forest Gibson, Alexander JL Theoharis, Christopher Parker" },
    { role: "Model Actors", name: "Liz Leo, Bobak Ferdowski, Tara Theoharis, Cedric Harris, David Zimmermann, Steven Hudson, David Hudson, Kevin Lane, Satabdi Chakrabarti, Danielle Sparks" },
  ],
  },
  {
    slug: "imac-touch",
    title: "Apple iMac Touch",
    date: "2012-10-26",
    year: 2012,
    tags: ["Original", "Parody"],
    embedUrl: "https://www.youtube.com/embed/EaW6IiWKHAk",
    thumbnailUrl: "/thumbnails/LaughPong/iMacTouch.webp",
    description: "Apple Parody Ad",
    longDescription: `In late 2012, rumors were swirling that Apple might be working on a touch-sensitive version of the iMac. When it wasn’t announced, we decided to jump on the unfortunate news and imagine what an ad for it might have looked like. The video garnered over 2 million views, and caught the attention of tech blogs such as [Gizmodo](https://gizmodo.com/this-ipad-mini-ad-parody-is-actually-better-than-the-or-5957719).`,
    
credits: [
    { role: "Concept", name: "Forest Gibson" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Music", name: "David Zimmermann" },
    { role: "Hand model", name: "David Zimmermann" },
    { name: "(Okay, we get it.)" },
  ],
  },
  {
    title: "Surface vs iPad",
    slug: makeSlug("Surface vs iPad"),
    date: "2012-11-06",
    year: 2012,
    tags: ["Original", "Parody"],
    embedUrl: "https://www.youtube.com/embed/4d5xkULjc50",
    thumbnailUrl: "/thumbnails/LaughPong/SurfaceVsiPad.webp",
    description: "Parody of Apple’s iPad Mini Ad",
    longDescription: `Whose side are you on? When Apple announced the iPad Mini in late 2012, they “changed everything” yet again, adding a new competitor to the ongoing tablet war.

We decided to stir that melting pot by creating a commercial parody which juxtaposed the iPad against the tougher, more versatile Microsoft Surface. Having launched the video mere days after the announcement, it garnered over 2 million views in less than a week and was featured across the web, by publications such as [Gizmodo](https://gizmodo.com/what-an-ipad-and-microsoft-surface-parody-commercial-lo-5958347) and [Huffington Post](https://www.huffpost.com/entry/ipad-vs-surface-video-parody-microsoft-apple_n_2089458).`,
    
credits: [
    { role: "Concept", name: "Forest Gibson" },
    { role: "Editor", name: "Steven Hudson" },
    { role: "Visual Effects", name: "Steven Hudson" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Sound Design", name: "David Zimmermann" },
  ],
  },
  {
    title: "Cool Things to Find",
    slug: makeSlug("Cool Things to Find"),
    date: "2012-11-28",
    year: 2012,
    tags: ["Original", "Parody"],
    embedUrl: "https://www.youtube.com/embed/bIy6w_iubSs",
    thumbnailUrl: "/thumbnails/Cinesaurus/CoolThingsToFind.webp",
    description: "Mars Curiosity Rover Musical Parody",
    longDescription: `Lost socks? Twinkies? Facehuggers?! When NASA landed their Curiosity rover on Mars in 2012, the world’s attention was focused on what the new rover might find on the red planet.

To drive traffic to science press and news, we created a music video highlighting the mystery of possibilities for Curiosity’s potential discoveries. Playing off the popular '[Dumb Ways to Die](https://www.youtube.com/watch?v=IJNR2EpS0jw)' PSA, our team flexed its animation skills and clever songwriting to hook viewers. Working with NASA’s social media teams to drum up news, we had one goal: keep people curious for the ongoing mission.`,
    
credits: [
    { role: "Lyrics", name: "Forest Gibson, Steven Hudson, David Hudson, Rob Whitehead" },
    { role: "Character Designs", name: "Sarah Hiraki" },
    { role: "Animation", name: "David Hudson, Steven Hudson" },
    { role: "Executive Producer", name: "Forest Gibson" },
    { role: "Lead Vocals", name: "Cara Peacock" },
    { role: "Backup Vocals", name: "David Hudson, Steven Hudson, David Zimmermann" },
    { name: "Based on 'Dumb Ways to Die'" },
    { name: "Instrumental Track: Tangerine Kitty"}
  ],
  },
  {
    title: "Harvest Moon: The Gritty Reboot",
    slug: makeSlug("Harvest Moon: The Gritty Reboot"),
    date: "2013-03-06",
    year: 2013,
    tags: ["Original", "Parody", "Gritty Reboots"],
    embedUrl: "https://www.youtube.com/embed/wIzXBSZgu8M",
    thumbnailUrl: "/thumbnails/GrittyReboots/HarvestMoon.webp",
    description: "Live-action Harvest Moon parody trailer",
    longDescription: `At the start of 2012, the Gritty Reboots YouTube channel was born. For our maiden voyage, we decided to embark upon the world of the farm simulation role-playing game, Harvest Moon.

For this production, we made a trek across the Puget Sound to the quaint, idealistic town of Port Gamble. This location provided us with instant production value, and was a perfect representation of the fictional Mineral Town from Harvest Moon. Loosely based on the trailer for the film Promised Land, we crafted a story that follows Pete on his greatest journey yet. Will he keep the farm and make his Grandfather proud? Will he find the right girl? Will he farm all of the things? The video was well-received with over 800,000 views and was shared by many online.

Curious how we were able to film with miniature cows? Want to see our rendition of the “Harlem Shake,” or a jar of milk shatter at 300 frames per second? If so, be sure to check out our Behind the Scenes and Before & After videos, showcasing the entire production from start to finish.`,

  credits: [
    { role: "Writers", name: "Forest Gibson, Sarah Hiraki" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Editors", name: "Forest Gibson, David Zimmermann" },
    { role: "Visual Effects", name: "Steven Hudson" },
    { role: "Color Grading", name: "David Hudson" },
    { role: "Sound Design", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Grip", name: "Kevin Lane" },
    { name: "Special Thanks to Levi Mykel Gable, GG Ranch" },
  ],

  cast: [
    { role: "Pete", name: "Forest Gibson" },
    { role: "Love Interests & Harvest Goddess", name: "Sarah Hiraki" },
    { role: "Mayor", name: "Steven Hudson" },
    { role: "Rival", name: "David Hudson" },
    { role: "Party Extras", name: "Christine Logan, Isaiah Buchanan, Alix Jones, Jenna Rae Sitton, Molly McIsaac, Evan Tomchick, Jillian Eaker, Philip Duggan, Terra Joy Armstrong Duggan, Zac Cohn, Danielle Sparks, Chris Parker" },
  ],

  videoSections: [
    {
      title: "Behind The Scenes",
      videos: [
        {
          embedUrl: "https://www.youtube.com/embed/wSGXzNv4G-0",
        },
      ],
    },
    {
      title: "Visual Effects: Before & After",
      videos: [
        {
          embedUrl: "https://www.youtube.com/embed/5BS40536tww",
        },
      ],
    },
  ],
  },
  {
    title: "Pokémon Snap: The Gritty Reboot",
    slug: makeSlug("Pokémon Snap: The Gritty Reboot"),
    date: "2013-03-20",
    year: 2013,
    tags: ["Original", "Parody", "Gritty Reboots"],
    embedUrl: "https://www.youtube.com/embed/SMgGowLgb_0",
    thumbnailUrl: "/thumbnails/GrittyReboots/PokemonSnap.webp",
    description: "Live-action Pokémon Snap parody trailer",
    longDescription: `Gotta capture ’em all! In celebration of the 20th anniversary and 3D theatrical re-release of Jurassic Park in 2013, we paid tribute by recreating the trailer with a unique twist.

Drawing parallels between Nintendo 64’s one-off Pokémon photo-taking bonanza, Pokémon Snap, and John Hammond’s clone-dinosaur park, our trailer follows Todd Snap’s dramatic and dangerous trek through the wilds of Professor Oak’s Pokémon Island. Shooting on location and bringing 3D characters to life, all while paying homage to one of our favorite films of all time made this project a ton a fun. The video was viewed well over a million times, and was shared by the likes of Kotaku, Mashable, and Nintendo Life.

Below, take a look at the behind the scenes process of how we did our best to transform forested PNW landscapes into the tropical terrain of Isla Nublar/Pokémon Island, check out the final video before and after our visual effects treatment, and compare it to the Jurassic Park 3D re-release trailer, which we intentionally mirrored nearly shot-for-shot.`,

  credits: [
    { role: "Writers", name: "David Hudson, David Zimmermann" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Visual Effects", name: "Steven Hudson, David Hudson, David Zimmermann" },
    { role: "Music", name: "Jacob Rosok, Bryan Nguyen" },
    { role: "Music Editing", name: "David Zimmermann" },
    { role: "Sound Design", name: "David Zimmermann" },
  ],

  cast: [
    { role: "Todd Snap", name: "Forest Gibson" },
    { role: "Professor Oak", name: "Steven Hudson" },
  ],

  videoSections: [
    {
      title: "Behind The Scenes",
      videos: [
        {
          embedUrl: "https://www.youtube.com/embed/_Haxq8odJZg",
        },
      ],
    },
    {
      title: "Visual Effects: Before & After",
      videos: [
        {
          embedUrl: "https://www.youtube.com/embed/_SAvcCA-j_U",
        },
      ],
    },
    {
      title: "Jurassic Park vs. Pokémon Snap",
      videos: [
        {
          embedUrl: "https://www.youtube.com/embed/_iR-OLFY9-4",
        },
      ],
    },
  ],
  },
  {
    title: "Calvin and Hobbes: The Gritty Reboot",
    slug: makeSlug("Calvin and Hobbes: The Gritty Reboot"),
    date: "2013-04-03",
    year: 2013,
    tags: ["Original", "Parody", "Gritty Reboots"],
    embedUrl: "https://www.youtube.com/embed/17qyaXOFZXg",
    thumbnailUrl: "/thumbnails/GrittyReboots/CalvinAndHobbes.webp",
    description: "Live-action Calvin & Hobbes parody trailer",
    longDescription: `Imagination is a powerful force. Since 1985, Bill Watterson has captured the hearts of children and adults alike with his daily comic strip, Calvin & Hobbes. Being lifelong fans ourselves, we couldn’t pass up the chance to bring this beloved series to life as a gritty, live-action trailer.

A cross between Inception and Fight Club, we wanted to bring Calvin’s wild imagination to life, while adding in a healthy dose of psychological thrills. The video has well over a million views and was featured by publications including [The Hollywood Reporter](https://www.hollywoodreporter.com/movies/movie-features/calvin-hobbes-spoof-movie-trailer-433011/), [Buzzfeed](https://www.buzzfeed.com/brodiemanthe1st/gritty-reboots-does-calvin-hobbes-2txu), [HuffPost](https://www.huffpost.com/entry/gritty-calvin-and-hobbes_n_3019289), and [The Mary Sue](https://www.themarysue.com/calvin-hobbes-gritty-reboot/).

Below, check out the process of what it took to bring the fantastical world of Calvin & Hobbes to life! From casting a young Calvin, to trekking through the snowy mountains, to scaring children in a life-size Hobbes costume, this production was full of memorable moments.`,

  credits: [
    { role: "Writer", name: "Dave Spear" },
    { role: "Co-Directors", name: "David Hudson, Forest Gibson, Dave Spear" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Visual Effects", name: "Steven Hudson, David Hudson, David Zimmermann" },
    { role: "Music", name: "Johnny Stark" },
    { role: "Color Grading", name: "David Hudson" },
    { role: "Sound Design", name: "David Zimmermann" },
    { role: "Costume Design", name: "Mary Paulusma" },
    { role: "PAs", name: "Jordan Brokaw, Kevin Lane" },
  ],

  cast: [
    { role: "Calvin", name: "David Hudson" },
    { role: "Voice of Hobbes", name: "Chris Parker" },
    { role: "Hobbes", name: "Steven Hudson" },
    { role: "Susie Derkins", name: "Meagan Naser" },
    { role: "Therapist", name: "Forest Gibson" },
    { role: "Calvin’s Parents", name: "Mike Hudson, Carolyn Hudson" },
  ],

  videoSections: [
    {
      title: "Behind The Scenes",
      videos: [
        {
          embedUrl: "https://www.youtube.com/embed/lOJNVvZn-Z8",
        },
      ],
    },
    {
      title: "Visual Effects: Before & After",
      videos: [
        {
          embedUrl: "https://www.youtube.com/embed/2SQfcAIvEbE",
        },
      ],
    },
  ],
  },
  {
    title: "Goodnight Moon: The Gritty Reboot",
    slug: makeSlug("Goodnight Moon: The Gritty Reboot"),
    date: "2013-04-17",
    year: 2013,
    tags: ["Original", "Parody", "Gritty Reboots"],
    embedUrl: "https://www.youtube.com/embed/6LIr2DdiXmA",
    thumbnailUrl: "/thumbnails/GrittyReboots/GoodnightMoon.webp",
    description: "Live-action 'Goodnight Moon' parody trailer",
    longDescription: `It is safe to say that most people born in the last 70 years likely are familiar with the famous children’s story, Goodnight Moon. Having been raised on it ourselves, we decided it was the perfect subject for the “gritty reboot” treatment.

While revisiting this classic story by Margaret Wise Brown, we realized it’s actually quite disturbing when viewed through a different lens (read: our sick minds). We ran with this, giving every detail a terror-rific twist, including a unique ending sure to leave the viewer breathless. The video garnered nearly 200k+ views, and received praise from publications such as [BoingBoing](https://boingboing.net/2013/04/17/goodnight-moon-as-a-horror-mov.html), [GeekTyrant](https://geektyrant.com/news/2013/4/18/dark-gritty-trailer-for-the-classic-bedtime-story-goodnight.html), and [Mashable](https://mashable.com/archive/scary-goodnight-moon#CbOrdB05YEqQ).

The story of Goodnight Moon takes place in a large, green room. Fortunately, a friend of ours had a large, green living room, which he let us transform into the spooky set seen in the piece. Check out our Behind the Scenes process, as well as a Before & After video comparing the final product with the locked cut before any visual effects or color grading were incorporated.`,

  credits: [
    { role: "Writer", name: "Forest Gibson" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Visual Effects", name: "Steven Hudson" },
    { role: "Color Grading", name: "David Hudson" },
    { role: "Sound Design", name: "David Zimmermann" },
    { name: "Special Thanks to Garr Godfrey" },
  ],

  cast: [
    { role: "Man", name: "Forest Gibson" },
    { role: "Old Lady", name: "Kristina Horner" },
    { role: "Creepy Child Voice", name: "Satabdi Chakrabarti" },
  ],

  videoSections: [
    {
      title: "Behind The Scenes",
      videos: [
        {
          embedUrl: "https://www.youtube.com/embed/RqPWuh0ZYew",
        },
      ],
    },
    {
      title: "Visual Effects: Before & After",
      videos: [
        {
          embedUrl: "https://www.youtube.com/embed/2x5EE6BRO0M",
        },
      ],
    },
  ],
  },
  {
    title: "PBS Avengers",
    slug: makeSlug("PBS Avengers"),
    date: "2013-05-01",
    year: 2013,
    tags: ["Original", "Parody", "Gritty Reboots"],
    embedUrl: "https://www.youtube.com/embed/baQBTWd49j4",
    thumbnailUrl: "/thumbnails/GrittyReboots/PBSAvengers.webp",
    description: "Live-action PBS 'Avengers' parody trailer",
    longDescription: `Avengers, assemble! Being big supporters of STEM, we consider it a blessing to have grown up watching educational shows like Mister Rogers’ Neighborhood and Bill Nye the Science Guy.

However, in a world where “reality” entertainment is winning the war for our attention, we need those heroes more than ever. Super men, women (and puppets), like those actualized by PBS, who inspire young generations to be scientists, teachers, and artists. So, we produced an Avengers-style trailer, combining the powers of Fred Rogers, Bill Nye, Carl Sagan and Bob Ross to defeat reality television once and for all. The video accumulated nearly a million views, and was shared by the likes Neil deGrasse Tyson and Bill Nye himself.

Want to keep on learning? Check out our Behind the Scenes and Before & After videos to see our own journey into getting the OGs of education back together. Spanning a week of shooting, one of our most exciting days on set was working with a cast of a dozen kindergarteners and being able to actually introduce many of them to these educational TV icons for the first time.`,

  credits: [
    { role: "Writers", name: "David Hudson, Steven Hudson" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Visual Effects", name: "Steven Hudson, David Hudson" },
    { role: "Sound Design", name: "David Zimmermann" },
    { role: "Grip", name: "Kevin Lane" },
  ],

  cast: [
    { role: "Carl Sagan", name: "Steven Hudson" },
    { role: "Mr. Rogers", name: "David Zimmermann" },
    { role: "Bob Ross", name: "Jordan Brokaw" },
    { role: "Bill Nye", name: "David Hudson" },
    { role: "Reality TV Executive", name: "Christopher Parker" },
    { role: "Reality TV Assistant", name: "Satabdi Chakrabarti" },
    { role: "Reality TV Receptionist", name: "Karli Zimmermann" },
    { role: "Mr. McFeely", name: "Demitrios Feredinos" },
    { role: "Zombie Couple", name: "David Rittenhouse, Lizeth RIttenhouse" },
    { role: "News Anchor 1", name: "Sarah Hudson" },
    { role: "News Anchor 2", name: "Eric Shellan" },
    { role: "News Anchor 3", name: "Meagan Karimi-Naser" },
    { role: "TV Personality", name: "Jacob Rosok" },
    { role: "Young Students", name: "Renee, Dylan, Ethan, Gabriella, Asia, Drew, Kyle" },
    { role: "Office Extras", name: "Johnny Sor, Evan Tomchick" },
  ],

  videoSections: [
    {
      title: "Behind The Scenes",
      videos: [
        {
          embedUrl: "https://www.youtube.com/embed/KaRMHJVdOHo",
        },
      ],
    },
    {
      title: "Visual Effects: Before & After",
      videos: [
        {
          embedUrl: "https://www.youtube.com/embed/h8_xnl6Tt-g",
        },
      ],
    },
  ],
  },
  {
    title: "Warplanes: The Gritty Reboot",
    slug: makeSlug("Warplanes: The Gritty Reboot"),
    date: "2013-10-22",
    year: 2013,
    tags: ["Original", "Parody", "Gritty Reboots"],
    embedUrl: "https://www.youtube.com/embed/AG3gEv4UQfY",
    thumbnailUrl: "/thumbnails/GrittyReboots/Warplanes.webp",
    description: "Animated parody of Disney's 'Planes'",
    longDescription: `Cars, boats, planes… Disney has shown us the lives of many anthropomorphic vehicles, but what about the ones on the front lines? Warplanes follows these lovable killing machines as they involuntarily battle before meeting their own grim fates.

Following the release of Video Copilot’s JetStrike 3D model pack, we utilitzed their revolutionary After Effects plug-in, Element3D, to create this gritty, Pixar-style animated movie trailer. Recognized by the Video Copilot founder himself, Andrew Kramer, the video also earned press from popular film blogs such as [First Showing](Following the release of Video Copilot’s JetStrike 3D model pack, we utilitzed their revolutionary After Effects plug-in, Element3D, to create this gritty, Pixar-style animated movie trailer. Recognized by the Video Copilot founder himself, Andrew Kramer, the video also earned press from popular film blogs such as First Showing and /Film.) and [/Film](https://www.slashfilm.com/528617/lol-disneys-warplanes/).`,
    
credits: [
    { role: "Writers", name: "David Hudson, Steven Hudson" },
    { role: "3D Animation", name: "Steven Hudson, David Hudson" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Sound Design", name: "David Zimmermann" },
  ],
  
  cast: [
    { role: "Air Force One", name: "Alexander JL Theoharis" },
    { role: "Jets", name: "Steven Hudson, Eia Waltzer, Chris Parker, David Zimmermann, Dave Spear, David Hudson" },
    { role: "Disney Narrator", name: "Chris Parker" },
  ],
  },
  {
    title: "The Shootout",
    slug: makeSlug("The Shootout"),
    date: "2013-11-19",
    year: 2013,
    tags: ["Original"],
    embedUrl: "https://www.youtube.com/embed/9hxGwaIXWq8",
    thumbnailUrl: "/thumbnails/Cinesaurus/MOGA-TheShootout.webp",
    description: "MOGA Video Contest Entry",
    longDescription: `Game On. Anywhere. When MOGA, a company known for its mobile gaming controllers, announced a big video contest in late 2013—with the grand prize of a RED Scarlet camera package—our interest was piqued. After finding out that it would be judged by some of our favorite YouTubers, including Freddie Wong of [RocketJump](https://www.youtube.com/user/freddiew), Sam and Niko of [Corridor Digital](https://www.youtube.com/user/CorridorDigital), and Ryan Connolly of [Film Riot](https://www.youtube.com/user/filmriot), we were compelled to enter.

The prompt for the 60-sec video was to highlight the pains of mobile gaming. After quickly developing a concept, we decided to shoot the whole thing in our greenscreen studio over one crazy weekend. Running on fumes after days of intense post-production and limited sleep, we submitted our video, only to find out a week later that we had been selected as the Most Creative (Judges’ Pick) winners!

Check out this Before & After look at the video that won us a RED Scarlet camera! As you’ll see, the video was entirely comprised of greenscreen footage, so everything had to be composited to create the environment and competitive atmosphere we were going for.`,

accolades: [
    "Winner of MOGA Video Contest",
  ],  

credits: [
    { role: "Concept", name: "David Zimmermann, Steven Hudson" },
    { role: "Director", name: "Steven Hudson" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Visual Effects", name: "David Hudson, Steven Hudson" },
    { role: "Sound Design", name: "David Zimmermann" },
  ],

  cast: [
    { role: "Kicker", name: "Steve Minor" },
    { role: "Keeper", name: "Tony Sakounthong" },
    { role: "Announcer", name: "Steven Hudson" },
    { role: "Background Extras", name: "David Zimmermann, David Hudson" },
  ],

  videoSections: [
    {
      title: "Visual Effects: Before & After",
      videos: [
        {
          embedUrl: "https://www.youtube.com/embed/COqCdbWNIKc",
        },
      ],
    },
  ],
  },
  {
    title: "YouTube Rewind 2013",
    slug: makeSlug("YouTube Rewind 2013"),
    date: "2013-12-11",
    year: 2013,
    tags: ["Original", "Parody"],
    embedUrl: "https://www.youtube.com/embed/H7jtC8vjXw8",
    thumbnailUrl: "/thumbnails/YouTubeRewind_2013.webp",
    description: "YouTube's 2013 Recap",
    longDescription: `What does 2013 say? YouTube answered this question by releasing a mashup of popular music, movies, memes, and more that made up the year.

To take this already massive video to the next level, we were brought on board to handle all the visual effects. This challenge entailed immense composites including keying, set extension, wire removal, particle effects, cgi animation, and lots of camera tracking. The video has been seen over 130 million times, and continues garnering views to this day.

Take a look at the results of our post-production process in this Before and After featurette:`,

credits: [
    { role: "Produced by", name: "Portal A" },
    { role: "Director", name: "Kai Hasson" },
    { role: "Executive Producers", name: "Nate Houghteling, Zach Blume" },
    { role: "Production Services", name: "Sweatpants Media" },
    { role: "Lead Editor", name: "Sari Tracht" },
    { role: "Visual Effects", name: "Gabe Conroy, David Hudson, Steven Hudson, David Zimmermann" },
    { role: "Director of Photography", name: "Alex Jacobs" },
    { role: "Gaffer", name: "Evan Cox" },
    { role: "Location Managers", name: "Al Sumian, Jeff Morris" },
    { role: "Strategy & Creative Support", name: "Drew Glover, Jessica Schiffman" },
  ],

  videoSections: [
    {
      title: "Visual Effects: Before & After",
      videos: [
        {
          embedUrl: "https://www.youtube.com/embed/ZpVWqnuzs3M",
        },
      ],
    },
  ],
  },
  {
    title: "Adventure Time: The Gritty Reboot",
    slug: makeSlug("Adventure Time: The Gritty Reboot"),
    date: "2014-10-07",
    year: 2014,
    tags: ["Original", "Parody", "Gritty Reboots"],
    embedUrl: "https://www.youtube.com/embed/0ciStOdCGnk",
    thumbnailUrl: "/thumbnails/GrittyReboots/AdventureTime.webp",
    description: "Live-action Adventure Time parody trailer",
    longDescription: `Algebraic! Since its debut in 2010, Adventure Time charmed over three million teenagers (and adults, who are we kidding) as the most imaginative cartoon around.

With the sixth season coming out, we transformed the fantastical cartoon world of Jake the Dog and Finn the Human into a live-action post-apocalyptic landscape. Stylized after Cormac McCarthy’s The Road, our movie trailer blended melancholic cinematography with CG animation to add a new dimension to the hand-drawn world. Our creative visuals and dark storytelling were greeted with immense press and accolades from Adventure Time creator Pendleton Ward, Frederator Studios, and over two million fans.

Take a look at our production and post-production process in this Behind-the-Scenes featurette. It chronicles our entire journey in crafting our post-apocalyptic Land of Ooo — from shooting on location in an abandoned Concrete factory to the creation of our entirely motion-captured CG character, Jake the Dog.`,

  accoladesLabel: "Press",
  accolades: [
    "“You’ve all seen this live-action trailer from Gritty Reboots, right? It’s crazy good.”\n– [Pendleton Ward](https://pwcartoons.frederator.com/post/99429147531/adventure-time-the-movie-youve-all-seen-this), Creator of Adventure Time",
    "“'Adventure Time' Transformed Into Epic Live-Action Movie Trailer That's Fit For Hollywood”\n– [HuffPost](https://www.huffpost.com/entry/adventure-time-movie-trailer-gritty-reboots_n_5951468)",
  ],  

credits: [
    { role: "Produced by", name: "Cinesaurus" },
    { role: "Director", name: "Gabe Conroy" },
    { role: "Concept", name: "David Hudson, Steven Hudson" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Production Manager", name: "Robert Bojorquez" },
    { role: "Music & Sound", name: "Hexany Audio" },
    { role: "Visual Effects", name: "Gabe Conroy, Steven Hudson, David Hudson, David Zimmermann" },
    { role: "Prop Designer", name: "Nick Nielsen" },
    { role: "Production Assistant", name: "Shelby Allman" },
  ],

  cast: [
    { role: "Finn", name: "Joe Homes" },
    { role: "Princess Bubblegum", name: "Kristina Horner" },
    { role: "Jake (Voice)", name: "Chris Parker" },
    { role: "Jake Mo-Cap", name: "Forest Gibson" },
    { role: "Ice King", name: "Steven Hudson" },
    { role: "Lemongrab (Voice)", name: "Brad Walker" },
    { role: "Lemongrab (Body)", name: "Robert Bojorquez" },
    { role: "B-MO", name: "Kiri Callaghan" },
    { role: "Flame Princess", name: "Brigid Lohman" },
    { role: "Marceline", name: "Tara Theoharis" },
  ],

  videoSections: [
    {
      title: "Behind The Scenes",
      videos: [
        {
          embedUrl: "https://www.youtube.com/embed/_UMeyOvMDEY",
        },
      ],
    },
    {
      title: "Visual Effects: Before & After",
      videos: [
        {
          embedUrl: "https://www.youtube.com/embed/rkvk6Snk4NE",
        },
      ],
    },
  ],
  },
  {
    title: "If You Give A Mouse A Cookie: The Gritty Reboot",
    slug: makeSlug("If You Give A Mouse A Cookie: The Gritty Reboot"),
    date: "2014-10-22",
    year: 2014,
    tags: ["Original", "Parody", "Gritty Reboots"],
    embedUrl: "https://www.youtube.com/embed/RQcD6xps4M4",
    thumbnailUrl: "/thumbnails/GrittyReboots/IYGAMAC.webp",
    description: "Live-action 'If You Give a Mouse a Cookie' parody trailer",
    longDescription: `If you give a mouse a cookie, he's going to ask for a glass of milk.  When you give him the milk, it's too late...

Creating a twisted adaptation of the children's story "If You Give A Mouse A Cookie" by Laura Numeroff was a ton of fun. We had just purchased a DJI Ronin (3-axis camera gimbal stabilizer) only days before this shoot, and decided to give ourselves a crash course… by designing a video that would consist of one continuous take. After hours of rehearsal on set, we knocked out the shoot over the course of the day, finishing just before sundown.  If you’ve ever held a fully-kitted gimbal stabilizer, you’ll know the pain of shooting with one for an entire day. Thankfully, this project won us a Best Cinematography award at the Bleedingham horror film festival… which helped offset the back pain. :D

Check out the behind the scenes video for an in-depth look on how we pulled this all together:`,

accolades: [
    "Best Cinematography – Bleedingham Horror Film Festival",
  ],  

credits: [
    { role: "Concept", name: "Kyle Reardon" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Visual Effects", name: "Gabe Conroy" },
    { role: "Color Grading", name: "David Zimmermann" },
    { role: "Sound Design", name: "David Zimmermann" },
    { role: "Music", name: "Dylan Griffin Kane" },
    { role: "Special Effects & Prosthetics", name: "Justin Hammond" },
    { role: "Props & Set Decoration", name: "Jenn Godwin" },
    { role: "Production Design", name: "Shelby Allman" },
  ],

  cast: [
    { role: "The Tortured", name: "Dylan Griffin Kane" },
    { role: "The Mouse", name: "Meagan Karimi-Naser" },
    { role: "Cookie Cougher", name: "Steven Hudson" },
    { role: "Milk Spitter", name: "Jesse LaTourette" },
    { role: "Hair Snipper", name: "David Hudson" },
    { name: "Special thanks to Mike Kennard for letting us use his beautiful home—The Eldridge Estate!" },
  ],

  videoSections: [
    {
      title: "Behind The Scenes",
      videos: [
        {
          embedUrl: "https://www.youtube.com/embed/3p0j6z8w2Bg",
        },
      ],
    },
  ],
  },
  {
    title: "McCarthy Music | The Illuminating Piano",
    slug: makeSlug("McCarthy Music | The Illuminating Piano"),
    date: "2015-01-20",
    year: 2015,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://www.youtube.com/embed/x6lKRce0qww",
    thumbnailUrl: "/thumbnails/TheIlluminatingPiano.webp",
    description: "McCarthy Music",
    longDescription: `When we were brought on to produce this musical spot for McCarthy Music, it was music to our ears. Piano keys that glow to aid the learning of a new player are the the hallmark of the McCarthy Illuminating Piano.

The first time we saw the piano, we knew we wanted to create a magical world for the piano to exist in as a visual parallel for the feeling of discovering music for the first time. Our story follows a young girl searching through a mysterious house with an otherworldly atmosphere created by our production’s lighting crew. Our commercial has nearly 400,000 views and was reported on by many publications including [GeekWire](https://www.geekwire.com/2015/new-illuminating-piano-works-ipad-windows-light-way-aspiring-pianists/), [LA Weekly](https://www.laweekly.com/the-mccarthy-music-illuminated-piano-a-shortcut-to-keyboard-stardom/), [Mashable](https://mashable.com/archive/illuminating-piano-hands-on#OPCQ.zDnYmqj), and the TODAY Show.`,

credits: [
    { role: "Produced by", name: "Cinesaurus" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],
},
  {
    title: "YouTube Rewind 2015",
    slug: makeSlug("YouTube Rewind 2015"),
    date: "2015-12-09",
    year: 2015,
    tags: ["Original", "Parody"],
    embedUrl: "https://www.youtube.com/embed/KK9bwTlAvgo",
    thumbnailUrl: "/thumbnails/YouTubeRewind_2015.webp",
    description: "YouTube's 2015 Recap",
    longDescription: `Another year, another YouTube Rewind. 2015 was our most ambitious yet, adding motion capture to our tool belt, in addition to the usual motion graphics and compositing required for the project.

We were tasked with crafting a visual language for the act of ‘rewinding’, physically moving back through moments in the video. Another key effect was a reference to the viral video “[Love Has No Labels](https://www.youtube.com/watch?v=PnDgZuGIhHs),” featuring an x-ray screen. To achieve the skeletons on the x-ray screens, we digitally captured the motion of a performance artist to recreate the dance moves of various YouTube personalities.

This video garnered over 140 million views, and always gets a nice boost with each successive year’s YouTube Rewind.`,

credits: [
    { role: "Produced by", name: "Portal A" },
    { role: "Director", name: "Kai Hasson" },
    { role: "Executive Producers", name: "Nate Houghteling, Zach Blume, Kai Hasson" },
    { role: "Director of Photography", name: "Alex Jacobs" },
    { role: "Lead Editor", name: "Arturo Morales" },
    { role: "DJ/Music Producer", name: "The Hood Internet" },
    { name: "Featuring an Original Remix by Avicii" },
    { role: "Visual Effects", name: "Steven Hudson, David Hudson, David Zimmermann, Gabe Conroy" },
    { role: "MoCap Cleanup, Animation & Compositing", name: "Kial Natale" },
    { role: "MoCap Performance Artist", name: "Adara Toop" },
    { role: "Roto & Rig Removal", name: "Ablaze VFX" },
  ],
},
  {
    title: "How Girls Will Change The World",
    slug: makeSlug("How Girls Will Change The World"),
    date: "2016-03-09",
    year: 2016,
    tags: ["Original", "Corporate"],
    embedUrl: "https://www.youtube.com/embed/qNRxpL7Zov4",
    thumbnailUrl: "/thumbnails/Cinesaurus/MONAFoundation.webp",
    description: "PSA for Women in #STEM",
    longDescription: `Women are 50% of the population, but make up only 24% of the STEM workforce in the United States. This needs to change. Support organizations that support girls and women. Here are a few that we love:

• [Girls Who Code](https://girlswhocode.com/) \n • [Women@NASA](https://www.nasa.gov/women-at-nasa/) \n • [StemBox](https://mystembox.com/)

Produced by [Cinesaurus](https://www.cinesaurus.com/) \n \n Special thanks to [Northwest Grip](https://northwestgrip.com/)`,

credits: [
    { role: "Director", name: "Gabe Conroy" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Writers", name: "Gabe Conroy, David Hudson" },
    { role: "Production Manager", name: "Robert Bojorquez" },
    { role: "Costume Designer", name: "Brigid Lohman" },
    { role: "Hair & Makeup Artist", name: "Meagan Karimi-Naser" },
    { role: "Gaffer", name: "Casey Schmidt" },
    { role: "Editor", name: "Gabe Conroy" },
    { role: "Audio Mixing", name: "David Zimmermann" },
    { role: "Visual Effects", name: "Gabe Conroy" },
    { role: "Motion Graphics", name: "Steven Hudson" },
  ],

  cast: [
    { role: "Future world changer (Actress)", name: "Nina Makino-Hillman" },
  ],
  },
  {
    title: "TYR Avictor Omaha Nights Limited Edition",
    slug: makeSlug("TYR Avictor Omaha Nights Limited Edition"),
    date: "2016-04-13",
    year: 2016,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://www.youtube.com/embed/bkLcidp878Q",
    thumbnailUrl: "/thumbnails/TYR/TYR_OmahaNights.webp",
    description: "TYR Sport",
    longDescription: `The newest print to hit the world’s stage is here. Meet the Limited Edition Omaha Nights print, part of TYR Sport’s celebrated Avictor collection. \n \n Born out of a collaboration between the industry’s top experts and the world’s most elite swimmers, the Avictor Omaha Nights Jammer is TYR’s fastest, most innovative technical swimsuit. Showcasing an unprecedented combination of advanced features, this FINA-approved technical suit maximizes performance and gives athletes the ultimate advantage over their rivals.

Hydrosphere Technology works in harmony with a swimmer’s natural abilities in order to optimize body positioning in the water. Ground-breaking technology causes water to surround the fabric of the swimsuit, creating a visible hydrospheric effect. As a result of maximized positioning, drag is reduced and speed and efficiency are boosted. Designed with proprietary Speed Dry Fabrication, the Avictor Omaha Nights swimsuit rapidly repels water and minimizes dry time, providing compression even when saturated for extended periods of time. Rigorously tested to ensure athletes experience a lightweight, snug fit at all times, the Avictor Omaha Nights swimsuit performs throughout long meets and multiple swims, providing unmatched comfort and support.

High-tech Super Flex Bonding allows fully bonded seams to conform to the swimmer’s body and provide a durable, 360 degree stretch. The result is a precisely fitted, ultra-compressive swimsuit that maximizes core stabilization and overall support while allowing 100% natural movement and mobility.`,

credits: [
    { role: "Produced by", name: "TYR Sport" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],
  },
  {
    title: "Access Magic: Eldritch Moon",
    slug: makeSlug("Access Magic: Eldritch Moon"),
    date: "2016-06-20",
    year: 2016,
    tags: ["Corporate", "Series"],
    embedUrl: "https://www.youtube.com/embed/7TN0b8ik0B8",
    thumbnailUrl: "/thumbnails/WotC/AM_EldritchMoon.webp",
    description: "Magic: The Gathering talk show series",
    longDescriptionAfterMedia: true,
    longDescription: `Joining forces with Wizards of the Coast once again, we were tasked with designing and producing a three-episode talk show to introduce fans to the story, lore, and design of the Eldritch Moon expansion for Magic: The Gathering.

In the weeks leading up to production, we worked quickly to design and build a set that supported the Eldritch Moon brand guide, coordinated with the series’ host Jimmy Wong, and assembled a creative crew to efficiently bring our plan to reality.

In the end, we delivered and localized a successful series that was seen over one million times in over ten different markets worldwide.`,

credits: [
    { role: "Producers", name: "Steven Hudson, David Hudson" },
    { role: "Director", name: "Alexander JL Theoharis" },
    { role: "Production Manager", name: "Steven Hudson" },
    { role: "Camera", name: "David Zimmermann, Tylor Jones, Domenic Barbero" },
    { role: "Grip and Lighting", name: "Casey Schmidt" },
    { role: "Set Design", name: "Regan MacStravic" },
    { role: "Wardrobe", name: "Brigid Lohman" },
    { role: "Makeup", name: "Lisa Boehm" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Motion & Title Design", name: "Steven Hudson" },
  ],

  cast: [
    { role: "Host", name: "Jimmy Wong" },
    { role: "Episode One Guest", name: "Mark Rosewater" },
    { role: "Episode Two Guests", name: "Jenna Helland and Jeremy Jarvis" },
    { role: "Episode Three Guests", name: "Mark Winters and James Wyatt" },
  ],

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://www.youtube.com/embed/7TN0b8ik0B8",

    videos: [
      {
        title: "Access Magic: Eldritch Moon, Episode 1",
        embedUrl: "https://www.youtube.com/embed/7TN0b8ik0B8",
      },
      {
        title: "Access Magic: Eldritch Moon, Episode 2",
        embedUrl: "https://www.youtube.com/embed/yrDbp30NeZk",
      },
      {
        title: "Access Magic: Eldritch Moon, Episode 3",
        embedUrl: "https://www.youtube.com/embed/fK9v0IOxCdI",
      },
      {
        title: "Eldritch Moon Video Guide",
        embedUrl: "https://www.youtube.com/embed/etWcgXBqbt4",
      },
    ],
  },
  {
    title: "The Making of the TYR Avictor",
    slug: makeSlug("The Making of the TYR Avictor"),
    date: "2016-08-11",
    year: 2016,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://www.youtube.com/embed/gKv9KzhNMU8",
    thumbnailUrl: "/thumbnails/TYR/TYR_AvictorTransparency.webp",
    description: "About the TYR Avictor",
    longDescription: `Born out of a collaboration between the industry’s top experts and the world’s most elite swimmers, the Avictor showcases state-of-the-art advancement at every level. With cutting-edge hydrosphere technology, proprietary speed dry fabrication and super flex bonding, the FINA-approved suit maximizes performance, while giving athletes the ultimate advantage over their competition.

Take a behind the scenes look at how TYR’s history making suit is made.`,

credits: [
    { role: "Produced by", name: "TYR Sport" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],
},
  {
    title: "YouTube Rewind 2016",
    slug: makeSlug("YouTube Rewind 2016"),
    date: "2016-12-07",
    year: 2016,
    tags: ["Original", "Parody"],
    embedUrl: "https://www.youtube.com/embed/_GuOjXYl5ew",
    thumbnailUrl: "/thumbnails/YouTubeRewind_2016.webp",
    description: "YouTube's 2016 Recap",
    longDescription: `YouTube Rewind is a project that gets perpetually bigger in scope and view count year after year. With over 110 visual effects shots, 2016’s video included creating a [PPAP](https://www.youtube.com/watch?v=Ct6BUPvE2sM) tunnel, a collage of beat ‘em up video game effects, a massive Olympics running track, and transforming a London train yard into a construction scene a la Fifth Harmony’s “[Work from Home](https://www.youtube.com/watch?v=5GL9JoH4Sws).” Oh, and not to mention a little touch-up beautification of everyone’s (come on, admit it) favorite star, Dwayne “The Rock” Johnson.

YouTube Rewind 2016 quickly earned its place as the fastest growing YouTube video of all time — amassing over 50 million views in its first day, and is currently sitting pretty with nearly 250 million views.`,

credits: [
    { role: "Produced by", name: "Portal A" },
    { role: "Director", name: "Kai Hasson" },
    { role: "Lead Editor", name: "Arturo Morales" },
    { role: "On-set VFX Supervisor", name: "Gabe Conroy" },
    { role: "Lead Visual Effects", name: "Gabe Conroy" },
    { role: "Visual Effects", name: "David Hudson, David Zimmermann, Steven Hudson" },
    { role: "VFX Art & Design", name: "Ebae Kim" },
    { role: "Roto & Rig Removal", name: "Ablaze VFX" },
  ],
  },
  {
    title: "Access Magic: Amonkhet",
    slug: makeSlug("Access Magic: Amonkhet"),
    date: "2017-04-17",
    year: 2017,
    tags: ["Corporate", "Series"],
    embedUrl: "https://www.youtube.com/embed/dmWFxMn2nUY",
    thumbnailUrl: "/thumbnails/WotC/AM_Amonkhet.webp",
    description: "Magic: The Gathering talk show series",
    longDescriptionAfterMedia: true,
    longDescription: `In this series, Maria Bartholdi sits down with Magic: The Gathering brand managers, game designers, and community managers to discuss the Five Trials of the Gods: a series of tasks performed on the plane of Amonkhet that each inhabitant of the world aspires to complete.

The original uploads have since been made private, but they can still be found on other localized channels such as [Magic: The Gathering Brasil](https://www.youtube.com/@MagictheGatheringBrasiloficial) (seen above).`,

credits: [
    { role: "Producers", name: "Steven Hudson, David Hudson" },
    { role: "Director", name: "Alexander JL Theoharis" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Production Manager", name: "Steven Hudson" },
    { role: "Grip and Lighting", name: "Casey Schmidt" },
    { role: "Wardrobe", name: "Brigid Lohman" },
    { role: "Makeup", name: "Lisa Boehm" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Motion & Title Design", name: "Steven Hudson" },
  ],

  cast: [
    { role: "Host", name: "Maria Barthouldi" },
    { role: "Episode One Guest", name: "April Glass" },
    { role: "Episode Two Guest", name: "Gavin Verhey" },
    { role: "Episode Three Guest", name: "Matt Danner" },
    { role: "Episode Four Guest", name: "Michael Yichao" },
    { role: "Episode Five Guest", name: "Nate Price" },
  ],

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://www.youtube.com/embed/dmWFxMn2nUY",

    videos: [
      {
        title: "Access Magic: Amonkhet - Episode 1",
        embedUrl: "https://www.youtube.com/embed/dmWFxMn2nUY",
      },
      {
        title: "Access Magic: Amonkhet - Episode 2",
        embedUrl: "https://www.youtube.com/embed/8EjCEoGmmkQ",
      },
      {
        title: "Access Magic: Amonkhet - Episode 3",
        embedUrl: "https://www.youtube.com/embed/5nH04Heuvrg",
      },
      {
        title: "Access Magic: Amonkhet - Episode 4",
        embedUrl: "https://www.youtube.com/embed/rp7L5h2Uy50",
      },
      {
        title: "Access Magic: Amonkhet - Episode 5",
        embedUrl: "https://www.youtube.com/embed/CM38heZj4Dw",
      },
    ],
  },
  {
    title: "Magic: The Gathering Announcements",
    slug: makeSlug("Magic: The Gathering Announcements"),
    date: "2017-06-14",
    year: 2017,
    tags: ["Corporate"],
    embedUrl: "https://www.youtube.com/embed/Ygs0kHhczXo",
    thumbnailUrl: "/thumbnails/WotC/MTG_Announcements.webp",
    description: "Behind-the-scenes at Wizards of the Coast",
    longDescription: `Community Manager, Nate, takes you inside the walls of Wizards of the Coast to find out some of the exciting things coming for Magic in the next year. \n \n Learn more about the changes at [magic.wizards.com](http://magic.wizards.com).`,

credits: [
    { role: "Produced by", name: "Cinesaurus" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],
},
  {
    title: "Deloitte | Data and Analytics Matter",
    slug: makeSlug("Deloitte | Data and Analytics Matter"),
    date: "2017-07-27",
    year: 2017,
    tags: ["Corporate", "Series"],
    embedUrl: "https://www.youtube.com/embed/ul7F6-mvTZM",
    thumbnailUrl: "/thumbnails/Deloitte_AIM.webp",
    description: "Deloitte: Analytics and Information Management series",
    longDescriptionAfterMedia: true,
    longDescription: `The right data can change everything. Deloitte helps clients design, build and run insight driven organizations by maximizing the value of data. As every company becomes a technology company, Deloitte approached us to create a video series to describe their Analytics & Information Management to new clients. Spanning months of production, we scripted and produced this nine video series, comprising over 30 minutes of content which brought us around the country to interview the Principals, Partners, and Directors leading each of the eight core offerings.

To learn more about their Analytics and Information Management (AIM) services, visit [Deloitte’s website](https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/services/deloitte-analytics.html) or watch the rest of the videos above!`,

credits: [
    { role: "Director", name: "David Hudson" },
    { role: "Writers", name: "Daniel Brockley, David Hudson" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Production Manager", name: "Liz Leo, Danielle Sparks" },
    { role: "Gaffer", name: "Casey Schmidt" },
    { role: "Location Sound", name: "Tara Muñoz, Matt McComb" },
    { role: "Art Director", name: "Ebae Kim" },
    { role: "Design", name: "Eric Trieu, Ebae Kim, Steven Hudson, David Hudson" },
    { role: "Motion Graphics", name: "Steven Hudson, David Hudson, Liz Leo, Ebae Kim, Gabe Conroy" },
    { role: "Editors", name: "David Zimmermann, David Hudson, Steven Hudson, Gabe Conroy" },
    { role: "Sound Design", name: "Hexany Audio" },
  ],

  cast: [
    { role: "Hosts", name: "Hosts: Lowell Deo, Heather Dudenbostel" },
  ],

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://www.youtube.com/embed/ul7F6-mvTZM",

    videos: [
      {
        title: "Analytics and Information Management",
        embedUrl: "https://www.youtube.com/embed/ul7F6-mvTZM",
      },
      {
        title: "AIM - Shape Strategy",
        embedUrl: "https://www.youtube.com/embed/M_9RkgzAzmk",
      },
      {
        title: "AIM - Manage Data",
        embedUrl: "https://www.youtube.com/embed/b-7y_UxHSyE",
      },
      {
        title: "AIM - Deliver Information",
        embedUrl: "https://www.youtube.com/embed/8JRRdR1Fk54",
      },
      {
        title: "AIM - Improve Performance",
        embedUrl: "https://www.youtube.com/embed/D1WipozsNqc",
      },
      {
        title: "AIM - Optimize Insights",
        embedUrl: "https://www.youtube.com/embed/Z0gEPeWTMTA",
      },
      {
        title: "AIM - Amplify Intelligence",
        embedUrl: "https://www.youtube.com/embed/hjagmS5XISs",
      },
      {
        title: "AIM - Build Capabilities",
        embedUrl: "https://www.youtube.com/embed/5p0nH_tith8",
      },
      {
        title: "AIM - Manage Environments",
        embedUrl: "https://www.youtube.com/embed/-IptTY8V6Es",
      },
    ],
  },
  {
    title: "SpaceX Launch You Up",
    slug: makeSlug("SpaceX Launch You Up"),
    date: "2017-11-01",
    year: 2017,
    tags: ["Original", "Parody", "Music Video"],
    embedUrl: "https://www.youtube.com/embed/NY7N02eZGoQ",
    thumbnailUrl: "/thumbnails/Cinesaurus/SpaceXLaunchYouUp.webp",
    description: "Parody of ‘Uptown Funk’ by Mark Ronson feat. Bruno Mars",
    longDescription: `Launch and land and relaunch! Back in April of 2015, SpaceX was attempting to land their Falcon 9 rocket for the first time. Naturally, we jumped at the chance to help celebrate this historical day. If you’re a fan of SpaceX—or Elon Musk and his ventures in general—pay close attention to the lyrics… there’s some deep references in there.

Years later, SpaceX has dozens of landings under their belt, but we have it on good authority that “SpaceX Launch You Up” is still the control room anthem on launch days…`,

accolades: [
    "Winner of 2015 Telly Award (Online Video | Humor)",
    "Nominee of 2015 Geekie Award (Best Music Video)",
  ],  

credits: [
    { role: "Director", name: "Gabe Conroy" },
    { role: "Creative Director", name: "Steven Hudson" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Writers", name: "David Hudson, Steven Hudson, David Zimmernann, Gabe Conroy, Robert Bojorquez" },
    { role: "Production Manager", name: "Robert Bojorquez" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Audio Mixing", name: "Art Johnson" },
    { role: "Visual Effects", name: "Gabe Conroy, David Hudson, Steven Hudson" },
    { role: "Additional VFX", name: "David Zimmermann" },
    { role: "Costume Designer", name: "Brigid Lohman" },
  ],

  cast: [
    { role: "Vocals", name: "Art Johnson" },
    { role: "Bruno Mars", name: "Buddy Waddington" },
    { role: "Dancers", name: "Selena Annis, Brad Walker, Sarah Hudson, Mikey Dela Cruz" },
    { role: "Gwynne Shotwell", name: "Makenzie Greenblatt" },
    { role: "Tom Mueller", name: "Drew Barth" },
    { role: "Elon Musk", name: "David Hudson" },
  ],
  },
  {
    title: "WPN: How to Prepare for an Event",
    slug: makeSlug("WPN: How to Prepare for an Event"),
    date: "2017-11-13",
    year: 2017,
    tags: ["Corporate", "Series"],
    embedUrl: "https://www.youtube.com/embed/xkiMRSdrRUw",
    thumbnailUrl: "/thumbnails/WotC/WPN_HowToPrepareForAnEvent.webp",
    description: "Wizards Play Network series",
    longDescriptionAfterMedia: true,
    longDescription: `In this two-part series, Jamison Sacks of Common Ground Games shares how he prepares his store for an event. See if he’s doing something you could be and give it a try at your store!

In part two, Jamison shares tips and best practices that help him run seamless events for his players.`,

credits: [
    { role: "Produced by", name: "Cinesaurus" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Production Assistant", name: "Jordan Brokaw" },
    { role: "Editor", name: "David Zimmermann" },
  ],

  cast: [
    { role: "Host", name: "Jamison Sacks" },
    { name: "Special thanks to Common Ground Games for letting us film at your store!" },
  ],

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://www.youtube.com/embed/xkiMRSdrRUw",

    videos: [
      {
        title: "Jamison Sacks: How We Prepare for an Event",
        embedUrl: "https://www.youtube.com/embed/xkiMRSdrRUw",
      },
      {
        title: "How to Keep Your Events Moving",
        embedUrl: "https://www.youtube.com/embed/wVuJRXsM100",
      },
    ],
  },
  {
    title: "HaptX | Realistic Touch for Virtual Reality",
    slug: makeSlug("Realistic Touch for Virtual Reality"),
    date: "2017-11-19",
    year: 2017,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://www.youtube.com/embed/2C2_kbjtjRU",
    thumbnailUrl: "/thumbnails/HaptX/HaptX_LaunchVideo.webp",
    description: "Virtual Reality Haptic Gloves",
    longDescription: `HaptX Gloves™ are the world’s first industrial-grade haptic wearable. It’s the only glove to deliver high-fidelity tactile feedback and up to five pounds of force feedback per finger. HaptX Glove’s sub-millimeter accuracy makes it the most precise motion-tracked glove and enables enterprise users to achieve unprecedented realism and productivity in virtual environments.

Video features fully-functional HaptX Glove prototype.`,

credits: [
    { role: "Director", name: "Gabe Conroy" },
    { role: "Producer", name: "Liz Leo" },
    { role: "Line Producer", name: "David Hudson" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "1st Assist Camera", name: "Trix Woodard II" },
    { role: "Gaffer", name: "Casey Schmidt" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Visual Effects", name: "Gabe Conroy" },
    { role: "Motion Graphics and Additional VFX", name: "Steven Hudson" },
    { role: "Sound Design", name: "Chris Burgess" },
    { role: "Original Music Composition", name: "Andy Forsberg" },
  ],

  cast: [
    { name: "Talent provided by Big Fish Talent NW" },
    { role: "Talent", name: "Morgan Pope, Jason Sanford, Lowell Deo" },
  ],
},
  {
    title: "TYR Active - Fit For It All",
    slug: makeSlug("TYR Active - Fit For It All"),
    date: "2018-02-01",
    year: 2018,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://www.youtube.com/embed/U65nqQv9hb8",
    thumbnailUrl: "/thumbnails/TYR/TYR_Active_FitForItAll.webp",
    description: "TYR Activewear",
    longDescription: `With an exclusive offering of support categories, the New TYR Active Spring/Summer 2018 Collection has just what you need to go from a dry land workout to the beach for a swim, plus everywhere in between. So no matter the day, you’ll be fit for it all. #TYRActive #FitForItAll`,

credits: [
    { role: "Produced by", name: "TYR Sport" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Drone Operator", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],
},
  {
    title: "TYR Active - Find Your Support Story",
    slug: makeSlug("TYR Active - Find Your Support Story"),
    date: "2018-03-27",
    year: 2018,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://www.youtube.com/embed/FPSVy32DnE4",
    thumbnailUrl: "/thumbnails/TYR/TYR_Active_FindYourSupportStory.webp",
    description: "TYR Activewear",
    longDescription: `With three distinctly designed support categories, our light, medium and maximum offerings of sports bras and tanks empower women to feel comfortable and strong, while still enjoying a range of prints, colors and fits. So whether you’re hitting the gym or running down the beach, you can focus on what really matters: you.`,

credits: [
    { role: "Produced by", name: "TYR Sport" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Drone Operator", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],
},
  {
    title: "Katerra | K90: Reimagining the Construction Site",
    slug: makeSlug("K90: Reimagining the Construction Site"),
    date: "2019-02-21",
    year: 2019,
    tags: ["Corporate", "Series"],
    embedUrl: "https://player.vimeo.com/video/814737300?h=643aa535a2",
    thumbnailUrl: "/thumbnails/Katerra/Katerra_K90.webp",
    description: "Katerra's construction innovation",
    longDescription: `K90 is Katerra's first project working to shorten the typical construction time—from foundation to finish—down to 90 days, using a combination of manufacturing, technology tools, innovative products, and process innovation to reach this goal.`,

credits: [
    { role: "Produced by", name: "Goodthings" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Drone Operator", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],
},
  {
    title: "Microsoft Unboxed",
    slug: makeSlug("Microsoft Unboxed"),
    date: "2019-07-18",
    year: 2019,
    tags: ["Corporate", "Series"],
    embedUrl: "https://www.youtube.com/embed/FkwRgd4Dz9E",
    thumbnailUrl: "/thumbnails/Microsoft/MicrosoftUnboxed.webp",
    description: "Microsoft Unboxed video series",
    longDescriptionAfterMedia: true,
    longDescription: `Microsoft Unboxed is a video series that takes viewers behind the scenes of Microsoft product launches and events. From unboxing the latest Surface devices to exploring the features of Windows 10, each episode provides an in-depth look at the technology and innovation that Microsoft is known for.`,

credits: [
    { role: "Produced by", name: "Microsoft" },
    { role: "Editor", name: "David Zimmermann" },
  ],

  cast: [
    { role: "Hosts", name: "Sonia Dara, Colleen O’Brien" },
  ],

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://www.youtube.com/embed/FkwRgd4Dz9E",

    videos: [
      {
        title: "Microsoft Unboxed: Xbox at E3 (Ep. 19)",
        embedUrl: "https://www.youtube.com/embed/FkwRgd4Dz9E",
      },
      {
        title: "Microsoft Unboxed: Pride (Ep. 20)",
        embedUrl: "https://www.youtube.com/embed/dWl9f0Tueno",
      },
      {
        title: "Microsoft Unboxed: Surface Hub 2S (Ep. 21)",
        embedUrl: "https://www.youtube.com/embed/qJ8rk1n1_8I",
      },
      {
        title: "Microsoft Unboxed: Startups (Ep. 23)",
        embedUrl: "https://www.youtube.com/embed/I2hxKfL1koU",
      },
      {
        title: "Microsoft Unboxed: Hacking 101 (Ep. 24)",
        embedUrl: "https://www.youtube.com/embed/-_bDqJ7QftY",
      },
    ],
  },
  {
    title: "Katerra | CLT Technology",
    slug: makeSlug("Katerra | CLT Technology"),
    date: "2019-12-06",
    year: 2019,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://player.vimeo.com/video/814737065?h=ece081b78c",
    thumbnailUrl: "/thumbnails/Katerra/Katerra_CLTTechnology.webp",
    description: "Katerra's CLT technology",
    longDescription: `Mass timber represents the future of high-performance building technology as a new market for building materials that are safe, efficient, economical, and environmentally friendly. \n \n Katerra is leading the way with CLT (cross-laminated timber) technology, which allows for the prefabrication of large wood panels that can be used for walls, floors, and roofs. These panels are made by gluing together layers of lumber at right angles to create a strong and stable material that is both lightweight and durable.`,

credits: [
    { role: "Produced by", name: "Goodthings" },
    { role: "Cinematography", name: "David Zimmermann" },
    { role: "Drone Operator", name: "David Zimmermann" },
  ],
},
  {
    title: "TYR Active: Spring Summer 2020",
    slug: makeSlug("TYR Active: Spring Summer 2020"),
    date: "2020-02-04",
    year: 2020,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://www.youtube.com/embed/hE3fBDvq8wY",
    thumbnailUrl: "/thumbnails/TYR/TYR_Active_SpringSummer.webp",
    description: "TYR Activewear",
    longDescription: `Find your perfect fit with the all new #TYRActive Spring Summer 2020 collection. With light, medium and maximum support, TYR has the style and comfort you need for all your aquatic adventures. #FitForItAll.  Shop now at [tyr.com](https://www.tyr.com).`,

credits: [
    { role: "Produced by", name: "TYR Sport" },
    { role: "Cinematography", name: "David Zimmermann" },
    { role: "Drone Operator", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],
},
  {
    title: "Katerra | Project Profile Series: The M",
    slug: makeSlug("Katerra | Project Profile Series: The M"),
    date: "2020-03-30",
    year: 2020,
    tags: ["Corporate", "Series"],
    embedUrl: "https://player.vimeo.com/video/814736718?h=a3afef5cbb",
    thumbnailUrl: "/thumbnails/Katerra/Katerra_TheM.webp",
    description: "Katerra's The M project",
    longDescription: `Part of Katerra's Project Profile Series, The M is a multifamily residential project located in Seattle, Washington. The M utilizes Katerra's innovative construction technologies to deliver high-quality housing in a fraction of the time of traditional construction methods.`,

credits: [
    { role: "Produced by", name: "Goodthings" },
    { role: "Cinematography", name: "David Zimmermann" },
    { role: "Drone Operator", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],
  },
  {
    title: "Microsoft | House of Lilac",
    slug: makeSlug("Microsoft | House of Lilac"),
    date: "2021-09-16",
    year: 2021,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://www.youtube.com/embed/N-x5lCtXdGg",
    thumbnailUrl: "/thumbnails/Microsoft/HouseOfLilac.webp",
    description: "Microsoft 365 for Small Business",
    longDescription: `In Miami, Florida, a florist turned to Microsoft 365 to keep her small business up and running even in the midst of the pandemic.`,

credits: [
    { role: "Produced by", name: "Trifilm" },
    { role: "Editor", name: "David Zimmermann" },
  ],
  },
  {
    title: "Tomb Raider Cookbook",
    slug: makeSlug("Tomb Raider Cookbook"),
    date: "2021-10-19",
    year: 2021,
    tags: ["Original", "Commercial"],
    embedUrl: "https://www.tiktok.com/embed/v2/7020801425298967814",
    heroAspectRatio: 177.78,
    thumbnailUrl: "/thumbnails/GH_TombRaiderCookbook.webp",
    description: "Tomb Raider Cookbook release",
    longDescription: `Filmed and edited this short piece for the release of The Geeky Hostess’ official Tomb Raider cookbook!`,

credits: [
    { role: "Produced by", name: "Rebel Clef Studios" },
    { role: "Cinematography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],
  },
  {
    title: "Reviver | RPlate: A Digital License Plate",
    slug: makeSlug("Reviver | RPlate: A Digital License Plate"),
    date: "2022-02-17",
    year: 2022,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://www.youtube.com/embed/MxZipt0eejY",
    thumbnailUrl: "/thumbnails/Reviver_RPlate_01.webp",
    description: "Reviver's RPlate digital license plate series",
    longDescriptionAfterMedia: true,
    longDescription: `Video 1: Modern licensing for modern living. Learn how the digital license plate from REVIVER is ready to transform your vehicle ownership and driving experience. [reviver.com](http://reviver.com)
    
    Video 2: Get to know the RPlate, the digital license plate from Reviver. New style and convenience for your driving experience. Learn more and buy yours at [reviver.com/rplate](http://reviver.com/rplate)
    
    Video 3: Reviver is partnering with a growing network of auto dealer partners as resellers of our unique digital license plate technology. Learn more about our dealer partner program and how digital license plates can help to grow auto dealer revenue and ignite sales conversations with their customers. [reviver.com/dealership](http://reviver.com/dealership)
    
    Video 4: Remotely manage vehicle registration for your entire commercial fleet. Eliminate physical tags forever. Find out how RFleet from Reviver can streamline your fleet operations. [reviver.com/rfleet](http://reviver.com/rfleet)`,

credits: [
    { role: "Produced by", name: "Goodthings" },
    { role: "Cinematography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Motion Graphics", name: "Goodthings" },
  ],

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://www.youtube.com/embed/MxZipt0eejY",

    videos: [
      {
        title: "Modern Licensing for Modern Living",
        embedUrl: "https://www.youtube.com/embed/MxZipt0eejY",
      },
      {
        title: "Meet the RPlate Digital License Plate",
        embedUrl: "https://www.youtube.com/embed/FHei1GKGyOE",
      },
      {
        title: "Auto Dealership Reseller Program",
        embedUrl: "https://www.youtube.com/embed/fNeaE-q_fjo",
      },
      {
        title: "Digital Registration for Commercial Vehicle Fleets",
        embedUrl: "https://www.youtube.com/embed/Mf0rX5OQ57o",
      },
    ],
  },
  {
    title: "HaptX | Gloves G1",
    slug: makeSlug("HaptX | Gloves G1"),
    date: "2022-10-25",
    year: 2022,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://player.vimeo.com/video/762515445",
    thumbnailUrl: "/thumbnails/HaptX/HaptX_GlovesG1.webp",
    description: "Virtual Reality Haptic Gloves",
    longDescription: `Now available for pre-orders at haptx.com: the industry's most advanced haptic gloves, priced for scalable deployment. HaptX has engineered HaptX Gloves G1 with the features most requested by customers, including improved ergonomics, multiple sizes, wireless mobility, new and improved haptic functionality, and multiplayer collaboration, all priced as low as $4,500 per pair – a fraction of the cost of the award-winning HaptX Gloves DK2.`,

credits: [
    { role: "Produced by", name: "Cinesaurus, Rebel Clef Studios" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Gaffer", name: "Matt Lowe" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Visual Effects", name: "David Hudson, David Zimmermann" },
    { role: "Motion Graphics", name: "David Hudson" },
  ],

  cast: [
    { role: "Talent", name: "Bijan Mitchell, Obadiah Freeman" },
  ],
},
  {
    title: "We Are Roseburg - Roanoke Valley Lumber",
    slug: makeSlug("We Are Roseburg - Roanoke Valley Lumber"),
    date: "2023-01-25",
    year: 2023,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://player.vimeo.com/video/854431155?h=230e8d94d1",
    thumbnailUrl: "/thumbnails/Roseburg_RVL.webp",
    description: "Roseburg Forest Products lumber mill project",
    longDescription: `Roseburg Forest Products is proud to partner with Roanoke Valley Lumber to bring high-quality, sustainable lumber products to the Southeast region. With a shared commitment to excellence and customer satisfaction, this partnership strengthens Roseburg's presence in the market and provides customers with access to a wide range of premium lumber solutions.`,

credits: [
    { role: "Produced by", name: "Goodthings" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Motion Graphics", name: "Goodthings" },
  ],
  },
  {
    title: "TYR x Vellner | LE CXT-1 Trainers",
    slug: makeSlug("TYR x Vellner | LE CXT-1 Trainers"),
    date: "2023-02-01",
    year: 2023,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://www.youtube.com/embed/24RJd_wjv6g",
    thumbnailUrl: "/thumbnails/TYR/TYRxVellner.webp",
    description: "TYR Sport and Pat Vellner Collaboration",
    longDescription: `TYR is proud to announce a collaboration one year in the making. The Limited Edition Pat Vellner CXT-1 Trainers combine the construction of the TYR CXT-1 you’ve come to trust with design elements inspired by eight-time Crossfit® Games competitor, Pat Vellner.`,

credits: [
    { role: "Produced by", name: "Rebel Clef Studios" },
    { role: "Cinematography", name: "David Zimmermann" },
    { role: "Drone Operator", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],
  },
  {
    title: "TYR Sport | New Suits",
    slug: makeSlug("TYR Sport | New Suits"),
    date: "2023-07-17",
    year: 2023,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://www.instagram.com/reel/Cuz0gdrIz5h/embed",
    thumbnailUrl: "/thumbnails/TYR/TYR_NewSuits.webp",
    description: "TYR Sport racing suits for Spring/Summer 2023",
    longDescriptionAfterMedia: true,
    longDescription: `TYR Sport is excited to introduce two new racing suits for Spring/Summer 2023. The Venzo and Avictor racing suits are designed for competitive swimmers looking to enhance their performance in the pool. Both suits feature TYR's innovative technology and high-quality materials, providing swimmers with the support and comfort they need to excel.`,

credits: [
    { role: "Produced by", name: "TYR Sport" },
    { role: "Cinematography", name: "David Zimmermann" },
  ],
    videosLayout: "grid-two",
    videos: [
      {
        title: "TYR Sport | New Suits - Blue",
        embedUrl: "https://www.instagram.com/reel/Cuz0gdrIz5h/embed",
      },
      {
        title: "TYR Sport | New Suits - Purple",
        embedUrl: "https://www.instagram.com/reel/Cu2C_kFoQWm/embed",
      },
    ],
  },
  {
    title: "ConXtech",
    slug: makeSlug("ConXtech"),
    date: "2023-09-20",
    year: 2023,
    tags: ["Corporate", "Series"],
    thumbnailUrl: "/thumbnails/ConXtech/ConXtech_Series.webp",
    description: "ConXtech construction innovation series",
    longDescriptionAfterMedia: true,
    longDescription: `With ConXtech, the construction industry can predictably build faster, safer and more efficiently.

ConXtech is a new kind of company in the building industry, delivering a comprehensive suite of products and services for our clients.`,

credits: [
    { role: "Produced by", name: "Goodthings" },
    { role: "Cinematography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Motion Graphics", name: "Goodthings" },
  ],

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://player.vimeo.com/video/759688574?h=b394cd2552",

    videos: [
      {
        title: "ConXtech - Simply Faster",
        embedUrl: "https://player.vimeo.com/video/759688574?h=b394cd2552",
        thumbnailUrl: "/thumbnails/ConXtech/ConXtech_01.jpg",
      },
      {
        title: "We Are ConXtech – Anthem",
        embedUrl: "https://player.vimeo.com/video/759687975?h=58cb4ec0e5",
        thumbnailUrl: "/thumbnails/ConXtech/ConXtech_02.jpg",
      },
      {
        title: "ConXtech – Kaiser Everett",
        embedUrl: "https://player.vimeo.com/video/797819649?h=e8a08bbbae",
        thumbnailUrl: "/thumbnails/ConXtech/ConXtech_03.jpg",
      },
      {
        title: "ConXtech, Merck, DPR – NJ",
        embedUrl: "https://player.vimeo.com/video/806059526?h=a754ae49c3",
        thumbnailUrl: "/thumbnails/ConXtech/ConXtech_04.jpg",
      },
      {
        title: "ConXtech - Industrial Overview",
        embedUrl: "https://player.vimeo.com/video/761248557?h=2708f10a0d",
        thumbnailUrl: "/thumbnails/ConXtech/ConXtech_05.jpg",
      },
    ],
  },
  {
    title: "KOVA | Anthem 2023",
    slug: makeSlug("KOVA | Anthem 2023"),
    date: "2023-09-29",
    year: 2023,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://player.vimeo.com/video/807180499?h=2aee903f51",
    thumbnailUrl: "/thumbnails/KOVA_Anthem2023.webp",
    description: "KOVA building products",
    longDescription: `Go. Build. We’ll take care of the rest. KOVA’s focus is creating integrated building products and systems in simplified forms that are meant to last. With purposeful material choices and supply-chain efficiencies, they offer great design at the best possible prices.`,

credits: [
    { role: "Produced by", name: "Goodthings" },
    { role: "Cinematography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Motion Graphics", name: "Goodthings" },
  ],
},
  {
    title: "Carbitex | GearFlex",
    slug: makeSlug("Carbitex | GearFlex"),
    date: "2023-10-08",
    year: 2023,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://www.youtube.com/embed/Xq-2VatEUCI",
    thumbnailUrl: "/thumbnails/Carbitex_GearFlex.webp",
    description: "Carbitex GearFlex adaptive shoe technology",
    longDescription: `What if a shoe could change stiffness in response to human movement? Carbitex GearFlex is able to do just that.`,

credits: [
    { role: "Produced by", name: "Goodthings" },
    { role: "Cinematography (supplemental)", name: "David Zimmermann" },
    { role: "Editing & Motion Graphics", name: "Goodthings" },
  ],
},
  {
    title: "Railcraft | Anthem",
    slug: makeSlug("Railcraft | Anthem"),
    date: "2023-10-18",
    year: 2023,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://player.vimeo.com/video/878848126?h=c92278bac8",
    thumbnailUrl: "/thumbnails/Railcraft_Anthem.webp",
    description: "Railcraft aluminum railing systems",
    longDescription: `Railcraft manufactures Topless Glass, Picket and Glass Panel Aluminum railing systems for commercial and residential builders in North America.
    
    [railcraft.com](http://railcraft.com)`,

credits: [
    { role: "Produced by", name: "Goodthings" },
    { role: "Cinematography", name: "David Zimmermann" },
    { role: "Drone Operator", name: "David Zimmermann" },
    { role: "Editing & Motion Graphics", name: "Goodthings" },
    { role: "Assistant Editing", name: "David Zimmermann" },
  ],
},
  {
    title: "Lighthouse | Innovation Approach",
    slug: makeSlug("Lighthouse | Innovation Approach"),
    date: "2024-01-15",
    year: 2024,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://player.vimeo.com/video/905415506?h=e53eeb1590",
    thumbnailUrl: "/thumbnails/Lighthouse_InnovationApproach.webp",
    description: "Lighthouse innovation consulting",
    longDescription: `Lighthouse is a global innovation consultancy that helps organizations unlock growth by creating new products, services, and business models. With a focus on human-centered design and agile methodologies, Lighthouse partners with clients to navigate complex challenges and drive meaningful change.`,

credits: [
    { role: "Produced by", name: "Goodthings" },
    { role: "Cinematography (Interviews)", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Motion Graphics", name: "Goodthings" },
  ],
  },
  {
    title: "TYR Sport | USA Anthem 2024",
    slug: makeSlug("TYR Sport | USA Anthem 2024"),
    date: "2024-04-15",
    year: 2024,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://www.youtube.com/embed/8dHEmr7GByU",
    thumbnailUrl: "/thumbnails/TYR/TYR_USAAnthem2024.webp",
    description: "TYR Sport USA ad for the 2024 Olympics",
    longDescription: `TYR is proud to unveil the new USA Swimming national team uniform, a symbol of unity, strength, and commitment to excellence. With an innovative design and unrivaled quality, this uniform embodies the spirit of champions. TYR, always in front.`,

credits: [
    { role: "Produced by", name: "TYR Sport" },
    { role: "Cinematography (Supplemental)", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],
},
  {
    title: "HaptX | Gloves G1 Update",
    slug: makeSlug("HaptX | HaptX Gloves G1 Update"),
    date: "2024-06-18",
    year: 2024,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://www.youtube.com/embed/huNdXJuDMUQ",
    thumbnailUrl: "/thumbnails/HaptX/HaptX_GlovesG12024.webp",
    description: "Virtual Reality Haptic Gloves",
    longDescription: `With hundreds of air-powered actuators, HaptX Gloves G1 is the most realistic system for touch feedback for VR and robotics. HaptX's unique haptic glove technology revolutionizes workforce training. G1 adds realism to VR training programs that build muscle memory for skilled workers. G1 also improves the teleoperation and training of humanoid robots.
    
    HaptX's SDK offers Unreal Engine and Unity plugins, ROS 1 and 2 nodes, multiuser collaboration, and improved vibrotactile feedback for a variety of micro-textures.
    
    G1 is now shipping, so visit [haptx.com](https://www.haptx.com/) to bring realistic touch to your VR or robotic application.`,

credits: [
    { role: "Produced by", name: "Cinesaurus, Rebel Clef Studios" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Gaffer", name: "Matt Lowe" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Visual Effects", name: "David Hudson, David Zimmermann" },
    { role: "Motion Graphics", name: "David Hudson" },
  ],

  cast: [
    { role: "Talent", name: "Bijan Mitchell, Obadiah Freeman, Maria Pandolfo" },
  ],
},
  {
    title: "Sentric ADAS | Anthem",
    slug: makeSlug("Sentric ADAS | Anthem"),
    date: "2024-11-18",
    year: 2024,
    tags: ["Corporate", "Series", "Commercial"],
    embedUrl: "https://player.vimeo.com/video/1008218393?h=506fc6b6d7",
    thumbnailUrl: "/thumbnails/Sentric/Sentric_ADAS.webp",
    description: "Sentric ADAS calibration solutions",
    longDescriptionAfterMedia: true,
    longDescription: `Sentric provides OE-equivalent ADAS calibration designed to support your business. Sentric is built on 70+ years of OE factory end-of-assembly line experience at Burke Porter and its vehicle testing technology, which is used on nearly 80% of automobiles manufactured in the United States.

    [sentricadas.com](http://sentricadas.com)`,

credits: [
    { role: "Produced by", name: "Goodthings" },
    { role: "Cinematography", name: "David Zimmermann" },
    { role: "Drone Operator", name: "David Zimmermann" },
    { role: "Editing & Motion Graphics", name: "Goodthings" },
    { role: "Assistant Editing", name: "David Zimmermann" },
  ],

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://player.vimeo.com/video/1008218393?h=506fc6b6d7",

    videos: [
      {
        title: "Sentric Anthem",
        embedUrl: "https://player.vimeo.com/video/1008218393?h=506fc6b6d7",
        thumbnailUrl: "/thumbnails/Sentric/Sentric_01.jpg",
      },
      {
        title: "Why Sentric",
        embedUrl: "https://player.vimeo.com/video/1050151271?h=7a407af2df",
        thumbnailUrl: "/thumbnails/Sentric/Sentric_02.jpg",
      },
    ],
  },
  {
    title: "Tomorrow Fridge",
    slug: makeSlug("Tomorrow Fridge"),
    date: "2024-12-10",
    year: 2024,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://www.youtube.com/embed/vwv7Wf_KP-A",
    thumbnailUrl: "/thumbnails/TomorrowFridge.webp",
    description: "The fridge of tomorrow",
    longDescription: `What if we could reduce food waste and prevent your freshest foods from aging? What if we reimagined the refrigerator?`,

credits: [
    { role: "Produced by", name: "Rebel Clef Studios" },
    { role: "Cinematography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],
  },
  {
    title: "Story Renovations | Anthem",
    slug: makeSlug("Story Renovations | Anthem"),
    date: "2024-12-17",
    year: 2024,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://player.vimeo.com/video/1040210311?h=d09985cb21",
    thumbnailUrl: "/thumbnails/Story_Anthem.webp",
    description: "Story Renovations building services",
    longDescription: `An integrated design build studio serving the greater Denver, Phoenix and Scottsdale areas.
    
    [storyrenovations.com](https://storyrenovations.com/)`,

credits: [
    { role: "Produced by", name: "Goodthings" },
    { role: "Cinematography", name: "David Zimmermann" },
    { role: "Drone Operator", name: "David Zimmermann" },
    { role: "Editing & Motion Graphics", name: "Goodthings" },
    { role: "Assistant Editing", name: "David Zimmermann" },
  ],
  },
  {
    title: "Seattle Aquarium | Preparing For Your Field Trip",
    slug: makeSlug("Seattle Aquarium | Preparing For Your Field Trip"),
    date: "2025-02-28",
    year: 2025,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://www.youtube.com/embed/YYOyEBboGVs",
    thumbnailUrl: "/thumbnails/SeattleAquarium_FieldTrip.webp",
    description: "Seattle Aquarium field trip preparation video",
    longDescription: `Getting ready for your field trip to the Seattle Aquarium? Watch this video to learn how to make the most of your visit and ensure a fun and educational experience for everyone!`,

credits: [
    { role: "Produced by", name: "Rebel Clef Studios" },
    { role: "Cinematography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],
  },

  {
    title: "Official Xbox Podcast",
    slug: makeSlug("Official Xbox Podcast"),
    date: "2025-01-28",
    year: 2025,
    tags: ["Corporate", "Series"],
    thumbnailUrl: "/thumbnails/Xbox/XboxPodcast.jpg",
    description: "A series of editing samples from the Official Xbox Podcast.",

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://www.youtube.com/embed/_AlGVqI8ZIM",

    videos: [
      {
        title: "Deep Dive into Clair Obscur: Expedition 33",
        embedUrl: "https://www.youtube.com/embed/_AlGVqI8ZIM",
      },
      {
        title: "Deep Dive and Hands On with South of Midnight",
        embedUrl: "https://www.youtube.com/embed/RTr1wDG_2U0",
      },
      {
        title: "WWE 2K25 Deep Dive With Superstars & Devs",
        embedUrl: "https://www.youtube.com/embed/8NHzibMSj_Y",
      },
      {
        title: "Copilot Is Coming To Gaming, Xbox Play Anywhere Updates, And More",
        embedUrl: "https://www.youtube.com/embed/ZoUDVNjDUSw",
      },
      {
        title: "Deep(er) Dive Into Towerborne",
        embedUrl: "https://www.youtube.com/embed/V4k-2duv0wk",
      },
      {
        title: "Xbox Games Showcase Deep Dive | The Outer Worlds 2",
        embedUrl: "https://www.youtube.com/embed/rlvQ-TKA3xI",
      },
      {
        title: "Xbox Games Showcase Deep Dive | Invincible VS",
        embedUrl: "https://www.youtube.com/embed/1qXYE50oRuA",
      },
    ],
  },

  {
    title: "Ignite Seattle 44",
    slug: makeSlug("Ignite Seattle 44"),
    date: "2023-10-26",
    year: 2023,
    tags: ["Corporate", "Live Event"],
    embedUrl: "https://www.youtube.com/embed/IcB0PiwFJvo",
    thumbnailUrl: "/thumbnails/Ignite/IgniteSeattle_44.jpg",
    description: "Ignite Seattle public speaking event",
    longDescriptionAfterMedia: true,
    longDescription: `Ignite Seattle is a non-profit organization that hosts events where speakers have five minutes to present on a topic they are passionate about, using 20 slides that auto-advance every 15 seconds. The goal of Ignite Seattle is to inspire and educate the audience through fast-paced, engaging presentations on a wide range of topics, from technology and science to art and culture.

Ignite Seattle events are held regularly throughout the year and feature a diverse lineup of speakers from various backgrounds and industries. The events are open to the public and provide an opportunity for attendees to learn something new, connect with like-minded individuals, and be inspired by the creativity and passion of the speakers.
    
    [igniteseattle.com](https://igniteseattle.com/)`,

credits: [
    { role: "Live Event Production", name: "Rebel Clef Studios" },
    { role: "Technical Director", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://www.youtube.com/embed/IcB0PiwFJvo",

    videos: [
      {
        title: "Ignite Seattle #44 - Full Livestream",
        embedUrl: "https://www.youtube.com/embed/IcB0PiwFJvo",
      },
      {
        title: "How to make tumbleweed flavored porkchops - Sibongile Chadyiwa",
        embedUrl: "https://www.youtube.com/embed/Tb1fw_b5cHM",
      },
      {
        title: "How a rat experiment cured my anxiety - Peter Feysa",
        embedUrl: "https://www.youtube.com/embed/78ZCnP44wBI",
      },
      {
        title: "Emotions about money - Susan Fee",
        embedUrl: "https://www.youtube.com/embed/K-lxOh7u_MQ",
      },
      {
        title: "Seattle needs a siesta - Myer Harrell",
        embedUrl: "https://www.youtube.com/embed/9bkLc-jBgRE",
      },
      {
        title: "I have the body of an athlete. - Kim Merrikin",
        embedUrl: "https://www.youtube.com/embed/KfUgyEPcBms",
      },
      {
        title: "Decide where to eat using behavioral economics - Nancy Wang",
        embedUrl: "https://www.youtube.com/embed/a9WdnZcF0ns",
      },
      {
        title: "How to write an obituary - Megan Starks",
        embedUrl: "https://www.youtube.com/embed/Q0CRfa6Z5ts",
      },
      {
        title: "A life of fire - Jeff Hicks",
        embedUrl: "https://www.youtube.com/embed/FfeDvSxZstE",
      },
      {
        title: "Dating via your dad and an ad - Ben Schifberg",
        embedUrl: "https://www.youtube.com/embed/vEC8mclrAuI",
      },
    ],
  },
  {
    title: "Ignite Seattle 45",
    slug: makeSlug("Ignite Seattle 45"),
    date: "2024-03-21",
    year: 2024,
    tags: ["Corporate", "Live Event"],
    embedUrl: "https://www.youtube.com/embed/yb-60CLNFSo",
    thumbnailUrl: "/thumbnails/Ignite/IgniteSeattle_45.jpg",
    description: "Ignite Seattle public speaking event",
    longDescriptionAfterMedia: true,
    longDescription: `Ignite Seattle is a non-profit organization that hosts events where speakers have five minutes to present on a topic they are passionate about, using 20 slides that auto-advance every 15 seconds. The goal of Ignite Seattle is to inspire and educate the audience through fast-paced, engaging presentations on a wide range of topics, from technology and science to art and culture.

Ignite Seattle events are held regularly throughout the year and feature a diverse lineup of speakers from various backgrounds and industries. The events are open to the public and provide an opportunity for attendees to learn something new, connect with like-minded individuals, and be inspired by the creativity and passion of the speakers.
    
    [igniteseattle.com](https://igniteseattle.com/)`,

credits: [
    { role: "Live Event Production", name: "Rebel Clef Studios" },
    { role: "Technical Director", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://www.youtube.com/embed/yb-60CLNFSo",

    videos: [
      {
        title: "Ignite Seattle #45 - Full Livestream",
        embedUrl: "https://www.youtube.com/embed/yb-60CLNFSo",
      },
      {
        title: "Why I Wish I'd Met My Mom's Gynecologist - Suzan Mazor",
        embedUrl: "https://www.youtube.com/embed/_cUxojVxG-I",
      },
      {
        title: "The Unhinged Joy of Marathon Pacing - George Perantatos",
        embedUrl: "https://www.youtube.com/embed/oB7cvcN8iVY",
      },
      {
        title: "How to Knock ‘Em Dead With a Killer Eulogy - Christopher Matthias",
        embedUrl: "https://www.youtube.com/embed/l28beolJQlc",
      },
      {
        title: "My first time eating artichokes led me to live and work on a sustainable farm - Andrés Tereza Gomez",
        embedUrl: "https://www.youtube.com/embed/p2Rkh4Gpr4Y",
      },
      {
        title: "How to Lose Yourself in a Labyrinth - Kristen Winn",
        embedUrl: "https://www.youtube.com/embed/KHf-04gr7oo",
      },
      {
        title: "A Unique Way of Being a Foster Parent - Silvana Clark",
        embedUrl: "https://www.youtube.com/embed/sLK0qE9byVs",
      },
      {
        title: "How I saved my world - Abraham McBride",
        embedUrl: "https://www.youtube.com/embed/R84lO5tOAuQ",
      },
      {
        title: "How to make an impossible movie - Jeremy Cavner",
        embedUrl: "https://www.youtube.com/embed/MDDzJSEdj4A",
      },
      {
        title: "So You Live In a Fault Zone - Tiahnan Caulley",
        embedUrl: "https://www.youtube.com/embed/tMu_kLfCkBs",
      },
      {
        title: "The 40-year-old (Rugby) Virgin - Beth Kelley",
        embedUrl: "https://www.youtube.com/embed/zbq_MbTUY7k",
      },
      
    ],
  },
  {
    title: "Ignite Seattle 46",
    slug: makeSlug("Ignite Seattle 46"),
    date: "2024-10-03",
    year: 2024,
    tags: ["Corporate", "Live Event"],
    embedUrl: "https://www.youtube.com/embed/0ChBx8Tv5RI",
    thumbnailUrl: "/thumbnails/Ignite/IgniteSeattle_46.jpg",
    description: "Ignite Seattle public speaking event",
    longDescriptionAfterMedia: true,
    longDescription: `Ignite Seattle is a non-profit organization that hosts events where speakers have five minutes to present on a topic they are passionate about, using 20 slides that auto-advance every 15 seconds. The goal of Ignite Seattle is to inspire and educate the audience through fast-paced, engaging presentations on a wide range of topics, from technology and science to art and culture.

Ignite Seattle events are held regularly throughout the year and feature a diverse lineup of speakers from various backgrounds and industries. The events are open to the public and provide an opportunity for attendees to learn something new, connect with like-minded individuals, and be inspired by the creativity and passion of the speakers.
    
    [igniteseattle.com](https://igniteseattle.com/)`,

credits: [
    { role: "Live Event Production", name: "Rebel Clef Studios" },
    { role: "Technical Director", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://www.youtube.com/embed/0ChBx8Tv5RI",

    videos: [
      {
        title: "Ignite Seattle #46 - Full Livestream",
        embedUrl: "https://www.youtube.com/embed/0ChBx8Tv5RI",
      },
      {
        title: "The Superhero Within You: Curing Cancer & Becoming a DNA Decoy - Soren Ghorai",
        embedUrl: "https://www.youtube.com/embed/Pr3Sij9hVmc",
      },
      {
        title: "How to Dodge a Cringey First Kiss Disaster - Alisa Eddy",
        embedUrl: "https://www.youtube.com/embed/J561yUF2ZIU",
      },
      {
        title: "From Iran, Iraq, and Afghanistan to Seattle - Junichi Sumi",
        embedUrl: "https://www.youtube.com/embed/H62maNfaK8g",
      },
      {
        title: "The Ghosts Who Build Trails - Jorden Goodrich",
        embedUrl: "https://www.youtube.com/embed/PtZJRk84YFE",
      },
      {
        title: "What the fu*k is a Chaplain? - Justin Almeida",
        embedUrl: "https://www.youtube.com/embed/sjaMIE7zxyo",
      },
      {
        title: "More Bigger, More Brainier - Tommy Wood",
        embedUrl: "https://www.youtube.com/embed/8zmYCbS0vq4",
      },
      {
        title: "The Real Costs of a Brazilian Wax - Jeri Seamands",
        embedUrl: "https://www.youtube.com/embed/iM_wHpi2YIg",
      },
      {
        title: "Flirt Like a Boomer - Cassie Maz",
        embedUrl: "https://www.youtube.com/embed/EkLknzKSrRw",
      },
      {
        title: "Fixing graffiti goes like THIS! - Linda Keeney",
        embedUrl: "https://www.youtube.com/embed/xl0wQJXLVpw",
      },
      {
        title: "How Gnomes Saved Me from the Abyss of Despair - Laura Argilla",
        embedUrl: "https://www.youtube.com/embed/UAnNssJVgw4",
      },
      {
        title: "Confessions of a Parkinson's Optimist - Matt Shobe",
        embedUrl: "https://www.youtube.com/embed/9SYYVG8vY_8",
      },
      {
        title: "Speaking English as a First and Second Language - Dan Baird",
        embedUrl: "https://www.youtube.com/embed/mM3I_xTA39E",
      },
    ],
  },
  {
    title: "Ignite Seattle 47",
    slug: makeSlug("Ignite Seattle 47"),
    date: "2025-02-20",
    year: 2025,
    tags: ["Corporate", "Live Event"],
    embedUrl: "https://www.youtube.com/embed/AqZkFFOtmNo",
    thumbnailUrl: "/thumbnails/Ignite/IgniteSeattle_47.jpg",
    description: "Ignite Seattle public speaking event",
    longDescriptionAfterMedia: true,
    longDescription: `Ignite Seattle is a non-profit organization that hosts events where speakers have five minutes to present on a topic they are passionate about, using 20 slides that auto-advance every 15 seconds. The goal of Ignite Seattle is to inspire and educate the audience through fast-paced, engaging presentations on a wide range of topics, from technology and science to art and culture.

Ignite Seattle events are held regularly throughout the year and feature a diverse lineup of speakers from various backgrounds and industries. The events are open to the public and provide an opportunity for attendees to learn something new, connect with like-minded individuals, and be inspired by the creativity and passion of the speakers.
    
    [igniteseattle.com](https://igniteseattle.com/)`,

credits: [
    { role: "Live Event Production", name: "Rebel Clef Studios" },
    { role: "Technical Director", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://www.youtube.com/embed/AqZkFFOtmNo",

    videos: [
      {
        title: "Ignite Seattle #47 - Full Livestream",
        embedUrl: "https://www.youtube.com/embed/AqZkFFOtmNo",
      },
      {
        title: "A Little Off the Top: Confessions of a Small Town Barber - Tara Morgan",
        embedUrl: "https://www.youtube.com/embed/cralp51kVH8",
      },
      {
        title: "Sip Happens: Connection Without Alcohol - Alysse Bryson",
        embedUrl: "https://www.youtube.com/embed/bCqvKTKeDt4",
      },
      {
        title: "A Student Named Efua Told Me She Had Nothing to Write About - Michael Stusser",
        embedUrl: "https://www.youtube.com/embed/UyD4_4ttRB0",
      },
      {
        title: "How (not) to Uncurse a Ring - Josh Jelin",
        embedUrl: "https://www.youtube.com/embed/c4NSKnw0b3c",
      },
      {
        title: "You're Doing Your Dishes Wrong - Noah Iliinsky",
        embedUrl: "https://www.youtube.com/embed/bXNz9mP0-as",
      },
      {
        title: "We're Wrong About AI - Will Alpine",
        embedUrl: "https://www.youtube.com/embed/5kW3OAQsC3s",
      },
      {
        title: "Skydiving Cured My Fear of Heights - Chris Rimple",
        embedUrl: "https://www.youtube.com/embed/BC-HhhqTZNA",
      },
      {
        title: "Why the Abacus Still Adds Up - Arav Patel",
        embedUrl: "https://www.youtube.com/embed/Ufc-u1kDdhQ",
      },
      {
        title: "Kombucha Can Heal More Than Your Gut - Elzani van Zyl",
        embedUrl: "https://www.youtube.com/embed/CjcthT5OCbI",
      },
      {
        title: "How Death Becomes Us - Nicole Van Borkulo",
        embedUrl: "https://www.youtube.com/embed/ZRN9tp37-2w",
      },
      {
        title: "I'm Telling You for the Last Time How to Take Care of Your Orchids - Nick Bayard",
        embedUrl: "https://www.youtube.com/embed/gP95tQ2wn2E",
      },
    ],
  },
  {
    title: "Ignite Seattle 48",
    slug: makeSlug("Ignite Seattle 48"),
    date: "2025-05-22",
    year: 2025,
    tags: ["Corporate", "Live Event"],
    embedUrl: "https://www.youtube.com/embed/oqSkg52y0h4",
    thumbnailUrl: "/thumbnails/Ignite/IgniteSeattle_48.jpg",
    description: "Ignite Seattle public speaking event",
    longDescriptionAfterMedia: true,
    longDescription: `Ignite Seattle is a non-profit organization that hosts events where speakers have five minutes to present on a topic they are passionate about, using 20 slides that auto-advance every 15 seconds. The goal of Ignite Seattle is to inspire and educate the audience through fast-paced, engaging presentations on a wide range of topics, from technology and science to art and culture.

Ignite Seattle events are held regularly throughout the year and feature a diverse lineup of speakers from various backgrounds and industries. The events are open to the public and provide an opportunity for attendees to learn something new, connect with like-minded individuals, and be inspired by the creativity and passion of the speakers.
    
    [igniteseattle.com](https://igniteseattle.com/)`,

credits: [
    { role: "Live Event Production", name: "Rebel Clef Studios" },
    { role: "Technical Director", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://www.youtube.com/embed/oqSkg52y0h4",

    videos: [
      {
        title: "Ignite Seattle #48 - Full Livestream",
        embedUrl: "https://www.youtube.com/embed/oqSkg52y0h4",
      },
      {
        title: "I Ran a Hotel at 18 w/ No Idea What I Was Doing, Until a Wild Plant Saved Everything - Jon Cardenas",
        embedUrl: "https://www.youtube.com/embed/X96J38z3j74",
      },
      {
        title: "Me So Phony Uh – Ten to Twenty Percent of Us Will Hate This - Justin Resnick",
        embedUrl: "https://www.youtube.com/embed/bYb4N5GLS8c",
      },
      {
        title: "She Won Millions. That's When Everything Fell Apart. - Justin M. Riordan",
        embedUrl: "https://www.youtube.com/embed/way4Pl9jLBk",
      },
      {
        title: "My Life's A Supply Chain –and Sometimes Everything's on Backorder - Chelsea Wright",
        embedUrl: "https://www.youtube.com/embed/0rCg3WuRFjY",
      },
      {
        title: "Who Adopted Who? - Molly Hawkins",
        embedUrl: "https://www.youtube.com/embed/xTkcFJwOoTQ",
      },
      {
        title: "Computer Keyboards Shouldn't Be 5 Feet Wide - Matthew Dockrey",
        embedUrl: "https://www.youtube.com/embed/n5I_OXJJK_M",
      },
      {
        title: "One Leg In, One Leg Out: Life as the 21st of 31 Children - Celine Anelone Brozovich",
        embedUrl: "https://www.youtube.com/embed/XYRTqMY4Z1w",
      },
      {
        title: "So You Think You Want To Rave (And You're Over 50) - Noah Edelstein",
        embedUrl: "https://www.youtube.com/embed/szE1AsUtiP8",
      },
      {
        title: "The Heroes We're Looking For – College Sophomores - Sarah Schacht",
        embedUrl: "https://www.youtube.com/embed/VbJVdEd6kiE",
      },
      {
        title: "I Left My Brain in Iraq - Melissa Margain",
        embedUrl: "https://www.youtube.com/embed/MtsZuOSpcqg",
      },
      {
        title: "What Viagra Taught Me About Peak Performance - Lei Wang",
        embedUrl: "https://www.youtube.com/embed/sg0UOhtbES8",
      },
    ],
  },
  {
    title: "Ignite Seattle 49",
    slug: makeSlug("Ignite Seattle 49"),
    date: "2025-10-09",
    year: 2025,
    tags: ["Corporate", "Live Event"],
    embedUrl: "https://www.youtube.com/embed/GDWu7m5leYQ",
    thumbnailUrl: "/thumbnails/Ignite/IgniteSeattle_49.jpg",
    description: "Ignite Seattle public speaking event",
    longDescriptionAfterMedia: true,
    longDescription: `Ignite Seattle is a non-profit organization that hosts events where speakers have five minutes to present on a topic they are passionate about, using 20 slides that auto-advance every 15 seconds. The goal of Ignite Seattle is to inspire and educate the audience through fast-paced, engaging presentations on a wide range of topics, from technology and science to art and culture.

Ignite Seattle events are held regularly throughout the year and feature a diverse lineup of speakers from various backgrounds and industries. The events are open to the public and provide an opportunity for attendees to learn something new, connect with like-minded individuals, and be inspired by the creativity and passion of the speakers.
    
    [igniteseattle.com](https://igniteseattle.com/)`,

credits: [
    { role: "Live Event Production", name: "Rebel Clef Studios" },
    { role: "Technical Director", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://www.youtube.com/embed/GDWu7m5leYQ",

    videos: [
      {
        title: "Ignite Seattle #49 - Full Livestream",
        embedUrl: "https://www.youtube.com/embed/GDWu7m5leYQ",
      },
      {
        title: "Lessons from the CIA: The Magic Words That Stop Any Fight - Kelly McGannon",
        embedUrl: "https://www.youtube.com/embed/BhIEdobvuHQ",
      },
      {
        title: "The Naked Truth: How Stripping Down Built Me Up - Benjamyn Lockwood",
        embedUrl: "https://www.youtube.com/embed/0UjWtXDDDTg",
      },
      {
        title: "How to Build a Neon Fantasia Inside Somebody Else’s Skull - Dan Koch",
        embedUrl: "https://www.youtube.com/embed/Zw-kDht3avg",
      },
      {
        title: "How an Obscure International Treaty Kept Me in My Daughter’s Life - Charles Porter",
        embedUrl: "https://www.youtube.com/embed/4j8KkdG2a4A",
      },
      {
        title: "'Is There a Doctor on the Plane?' How to Save a Life Without a Medical Degree - Suzan Mazor",
        embedUrl: "https://www.youtube.com/embed/AEQ0p0E4e2I",
      },
      {
        title: "Finding Love at the Bottom of a Six-Pack - Carey Christie",
        embedUrl: "https://www.youtube.com/embed/IovZnahyOss",
      },
      {
        title: "Morphine and Cheese Danish - Mike Lockhart",
        embedUrl: "https://www.youtube.com/embed/sj4f-BKxMMM",
      },
      {
        title: "Don’t Take My Word, Ask the Whales Yourself - Genevieve Pfeiffer",
        embedUrl: "https://www.youtube.com/embed/lMERAJcqplc",
      },
      {
        title: "I'll Be a Teacher… How Hard Can It Be? - Mark Richards",
        embedUrl: "https://www.youtube.com/embed/Di9FZYrZkKU",
      },
      {
        title: "Love in the Time of a Shared Mortgage - Mohit Nair",
        embedUrl: "https://www.youtube.com/embed/UqinV3fvEII",
      },
      {
        title: "Let Them Ask - Kelly Lemon Vizcaino",
        embedUrl: "https://www.youtube.com/embed/jwlp8qJD2Yg",
      },
    ],
  },
  {
  title: "GeekWire Studios | AWS re:Invent Spotlights 2023",
  slug: makeSlug("GeekWire Studios | AWS re:Invent Spotlights 2023"),
  date: "2023-12-01",
  year: 2023,
  tags: ["Corporate", "Event"],
  embedUrl:
    "https://www.youtube.com/embed/videoseries?list=PLeIg3a2kD9lc4008O9EQFIg7yS6Wkxfk4",
  thumbnailUrl: "/thumbnails/GeekWire/reInvent_2023.jpg",
  description: "AWS re:Invent Spotlights 2023",
  longDescriptionAfterMedia: true,
  longDescription: `Two playlists from GeekWire Studios' coverage of AWS re:Invent 2023 in Las Vegas.`,

  credits: [
    { role: "Produced by", name: "GeekWire Studios" },
    { role: "Editors", name: "David Zimmermann, Lacey Carpenter" },
  ],

  // ✅ add embedUrl so generic pages/cards don’t break
  embedUrl:
    "https://www.youtube.com/embed/videoseries?list=PLeIg3a2kD9lc4008O9EQFIg7yS6Wkxfk4",

  videos: [
    {
      title: "AWS re:Invent Partner Spotlights 2023",
      embedUrl:
        "https://www.youtube.com/embed/videoseries?list=PLeIg3a2kD9lc4008O9EQFIg7yS6Wkxfk4",
      thumbnailUrl: "/thumbnails/GeekWire/reInvent_2023.jpg",
    },
    {
      title: "AWS re: Invent Partner Profiles 2023",
      embedUrl:
        "https://www.youtube.com/embed/videoseries?list=PLeIg3a2kD9leM6N1riYkoaXxZJ9v9avHq",
      thumbnailUrl: "/thumbnails/GeekWire/reInvent_2023.jpg",
    },
    {
      title: "Accenture at AWS re:Invent 2023",
      embedUrl:
        "https://www.youtube.com/embed/videoseries?list=PLeIg3a2kD9lcp0AAUfA4C0HW4vrQpHKbY",
      thumbnailUrl: "/thumbnails/GeekWire/reInvent_2023.jpg",
    },
  ],
  },
  {
  title: "GeekWire Studios | AWS re:Invent Spotlights 2024",
  slug: makeSlug("GeekWire Studios | AWS re:Invent Spotlights 2024"),
  date: "2024-12-04",
  year: 2024,
  tags: ["Corporate", "Event"],
  embedUrl:
    "https://www.youtube.com/embed/videoseries?list=PLeIg3a2kD9lejMBK_LMSBH5FdGzpgEblu",
  thumbnailUrl: "/thumbnails/GeekWire/reInvent_2024.jpg",
  description: "AWS re:Invent Spotlights 2024",
  longDescriptionAfterMedia: true,
  longDescription: `Two playlists from GeekWire Studios' coverage of AWS re:Invent 2024 in Las Vegas.`,

  credits: [
    { role: "Produced by", name: "GeekWire Studios" },
    { role: "Editors", name: "David Zimmermann, Lacey Carpenter" },
  ],

  // ✅ add embedUrl so generic pages/cards don’t break
  embedUrl:
    "https://www.youtube.com/embed/videoseries?list=PLeIg3a2kD9lejMBK_LMSBH5FdGzpgEblu",

  videos: [
    {
      title: "AWS re:Invent Spotlights 2024",
      embedUrl:
        "https://www.youtube.com/embed/videoseries?list=PLeIg3a2kD9lejMBK_LMSBH5FdGzpgEblu",
      thumbnailUrl: "/thumbnails/GeekWire/reInvent_2024.jpg",
    },
    {
      title: "AWS re:Invent Accenture Spotlights 2024",
      embedUrl:
        "https://www.youtube.com/embed/videoseries?list=PLeIg3a2kD9lcI9JlJthFYLwRUYcQ2zgqQ",
      thumbnailUrl: "/thumbnails/GeekWire/reInvent_2024.jpg",
    },
  ],
  },
  {
    title: "The Austin Awards",
    slug: makeSlug("The Austin Awards"),
    date: "2024-03-05",
    year: 2024,
    tags: ["Original", "Parody"],
    embedUrl: "https://www.youtube.com/embed/5PzWgFLzkoc",
    thumbnailUrl: "/thumbnails/GrittyReboots/TheAustinAwards.jpg",
    description: "Awards show parody",
    longDescription: `Ladies and gentlemen... the first annual Austin Awards.

Please join as as we reboot the movie awards format.

Written and performed by Austin Arias.`,

credits: [
    { role: "Produced by", name: "Rebel Clef Studios" },
    { role: "Written and Performed by", name: "Austin Arias" },
    { role: "Filmed, Edited & Mixed by", name: "David Zimmermann" },
    { role: "Props Master & 'In Memoriam' Researcher", name: "Iris Gatti" },
    { role: "FurBismarck Poster by", name: "Steven Hudson" },
    { role: "'In Memoriam' Production by", name: "David Hudson" },
    { role: "Trophy 3D Modeling", name: "Gabe Conroy" },
    { role: "Trophy 3D Printing by", name: "Alexander Theoharis" },
    { name: "Special Thanks to Maria Pandolfo, John Lagomarsino, The Monkey Pub" },
  ],
  },
  {
    title: "The Moment of Lift",
    slug: makeSlug("The Moment of Lift"),
    date: "2019-10-10",
    year: 2019,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://player.vimeo.com/video/365636486?h=82fcb49d39",
    thumbnailUrl: "/thumbnails/GatesFoundation_TheMomentOfLift.png",
    description: "Animated book trailer",
    longDescription: `Melinda Gates' book, The Moment of Lift: How Empowering Women Changes the World, argues that empowering women is crucial for global progress, using personal stories and data from her foundation's work to highlight issues like child marriage, lack of contraception, and workplace inequality.
    
    The book shows how lifting women up transforms families, communities, and societies through data and personal narratives, urging readers to act as advocates by sharing power and breaking down barriers.`,

credits: [
    { role: "Produced by", name: "Cinesaurus" },
    { role: "Editing & Animation", name: "David Hudson" },
    { role: "Sound Design", name: "David Zimmermann" },
  ],
  },
  {
    title: "NASA | 2021 Total Solar Eclipse",
    slug: makeSlug("NASA | 2021 Total Solar Eclipse"),
    date: "2021-12-04",
    year: 2021,
    tags: ["Corporate", "Live Event", "Livestream"],
    embedUrl: "https://www.youtube.com/embed/J04GFN2Pq1w",
    thumbnailUrl: "/thumbnails/NASA_SolarEclipse2021.jpg",
    description: "NASA livestream of the 2021 total solar eclipse",
    longDescription: `In 2021 we had the incredible [once-in-a-lifetime opportunity](https://www.instagram.com/p/CXxFjFupcub/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==) to travel to [Union Glacier Camp](https://antarctic-logistics.com/camp/union-glacier-camp/) in Antarctica to livestream the 2021 total solar eclipse.
    
    Additionally, we were awarded NASA's prestigious [APOD](https://apod.nasa.gov/apod/ap211209.html), or Astronomy Picture of the Day, for our composite of the eclipse at totality.`,

credits: [
    { role: "Produced by", name: "NASA" },
    { role: "Camera Operator", name: "David Zimmermann" },
    { role: "Tracking Equipment Operators", name: "Christian Lockwood, Theo Boris" },
    { role: "Image Compositing", name: "Zev Hoover, Ron Dantowitz" },
  ],
  },
  {
    title: "NASA | 2024 Total Solar Eclipse",
    slug: makeSlug("NASA | 2024 Total Solar Eclipse"),
    date: "2024-04-08",
    year: 2024,
    tags: ["Corporate", "Live Event", "Livestream"],
    embedUrl: "https://www.youtube.com/embed/2MJY_ptQW1o",
    thumbnailUrl: "/thumbnails/NASA_SolarEclipse2024.jpg",
    description: "2024 Total Solar Eclipse: Through the Eyes of NASA",
    longDescriptionAfterMedia: true,
    longDescription: `On April 8th, 2024, a total solar eclipse moved across North America, traveling through Mexico, across the United States from Texas to Maine, and out across Canada’s Atlantic coast.
    
    We had the unique opportunity to set up a ground-based observation in Arkansas (second video above) and provide NASA with a 4K stream from our POV, to be used in their livestream of the cosmic event.
    
    The broadcast went on to [win an Emmy](https://www.nasa.gov/general/nasa-wins-second-emmy-award-for-2024-total-solar-eclipse-broadcast/) for Excellence in Production Technology, as it was the most complex live project ever produced by the agency. In total, NASA’s eclipse broadcasts garnered almost 40 million live and replay views across its own distribution channels, including on NASA+, the agency’s free streaming service. Externally, the agency’s main broadcast was picked up in 2,208 hits on 568 channels in 25 countries.`,

    accolades: [
    "Emmy Award for Excellence in Production Technology",
  ],

    credits: [
    { role: "Produced by", name: "NASA" },
    { role: "Arkansas site Camera Operator", name: "David Zimmermann" },
    { role: "Tracking Equipment Operator", name: "Zev Hoover" },
    { role: "Network Engineer", name: "Jonathan Taylor" },
  ],
  embedUrl: "https://www.youtube.com/embed/2MJY_ptQW1o",

    videos: [
      {
        title: "2024 Total Solar Eclipse: Through the Eyes of NASA (Official Broadcast)",
        embedUrl: "https://www.youtube.com/embed/2MJY_ptQW1o",
      },
      {
        title: "4K HDR Total Solar Eclipse 2024 (Arkansas Site)",
        embedUrl: "https://www.youtube.com/embed/jojefuqGFY0",
      },
    ],
  },
  {
    title: "Tesla | Semi & Roadster Unveil",
    slug: makeSlug("Tesla | Semi & Roadster Unveil"),
    date: "2017-12-14",
    year: 2017,
    tags: ["Corporate", "Live Event",],
    embedUrl: "https://www.youtube.com/embed/5RRmepp7i5g",
    thumbnailUrl: "/thumbnails/Tesla_SemiTruck.webp",
    description: "Unveiling of the Tesla Semi",
    longDescription: `Semi is the safest, most comfortable truck ever. Four independent motors provide maximum power and acceleration and require the lowest energy cost per mile.
    
    We had a fun time filming some plate footage out in eastern Washington, and compositing in the new Tesla semi truck as background content to support Elon Musk's presentation.`,

credits: [
    { role: "Tesla Semi presentation", name: "Cinesaurus" },
    { role: "Drone Operator", name: "David Zimmermann" },
    { role: "Supplemental Cinematography", name: "David Zimmermann" },
    { role: "Motion Graphics & VFX", name: "Steven Hudson, David Hudson, Gabe Conroy" },
    { role: "Additional VFX", name: "David Zimmermann" },
  ],
  },
  {
    title: "The Meme Song: Learn 101 Memes",
    slug: makeSlug("The Meme Song: Learn 101 Memes"),
    date: "2012-12-17",
    year: 2012,
    tags: ["Original", "Parody",],
    embedUrl: "https://www.youtube.com/embed/IMAZEW-cnr4",
    thumbnailUrl: "/thumbnails/LaughPong/MemesOfTheInternet.jpg",
    description: "Memes of the Internet",
    longDescription: `Inspired by Animaniacs - [Nations Of The World](https://tinyurl.com/47jm7563)`,

credits: [
    { role: "Produced by", name: "Cinesaurus" },
    { role: "Directed by", name: "Forest Gibson" },
    { role: "Edited by", name: "David Zimmermann" },
    { role: "Lyrics", name: "Rob Whitehead" },
    { role: "Performed by", name: "Forest Gibson" },
    { role: "Animation", name: "David Zimmermann" },
    { role: "Intro Animation", name: "Steven Hudson" },
    { role: "Music by", name: "John K. Stark" },
    { role: "Announcer", name: "Chris Parker" },
  ],
  },
  {
    title: "Xbox | Partner Preview November 2025",
    slug: makeSlug("Xbox | Partner Preview November 2025"),
    date: "2025-11-20",
    year: 2025,
    tags: ["Corporate", "Presentation"],
    embedUrl: "https://www.youtube.com/embed/HEqfGuuIhoE",
    thumbnailUrl: "/thumbnails/Xbox/Xbox_PartnerPreview2025.jpg",
    description: "Xbox Partner Preview November 2025",
    longDescriptionAfterMedia: true,
    longDescription: `Check out the recap and full presentation above of Xbox's latest Partner Preview, which highlighted 16 Xbox Play Anywhere titles from their amazing partners and 9 titles coming Day One to Xbox Game Pass Ultimate. In addition, new game reveals like Armatus, Raji: Kaliyuga, and Zoo Punk, as well as new Game Pass announcements, first looks at gameplay, brand new games Available Today, and much more.`,

credits: [
    { role: "Produced by", name: "Xbox" },
    { role: "Editor", name: "David Zimmermann" },
    { role: "Motion Graphics & Animation", name: "Frank Hernandez" },
  ],

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://www.youtube.com/embed/HEqfGuuIhoE",

    videos: [
      {
        title: "Xbox Partner Preview | November 2025 - Recap",
        embedUrl: "https://www.youtube.com/embed/HEqfGuuIhoE",
      },
      {
        title: "Xbox Partner Preview | November 2025",
        embedUrl: "https://www.youtube.com/embed/BgOiQPxEF-I",
      },
    ],
  },
  {
    title: "Core Havn | Meet Core Havn",
    slug: makeSlug("Core Havn | Meet Core Havn"),
    date: "2025-09-08",
    year: 2025,
    tags: ["Corporate", " Commercial",],
    embedUrl: "https://www.youtube.com/embed/n_NanK0Yr-8",
    thumbnailUrl: "/thumbnails/CoreHavn.jpg",
    description: "Core Havn welcome video",
    longDescription: `Core Havn is a boutique fitness studio in the Seattle area (Mercer Island, Renton, Madison Park) offering low-impact, high-intensity strength training using specialized XFormer machines, blending Pilates principles with modern exercise science for full-body workouts focused on muscular strength, endurance, and mobility.
    
    They emphasize "Strong. Safe. Successful." with personalized attention in small classes, building core strength, balance, and lean muscle through challenging, results-driven, and efficient sessions. Check out more at [corehavn.com](https://corehavn.com/).`,

credits: [
    { role: "Produced by", name: "Rebel Clef Studios" },
    { role: "Cinematography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],
  },
  {
    title: "Welcome to Nurturing Knowledge School",
    slug: makeSlug("Welcome to Nurturing Knowledge School"),
    date: "2025-09-25",
    year: 2025,
    tags: ["Corporate", "Commercial", "Series"],
    embedUrl: "https://www.youtube.com/embed/Raa87pisfoI",
    thumbnailUrl: "/thumbnails/NurturingKnowledgeSchool.jpg",
    description: "Nurturing Knowledge School video series",
    longDescriptionAfterMedia: true,
    longDescription: `Nurturing Knowledge School (NKS) in Seattle offers Reggio Emilia-inspired preschool and school-age programs, fostering empowered, curious, and confident lifelong learners through child-centered, project-based learning in small, community-focused environments. They focus on nurturing wonder, self-expression, and deep understanding through emergent curricula, daily documentation, and innovative, inclusive settings that value each child as a capable, unique individual.
    
    [nurturingknowledge.com](https://nurturingknowledge.com/)`,

credits: [
    { role: "Produced by", name: "Rebel Clef Studios" },
    { role: "Cinmetography", name: "David Zimmermann" },
    { role: "Editor", name: "David Zimmermann" },
  ],

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://www.youtube.com/embed/Raa87pisfoI",

    videos: [
      {
        title: "Welcome to Nurturing Knowledge School",
        embedUrl: "https://www.youtube.com/embed/Raa87pisfoI",
      },
      {
        title: "Nurturing Knowledge School: Our Days Together",
        embedUrl: "https://www.youtube.com/embed/e8eZPxe0U4A",
      },
      {
        title: "NKS: Bryant Campus Video Tour",
        embedUrl: "https://www.youtube.com/embed/3ckI4IzyJjQ",
      },
      {
        title: "NKS: Greenwood Campus Video Tour",
        embedUrl: "https://www.youtube.com/embed/MmGS_U5fElQ",
      },
      {
        title: "NKS: Maple Leaf North Campus Video Tour",
        embedUrl: "https://www.youtube.com/embed/n-CdIMBOrxk",
      },
      {
        title: "NKS: Maple Leaf South Campus Video Tour",
        embedUrl: "https://www.youtube.com/embed/zswfnDMSMeA",
      },
      {
        title: "NKS: Phinney Campus Video Tour",
        embedUrl: "https://www.youtube.com/embed/agi7-Tfx4Ko",
      },
      {
        title: "NKS: Woodland Park Main Campus Video Tour",
        embedUrl: "https://www.youtube.com/embed/im__CFQhT04",
      },
      {
        title: "NKS: Woodland Park 2nd Floor Campus Video Tour",
        embedUrl: "https://www.youtube.com/embed/_MeWyIrwi_U",
      },
    ],
  },
  {
    title: "Microsoft | Transforming Tumor Boards",
    slug: makeSlug("Microsoft | Transforming Tumor Boards"),
    date: "2025-06-17",
    year: 2025,
    tags: ["Corporate", "Interview",],
    embedUrl: "https://www.youtube.com/embed/jeY8VUr3GmU",
    thumbnailUrl: "/thumbnails/Microsoft/TumorBoards_AIAgents.jpg",
    description: "AI Agents and the New Era of Personalized Cancer Care",
    longDescription: `In this fireside chat, Shrey Jain, Product Lead of the Healthcare Agent Orchestrator, joins Eric Horvitz, Chief Scientific Officer at Microsoft, to explore how AI agents are revolutionizing personalized cancer care. They delve into the evolving role of tumor board meetings and demonstrate how the Healthcare Agent Orchestrator can streamline clinical workflows, enhance decision-making, and empower care teams with real-time, data-driven insights. Discover the future of oncology through the lens of intelligent collaboration.
    
    Learn more: [microsoft.com/multimodal-hls-foundation-models/](https://www.microsoft.com/en-us/research/project/multimodal-hls-foundation-models/)`,

credits: [
    { role: "Produced by", name: "Goodthings" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Editing & Motion Graphics", name: "Goodthings" },
    { role: "Assistant Editing", name: "David Zimmermann" },
  ],
  },
  {
    title: "The MINA Group | Anthem",
    slug: makeSlug("The MINA Group | Anthem"),
    date: "2025-09-04",
    year: 2025,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://player.vimeo.com/video/1115995472?h=18d2ef9e83",
    thumbnailUrl: "/thumbnails/TheMINAGroup.jpg",
    description: "The MINA Group | Chef Michael Mina",
    longDescription: `The MINA Group, founded by James Beard Award-winning Chef Michael Mina, is a San Francisco-based restaurant management company known for creating upscale, innovative dining experiences and managing numerous acclaimed restaurants (like Bourbon Steak) and virtual brands globally, focusing on chef-driven menus, exceptional service, and strategic partnerships, often with luxury hotels.
    
    They operate diverse concepts, from fine dining to casual spots, adapting menus and design to local tastes while expanding their portfolio through management agreements rather than outright ownership.
    
    Learn more at [theminagroup.com](https://www.theminagroup.com/)`,

credits: [
    { role: "Produced by", name: "Goodthings" },
    { role: "Director of Photography", name: "David Zimmermann" },
    { role: "Drone Operator", name: "David Zimmermann" },
    { role: "Editing & Motion Graphics", name: "Goodthings" },
    { role: "Assistant Editing", name: "David Zimmermann" },
  ],
},
{
    title: "Kenji Lopez-Alt | Cooking Videos",
    slug: makeSlug("Kenji Lopez-Alt | Cooking Videos"),
    date: "2025-10-17",
    year: 2025,
    tags: ["Series"],
    embedUrl: "https://www.youtube.com/embed/RwNDUkt7cCM",
    thumbnailUrl: "/thumbnails/Kenji/JKLA_logo.jpg",
    description: "Kenji Lopez-Alt cooking series",
    longDescriptionAfterMedia: true,
    longDescription: `J. Kenji López-Alt is a renowned Japanese-American chef, food writer, and James Beard Award winner known for demystifying cooking science, evidenced in his [bestselling books](https://www.kenjilopezalt.com/books) The Food Lab and The Wok, and his popular [YouTube channel](https://www.youtube.com/@JKenjiLopezAlt).
    
    A former MIT graduate and Serious Eats editor, he now writes for The New York Times, hosts online content, co-owns Wursthall restaurant, and focuses on making home cooking more joyful and scientific, sharing his passion for food with millions.
    
    As a fellow Seattle resident, Kenji connected with us in late 2025, and we soon began producing his video content alongside our good friend and longtime collaborator, David Hudson.`,

credits: [
    { role: "Produced by", name: "Kenji Lopez-Alt, Lena Davidson" },
    { role: "Supplemental Cinematography", name: "David Zimmermann" },
    { role: "Editing", name: "David Hudson, David Zimmermann" },
  ],

    // ✅ add embedUrl so generic pages/cards don’t break
    embedUrl: "https://www.youtube.com/embed/RwNDUkt7cCM",

    videos: [
      {
        title: "I Designed A Knife! Introducing the KAN x Kenji Shitoku四徳, a brand new shape for all home cooks",
        embedUrl: "https://www.youtube.com/embed/RwNDUkt7cCM",
      },
      {
        title: "Making Dirty Mazemen with Sho Spaeth, Author of Homemade Ramen",
        embedUrl: "https://www.youtube.com/embed/8MP1DTb3fBY",
      },
      {
        title: "A Better Way to Roast Turkey",
        embedUrl: "https://www.youtube.com/embed/fU5JE7KdSrE",
      },
      {
        title: "How to Cook the Juiciest Beef Tenderloin",
        embedUrl: "https://www.youtube.com/embed/wPbeYYur3tI",
      },
      {
        title: "Non-stick Pan Comparison: Teflon vs. Cast Iron vs. Our Place Titanium Pro",
        embedUrl: "https://www.youtube.com/embed/aXmKAsE3_Ec",
      },
    ],
  },
  {
    title: "University of Warcraft",
    slug: makeSlug("University of Warcraft"),
    date: "2024-11-14",
    year: 2024,
    tags: ["Corporate", "Live Event"],
    embedHtml: `<blockquote class="twitter-tweet" data-theme="dark" data-media-max-width="560"><p lang="en" dir="ltr">The Alliance is strong with this one. <a href="https://twitter.com/UW_Football?ref_src=twsrc%5Etfw">@UW_Football</a> x <a href="https://twitter.com/Warcraft?ref_src=twsrc%5Etfw">@Warcraft</a><a href="https://twitter.com/hashtag/TheWarWithin?src=hash&amp;ref_src=twsrc%5Etfw">#TheWarWithin</a> | <a href="https://twitter.com/hashtag/NoLimits?src=hash&amp;ref_src=twsrc%5Etfw">#NoLimits</a> <a href="https://t.co/g86A0i3d1U">pic.twitter.com/g86A0i3d1U</a></p>&mdash; Washington Athletics (@UWAthletics) <a href="https://twitter.com/UWAthletics/status/1856382358615928853?ref_src=twsrc%5Etfw">November 7, 2024</a></blockquote>`,
    thumbnailUrl: "/thumbnails/UniversityOfWarcraft.webp",
    description: "University of Warcraft",
    longDescription: `The University of Washington partnered with Blizzard's World of Warcraft for its 20th anniversary, transforming the Huskies' final home football game (vs. UCLA) into a "University of Warcraft" event. This included custom logos, mascots leading the team, themed student giveaways, and player NIL deals for social media content, merging college sports with the iconic game for a unique fan experience.
    
    We had the unique opportunity to join the post-production team in creating a package of UW x Warcraft digital assets, to be used throughout the stadium on every banner and jumbo screen.
    
    Find out more about the collaboration [here](https://gohuskies.com/news/2024/11/14/football-world-of-warcraft).`,

credits: [
    { role: "Produced by", name: "Mighty Media" },
    { role: "Editing & Motion Graphics", name: "Mighty Media" },
    { role: "Additional Motion Graphics", name: "David Zimmermann" },
  ],
},
{
    title: "Cinesaurus Digs the Internet",
    slug: makeSlug("Cinesaurus Digs the Internet"),
    date: "2015-03-15",
    year: 2015,
    tags: ["Corporate", "Commercial"],
    embedUrl: "https://www.youtube.com/embed/fSR5Rd4n7o8",
    thumbnailUrl: "/thumbnails/Cinesaurus/DigsTheInternet.jpg",
    description: "Cinesaurus nonprofit video giveaway",
    longDescription: `We love creating online video content that gets seen by a lot of people, and we want to share our expertise in creative storytelling and savvy for marketing to aid your company's mission!
    
    Visit http://cinesaurus.com to learn more.`,

credits: [
    { role: "Produced by", name: "Cinesaurus" },
    { role: "Editing & Motion Graphics", name: "Steven Hudson, David Hudson" },
    { role: "Sound Design", name: "David Zimmermann" },
  ],
},
];