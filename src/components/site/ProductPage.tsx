import { formatPrice, plans, type Product } from "@/lib/site";
import { cn } from "@/lib/utils";
import { FinalCta, Formats } from "./sections";
import { ButtonLink, FaqList, Kicker, Photo } from "./ui";

const heroTone: Record<Product["tone"], string> = {
  paper: "bg-background text-foreground",
  milk: "bg-paper-deep text-foreground",
  gloss: "bg-background text-foreground",
  ink: "bg-ink text-paper",
  signal: "bg-primary text-primary-foreground",
};

export function ProductPage({ product: p }: { product: Product }) {
  const dark = p.tone === "ink" || p.tone === "signal";
  const from = p.model === "single" ? plans.find((x) => x.id === "single") : plans.find((x) => x.id === "year");

  return (
    <>
      <section className={cn(heroTone[p.tone])}>
        <div className="md:wrap md:grid md:grid-cols-2 md:items-center md:gap-14 md:py-16 lg:gap-24">
          <Photo
            src={p.hero}
            alt={p.heroAlt}
            eager
            className={cn("aspect-[4/5] md:order-2 md:shadow-print", dark ? "bg-transparent" : "")}
            imgClassName="rise"
          />
          <div className="wrap rise py-10 md:px-0 md:py-0">
            <Kicker className={cn(p.tone === "signal" && "before:bg-paper")}>{p.kicker}</Kicker>
            <h1
              className={cn(
                "headline mt-6 text-[2.6rem] md:text-[3.6rem] lg:text-[4.6rem]",
                p.tone === "gloss" && "uppercase tracking-[-0.03em]",
                p.tone === "ink" && "font-medium italic",
              )}
            >
              {p.title}
            </h1>
            <p className={cn("mt-6 max-w-md text-[1.05rem] leading-relaxed", dark ? "opacity-85" : "text-muted-foreground")}>
              {p.lead}
            </p>
            <div className="mt-8">
              <ButtonLink
                to="/zakaz"
                search={{ format: p.id }}
                variant={p.tone === "signal" ? "paper" : p.tone === "ink" ? "signal" : "outline"}
              >
                {p.cta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-16 md:py-28">
        <p className="mx-auto max-w-4xl font-display text-[1.6rem] leading-[1.25] md:text-center md:text-[2.5rem]">
          {p.statement}
        </p>
      </section>

      <section className="wrap pb-16 md:pb-28">
        <div className="md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <Kicker>В каждом номере.</Kicker>
            <Photo src={p.cover} alt={p.coverAlt} className="mt-8 hidden aspect-[4/5] shadow-print md:block" />
          </div>
          <ol className="mt-6 border-t border-foreground md:mt-0">
            {p.rubrics.map((r, i) => (
              <li key={r.title} className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-4 border-b border-rule py-7 md:grid-cols-[6rem_minmax(0,1fr)] md:py-10">
                <span className="headline text-[2rem] italic text-primary md:text-[3.25rem]">0{i + 1}</span>
                <div>
                  <h3 className="headline text-[1.5rem] md:text-[2.1rem]">{r.title}</h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">{r.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-ink text-paper">
        <img src={p.life} alt={p.lifeAlt} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover md:aspect-[16/8]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" aria-hidden="true" />
        <div className="wrap absolute inset-x-0 bottom-0 pb-10 md:pb-16">
          <p className="max-w-[18ch] font-display text-[1.9rem] font-medium italic leading-[1.1] md:text-[3.5rem]">{p.quote}</p>
        </div>
      </section>

      <section className="wrap py-16 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <Kicker>{p.occasionsTitle}.</Kicker>
            <ul className="mt-8">
              {p.occasions.map((o) => (
                <li key={o} className="headline border-b border-rule py-4 text-[1.5rem] md:text-[2rem]">
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card p-6 md:p-10">
            <Kicker>{p.offerKicker}</Kicker>
            <h2 className="headline mt-6 text-[2rem] md:text-[2.75rem]">{p.offerTitle}</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{p.offerText}</p>
            {from ? (
              <p className="mt-8 flex items-baseline gap-3 border-t border-foreground pt-6">
                <span className="label text-muted-foreground">от</span>
                <span className="headline text-[2.75rem]">{formatPrice(from.price)}</span>
                <span className="text-sm text-muted-foreground">за выпуск</span>
              </p>
            ) : null}
            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink to="/zakaz" search={{ format: p.id }}>
                {p.model === "single" ? "Заказать выпуск" : "Выбрать подписку"}
              </ButtonLink>
              <ButtonLink to="/podpiska" variant="outline" arrow={false}>
                Все тарифы
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap pb-16 md:pb-28">
        <div className="md:grid md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-16">
          <Kicker className="mb-8 md:mb-0 md:self-start md:pt-6">Частые вопросы.</Kicker>
          <FaqList items={p.faq} />
        </div>
      </section>

      <div className="border-t border-foreground">
        <Formats exclude={p.id} title="Другие издания." />
      </div>
      <div className="border-t border-rule">
        <FinalCta cta={p.cta} />
      </div>
    </>
  );
}
