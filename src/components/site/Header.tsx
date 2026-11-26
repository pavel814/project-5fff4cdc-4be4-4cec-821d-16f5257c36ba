import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { BRAND, products } from "@/lib/site";
import { ButtonLink } from "./ui";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      {BRAND}
      <span className="text-primary">.</span>
    </span>
  );
}

const navLink =
  "label text-[0.7rem] tracking-[0.16em] text-foreground/80 transition-colors hover:text-primary data-[status=active]:text-primary";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-background">
      <div className="wrap rule-double grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:h-20 xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:gap-10">
        <Link to="/" onClick={close} className="min-w-0" aria-label={`${BRAND} — на главную`}>
          <Wordmark className="headline block truncate text-[1.75rem] md:text-[2.1rem]" />
        </Link>

        <nav className="hidden items-center justify-center gap-6 xl:flex" aria-label="Основная навигация">
          {products.map((p) => (
            <Link key={p.id} to={p.to} className={navLink}>
              {p.nav}
            </Link>
          ))}
          <span className="h-4 w-px bg-rule" aria-hidden="true" />
          <Link to="/kak-eto-rabotaet" className={navLink}>
            Как это работает
          </Link>
          <Link to="/podpiska" className={navLink}>
            Подписка
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink to="/zakaz" className="hidden min-h-11 px-5 py-3 text-[0.7rem] sm:inline-flex" arrow={false}>
            Создать выпуск
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="-mr-2 grid size-11 place-items-center xl:hidden"
          >
            {open ? <X className="size-7" strokeWidth={1.25} /> : <Menu className="size-7" strokeWidth={1.25} />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="site-menu" className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-background md:top-20 xl:hidden">
          <nav className="wrap flex min-h-full flex-col pb-10 pt-8" aria-label="Меню">
            <p className="kicker mb-4">Издания</p>
            <ul>
              {products.map((p, i) => (
                <li key={p.id} className="rise border-b border-rule" style={{ animationDelay: `${i * 50}ms` }}>
                  <Link to={p.to} onClick={close} className="flex items-baseline justify-between gap-4 py-4">
                    <span className="headline text-[1.9rem]">{p.name}</span>
                    <span className="label text-[0.65rem] text-muted-foreground">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4">
              <Link to="/kak-eto-rabotaet" onClick={close} className="label text-[0.8rem]">
                Как это работает
              </Link>
              <Link to="/podpiska" onClick={close} className="label text-[0.8rem]">
                Подписка и цены
              </Link>
            </div>
            <div className="mt-auto pt-10">
              <ButtonLink to="/zakaz" onClick={close}>
                Создать выпуск
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
