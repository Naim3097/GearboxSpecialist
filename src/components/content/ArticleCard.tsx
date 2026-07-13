import Link from "next/link";
import type { Locale } from "@/config/site";
import { getDict } from "@/lib/i18n";
import type { Article } from "@/lib/content";
import { getPillar } from "@/lib/content";

export function ArticleCard({
  article,
  hero = false,
  locale = "en",
}: {
  article: Article;
  hero?: boolean;
  locale?: Locale;
}) {
  const pillar = getPillar(article.pillar, locale);
  const t = getDict(locale);
  return (
    <article
      className={`clip-card group relative flex h-full flex-col overflow-hidden border border-line bg-panel transition-colors duration-300 hover:border-line-hi ${
        hero ? "p-7 sm:p-9" : "p-6"
      }`}
    >
      <p className="font-tech text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
        <span className="text-red">{"//"}</span> {pillar?.name}
      </p>
      <h3
        className={`font-display mt-4 leading-[1.02] text-fog transition-colors group-hover:text-red-hot ${
          hero ? "text-2xl sm:text-4xl" : "text-lg sm:text-xl"
        }`}
      >
        <Link href={article.path}>
          <span className="absolute inset-0" aria-hidden />
          {article.title}
        </Link>
      </h3>
      {hero && (
        <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-muted">{article.description}</p>
      )}
      <p className="mt-auto pt-5 font-tech text-[11px] uppercase tracking-[0.16em] text-muted">
        {article.readingMinutes} {t.min}
      </p>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-[3px] w-0 bg-red transition-all duration-300 group-hover:w-full"
      />
    </article>
  );
}
