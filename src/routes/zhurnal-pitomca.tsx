import { createFileRoute } from "@tanstack/react-router";

import { ProductPage } from "@/components/site/ProductPage";
import { productById, seo } from "@/lib/site";

const product = productById("pet");

export const Route = createFileRoute("/zhurnal-pitomca")({
  head: () => seo(product.seoTitle, product.seoDescription, "/zhurnal-pitomca"),
  component: Page,
});

function Page() {
  return <ProductPage product={product} />;
}
