import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import svgPaths from "../imports/1920W/svg-gj00paujwo";
import imgStone from "../imports/1920W/stone_ver2.png";
import imgTeam from "../imports/1920W/788436aa4cc14bb18ebe0810bd83a50d76289502.png";
import { articles } from "./data/articles";
import { useHeaderVisibility } from "./hooks/useHeaderVisibility";

function useHeroParallax() {
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);
  const enabled = useRef(true);

  const update = useCallback(() => {
    if (!enabled.current) {
      ticking.current = false;
      return;
    }
    const scrollY = window.scrollY;
    if (heroImageRef.current) {
      heroImageRef.current.style.transform = `translate3d(0,${scrollY * 0.35}px,0)`;
    }
    if (heroTextRef.current) {
      heroTextRef.current.style.transform = `translate3d(0,${scrollY * 0.15}px,0)`;
    }
    ticking.current = false;
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      enabled.current = e.matches;
      if (!e.matches) {
        if (heroImageRef.current) heroImageRef.current.style.transform = "";
        if (heroTextRef.current) heroTextRef.current.style.transform = "";
      }
    };
    handleChange(mql);
    mql.addEventListener("change", handleChange);

    const onScroll = () => {
      if (!ticking.current && enabled.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      mql.removeEventListener("change", handleChange);
    };
  }, [update]);

  return { heroImageRef, heroTextRef };
}

const CARDS_PER_PAGE = 4;
const CARD_WIDTH = 461;
const CARD_GAP = 24;

export default function App() {
  const { heroImageRef, heroTextRef } = useHeroParallax();
  const headerVisible = useHeaderVisibility();
  const newsScrollRef = useRef<HTMLDivElement>(null);
  const [newsPage, setNewsPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalNewsPages = 3;

  const scrollToPage = useCallback((page: number) => {
    if (!newsScrollRef.current) return;
    const clamped = Math.max(1, Math.min(page, totalNewsPages));
    const offset = (clamped - 1) * (CARD_WIDTH + CARD_GAP) * CARDS_PER_PAGE;
    newsScrollRef.current.scrollTo({ left: offset, behavior: "smooth" });
    setNewsPage(clamped);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#F9F9F8] font-['Inter',sans-serif] selection:bg-[#ADD54D] selection:text-black" style={{ overflowX: "clip" }}>
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#F9F9F8]/80 backdrop-blur-md transition-transform duration-500"
        style={{ transform: headerVisible ? "translateY(0)" : "translateY(-100%)" }}
      >
        <div className="max-w-[1920px] 2xl:max-w-[2560px] 3xl:max-w-[3840px] mx-auto px-[8.33vw] h-[72px] md:h-[100px] flex items-center justify-between">
          {/* Logo Mark */}
          <div className="w-[32px] h-[36px] relative">
            <svg className="w-full h-full" viewBox="0 0 320 360" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M89.9305 0.797488C118.165 -0.94267 212.525 -4.64275 197.1 50.0342C189.623 76.541 146.757 121.082 124.683 139.614C115.411 147.377 105.522 154.371 95.1139 160.527C72.3079 173.113 38.3825 183.802 15.7483 164.133C4.48388 154.345 0.714173 130.088 0.360264 115.84C-0.32775 84.5506 -1.01703 48.4608 21.851 23.9945C39.5126 5.09869 65.558 1.58835 89.9305 0.797488Z" fill="#0C0D11"/>
              <path d="M244.656 179.646C253.938 178.386 265.267 180.288 274.076 183.377C291.932 189.637 306.139 203.937 314.05 220.899C318.696 230.859 322.218 243.604 317.879 254.254C309.507 274.803 285.767 278.421 267.538 285.198C257.558 288.909 244.471 296.017 236.933 303.362C216.489 323.283 220.51 342.669 192.062 355.403C187.388 357.297 182.458 358.49 177.434 358.942C148.381 361.553 122.46 344.736 120.652 314.325C118.958 285.81 135.628 254.744 153.553 233.667C176.85 206.274 207.725 182.712 244.656 179.646Z" fill="#0C0D11"/>
              <path d="M113.021 166.142C129.079 164.328 142.625 173.813 149.283 187.917C160.301 210.484 144.142 229.651 132.47 247.697C119.357 267.971 113.493 287.419 111.364 311.379C109.93 327.511 107.949 347.625 90.5866 354.776C76.6436 360.519 60.1153 357.265 46.4828 351.9C41.0994 349.588 35.9907 346.683 31.2519 343.237C13.3067 329.92 3.93835 306.951 1.50763 285.322C-0.970373 257.982 -2.44094 225.056 14.2598 201.721C28.13 182.342 50.6032 186.342 71.2928 180.473C85.6293 176.406 98.6396 168.196 113.021 166.142Z" fill="#0C0D11"/>
              <path d="M225.943 2.6292C244.425 1.68054 272.268 11.2878 286.488 22.8588C329.679 58.0057 325.376 117.46 263.592 124.24C256.183 124.813 248.74 124.827 241.327 124.279C229.993 123.541 186.134 118.42 178.323 112.771C176.374 111.362 174.927 109.331 174.574 106.912C173.942 102.583 178.432 96.737 181.005 93.4815C189.85 82.2932 199.964 70.4136 204.669 56.7363C209.805 41.8045 204.168 18.7397 211.058 9.46014C214.872 4.32399 220.023 3.48586 225.943 2.6292Z" fill="#0C0D11"/>
              <path d="M200.838 183.855C193.142 190.634 184.186 179.538 190.266 172.432C198.625 162.663 216.695 149.068 226.476 144.111C237.183 138.686 247.709 126.831 259.531 139.358C260.322 140.395 261.054 141.502 261.719 142.669C263.859 146.378 265.166 151.307 264.501 155.598C261.64 174.076 247.825 172.847 236.612 172.432C226.077 172.042 209.149 176.535 200.838 183.855Z" fill="#0C0D11"/>
              <path d="M310.794 279.722C316.787 279.184 320.527 283.171 319.94 288.902C318.371 304.209 307.743 322.236 296.687 332.383C281.773 346.07 256.952 356.941 236.744 356.277C235.684 355.845 234.634 355.387 233.595 354.904C222.397 349.63 226.383 336.624 230.514 327.857C245.2 296.679 281.208 290.312 310.794 279.722Z" fill="#0C0D11"/>
              <path d="M207.226 137.86C197.005 151.914 173.547 178.745 163.428 178.745C153.309 178.745 142.066 162.73 142.066 150.289C142.066 137.847 156.127 125.39 167.926 125.39C179.724 125.39 217.447 123.806 207.226 137.86Z" fill="#0C0D11"/>
            </svg>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-[40px] items-center mt-2">
            {["about", "portfolio", "news", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                className="nav-flip-btn font-semibold text-[12px] text-[#111318] tracking-[0.52px] uppercase cursor-pointer bg-transparent border-none p-0"
                data-text={id}
              >
                <span className="nav-flip-front">{id}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-[32px] h-[32px] bg-transparent border-none cursor-pointer p-0 gap-[6px]"
            aria-label="Toggle menu"
          >
            <span className={`block w-[22px] h-[2px] bg-[#111318] rounded-full transition-all duration-300 ${menuOpen ? "translate-y-[8px] rotate-45" : ""}`} />
            <span className={`block w-[22px] h-[2px] bg-[#111318] rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-[22px] h-[2px] bg-[#111318] rounded-full transition-all duration-300 ${menuOpen ? "-translate-y-[8px] -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-[#F9F9F8]/95 backdrop-blur-md border-t border-[#E5E5E5] transition-all duration-300 ${menuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-[10px]"}`}
        >
          <nav className="flex flex-col px-[8.33vw] py-[32px] gap-[24px]">
            {["about", "portfolio", "news", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => {
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  setMenuOpen(false);
                }}
                className="font-semibold text-[14px] text-[#111318] tracking-[0.52px] uppercase cursor-pointer bg-transparent border-none p-0 text-left hover:text-[#ADD54D] transition-colors"
              >
                {id}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] md:min-h-[700px] lg:h-[973px] 2xl:h-[1100px] 3xl:h-[1400px] bg-[#F9F9F8]" style={{ overflow: "clip", contain: "paint layout" }}>
        <div className="max-w-[1920px] 2xl:max-w-[2560px] 3xl:max-w-[3840px] mx-auto relative h-full">
          {/* Vertical Green Line */}
          <div className="absolute left-[0] top-[195px] w-[10px] h-[663px] bg-[#ADD54D] hidden xl:block"></div>

          {/* Hero Content */}
          <div ref={heroTextRef} className="relative lg:absolute left-0 lg:left-[8.33vw] top-0 lg:top-[269px] z-10 will-change-transform px-[8.33vw] lg:px-0 pt-[140px] lg:pt-0">
            <div className="mb-[20px] lg:mb-[30px]">
              <svg className="w-[260px] md:w-[340px] lg:w-[425px] h-auto mb-[12px] lg:mb-[17px]" fill="none" viewBox="0 0 425.447 92.7828">
                <path d={svgPaths.p48de800} fill="#111318" />
                <path d={svgPaths.p7f13d00} fill="#111318" />
                <path d={svgPaths.p1310a700} fill="#111318" />
                <path d={svgPaths.p17f7700} fill="#111318" />
                <path d={svgPaths.p1f9389c0} fill="#111318" />
                <path d={svgPaths.p34a35ec0} fill="#111318" />
                <path d={svgPaths.p27cf6100} fill="#111318" />
              </svg>
              <p className="font-bold text-[14px] md:text-[16px] lg:text-[18.3px] text-[#111318] tracking-[5px] lg:tracking-[8.2px] uppercase ml-[2px]">VENTURES</p>
            </div>
            
            <h1 className="font-bold text-[#111318] leading-[1.1] tracking-[-1.5px] lg:tracking-[-2.4px] max-w-[782px]" style={{ fontSize: "var(--text-display)" }}>
              is a seed VC fund investing in the novel medicines of tomorrow, today.
            </h1>
          </div>

          {/* Hero Vertical Line & Scroll Icon */}
          <div className="absolute left-[calc(8.33vw+2px)] top-[659px] w-[1px] h-[199px] bg-black hidden xl:block"></div>
          <div className="absolute left-[calc(8.33vw-4px)] top-[886px] w-[13px] h-[21px] rounded-full border border-black hidden xl:flex items-start justify-center pt-[4px]">
            <div className="w-[1px] h-[6px] bg-black"></div>
          </div>

          {/* Hero Image */}
          <div ref={heroImageRef} className="relative lg:absolute right-auto lg:right-[3.16vw] top-auto lg:top-[127px] 2xl:top-[150px] w-[300px] md:w-[400px] lg:w-[660px] 2xl:w-[800px] 3xl:w-[1000px] h-[300px] md:h-[400px] lg:h-[660px] 2xl:h-[800px] 3xl:h-[1000px] z-0 will-change-transform mx-auto lg:mx-0 mt-[40px] lg:mt-0">
            <img
              src={imgStone}
              alt="Polished Stone"
              className="w-full h-full object-contain pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative w-full bg-black pb-[80px] md:pb-[180px]" style={{ overflow: "clip", contain: "paint layout" }}>
        <div className="max-w-[1920px] 2xl:max-w-[2560px] 3xl:max-w-[3840px] mx-auto relative pt-[60px] md:pt-[120px]">
          
          {/* Top About Text */}
          <div className="flex flex-col lg:flex-row px-[8.33vw] justify-between mt-[30px] md:mt-[50px]">
            <div className="w-full lg:w-[45%]">
              <p className="font-normal text-[16px] text-[#F9F9F8] tracking-[1.44px] uppercase mb-[40px] md:mb-[370px]">
                ABOUT
              </p>
              <p className="font-normal text-[16px] md:text-[18px] 2xl:text-[20px] 3xl:text-[24px] text-[#F9F9F8] leading-[25px] md:leading-[27.2px] 2xl:leading-[30px] 3xl:leading-[36px] tracking-[-0.17px] max-w-[784px] 2xl:max-w-[900px] 3xl:max-w-[1100px]">
                Seed-sized investments into private life science companies developing novel FDA regulated therapeutic drugs. Angel, Seed, Series A, through pre-IPO/M&A. All disease areas, all stages, all therapeutic modalities.
              </p>
            </div>
            <div className="w-full lg:w-[50%] pt-[40px] lg:pt-[109px]">
              <h2 className="font-bold text-[#F9F9F8] leading-[1.1] tracking-[-1.5px] lg:tracking-[-2.4px]" style={{ fontSize: "var(--text-display)" }}>
                BioRock Ventures invests<br />in therapeutics startups
              </h2>
            </div>
          </div>

          {/* Team Member Wrapper - sticky photo + scrolling text */}
          <div className="relative mt-[80px] md:mt-[210px]">
            {/* Sticky Photo Column — hidden on mobile, sticky on desktop */}
            <div className="hidden md:block absolute top-0 bottom-0 left-[calc(50%+10px)] w-[50vw] lg:w-[942px]">
              <div className="sticky top-0 h-[70vh] lg:h-[1076px]">
                <img
                  src={imgTeam}
                  alt="Mary Wheeler"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[39.6%] to-black"></div>
              </div>
            </div>

            {/* Mobile Photo — visible only on mobile */}
            <div className="md:hidden w-full h-[60vh] relative mb-[-40px]">
              <img
                src={imgTeam}
                alt="Mary Wheeler"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[39.6%] to-black"></div>
            </div>

            {/* Scrolling Content */}
            <div className="relative z-20 px-[8.33vw] md:pl-[8.33vw] md:pr-0">
              {/* Giant Overlapping Text */}
              <div className="pt-[40px] md:pt-[212px] pointer-events-none" style={{ width: "min(1100px, 85vw)" }}>
                <h3 className="font-semibold text-white leading-[0.88] tracking-[0.32px] m-0" style={{ fontSize: "var(--text-display-xl)" }}>
                  Mary Wheeler
                </h3>
                <p className="font-semibold text-[#2f2f2f] leading-[0.88] tracking-[0.32px] m-0 whitespace-nowrap" style={{ fontSize: "var(--text-display-xl)" }}>
                  PhD, MBA
                </p>
              </div>

              {/* Bio Info Block */}
              <div className="pt-[60px] md:pt-[100px] max-w-[785px] 2xl:max-w-[900px] 3xl:max-w-[1100px]">
                <p className="font-bold text-[#ADD54D] leading-[1.1] tracking-[-1.5px] lg:tracking-[-2.4px] mb-[30px] md:mb-[46px]" style={{ fontSize: "var(--text-display)" }}>
                  Managing Director
                </p>
                
                <div className="font-normal text-[16px] md:text-[18px] 2xl:text-[20px] 3xl:text-[24px] text-[#F9F9F8] leading-[25px] md:leading-[27.2px] 2xl:leading-[30px] 3xl:leading-[36px] tracking-[-0.17px] space-y-[20px] md:space-y-[27.2px] mb-[40px]">
                  <p>
                    Mary is founding managing partner of BioRock Ventures in the Bay Area, CA. Mary began two decades of operating experience as a therapeutics startup founder in Boston. She moved to roles leading negotiations, business and technical evaluations for M&A and licensing deals as well as strategy roles at large and medium pharmaceuticals companies like Johnson & Johnson and Forest (now Allergan|Abbvie) in NYC. She also has served as consulting CBO for several dozen early stage ventures around the world. She began venture investing a decade ago where she helped form and put first money into two new companies which each had IPO exits valued over $1 Billion.
                  </p>
                  <p>
                    Mary is a Kauffman Fellow, earned an MBA from MITSloan, a PhD from Princeton University and an undergraduate degree from Yale University. She enjoys lots of sports including snowboarding.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-[18px]">
                  <a href="mailto:opportunity@biorockventures.com" className="font-normal text-[16px] md:text-[18px] text-[#ADD54D] tracking-[-0.17px] hover:opacity-80 transition-opacity">
                    opportunity@biorockventures.com
                  </a>
                  <div className="w-[21px] h-[1px] bg-[#6A6A6A]"></div>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="block w-6 h-6 hover:opacity-80 transition-opacity">
                    <svg className="w-full h-full" fill="none" viewBox="0 0 19.5 19.5">
                      <path d={svgPaths.p37558500} stroke="#ADD54D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p3862d7a0} stroke="#ADD54D" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                      <path d={svgPaths.p1e06ed00} fill="#ADD54D" stroke="#ADD54D" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="bg-[#F2F2F2] py-[80px] md:py-[160px]" style={{ contain: "paint layout" }}>
        <div className="max-w-[1920px] 2xl:max-w-[2560px] 3xl:max-w-[3840px] mx-auto px-[8.33vw]">
          <p className="font-normal text-[16px] text-black tracking-[1.44px] uppercase mb-[50px] md:mb-[100px]">
            PORTFOLIO
          </p>
          
          {/* Fund I */}
          <div className="mb-[80px] md:mb-[160px]">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-[30px] md:pb-[50px] border-b border-[#B3ABAB] gap-[12px]">
              <div className="flex items-start gap-0">
                <div className="w-[3px] h-[40px] bg-[#ADD54D] shrink-0 mt-[3px]"></div>
                <h3 className="font-bold text-[18px] md:text-[21px] 2xl:text-[26px] 3xl:text-[32px] text-black leading-[0.88] tracking-[-0.4px] ml-[14px]">
                  Fund I
                </h3>
              </div>
              <p className="font-bold text-[14px] md:text-[16px] text-[#111318] leading-[1.2] sm:text-right pl-[17px] sm:pl-0">
                Stealth Phase 1 MS company
              </p>
            </div>
            <div className="group cursor-pointer border-b border-[#B3ABAB] h-auto min-h-[120px] md:h-[248px] 2xl:h-[300px] 3xl:h-[380px] flex items-center pl-[17px] md:pl-[34px] py-[30px] md:py-0 transition-all duration-500 hover:bg-black hover:shadow-[-8.33vw_0_0_0_black,8.33vw_0_0_0_black]">
              <h4 className="font-bold text-black leading-[1.1] tracking-[-1.5px] lg:tracking-[-2.4px] transition-colors duration-500 group-hover:text-[#ADD54D]" style={{ fontSize: "var(--text-display)" }}>
                Immusoft
              </h4>
            </div>
          </div>

          {/* Fund II */}
          <div className="mb-[80px] md:mb-[160px]">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-[30px] md:pb-[50px] border-b border-[#B3ABAB] gap-[12px]">
              <div className="flex items-start gap-0">
                <div className="w-[3px] h-[40px] bg-[#ADD54D] shrink-0 mt-[3px]"></div>
                <h3 className="font-bold text-[18px] md:text-[21px] 2xl:text-[26px] 3xl:text-[32px] text-black leading-[0.88] tracking-[-0.4px] ml-[14px]">
                  Fund II
                </h3>
              </div>
              <div className="shrink-0 pl-[17px] sm:pl-0">
                <p className="font-bold text-[14px] md:text-[16px] text-[#111318] leading-[1.2]">
                  Disclosed Investments
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              {[
                ["Primmune", "Therapeutics"],
                ["PTM", "Therapeutics, Inc."],
                ["Octagon", "Therapeutics"],
                ["Veana", "Therapeutics"],
              ].map(([line1, line2], i) => (
                <div key={i} className="group cursor-pointer border-b border-[#B3ABAB] h-auto min-h-[120px] md:h-[248px] 2xl:h-[300px] 3xl:h-[380px] flex items-center pl-[17px] md:pl-[34px] py-[30px] md:py-0 transition-all duration-500 hover:bg-black hover:shadow-[-8.33vw_0_0_0_black,8.33vw_0_0_0_black]">
                  <h4 className="font-bold text-black leading-[1.1] tracking-[-1.5px] lg:tracking-[-2.4px] transition-colors duration-500 group-hover:text-[#ADD54D]" style={{ fontSize: "var(--text-display)" }}>
                    {line1}<br />{line2}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Past Investments */}
          <div className="pt-[40px]">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-[30px] md:pb-[50px] border-b border-[#B3ABAB] gap-[12px]">
              <div className="flex items-start gap-0">
                <div className="w-[3px] h-[40px] bg-[#ADD54D] shrink-0 mt-[3px]"></div>
                <h3 className="font-bold text-[18px] md:text-[21px] 2xl:text-[26px] 3xl:text-[32px] text-black leading-[0.88] tracking-[-0.4px] ml-[14px]">
                  Past Investments
                </h3>
              </div>
              <div className="shrink-0 pl-[17px] sm:pl-0">
                <p className="font-bold text-[14px] md:text-[16px] text-[#111318] leading-[1.2]">
                  by the BioRock Team
                </p>
              </div>
            </div>

            <div className="group cursor-pointer border-b border-[#B3ABAB] h-auto min-h-[120px] md:h-[248px] 2xl:h-[300px] 3xl:h-[380px] pl-[17px] md:pl-[34px] flex flex-col md:flex-row md:justify-between items-start md:items-center py-[30px] md:py-0 gap-[12px] transition-all duration-500 hover:bg-black hover:shadow-[-8.33vw_0_0_0_black,8.33vw_0_0_0_black]">
              <h4 className="font-bold text-black leading-[1.1] tracking-[-1.5px] lg:tracking-[-2.4px] transition-colors duration-500 group-hover:text-[#ADD54D]" style={{ fontSize: "var(--text-display)" }}>
                Vaxcyte
              </h4>
              <p className="font-bold text-[21px] text-[#111318] leading-[0.88] mb-[15px] transition-colors duration-500 group-hover:text-[#ADD54D]">
                First money in, NewCo founding, IPO 2020
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="bg-[#F9F9F8] py-[80px] md:py-[160px]" style={{ overflow: "clip", contain: "paint layout" }}>
        <div className="max-w-[1920px] 2xl:max-w-[2560px] 3xl:max-w-[3840px] mx-auto">
          {/* Header row: title left, pagination right */}
          <div className="flex items-center justify-between px-[8.33vw] mb-[50px] md:mb-[100px]">
            <p className="font-normal text-[14px] md:text-[15.6px] text-black tracking-[1.44px] uppercase">
              News & Thoughts
            </p>

            <div className="flex items-center gap-[16px] md:gap-[24px]">
              <button
                onClick={() => scrollToPage(newsPage - 1)}
                className={`flex items-center justify-center w-[36px] h-[36px] md:w-[40px] md:h-[40px] rounded-full border transition-all duration-300 -scale-x-100 ${newsPage <= 1 ? "border-[#B3ABAB] text-[#B3ABAB] cursor-default" : "border-black text-black hover:bg-black hover:text-white"}`}
              >
                <svg className="w-[14px] h-[10px] md:w-[16px] md:h-[12px]" fill="none" viewBox="0 0 18 14">
                  <path d={svgPaths.p3ce95c58} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                </svg>
              </button>
              <span className="font-normal text-[13px] md:text-[14px] text-[#898989] tracking-[0.5px] tabular-nums">
                {String(newsPage).padStart(2, "0")} / {String(totalNewsPages).padStart(2, "0")}
              </span>
              <button
                onClick={() => scrollToPage(newsPage + 1)}
                className={`flex items-center justify-center w-[36px] h-[36px] md:w-[40px] md:h-[40px] rounded-full border transition-all duration-300 ${newsPage >= totalNewsPages ? "border-[#B3ABAB] text-[#B3ABAB] cursor-default" : "border-black text-black hover:bg-black hover:text-white"}`}
              >
                <svg className="w-[14px] h-[10px] md:w-[16px] md:h-[12px]" fill="none" viewBox="0 0 18 14">
                  <path d={svgPaths.p3ce95c58} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
          </div>

          <div ref={newsScrollRef} className="flex gap-[16px] md:gap-[24px] overflow-x-auto pl-[8.33vw] pr-[8.33vw] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory md:snap-none">
            {articles.map((item, i) => (
              <Link key={i} to={`/news/${item.slug}`} className="no-underline">
                <article className="group relative border border-[#B3ABAB] w-[calc(100vw-16.66vw)] sm:w-[340px] md:w-[380px] lg:w-[461px] 2xl:w-[540px] 3xl:w-[680px] h-[520px] md:h-[640px] 2xl:h-[720px] 3xl:h-[860px] shrink-0 pt-[60px] md:pt-[84px] pb-[40px] md:pb-[50px] px-[24px] md:px-[40px] 2xl:px-[50px] flex flex-col justify-between cursor-pointer transition-all duration-500 hover:bg-black hover:border-black snap-start">
                  <div className="absolute left-[-1px] top-[65px] md:top-[89px] w-[3px] h-[85px] bg-[#ADD54D]"></div>
                  <div>
                    <p className="font-normal text-[12px] text-[#898989] tracking-[1px] uppercase mb-[16px] md:mb-[20px] transition-colors duration-500 group-hover:text-[#898989]">
                      {item.date}
                    </p>
                    <h3 className="font-bold text-[18px] md:text-[21.1px] text-[#111318] leading-[1.4] max-w-[300px] transition-colors duration-500 group-hover:text-[#ADD54D]">
                      {item.title}
                    </h3>
                  </div>
                  <div>
                    <p className="font-normal text-[13px] md:text-[14px] text-black leading-[22px] md:leading-[24px] tracking-[1px] md:tracking-[1.44px] max-w-[383px] mb-[24px] md:mb-[30px] transition-colors duration-500 group-hover:text-white">
                      {item.excerpt}
                    </p>
                    <span className="font-medium text-[13px] md:text-[14px] text-[#111318] tracking-[0.5px] transition-colors duration-500 group-hover:text-white">
                      Read more →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black pt-[100px] md:pt-[200px] pb-[60px] md:pb-[80px] relative overflow-hidden">
        {/* Footer Green Line */}
        <div className="absolute left-[0] top-[580px] w-[10px] h-[663px] bg-[#ADD54D] hidden xl:block"></div>

        <div className="max-w-[1920px] 2xl:max-w-[2560px] 3xl:max-w-[3840px] mx-auto px-[8.33vw] relative z-10">

          {/* Top row: logo left, nav + email right */}
          <div className="flex flex-col md:flex-row items-start justify-between mb-[80px] md:mb-[180px] gap-[40px] md:gap-0">
            {/* Shield Logo */}
            <div className="w-[60px] h-[67px] md:w-[87px] md:h-[98px]">
              <svg className="w-full h-full" viewBox="0 0 320 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M89.9305 0.797488C118.165 -0.94267 212.525 -4.64275 197.1 50.0342C189.623 76.541 146.757 121.082 124.683 139.614C115.411 147.377 105.522 154.371 95.1139 160.527C72.3079 173.113 38.3825 183.802 15.7483 164.133C4.48388 154.345 0.714173 130.088 0.360264 115.84C-0.32775 84.5506 -1.01703 48.4608 21.851 23.9945C39.5126 5.09869 65.558 1.58835 89.9305 0.797488Z" fill="#F9F9F8"/>
                <path d="M244.656 179.646C253.938 178.386 265.267 180.288 274.076 183.377C291.932 189.637 306.139 203.937 314.05 220.899C318.696 230.859 322.218 243.604 317.879 254.254C309.507 274.803 285.767 278.421 267.538 285.198C257.558 288.909 244.471 296.017 236.933 303.362C216.489 323.283 220.51 342.669 192.062 355.403C187.388 357.297 182.458 358.49 177.434 358.942C148.381 361.553 122.46 344.736 120.652 314.325C118.958 285.81 135.628 254.744 153.553 233.667C176.85 206.274 207.725 182.712 244.656 179.646Z" fill="#F9F9F8"/>
                <path d="M113.021 166.142C129.079 164.328 142.625 173.813 149.283 187.917C160.301 210.484 144.142 229.651 132.47 247.697C119.357 267.971 113.493 287.419 111.364 311.379C109.93 327.511 107.949 347.625 90.5866 354.776C76.6436 360.519 60.1153 357.265 46.4828 351.9C41.0994 349.588 35.9907 346.683 31.2519 343.237C13.3067 329.92 3.93835 306.951 1.50763 285.322C-0.970373 257.982 -2.44094 225.056 14.2598 201.721C28.13 182.342 50.6032 186.342 71.2928 180.473C85.6293 176.406 98.6396 168.196 113.021 166.142Z" fill="#F9F9F8"/>
                <path d="M225.943 2.6292C244.425 1.68054 272.268 11.2878 286.488 22.8588C329.679 58.0057 325.376 117.46 263.592 124.24C256.183 124.813 248.74 124.827 241.327 124.279C229.993 123.541 186.134 118.42 178.323 112.771C176.374 111.362 174.927 109.331 174.574 106.912C173.942 102.583 178.432 96.737 181.005 93.4815C189.85 82.2932 199.964 70.4136 204.669 56.7363C209.805 41.8045 204.168 18.7397 211.058 9.46014C214.872 4.32399 220.023 3.48586 225.943 2.6292Z" fill="#F9F9F8"/>
                <path d="M200.838 183.855C193.142 190.634 184.186 179.538 190.266 172.432C198.625 162.663 216.695 149.068 226.476 144.111C237.183 138.686 247.709 126.831 259.531 139.358C260.322 140.395 261.054 141.502 261.719 142.669C263.859 146.378 265.166 151.307 264.501 155.598C261.64 174.076 247.825 172.847 236.612 172.432C226.077 172.042 209.149 176.535 200.838 183.855Z" fill="#F9F9F8"/>
                <path d="M310.794 279.722C316.787 279.184 320.527 283.171 319.94 288.902C318.371 304.209 307.743 322.236 296.687 332.383C281.773 346.07 256.952 356.941 236.744 356.277C235.684 355.845 234.634 355.387 233.595 354.904C222.397 349.63 226.383 336.624 230.514 327.857C245.2 296.679 281.208 290.312 310.794 279.722Z" fill="#F9F9F8"/>
                <path d="M207.226 137.86C197.005 151.914 173.547 178.745 163.428 178.745C153.309 178.745 142.066 162.73 142.066 150.289C142.066 137.847 156.127 125.39 167.926 125.39C179.724 125.39 217.447 123.806 207.226 137.86Z" fill="#F9F9F8"/>
              </svg>
            </div>

            {/* Nav + email */}
            <div className="flex flex-col items-start gap-[16px]">
              <nav className="flex flex-row md:flex-col gap-[20px] md:gap-[16px]">
                {["about", "portfolio", "news"].map((id) => (
                  <button
                    key={id}
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                    className="font-semibold text-[12px] text-[#F9F9F8] tracking-[0.52px] uppercase hover:text-[#ADD54D] transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
                  >
                    {id}
                  </button>
                ))}
              </nav>
              <a href="mailto:opportunity@biorockventures.com" className="font-normal text-[13px] md:text-[14px] text-[#ADD54D] tracking-[-0.17px] hover:opacity-80 transition-colors mt-[16px]">
                opportunity@biorockventures.com
              </a>
            </div>
          </div>

          {/* Large BioRock wordmark */}
          <div className="w-full max-w-[1567px]">
            <svg className="w-full h-auto" fill="none" viewBox="0 0 1567.47 341.838">
              <path d={svgPaths.p1478140} fill="#F9F9F8" />
              <path d={svgPaths.p145b1800} fill="#F9F9F8" />
              <path d={svgPaths.p3830c1f0} fill="#F9F9F8" />
              <path d={svgPaths.p19b09700} fill="#F9F9F8" />
              <path d={svgPaths.p24a9400} fill="#F9F9F8" />
              <path d={svgPaths.pde29800} fill="#F9F9F8" />
              <path d={svgPaths.p14da6080} fill="#F9F9F8" />
            </svg>
          </div>

          <p className="font-bold text-[#F9F9F8] mt-[12px] md:mt-[20px]" style={{ fontSize: "var(--text-display-footer)", letterSpacing: "clamp(8px, 1.45vw, 27.9px)" }}>
            VENTURES
          </p>

          {/* Bottom bar */}
          <div className="flex justify-center md:justify-end border-t border-[#5F5F5F] mt-[50px] md:mt-[80px] pt-[30px] md:pt-[40px]">
            <p className="font-normal text-[12px] md:text-[14px] text-[#F9F9F8] tracking-[1px] md:tracking-[1.44px]">
              © 2026 BioRock Ventures. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}