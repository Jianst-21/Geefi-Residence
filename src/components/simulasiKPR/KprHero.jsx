export default function KprHero() {
    return (
        <section className="w-full bg-[#FAFAFA] pt-[24px] pb-[24px] md:pt-[56px] md:pb-[48px]">
            <div className="flex flex-col items-center text-center px-[9.5px] md:px-4 max-w-4xl mx-auto gap-[16px]">
                
                {/* OVERLINE */}
                <span className="text-[#C5A25D] text-[12px] font-bold leading-[16px] tracking-[2.4px] uppercase">
                    Perencanaan Finansial
                </span>

                {/* TITLE */}
                <h1 className="text-[52px] md:text-[72px] font-bold leading-[56px] md:leading-[72px] tracking-[-3.6px] text-gray-900">
                    Simulasi KPR <br className="block md:hidden" /> Eksklusif.
                </h1>

                {/* DESCRIPTION - DESKTOP (Hidden on mobile) */}
                <p className="hidden md:block text-[#5F5E5E] text-[18px] font-normal leading-[29.3px] tracking-[0px]">
                    Wujudkan hunian impian dengan perencanaan yang matang. Kalkulator canggih <br />
                    kami membantu Anda merinci setiap detail cicilan untuk kenyamanan jangka <br />
                    panjang.
                </p>

                {/* DESCRIPTION - MOBILE (Hidden on desktop) */}
                <p className="block md:hidden text-[#5F5E5E] text-[18px] font-normal leading-[29.3px] tracking-[0px]">
                    Wujudkan hunian impian dengan <br />
                    perencanaan yang matang. Kalkulator <br />
                    canggih kami membantu Anda merinci <br />
                    setiap detail cicilan untuk <br />
                    kenyamanan jangka panjang.
                </p>
                
            </div>
        </section>
    );
}