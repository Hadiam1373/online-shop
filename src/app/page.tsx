"use client";
import { Button } from "@/components/ui/button";
import { useCreateProductMutation, useProductsQuery } from "@/lib/api";
export default function Home() {
  const { data: products } = useProductsQuery({});
  const { mutate: createProduct } = useCreateProductMutation({
    params: {
      name: "New Product",
      description: "This is a new product",
      price: 99.99,
      discountPrice: 79.99,
      stock: 100,
      images: ["https://example.com/image1.jpg"],
      categoryId: "cmo6s285m0001tb7t15q3682t",
      attributes: {
        color: "red",
        size: "M",
      },
    },
  });
  console.log(products);
  return (
    <div className="container">
      <Button variant="default" onClick={() => createProduct()}>
        Create Product
      </Button>
    </div>
  );
}
