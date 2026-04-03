import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const FOOTER_MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.888396761881!2d29.113666276817327!3d40.98392457135402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac617fbc497dd%3A0x1d053341c513a2c5!2zS8O8w6fDvGtiYWtrYWxrw7Z5LCBHw7xsIEHEn6FjxLEgU29rLiBObzo1LCAzNDc1MCBBdGHFn2VoaXIvxLBzdGFuYnVs!5e0!3m2!1sen!2str!4v1775155436232!5m2!1sen!2str";

function App() {
  const { t, i18n } = useTranslation();
  const [expandedCards, setExpandedCards] = useState({});
  const cardRefs = useRef({});

  const bundle = i18n.getResourceBundle(i18n.language, "translation");
  const products = bundle?.products ?? [];

  const changeLanguage = (lng) => {
    void i18n.changeLanguage(lng);
    setExpandedCards({});
  };

  const toggleCard = (productId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const focusProductCard = (productId) => {
    const cardElement = cardRefs.current[productId];
    if (!cardElement) return;

    cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
    cardElement.focus({ preventScroll: true });
  };

  return (
    <main className="flex min-h-screen w-full min-w-0 flex-col items-stretch bg-slate-950 text-slate-100">
      {/* min-h-screen + grid: 100dvh yerine sabit yükseklik modeli; md aralığında vw/dvh kaynaklı genişlik zıplamasını keser */}
      <div className="grid min-h-screen w-full min-w-0 max-w-none grid-rows-[minmax(0,1fr)_auto]">
        <section className="relative flex min-h-0 w-full min-w-0 flex-col overflow-hidden">
          <img
            src="/images/eldes-bg.webp"
            alt={t("hero.imageAlt")}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-[6] w-full max-w-[56rem] -translate-x-1/2 -translate-y-1/2 px-4 text-center">
            <p className="whitespace-pre-line font-['Boldonse',sans-serif] text-2xl font-normal leading-relaxed tracking-wide text-slate-100 [paint-order:stroke_fill] [-webkit-text-stroke:1.75px_rgb(2_6_23)] [text-shadow:0_0_1px_rgb(2_6_23),0_0_14px_rgb(2_6_23/0.6)] md:text-3xl md:[-webkit-text-stroke:2px_rgb(2_6_23)] md:[text-shadow:0_0_1px_rgb(2_6_23),0_0_18px_rgb(2_6_23/0.55)] lg:text-4xl lg:[-webkit-text-stroke:2.25px_rgb(2_6_23)]">
              {t("hero.statement")}
            </p>
          </div>
          <header className="relative z-10 w-full px-4 py-4 md:px-10">
            <div className="flex w-full items-start justify-between gap-3 sm:gap-4">
              <div className="flex min-w-0 items-center">
                <img
                  src="/images/eldes_logo.jpg"
                  alt={t("header.logoAlt")}
                  className="h-12 w-auto object-contain md:h-14"
                />
                <div className="hidden pl-4 text-left leading-tight text-slate-100 md:block">
                  <p className="text-sm font-semibold md:text-base">
                    {t("header.brandName")}
                  </p>
                  <p className="text-xs md:text-sm">
                    {t("header.companyLegal")}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2 text-sm leading-6 text-slate-100 md:text-base">
                <div className="flex items-center gap-1 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => changeLanguage("tr")}
                    className={`rounded px-1.5 py-0.5 transition ${
                      i18n.language.startsWith("tr")
                        ? "text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    TR
                  </button>
                  <span className="text-slate-500" aria-hidden="true">
                    |
                  </span>
                  <button
                    type="button"
                    onClick={() => changeLanguage("en")}
                    className={`rounded px-1.5 py-0.5 transition ${
                      i18n.language.startsWith("en")
                        ? "text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    EN
                  </button>
                </div>
                <p>
                  <a
                    href={`mailto:${t("footer.email")}`}
                    className="transition hover:text-cyan-200"
                  >
                    {t("footer.email")}
                  </a>
                </p>
                <p>{t("header.tel")}</p>
              </div>
            </div>
          </header>
        </section>

        <div className="w-full shrink-0 border-t border-slate-800/70 bg-slate-950">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-10">
            <h2
              id="urunlerimiz"
              className="scroll-mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl"
            >
              {t("sections.productsTitle")}
            </h2>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 pb-8 pt-6 md:px-8">
        <section className="grid items-start gap-5 md:grid-cols-2">
          {products.map((product) => {
            const isExpanded = Boolean(expandedCards[product.id]);

            return (
              <article
                key={product.id}
                id={`product-${product.id}`}
                ref={(element) => {
                  cardRefs.current[product.id] = element;
                }}
                tabIndex={-1}
                className={`flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-slate-950/30 ${
                  isExpanded ? "h-auto" : "h-[42rem]"
                } focus:outline-none focus:ring-2 focus:ring-emerald-400/70 focus:ring-offset-2 focus:ring-offset-slate-950`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  {product.title}
                </p>
                <p className="text-sm text-slate-400">{product.subtitle}</p>
                <div className="relative mt-3 overflow-hidden rounded-xl border border-white/15 bg-slate-700/20 p-3 shadow-lg shadow-black/20">
                  <img
                    src={product.image}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-sm"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-slate-900/25 backdrop-blur-sm" />
                  <img
                    src={product.image}
                    alt={product.title}
                    className="relative z-[1] h-44 w-full rounded-lg object-contain"
                  />
                </div>

                <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-300">
                  {product.description.length > 100 &&
                  !expandedCards[product.id]
                    ? `${product.description.slice(0, 100)}... `
                    : product.description}
                  {product.description.length > 100 && (
                    <button
                      type="button"
                      onClick={() => toggleCard(product.id)}
                      className="ml-1 inline text-sm font-medium text-emerald-200 underline decoration-emerald-400/60 underline-offset-2 transition hover:text-emerald-100"
                    >
                      {expandedCards[product.id]
                        ? t("card.collapse")
                        : t("card.expand")}
                    </button>
                  )}
                </p>

                <div className="mt-5 flex-1">
                  <h3 className="text-sm font-semibold text-emerald-200">
                    {t("card.documents")}
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {product.docs.map((doc) => (
                      <li key={doc.href}>
                        <a
                          href={doc.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-full items-center justify-between rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-slate-100 transition hover:border-emerald-400 hover:text-emerald-200"
                        >
                          <span>{doc.label}</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {product.sales ? (
                  <div className="mt-5 border-t border-slate-800 pt-4">
                    <h3 className="text-sm font-semibold text-emerald-200">
                      {t("card.sales")}
                    </h3>
                    <a
                      href={product.sales}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex text-sm text-slate-200 underline decoration-slate-500 underline-offset-4 transition hover:text-emerald-200"
                    >
                      {t("card.salesPartner")}
                    </a>
                  </div>
                ) : null}
              </article>
            );
          })}
        </section>
      </div>

      <footer className="w-full border-t border-slate-800 bg-slate-950 px-4 py-10 md:px-10">
        <div className="grid w-full grid-cols-1 justify-items-start gap-y-10 text-left md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-x-8 md:gap-y-0 md:justify-items-stretch lg:gap-x-12">
          <section className="flex w-full max-w-sm flex-col items-start md:max-w-none">
            <div className="w-48 md:w-56">
              <img
                src="/images/eldes_logo.jpg"
                alt={t("footer.logoAlt")}
                className="h-auto w-full object-contain"
              />
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {t("footer.companyWithYear")}
              </p>
            </div>
          </section>

          <section className="flex w-full max-w-sm flex-col items-start md:w-max md:max-w-none md:shrink-0 md:px-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
              {t("footer.productsHeading")}
            </h3>
            <ul className="mt-3 w-full space-y-2 text-sm text-slate-300">
              {products.map((product) => (
                <li key={`footer-${product.id}`}>
                  <button
                    type="button"
                    onClick={() => focusProductCard(product.id)}
                    className="text-left underline decoration-slate-500 underline-offset-4 transition hover:text-emerald-200"
                  >
                    {product.title}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex w-full max-w-md flex-col items-start md:max-w-none">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
              {t("footer.contactHeading")}
            </h3>
            <div className="mt-3 flex w-full flex-col items-start gap-4 md:flex-row md:gap-6">
              <div className="hidden w-full shrink-0 overflow-hidden rounded-lg border border-slate-800 shadow-lg shadow-black/20 md:block md:w-72 lg:w-80">
                <iframe
                  src={FOOTER_MAP_EMBED_SRC}
                  title={t("footer.mapIframeTitle")}
                  className="h-[220px] w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="min-w-0 max-w-md flex-1 text-sm leading-6 text-slate-300">
                <p>{t("footer.addressLine1")}</p>
                <p>{t("footer.addressLine2")}</p>
                <p>{t("footer.tel")}</p>
                <p>{t("footer.fax")}</p>
                <p>
                  <a
                    href={`mailto:${t("footer.email")}`}
                    className="transition hover:text-cyan-200"
                  >
                    {t("footer.email")}
                  </a>
                </p>
                <p>{t("footer.taxOffice")}</p>
              </div>
            </div>
          </section>
        </div>
      </footer>
    </main>
  );
}

export default App;
