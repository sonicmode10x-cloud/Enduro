import React from "react";

interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  imgClass?: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "women-podium",
    src: "/assets/aistudio/670458791_17869313697664194_8037005004255165029_n__1__f44fb12a.jpg",
    alt: "Women's class podium winners celebrating with trophies at Extreme Moto Enduro Cross",
    caption: "Women's Podium",
    imgClass: "object-cover object-[center_18%]"
  },
  {
    id: "overall-winner-444",
    src: "/assets/aistudio/670927885_17869316787664194_1615222443891936316_n__1__855cbbea.jpg",
    alt: "Champion rider with #444 dirt bike holding winner trophy on podium",
    caption: "Champion · #444",
    imgClass: "object-cover object-[center_18%]"
  },
  {
    id: "water-wheelie-555",
    src: "/assets/aistudio/672352852_17870149437664194_5890226800590230447_n__1__50dae4cc.jpg",
    alt: "Rider #555 popping a wheelie through water crossing in front of spectators",
    caption: "River Wheelie · #555",
    imgClass: "object-cover object-[center_30%]"
  },
  {
    id: "forest-roots-climb",
    src: "/assets/aistudio/671136712_17871000903664194_8704857497115292326_n__1__d7b574a4.jpg",
    alt: "Hard enduro rider navigating steep forest logs and tree roots past spectators",
    caption: "Forest Roots Stage",
    imgClass: "object-cover object-[center_35%]"
  },
  {
    id: "rider-917-crowd",
    src: "/assets/aistudio/Moto_Enduro_Master_Proposal__2__b75a4b04.png",
    alt: "Rider #917 charging down the Pokhara track past PKR Riders banners and cheering fans",
    caption: "Trackside Crowd · #917",
    imgClass: "object-cover object-[center_22%] scale-[1.03]"
  },
  {
    id: "ktm-paddock-trio",
    src: "/assets/aistudio/Moto_Enduro_Master_Proposal__4__82afe659.png",
    alt: "Three riders in orange racing jerseys on bikes #43, #909, and #36 outside paddock tent",
    caption: "Paddock · #43, #909 & #36",
    imgClass: "object-cover object-[center_18%]"
  },
  {
    id: "riders-crew-group",
    src: "/assets/aistudio/Moto_Enduro_Master_Proposal__1__c6ed1c3e.png",
    alt: "Pokhara Moto Enduro riders and organizing team portrait",
    caption: "Riders & Crew, Pokhara",
    imgClass: "object-cover object-[center_18%] scale-[1.03]"
  },
  {
    id: "championship-highlights",
    src: "/assets/aistudio/Moto_Enduro_Master_Proposal__3__04a0628c.png",
    alt: "Pokhara Moto Enduro Championship highlights collage featuring river crossing, trophies, and packed spectator hill",
    caption: "Pokhara Highlights",
    imgClass: "object-cover object-center"
  }
];

export const GallerySection: React.FC = () => {
  return (
    <section id="gallery" className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Compact Header */}
        <div className="mb-5">
          <p className="text-xs font-medium text-[#D60A19] mb-0.5">
            Official Event Moments <span aria-hidden="true">·</span> Pokhara, Nepal
          </p>
          <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-zinc-900 leading-none">
            CHAMPIONSHIP GALLERY
          </h2>
        </div>

        {/* Compact Non-Clickable 4x2 Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {GALLERY_PHOTOS.map((photo) => (
            <figure
              key={photo.id}
              className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-900">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className={`w-full h-full block select-none ${photo.imgClass || "object-cover"}`}
                />
              </div>
              <figcaption className="px-3 py-2 text-[11px] font-medium text-zinc-700 border-t border-stone-100 truncate">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
