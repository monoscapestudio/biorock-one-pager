import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import svgPaths from "../imports/1920W/svg-gj00paujwo";
import { articles } from "./data/articles";
import { useHeaderVisibility } from "./hooks/useHeaderVisibility";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const headerVisible = useHeaderVisibility();
  const [menuOpen, setMenuOpen] = useState(false);
  const article = articles.find((a) => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F9F9F8] font-['Inter',sans-serif] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-bold text-[60.9px] text-[#111318] leading-[1.1] tracking-[-2.4px] mb-[30px]">
            Article not found
          </h1>
          <Link
            to="/"
            className="font-medium text-[16px] text-[#ADD54D] hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#F9F9F8] font-['Inter',sans-serif] selection:bg-[#ADD54D] selection:text-black">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#F9F9F8]/80 backdrop-blur-md transition-transform duration-500"
        style={{ transform: headerVisible ? "translateY(0)" : "translateY(-100%)" }}
      >
        <div className="max-w-[1920px] 2xl:max-w-[2560px] 3xl:max-w-[3840px] mx-auto px-[8.33vw] h-[72px] md:h-[100px] flex items-center justify-between">
          <Link to="/" className="w-[32px] h-[36px] relative">
            <svg
              className="w-full h-full"
              viewBox="0 0 320 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M89.9305 0.797488C118.165 -0.94267 212.525 -4.64275 197.1 50.0342C189.623 76.541 146.757 121.082 124.683 139.614C115.411 147.377 105.522 154.371 95.1139 160.527C72.3079 173.113 38.3825 183.802 15.7483 164.133C4.48388 154.345 0.714173 130.088 0.360264 115.84C-0.32775 84.5506 -1.01703 48.4608 21.851 23.9945C39.5126 5.09869 65.558 1.58835 89.9305 0.797488Z" fill="#0C0D11" />
              <path d="M244.656 179.646C253.938 178.386 265.267 180.288 274.076 183.377C291.932 189.637 306.139 203.937 314.05 220.899C318.696 230.859 322.218 243.604 317.879 254.254C309.507 274.803 285.767 278.421 267.538 285.198C257.558 288.909 244.471 296.017 236.933 303.362C216.489 323.283 220.51 342.669 192.062 355.403C187.388 357.297 182.458 358.49 177.434 358.942C148.381 361.553 122.46 344.736 120.652 314.325C118.958 285.81 135.628 254.744 153.553 233.667C176.85 206.274 207.725 182.712 244.656 179.646Z" fill="#0C0D11" />
              <path d="M113.021 166.142C129.079 164.328 142.625 173.813 149.283 187.917C160.301 210.484 144.142 229.651 132.47 247.697C119.357 267.971 113.493 287.419 111.364 311.379C109.93 327.511 107.949 347.625 90.5866 354.776C76.6436 360.519 60.1153 357.265 46.4828 351.9C41.0994 349.588 35.9907 346.683 31.2519 343.237C13.3067 329.92 3.93835 306.951 1.50763 285.322C-0.970373 257.982 -2.44094 225.056 14.2598 201.721C28.13 182.342 50.6032 186.342 71.2928 180.473C85.6293 176.406 98.6396 168.196 113.021 166.142Z" fill="#0C0D11" />
              <path d="M225.943 2.6292C244.425 1.68054 272.268 11.2878 286.488 22.8588C329.679 58.0057 325.376 117.46 263.592 124.24C256.183 124.813 248.74 124.827 241.327 124.279C229.993 123.541 186.134 118.42 178.323 112.771C176.374 111.362 174.927 109.331 174.574 106.912C173.942 102.583 178.432 96.737 181.005 93.4815C189.85 82.2932 199.964 70.4136 204.669 56.7363C209.805 41.8045 204.168 18.7397 211.058 9.46014C214.872 4.32399 220.023 3.48586 225.943 2.6292Z" fill="#0C0D11" />
              <path d="M200.838 183.855C193.142 190.634 184.186 179.538 190.266 172.432C198.625 162.663 216.695 149.068 226.476 144.111C237.183 138.686 247.709 126.831 259.531 139.358C260.322 140.395 261.054 141.502 261.719 142.669C263.859 146.378 265.166 151.307 264.501 155.598C261.64 174.076 247.825 172.847 236.612 172.432C226.077 172.042 209.149 176.535 200.838 183.855Z" fill="#0C0D11" />
              <path d="M310.794 279.722C316.787 279.184 320.527 283.171 319.94 288.902C318.371 304.209 307.743 322.236 296.687 332.383C281.773 346.07 256.952 356.941 236.744 356.277C235.684 355.845 234.634 355.387 233.595 354.904C222.397 349.63 226.383 336.624 230.514 327.857C245.2 296.679 281.208 290.312 310.794 279.722Z" fill="#0C0D11" />
              <path d="M207.226 137.86C197.005 151.914 173.547 178.745 163.428 178.745C153.309 178.745 142.066 162.73 142.066 150.289C142.066 137.847 156.127 125.39 167.926 125.39C179.724 125.39 217.447 123.806 207.226 137.86Z" fill="#0C0D11" />
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-[40px] items-center mt-2">
            {["about", "portfolio", "news", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
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
                  setMenuOpen(false);
                  navigate("/");
                  setTimeout(() => {
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="font-semibold text-[14px] text-[#111318] tracking-[0.52px] uppercase cursor-pointer bg-transparent border-none p-0 text-left hover:text-[#ADD54D] transition-colors"
              >
                {id}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-[1920px] 2xl:max-w-[2560px] 3xl:max-w-[3840px] mx-auto px-[8.33vw] pt-[120px] md:pt-[180px] pb-[80px] md:pb-[160px]">
        {/* Back link */}
        <button
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              document.getElementById("news")?.scrollIntoView();
            }, 100);
          }}
          className="inline-flex items-center gap-[10px] font-medium text-[13px] md:text-[14px] text-[#898989] tracking-[0.5px] uppercase hover:text-[#111318] transition-colors mb-[40px] md:mb-[80px] cursor-pointer bg-transparent border-none p-0"
        >
          <svg className="w-[14px] h-[10px] md:w-[16px] md:h-[12px] -scale-x-100" fill="none" viewBox="0 0 18 14">
            <path d={svgPaths.p3ce95c58} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
          </svg>
          Back to News
        </button>

        {/* Article header */}
        <div className="max-w-full md:max-w-[900px] 2xl:max-w-[1100px] 3xl:max-w-[1400px]">
          <p className="font-normal text-[12px] text-[#898989] tracking-[1px] uppercase mb-[20px] md:mb-[30px]">
            {article.date}
          </p>

          <div className="relative">
            <div className="absolute left-[-16px] md:left-[-30px] top-[4px] w-[3px] h-[60px] md:h-[85px] bg-[#ADD54D]"></div>
            <h1 className="font-bold text-[28px] md:text-[42px] 2xl:text-[52px] 3xl:text-[64px] text-[#111318] leading-[1.25] tracking-[-0.8px] md:tracking-[-1.2px] mb-[40px] md:mb-[60px]">
              {article.title}
            </h1>
          </div>

          <div className="font-normal text-[16px] md:text-[18px] 2xl:text-[20px] 3xl:text-[24px] text-[#111318] leading-[26px] md:leading-[30px] 2xl:leading-[32px] 3xl:leading-[38px] tracking-[-0.17px] space-y-[24px] md:space-y-[30px]">
            {article.body.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="border-t border-[#B3ABAB] mt-[60px] md:mt-[120px] pt-[40px] md:pt-[60px] flex flex-col sm:flex-row justify-between items-start gap-[30px] sm:gap-0">
          {prevArticle ? (
            <Link
              to={`/news/${prevArticle.slug}`}
              className="group flex flex-col gap-[8px] md:gap-[12px] max-w-[300px] md:max-w-[400px]"
            >
              <span className="font-normal text-[12px] text-[#898989] tracking-[1px] uppercase group-hover:text-[#111318] transition-colors">
                ← Previous
              </span>
              <span className="font-bold text-[16px] md:text-[18px] 2xl:text-[20px] text-[#111318] leading-[1.4] group-hover:text-[#ADD54D] transition-colors">
                {prevArticle.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextArticle ? (
            <Link
              to={`/news/${nextArticle.slug}`}
              className="group flex flex-col gap-[8px] md:gap-[12px] max-w-[300px] md:max-w-[400px] sm:text-right sm:items-end"
            >
              <span className="font-normal text-[12px] text-[#898989] tracking-[1px] uppercase group-hover:text-[#111318] transition-colors">
                Next →
              </span>
              <span className="font-bold text-[16px] md:text-[18px] 2xl:text-[20px] text-[#111318] leading-[1.4] group-hover:text-[#ADD54D] transition-colors">
                {nextArticle.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-black pt-[60px] md:pt-[100px] pb-[60px] md:pb-[80px]">
        <div className="max-w-[1920px] 2xl:max-w-[2560px] 3xl:max-w-[3840px] mx-auto px-[8.33vw]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-[#5F5F5F] pt-[30px] md:pt-[40px] gap-[16px] md:gap-0">
            <a
              href="mailto:opportunity@biorockventures.com"
              className="font-normal text-[16px] md:text-[18px] 2xl:text-[20px] text-[#ADD54D] tracking-[-0.17px] hover:opacity-80 transition-colors"
            >
              opportunity@biorockventures.com
            </a>
            <p className="font-normal text-[12px] md:text-[14px] text-[#F9F9F8] tracking-[1px] md:tracking-[1.44px]">
              © 2026 BioRock Ventures. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
