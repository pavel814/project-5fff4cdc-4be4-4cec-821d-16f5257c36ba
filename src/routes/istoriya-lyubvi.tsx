import { createFileRoute } from "@tanstack/react-router";

import { ProductPage } from "@/components/site/ProductPage";
import { productById, seo } from "@/lib/site";

const product = productById("love");

export const Route = createFileRoute("/istoriya-lyubvi")({
  head: () => seo(product.seoTitle, product.seoDescription, "/istoriya-lyubvi"),
  component: Page,
});

function Page() {
  return <ProductPage product={product} />;
}
