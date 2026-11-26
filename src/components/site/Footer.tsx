import { Link } from "@tanstack/react-router";

import { products } from "@/lib/site";
import { Wordmark } from "./Header";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="wrap py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Wordmark className="headline block text-[2.75rem] md:text-[3.5rem]" />
            <p className="mt-6 flex max-w-xs gap-4 text-paper/80">
              <span className="mt-3 h-0.5 w-8 shrink-0 bg-primary" aria-hidden="true" />
              Печатные журналы о людях, которых мы любим.
            </p>
          </div>
          <nav aria-label="Издания">
            <p className="label mb-5 text-paper/50">Издания</p>
            <ul className="space-y-3">
              {products.map((p) => (
                <li key={p.id}>
                  <Link to={p.to} className="transition-colors hover:text-primary">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Сервис">
            <p className="label mb-5 text-paper/50">Сервис</p>
            <ul className="space-y-3">
              <li>
                <Link to="/kak-eto-rabotaet" className="transition-colors hover:text-primary">
                  Как это работает
                </Link>
              </li>
              <li>
                <Link to="/podpiska" className="transition-colors hover:text-primary">
                  Подписка и цены
                </Link>
              </li>
              <li>
                <Link to="/zakaz" className="transition-colors hover:text-primary">
                  Создать выпуск
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-paper/20 pt-6 text-sm text-paper/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Весточка</p>
          <p>Печатается по одному экземпляру — для вас.</p>
        </div>
      </div>
    </footer>
  );
}
