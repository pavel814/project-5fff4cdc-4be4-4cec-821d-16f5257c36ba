import { createFileRoute } from "@tanstack/react-router";

import { ProductPage } from "@/components/site/ProductPage";
import { productById, seo } from "@/lib/site";

const product = productById("baby");

export const Route = createFileRoute("/pervyy-god-malysha")({
  head: () => seo(product.seoTitle, product.seoDescription, "/pervyy-god-malysha"),
  component: Page,
});

function Page() {
  return <ProductPage product={product} />;
}
