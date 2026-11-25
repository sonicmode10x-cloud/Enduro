import React from "react";

interface PastEvent2026Photo {
  id: string;
  src: string;
  alt: string;
  focalClass?: string;
}

const MOTO_ENDURO_2026_PHOTOS: PastEvent2026Photo[] = [
  {
    id: "2026-01",
    src: "/assets/aistudio/670927885_17869316787664194_1615222443891936316_n__1__855cbbea.jpg",
    alt: "Moto Enduro 2026 champion holding the winner trophy beside #444 bike on the Pokhara podium",
    focalClass: "object-cover object-[center_18%]"
  },
  {
    id: "2026-02",
    src: "/assets/aistudio/670458791_17869313697664194_8037005004255165029_n__1__f44fb12a.jpg",
    alt: "Women's division podium winners celebrating with trophies at Extreme Moto Enduro Cross Championship 2026",
    focalClass: "object-cover object-[center_18%]"
  },
  {
    id: "2026-03",
    src: "/assets/aistudio/672352852_17870149437664194_5890226800590230447_n__1__50dae4cc.jpg",
    alt: "Rider #555 pulling a wheelie across the riverbed water crossing during Moto Enduro 2026",
    focalClass: "object-cover object-[center_28%]"
  },
  {
    id: "2026-04",
    src: "/assets/aistudio/671136712_17871000903664194_8704857497115292326_n__1__d7b574a4.jpg",
    alt: "Hard enduro rider navigating steep forest logs and roots past spectators in Pokhara 2026",
    focalClass: "object-cover object-[center_35%]"
  },
  {
    id: "2026-05",
    src: "/assets/aistudio/658872432_17871000927664194_775001886325555829_n_529f74f8.jpg",
    alt: "Rider climbing a forest log obstacle lined with spectators during Moto Enduro 2026",
    focalClass: "object-cover object-[center_22%]"
  },
  {
    id: "2026-06",
    src: "/assets/aistudio/670870535_17871000867664194_4476611874987906211_n_fd355572.jpg",
    alt: "Enduro rider in Bell helmet and red goggles threading a tight wooded fern trail",
    focalClass: "object-cover object-[center_28%]"
  },
  {
    id: "2026-07",
    src: "/assets/aistudio/671144046_17871000627664194_1833416384579638627_n__1__7c507f92.jpg",
    alt: "Rider #151 charging down singletrack woods in Thor chest armor on a GasGas dirt bike",
    focalClass: "object-cover object-[center_28%]"
  },
  {
    id: "2026-08",
    src: "/assets/aistudio/670802737_17870149464664194_6918889130845739136_n_ca7938cd.jpg",
    alt: "Rider #795 launching high off a dirt jump with forested hills behind",
    focalClass: "object-cover object-[center_25%]"
  },
  {
    id: "2026-09",
    src: "/assets/aistudio/670303200_17870149455664194_3148004330231607562_n_d329d1dc.jpg",
    alt: "Rider #70 clearing a dirt jump in yellow Airoh helmet against Pokhara hillside",
    focalClass: "object-cover object-[center_22%]"
  },
  {
    id: "2026-12",
    src: "/assets/aistudio/670294286_17869316826664194_928402922483877022_n_34ece65b.jpg",
    alt: "Moto Enduro 2026 overall podium winners displaying Winner, 1st Runner Up, and 2nd Runner Up trophies",
    focalClass: "object-cover object-[center_20%]"
  },
  {
    id: "2026-13",
    src: "/assets/aistudio/670957943_17869316799664194_1306959075209737257_n_b64c1da3.jpg",
    alt: "Moto Enduro 2026 champion lifting the Winner sprocket trophy on stage with officials",
    focalClass: "object-cover object-[center_18%]"
  },
  {
    id: "2026-14",
    src: "/assets/aistudio/671249833_17869313751664194_4892311204896948220_n_9cdb428c.jpg",
    alt: "2nd Runner Up trophy presentation on the Moto Enduro 2026 stage",
    focalClass: "object-cover object-[center_18%]"
  }
];

export const PastEvent2026Section: React.FC = () => {
  return (
    <section id="moto-enduro-2026" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-[28px] border border-stone-200/80 shadow-sm p-6 sm:p-10 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-zinc-900 leading-none text-balance">
                MOTO ENDURO 2026
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed mt-2.5">
                Highlights from the Xtreme Moto Enduro Cross Championship 2026 in Pokhara — podium champions, women&apos;s class winners, riverbed water crossings, and steep forest root stages.
              </p>
            </div>
          </div>

          {/* Responsive Photo Archive Grid (Unclickable, Image-Only) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {MOTO_ENDURO_2026_PHOTOS.map((photo) => (
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
