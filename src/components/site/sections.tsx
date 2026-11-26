import { Link } from "@tanstack/react-router";

import parcel from "@/assets/parcel.jpg";
import press from "@/assets/press.jpg";
import spread from "@/assets/spread.jpg";
import hands from "@/assets/hands.jpg";
import { products, type Product } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ButtonLink, CircleArrow, Kicker, Photo } from "./ui";

export function FormatCard({ product, index }: { product: Product; index: number }) {
  return (
    <Link
      to={product.to}
      className="group grid grid-cols-[minmax(0,1fr)_42%] bg-card transition-colors hover:bg-paper md:flex md:flex-col-reverse md:justify-end md:bg-transparent"
    >
      <div className="flex min-w-0 flex-col justify-between gap-4 p-5 md:px-0 md:pb-0 md:pt-5">
        <div>
          <p className="label mb-2 hidden text-[0.65rem] text-muted-foreground md:block">0{index + 1}</p>
          <h3 className="headline text-[1.45rem] md:text-[1.6rem]">{product.name}</h3>
          <p className="mt-2 text-[0.92rem] leading-snug text-muted-foreground">{product.short}</p>
        </div>
        <CircleArrow />
      </div>
      <Photo
        src={product.cover}
        alt={product.coverAlt}
        className="h-full min-h-44 md:aspect-[4/5] md:h-auto md:shadow-print"
        imgClassName="scale-[1.18] transition-transform duration-700 group-hover:scale-[1.24] md:scale-100 md:group-hover:scale-105"
      />
    </Link>
  );
}

export function Formats({ exclude, title = "У каждой истории свой формат." }: { exclude?: Product["id"]; title?: string }) {
  const list = products.filter((p) => p.id !== exclude);
  return (
    <section id="formats" className="wrap scroll-mt-24 py-16 md:py-24">
      <Kicker>{title}</Kicker>
      <div
        className={cn(
          "mt-8 grid gap-3 md:mt-12 md:grid-cols-2 md:gap-x-6 md:gap-y-12",
          list.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4",
        )}
      >
        {list.map((p) => (
          <FormatCard key={p.id} product={p} index={products.indexOf(p)} />
        ))}
      </div>
    </section>
  );
}

const steps = [
  { n: "01", title: "Добавляйте фотографии и истории.", text: "Загрузите снимки с телефона и подпишите их парой слов. Близкие могут добавить свои.", img: hands, alt: "Руки держат раскрытую газету с семейными фотографиями" },
  { n: "02", title: "Мы превращаем их в красивый выпуск.", text: "Обложка, заголовки, сетка, рубрики — всё, как в настоящем издании. Вам ничего не нужно верстать.", img: spread, alt: "Разворот печатной газеты с крупными семейными фотографиями на столе" },
  { n: "03", title: "Печатаем и доставляем вам или вашим близким.", text: "Выпуск приходит в крафтовом конверте. Его хочется открыть сразу.", img: parcel, alt: "Посылка в крафтовой бумаге, перевязанная красной нитью" },
];

export function Steps({ withLink = true }: { withLink?: boolean }) {
  return (
    <section className="wrap py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Kicker>Как это работает.</Kicker>
        {withLink ? (
          <Link to="/kak-eto-rabotaet" className="label hidden text-[0.7rem] underline-offset-4 hover:text-primary hover:underline md:block">
            Подробнее
          </Link>
        ) : null}
      </div>
      <ol className="mt-6 md:mt-12 md:grid md:grid-cols-3 md:gap-8">
        {steps.map((s) => (
          <li
            key={s.n}
            className="grid grid-cols-[auto_minmax(0,1fr)_34%] items-center gap-4 border-b border-rule py-6 md:flex md:flex-col md:items-stretch md:gap-6 md:border-b-0 md:border-t md:border-foreground md:py-6"
          >
            <span className="headline self-start border-r border-rule pr-4 text-[2.6rem] italic text-primary md:border-r-0 md:pr-0 md:text-[4.5rem]">
              {s.n}
            </span>
            <div className="min-w-0 md:order-3">
              <h3 className="font-medium leading-snug md:font-display md:text-[1.5rem] md:font-bold md:leading-tight">{s.title}</h3>
              <p className="mt-2 hidden leading-relaxed text-muted-foreground md:block">{s.text}</p>
            </div>
            <Photo src={s.img} alt={s.alt} className="aspect-[4/3] md:order-2" />
          </li>
        ))}
      </ol>
    </section>
  );
}

export function PressBand() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      <img
        src={press}
        alt="Свежеотпечатанные газетные листы на печатном станке"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 size-full object-cover opacity-70"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/70 to-transparent" aria-hidden="true" />
      <div className="wrap flex min-h-[26rem] flex-col justify-center py-20 md:min-h-[34rem]">
        <h2 className="max-w-[14ch] font-display text-[2.4rem] font-medium leading-[1.05] md:text-[4.25rem]">
          Ваши истории в настоящем печатном издании.
        </h2>
        <span className="mt-8 block h-0.5 w-12 bg-primary" aria-hidden="true" />
        <p className="mt-8 max-w-sm text-paper/75">
          Не фотокнига и не альбом. Газета с обложкой, рубриками и номером выпуска — её читают, а не листают.
        </p>
      </div>
    </section>
  );
}

export function FinalCta({ title = "Первый номер может выйти уже в этом месяце.", cta = "Создать выпуск" }: { title?: string; cta?: string }) {
  return (
    <section className="wrap py-20 text-center md:py-32">
      <Kicker className="justify-center">Ваш выпуск № 1</Kicker>
      <h2 className="headline mx-auto mt-6 max-w-[16ch] text-[2.5rem] md:text-[4.75rem]">{title}</h2>
      <div className="mt-10 flex justify-center">
        <ButtonLink to="/zakaz">{cta}</ButtonLink>
      </div>
    </section>
  );
}
