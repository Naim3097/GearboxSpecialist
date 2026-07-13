import { ArticlePage, articleStaticParams } from "@/components/content/ArticlePage";
import { getArticle } from "@/lib/content";
import { pageMetadata, translationsFor } from "@/lib/seo";
import { notFound } from "next/navigation";

const pillar = "maintenance" as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return articleStaticParams(pillar, "zh");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(pillar, slug, "zh");
  if (!article) notFound();
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: article.path,
    ogType: "article",
    translations: translationsFor(`/${pillar}/${slug}`),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticlePage pillar={pillar} slug={slug} locale="zh" />;
}
