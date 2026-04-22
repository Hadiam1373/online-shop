"use client";
import { Button } from "@/components/ui/button";
import { useCreateProductMutation, useProductsQuery } from "@/lib/api";
export default function Home() {
  const { data: products } = useProductsQuery({});
  const { mutate: createProduct } = useCreateProductMutation({});
  console.log(products);
  return (
    <div className="container">
      <Button variant="default" onClick={() => createProduct()}>
        Create Product
      </Button>
    </div>
  );
}
