import { createFileRoute } from "@tanstack/react-router";

import { ProductPage } from "@/components/site/ProductPage";
import { productById, seo } from "@/lib/site";

const product = productById("family");

export const Route = createFileRoute("/semeyny-zhurnal")({
  head: () => seo(product.seoTitle, product.seoDescription, "/semeyny-zhurnal"),
  component: Page,
});

function Page() {
  return <ProductPage product={product} />;
}
