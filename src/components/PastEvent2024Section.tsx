import React from "react";

type ArchiveCategory = "all" | "track" | "riders" | "stage";

interface PastEventPhoto {
  id: string;
  src: string;
  title: string;
  category: Exclude<ArchiveCategory, "all">;
  categoryLabel: string;
  alt: string;
  focalClass?: string;
}

const MOTO_ENDURO_2024_PHOTOS: PastEventPhoto[] = [
  {
    id: "2024-01",
    src: "/assets/aistudio/605111745_122097122163183336_4099054851444685048_n_41ba4a66.jpg",
    title: "Rider #16 · Dirt Straight Sprint",
    category: "track",
    categoryLabel: "Track & River",
    alt: "Rider #16 Soni Rides kicking up dust along the 2024 Pokhara enduro track",
    focalClass: "object-cover object-[center_20%]"
  },
  {
    id: "2024-03",
    src: "/assets/aistudio/603781778_122097121035183336_4943263732830953023_n_8d5b0bef.jpg",
    title: "Rider #555 · River Crossing Wheelie",
    category: "track",
    categoryLabel: "Track & River",
    alt: "Rider #555 popping a wheelie through the riverbed creek under cheering spectators",
    focalClass: "object-cover object-[center_35%]"
  },
  {
    id: "2024-05",
    src: "/assets/aistudio/601906458_122097113535183336_3496243706853361126_n_e5e51df0.jpg",
    title: "Rider #911 · Crowd Corridor Charge",
    category: "track",
    categoryLabel: "Track & River",
    alt: "Rider #911 accelerating down the dirt track lined with spectators and course officials",
    focalClass: "object-cover object-[center_20%]"
  },
  {
    id: "2024-06",
    src: "/assets/aistudio/604964960_122097120633183336_5951476087920664744_n_ce0ddb19.jpg",
    title: "Rider #01 · Corner Roost",
    category: "track",
    categoryLabel: "Track & River",
    alt: "Rider #01 leaning through a dusty sweep beside 2024 track banners",
    focalClass: "object-cover object-[center_18%]"
  },
  {
    id: "2024-07",
    src: "/assets/aistudio/602450155_122097115155183336_3931125237093247231_n_22a08ed1.jpg",
    title: "Championship Start & Finish Arch",
    category: "track",
    categoryLabel: "Track & River",
    alt: "Rider #16 riding beneath the Pokhara Moto Enduro Cross Championship 2024 truss arch",
    focalClass: "object-cover object-[center_28%]"
  },
  {
    id: "2024-08",
    src: "/assets/aistudio/605090937_122097125283183336_1382602027749110508_n_ac9a713f.jpg",
    title: "Pokhara Street Parade · #07 & #333",
    category: "riders",
    categoryLabel: "Riders & Parade",
    alt: "Rider #07 leading the championship street rally through Pokhara alongside Rider #333",
    focalClass: "object-cover object-[center_28%]"
  },
  {
    id: "2024-09",
    src: "/assets/aistudio/601812407_122097115485183336_1699312359422870788_n_02a701e1.jpg",
    title: "Rider #27 · Locked In at Paddock Gate",
    category: "riders",
    categoryLabel: "Riders & Parade",
    alt: "Rider #27 focused before launch in Fasthouse jersey and Bell helmet",
    focalClass: "object-cover object-[center_16%]"
  },
  {
    id: "2024-10",
    src: "/assets/aistudio/605500756_122097126597183336_6808263071455822211_n_46d19214.jpg",
    title: "Team Rad Rides · Paddock Prep",
    category: "riders",
    categoryLabel: "Riders & Parade",
    alt: "Two Rad Rides team riders posing beside their GasGas dirt bikes",
    focalClass: "object-cover object-[center_18%]"
  },
  {
    id: "2024-11",
    src: "/assets/aistudio/604381564_122097113307183336_9123049031427256016_n_d35e89e9.jpg",
    title: "Riders & Next-Gen Fans",
    category: "riders",
    categoryLabel: "Riders & Parade",
    alt: "Competing rider sharing a moment trackside with a young Pokhara motorsport fan",
    focalClass: "object-cover object-[center_16%]"
  },
  {
    id: "2024-12",
    src: "/assets/aistudio/604708308_122097118593183336_8428160474394075660_n_02918b7e.jpg",
    title: "Cultural Welcome on Main Stage",
    category: "stage",
    categoryLabel: "Stage & Crowd",
    alt: "Traditional cultural dance performance before the Pokhara Moto Enduro 2024 main stage",
    focalClass: "object-cover object-[center_22%]"
  },
  {
    id: "2024-13",
    src: "/assets/aistudio/604653629_122097108279183336_8260177107873503235_n_9b729714.jpg",
    title: "Certificate of Appreciation Ceremony",
    category: "stage",
    categoryLabel: "Stage & Crowd",
    alt: "Official recognition and certificate presentation on the 2024 championship stage",
    focalClass: "object-cover object-[center_18%]"
  },
  {
    id: "2024-14",
    src: "/assets/aistudio/603810968_122097119355183336_5108692485904554936_n_7ed1681e.jpg",
    title: "Trophies, Dignitaries & Organizers",
    category: "stage",
    categoryLabel: "Stage & Crowd",
    alt: "Chief guests and organizers gathered behind the 2024 championship trophy table",
    focalClass: "object-cover object-[center_20%]"
  },
  {
    id: "2024-15",
    src: "/assets/aistudio/605084195_122097112425183336_3910376872092994262_n_8462bdbb.jpg",
    title: "Pokhara Riders Club Crew",
    category: "stage",
    categoryLabel: "Stage & Crowd",
    alt: "Marshals, officials, and honored guests in front of the Moto Enduro 2024 backdrop",
    focalClass: "object-cover object-[center_20%]"
  },
  {
    id: "2024-16",
    src: "/assets/aistudio/605179969_122097114297183336_6512620647022976000_n_8258758b.jpg",
    title: "Trackside Emcees & Media Desk",
    category: "stage",
    categoryLabel: "Stage & Crowd",
    alt: "Event hosts anchoring live commentary on race day in Pokhara",
    focalClass: "object-cover object-[center_16%]"
  },
  {
    id: "2024-17",
    src: "/assets/aistudio/604535159_122097114141183336_8252793026547161334_n_136b1eac.jpg",
    title: "International Spectator Turnout",
    category: "stage",
    categoryLabel: "Stage & Crowd",
    alt: "International visitors enjoying the 2024 Moto Enduro Cross festival in Pokhara",
    focalClass: "object-cover object-[center_18%]"
  },
  {
    id: "2024-18",
    src: "/assets/aistudio/602370494_122097111003183336_3044529162545465712_n_9062d6b6.jpg",
    title: "Championship Flags & Packed Hills",
    category: "stage",
    categoryLabel: "Stage & Crowd",
    alt: "PKR Riders and Moto Enduro 2024 feather flags above crowds in the Pokhara foothills",
    focalClass: "object-cover object-center"
  }
];

export const PastEvent2024Section: React.FC = () => {

  return (
    <section id="moto-enduro-2024" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-[28px] border border-stone-200/80 shadow-sm p-6 sm:p-10 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-[#D60A19] mb-1">
                Past Event Archive <span aria-hidden="true">·</span> Pokhara Riders Club
              </p>
              <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-zinc-900 leading-none text-balance">
                MOTO ENDURO 2024
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed mt-2.5">
                Held on April 5 &amp; 6, 2024 in Pokhara — look back at our past edition featuring riverbed boulder stages, street parades, international spectators, cultural performances, and podium awards.
              </p>
            </div>
          </div>

          {/* Responsive Photo Archive Grid (Unclickable, Image-Only) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {MOTO_ENDURO_2024_PHOTOS.map((photo) => (
              <div
                key={photo.id}
                className="relative w-full aspect-[4/3] rounded-2xl border border-stone-200/80 bg-zinc-900 overflow-hidden shadow-xs select-none"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  draggable={false}
                  className={`w-full h-full block pointer-events-none select-none ${
                    photo.focalClass || "object-cover object-center"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
