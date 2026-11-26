import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { buttonStyles, Kicker, Photo } from "@/components/site/ui";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice, plans, products, seo, type Plan, type ProductId } from "@/lib/site";
import { cn } from "@/lib/utils";

const productIds = products.map((p) => p.id);
const planIds = plans.map((p) => p.id);

export const Route = createFileRoute("/zakaz")({
  validateSearch: (search: Record<string, unknown>): { format?: ProductId; plan?: Plan["id"] } => {
    const out: { format?: ProductId; plan?: Plan["id"] } = {};
    const format = productIds.find((id) => id === search["format"]);
    const plan = planIds.find((id) => id === search["plan"]);
    if (format) out.format = format;
    if (plan) out.plan = plan;
    return out;
  },
  head: () =>
    seo(
      "Создать выпуск — оформить подписку или заказать печатный журнал | Весточка",
      "Оставьте заявку на персональный печатный журнал: выберите издание и тариф, а мы свяжемся с вами и поможем собрать первый номер.",
      "/zakaz",
    ),
  component: Page,
});

const leadSchema = z.object({
  name: z.string().trim().min(1, "Укажите имя").max(100, "Слишком длинное имя"),
  email: z.string().trim().email("Проверьте адрес почты").max(255),
  phone: z.string().trim().max(40, "Слишком длинный номер"),
  comment: z.string().trim().max(1000, "Не больше 1000 символов"),
});

const field =
  "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-[1.05rem] outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary";

function Page() {
  const search = Route.useSearch();
  const [format, setFormat] = useState<ProductId>(search.format ?? "family");
  const defaultPlan: Plan["id"] =
    search.plan ?? (products.find((p) => p.id === (search.format ?? "family"))?.model === "single" ? "single" : "year");
  const [plan, setPlan] = useState<Plan["id"]>(defaultPlan);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  const product = products.find((p) => p.id === format) ?? products[0];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const parsed = leadSchema.safeParse({
      name: data.get("name") ?? "",
      email: data.get("email") ?? "",
      phone: data.get("phone") ?? "",
      comment: data.get("comment") ?? "",
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Проверьте поля формы");
      return;
    }
    setPending(true);
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      comment: parsed.data.comment || null,
      product: format,
      plan,
    });
    setPending(false);
    if (error) {
      toast.error("Не получилось отправить заявку. Попробуйте ещё раз.");
      return;
    }
    setDone(true);
    window.scrollTo({ top: 0 });
  }

  if (done) {
    return (
      <section className="wrap flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-6" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h1 className="headline mt-8 max-w-[14ch] text-[2.6rem] md:text-[4.5rem]">Заявка принята. Номер первый — в работе.</h1>
        <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
          Мы напишем вам на почту и расскажем, как загрузить фотографии для первого выпуска.
        </p>
        <Link to="/" className={cn(buttonStyles({ variant: "outline" }), "mt-10")}>
          На главную
        </Link>
      </section>
    );
  }

  return (
    <section className="wrap py-12 md:py-20">
      <Kicker>Создать выпуск</Kicker>
      <h1 className="headline mt-6 max-w-[14ch] text-[2.6rem] md:text-[4.5rem]">
        Расскажите, какой журнал вам <span className="stress">нужен.</span>
      </h1>

      <form onSubmit={onSubmit} className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20" noValidate>
        <div className="space-y-14">
          <fieldset>
            <legend className="label mb-5 flex items-baseline gap-3">
              <span className="text-primary">01</span> Издание
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {products.map((p) => (
                <label
                  key={p.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-4 border p-3 transition-colors",
                    format === p.id ? "border-foreground bg-card" : "border-rule hover:border-foreground",
                  )}
                >
                  <input
                    type="radio"
                    name="format"
                    value={p.id}
                    checked={format === p.id}
                    onChange={() => {
                      setFormat(p.id);
                      if (p.model === "single") setPlan("single");
                    }}
                    className="sr-only"
                  />
                  <Photo src={p.cover} alt="" className="size-16 shrink-0" />
                  <span className="min-w-0">
                    <span className="headline block text-[1.2rem]">{p.name}</span>
                    <span className="mt-1 block text-sm leading-snug text-muted-foreground">{p.short}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="label mb-5 flex items-baseline gap-3">
              <span className="text-primary">02</span> Тариф
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {plans.map((p) => (
                <label
                  key={p.id}
                  className={cn(
                    "flex cursor-pointer items-baseline justify-between gap-4 border p-4 transition-colors",
                    plan === p.id ? "border-foreground bg-card" : "border-rule hover:border-foreground",
                  )}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={p.id}
                    checked={plan === p.id}
                    onChange={() => setPlan(p.id)}
                    className="sr-only"
                  />
                  <span className="min-w-0">
                    <span className="block font-medium">{p.name}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{p.unit}</span>
                  </span>
                  <span className="headline shrink-0 text-[1.5rem]">{formatPrice(p.price)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="label mb-3 flex items-baseline gap-3">
              <span className="text-primary">03</span> Как с вами связаться
            </legend>
            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              <label className="block">
                <span className="sr-only">Имя</span>
                <input name="name" autoComplete="name" required maxLength={100} placeholder="Имя" className={field} />
              </label>
              <label className="block">
                <span className="sr-only">Почта</span>
                <input name="email" type="email" autoComplete="email" required maxLength={255} placeholder="Почта" className={field} />
              </label>
              <label className="block sm:col-span-2">
                <span className="sr-only">Телефон</span>
                <input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Телефон (необязательно)" className={field} />
              </label>
              <label className="block sm:col-span-2">
                <span className="sr-only">Комментарий</span>
                <textarea
                  name="comment"
                  rows={3}
                  maxLength={1000}
                  placeholder="Повод, дата, пожелания (необязательно)"
                  className={cn(field, "resize-none")}
                />
              </label>
            </div>
          </fieldset>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border-t-2 border-foreground pt-6">
            <p className="label text-muted-foreground">Ваш заказ</p>
            <Photo src={product?.cover ?? ""} alt={product?.coverAlt ?? ""} className="mt-5 hidden aspect-[4/5] shadow-print lg:block" />
            <p className="headline mt-5 text-[1.75rem]">{product?.name}</p>
            <p className="mt-2 flex items-baseline justify-between gap-4 border-b border-rule pb-5 text-muted-foreground">
              <span>{plans.find((p) => p.id === plan)?.name}</span>
              <span className="text-foreground">{formatPrice(plans.find((p) => p.id === plan)?.price ?? 0)} за выпуск</span>
            </p>
            <button type="submit" disabled={pending} className={cn(buttonStyles({ variant: "signal" }), "mt-6 sm:w-full")}>
              {pending ? "Отправляем…" : "Отправить заявку"}
            </button>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Оплата не требуется. Мы свяжемся с вами, чтобы уточнить детали и адрес доставки.
            </p>
          </div>
        </aside>
      </form>
    </section>
  );
}
