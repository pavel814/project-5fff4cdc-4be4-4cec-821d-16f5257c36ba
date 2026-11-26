import { createFileRoute } from "@tanstack/react-router";

import stack from "@/assets/stack.jpg";
import { FinalCta, Formats, PressBand, Steps } from "@/components/site/sections";
import { ButtonLink, FaqList, Kicker, Photo } from "@/components/site/ui";
import { commonFaq, productById, seo, TAGLINE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "Весточка — персональные печатные газеты и журналы из ваших фотографий",
      "Превращаем фотографии, маленькие истории и большие события в настоящие печатные журналы. Семейная газета по подписке, журнал о малыше, питомце и паре — с доставкой.",
      "/",
    ),
  component: Index,
});

function Index() {
  const family = productById("family");

  return (
    <>
      <section className="md:wrap md:grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-center md:gap-12 md:py-16 lg:gap-20">
        <div className="wrap rise pb-10 pt-8 md:px-0 md:py-0">
          <Kicker>Персональное печатное издание</Kicker>
          <h1 className="headline mt-6 text-[2.7rem] sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.6rem]">
            Из ваших фотографий&nbsp;— настоящая газета, которую хочется <span className="stress">хранить.</span>
          </h1>
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-muted-foreground">{TAGLINE}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/zakaz">Создать выпуск</ButtonLink>
            <a
              href="#formats"
              className="label inline-flex min-h-13 items-center justify-center border border-foreground px-7 py-4 text-[0.8rem] transition-colors hover:bg-foreground hover:text-background"
            >
              Посмотреть издания
            </a>
          </div>
        </div>
        <Photo
          src={family.cover}
          alt={family.coverAlt}
          eager
          className="aspect-[4/5] md:shadow-print"
          imgClassName="rise"
        />
      </section>

      <div className="border-t border-foreground md:mt-8">
        <Formats />
      </div>

      <div className="border-t border-rule">
        <Steps />
      </div>

      <PressBand />

      <section className="md:wrap md:grid md:grid-cols-2 md:items-center md:gap-16 md:py-28">
        <Photo src={family.hero} alt={family.heroAlt} className="aspect-[4/5] md:shadow-print" />
        <div className="wrap py-12 md:px-0 md:py-0">
          <Kicker>{family.kicker}</Kicker>
          <h2 className="headline mt-6 text-[2.5rem] md:text-[4rem]">{family.title}</h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">{family.lead}</p>
          <div className="mt-8">
            <ButtonLink to={family.to} variant="outline">
              {family.cta}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="wrap grid gap-10 py-16 md:grid-cols-2 md:items-center md:gap-16 md:py-28">
          <div>
            <Kicker>Регулярная подписка</Kicker>
            <h2 className="headline mt-6 text-[2.5rem] md:text-[4rem]">
              Не просто подарок. Новая семейная <span className="stress">традиция.</span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              Один журнал каждый месяц. Ваши истории, события и тёплые моменты — в красивом печатном издании, которое
              складывается в подшивку.
            </p>
            <div className="mt-8">
              <ButtonLink to="/podpiska">Выбрать подписку</ButtonLink>
            </div>
          </div>
          <Photo
            src={stack}
            alt="Стопка сложенных газет, перевязанная красной нитью, на книжной полке"
            className="aspect-[4/5] shadow-print md:order-first"
          />
        </div>
      </section>

      <section className="wrap py-16 md:py-28">
        <div className="md:grid md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-16">
          <Kicker className="mb-8 md:mb-0 md:self-start md:pt-6">Частые вопросы.</Kicker>
          <FaqList items={commonFaq} />
        </div>
      </section>

      <div className="border-t border-foreground">
        <FinalCta />
      </div>
    </>
  );
}
