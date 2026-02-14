
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Product } from "@/lib/types";
import { RatingStars } from "./rating-stars";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  let imageUrl = product.imageUrl;
  let imageHint;
  if (!imageUrl) {
      const productImage = PlaceHolderImages.find((p) => p.id === product.imageId);
      imageUrl = productImage?.imageUrl;
      imageHint = productImage?.imageHint;
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
    });
  }

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-[3/2] w-full">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={imageHint}
              />
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="mb-1 text-lg font-headline">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </CardTitle>
        <CardDescription className="text-sm">{product.farmer}</CardDescription>
        <div className="mt-2 flex items-center">
          <RatingStars rating={product.rating} />
          <span className="ml-2 text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-lg font-bold">
          ${product.price.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/{product.unit}</span>
        </p>
        <Button onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
