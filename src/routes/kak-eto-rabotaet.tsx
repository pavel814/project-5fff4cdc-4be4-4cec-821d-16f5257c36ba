import { createFileRoute } from "@tanstack/react-router";

import hands from "@/assets/hands.jpg";
import parcel from "@/assets/parcel.jpg";
import spread from "@/assets/spread.jpg";
import stack from "@/assets/stack.jpg";
import { FinalCta, PressBand } from "@/components/site/sections";
import { FaqList, Kicker, Photo } from "@/components/site/ui";
import { commonFaq, seo } from "@/lib/site";

export const Route = createFileRoute("/kak-eto-rabotaet")({
  head: () =>
    seo(
      "Как это работает — от фотографий в телефоне до газеты в почтовом ящике | Весточка",
      "Загрузите фотографии и подписи — мы сверстаем, напечатаем и доставим настоящий печатный журнал вам или вашим близким. Четыре простых шага.",
      "/kak-eto-rabotaet",
    ),
  component: Page,
});

const steps = [
  {
    title: "Вы добавляете фотографии и истории.",
    text: "Загрузите снимки прямо с телефона и подпишите их парой слов: кто, где, что случилось. Этого достаточно. Близкие могут добавить свои фотографии по ссылке.",
    img: hands,
    alt: "Дедушка и внук держат раскрытую газету с семейными фотографиями",
  },
  {
    title: "Мы собираем из них выпуск.",
    text: "Выбираем обложку, придумываем заголовки, расставляем фотографии по строгой газетной сетке. Вам не нужно ничего верстать и разбираться в редакторах.",
    img: spread,
    alt: "Разворот печатной газеты с крупными фотографиями на тёмном столе",
  },
  {
    title: "Печатаем на настоящей бумаге.",
    text: "Каждый выпуск печатается отдельно — для вас. С номером, датой и названием вашего издания на первой полосе.",
    img: stack,
    alt: "Стопка газет, перевязанная красной нитью",
  },
  {
    title: "Доставляем вам или вашим близким.",
    text: "Выпуск приходит в крафтовом конверте на любой адрес. Можно отправить сразу нескольким получателям.",
    img: parcel,
    alt: "Посылка в крафтовой бумаге с красной нитью",
  },
];

function Page() {
  return (
    <>
      <section className="wrap py-12 md:py-24">
        <Kicker>Как это работает</Kicker>
        <h1 className="headline mt-6 max-w-[15ch] text-[2.7rem] md:text-[5rem]">
          От телефона до почтового ящика — четыре <span className="stress">шага.</span>
        </h1>
        <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-muted-foreground">
          Мы не конструктор и не редактор. Вы рассказываете, что произошло, — мы делаем из этого издание.
        </p>
      </section>

      <ol className="border-t border-foreground">
        {steps.map((s, i) => (
          <li key={s.title} className="border-b border-rule">
            <div className="md:wrap md:grid md:grid-cols-2 md:items-center md:gap-16 md:py-20">
              <Photo src={s.img} alt={s.alt} className={i % 2 ? "aspect-[4/3] md:order-2" : "aspect-[4/3]"} />
              <div className="wrap py-10 md:px-0 md:py-0">
                <span className="headline block text-[4rem] italic text-primary md:text-[7rem]">0{i + 1}</span>
                <h2 className="headline mt-4 text-[2rem] md:text-[3rem]">{s.title}</h2>
                <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <PressBand />

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
