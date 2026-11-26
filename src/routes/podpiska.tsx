import { createFileRoute, Link } from "@tanstack/react-router";

import stack from "@/assets/stack.jpg";
import { Formats } from "@/components/site/sections";
import { CircleArrow, FaqList, Kicker, Photo } from "@/components/site/ui";
import { commonFaq, formatPrice, plans, seo } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/podpiska")({
  head: () =>
    seo(
      "Подписка и цены — печатный журнал о вашей семье каждый месяц | Весточка",
      "Подписка на персональный печатный журнал: помесячно, на полгода или на год. Разовые выпуски к праздникам. Оформите для себя или в подарок близким.",
      "/podpiska",
    ),
  component: Page,
});

const included = [
  "Вёрстка и обложка выпуска",
  "Печать на настоящей бумаге",
  "Номер и дата на первой полосе",
  "Доставка на выбранный адрес",
  "Фотографии от всех близких в одном номере",
];

function Page() {
  return (
    <>
      <section className="wrap py-12 md:py-24">
        <Kicker>Подписка и цены</Kicker>
        <h1 className="headline mt-6 max-w-[14ch] text-[2.7rem] md:text-[5rem]">
          Один номер в месяц. Целая <span className="stress">подшивка</span> за год.
        </h1>
        <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-muted-foreground">
          Подписка подходит для любого издания: семейного, детского, журнала питомца. Оформите для себя или подарите
          близким.
        </p>
      </section>

      <section className="wrap pb-16 md:pb-24">
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:border-y lg:border-foreground">
          {plans.map((plan) => (
            <li key={plan.id} className="lg:border-r lg:border-rule lg:last:border-r-0">
              <Link
                to="/zakaz"
                search={{ plan: plan.id }}
                className={cn(
                  "group flex h-full flex-col p-6 transition-colors md:p-8",
                  plan.featured ? "bg-ink text-paper" : "bg-card hover:bg-paper-deep lg:bg-transparent",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="label">{plan.name}</p>
                  {plan.featured ? <span className="label bg-primary px-2 py-1 text-[0.6rem] text-primary-foreground">Выгоднее</span> : null}
                </div>
                <p className="headline mt-8 text-[3.25rem]">{formatPrice(plan.price)}</p>
                <p className={cn("mt-1 text-sm", plan.featured ? "text-paper/60" : "text-muted-foreground")}>{plan.unit}</p>
                <p className={cn("mb-8 mt-6 leading-relaxed", plan.featured ? "text-paper/80" : "text-muted-foreground")}>{plan.text}</p>
                <span className="mt-auto flex items-center justify-between gap-4">
                  <span className="label text-[0.7rem]">Выбрать</span>
                  <CircleArrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-paper-deep">
        <div className="wrap grid gap-10 py-16 md:grid-cols-2 md:items-center md:gap-16 md:py-24">
          <Photo src={stack} alt="Стопка газет, перевязанная красной нитью, на полке" className="aspect-[4/5] shadow-print" />
          <div>
            <Kicker>В каждый выпуск входит.</Kicker>
            <ul className="mt-8 border-t border-foreground">
              {included.map((item, i) => (
                <li key={item} className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline border-b border-rule py-4">
                  <span className="label text-primary">0{i + 1}</span>
                  <span className="headline text-[1.35rem] md:text-[1.75rem]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wrap py-16 md:py-28">
        <div className="md:grid md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-16">
          <Kicker className="mb-8 md:mb-0 md:self-start md:pt-6">Частые вопросы.</Kicker>
          <FaqList items={commonFaq} />
        </div>
      </section>

      <div className="border-t border-foreground">
        <Formats title="Выберите издание." />
      </div>
    </>
  );
}
