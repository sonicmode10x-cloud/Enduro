import React from "react";

export const PartnerStrip: React.FC = () => {
  return (
    <section
      id="partners"
      aria-label="Official Organizers & Sanctioning Partners"
      className="bg-white border-b border-stone-200/80 py-5 sm:py-7 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <img
          src="/assets/aistudio/Moto_Enduro_Master_Proposal_b6a698c1.png"
          alt="Official Organizers, Government Authorities, Pokhara Visit Year 2025, NTB, and FIM Sanctioning Partners"
          className="w-[70%] h-auto object-contain mx-auto block select-none"
        />
      </div>
    </section>
  );
};
