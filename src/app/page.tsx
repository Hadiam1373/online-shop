"use client";
import { Button } from "@/components/ui/button";
import { useProductsQuery } from "@/lib/api";
export default function Home() {
  const { data: products } = useProductsQuery({});
  console.log(products);
  return (
    <div>
      <Button variant="default">Hello World</Button>
    </div>
  );
}
