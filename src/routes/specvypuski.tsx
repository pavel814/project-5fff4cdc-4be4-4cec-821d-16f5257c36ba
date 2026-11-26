import { createFileRoute } from "@tanstack/react-router";

import { ProductPage } from "@/components/site/ProductPage";
import { productById, seo } from "@/lib/site";

const product = productById("special");

export const Route = createFileRoute("/specvypuski")({
  head: () => seo(product.seoTitle, product.seoDescription, "/specvypuski"),
  component: Page,
});

function Page() {
  return <ProductPage product={product} />;
}
