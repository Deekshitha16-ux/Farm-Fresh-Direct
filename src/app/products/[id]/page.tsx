"use client";

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { DUMMY_PRODUCTS, DUMMY_REVIEWS } from '@/lib/dummy-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RatingStars } from '@/components/products/rating-stars';
import { Minus, Plus } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const product = DUMMY_PRODUCTS.find((p) => p.id === params.id);
  
  if (!product) {
    notFound();
  }
  
  const reviews = DUMMY_REVIEWS.filter(r => r.productId === product.id);
  const productImage = PlaceHolderImages.find((p) => p.id === product.imageId);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                {productImage && (
                  <Image
                    src={productImage.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    data-ai-hint={productImage.imageHint}
                  />
                )}
              </div>
            </div>
            <div>
              <p className="font-semibold text-primary">{product.category}</p>
              <h1 className="mt-1 font-headline text-4xl md:text-5xl">{product.name}</h1>
              <p className="mt-2 text-muted-foreground">From {product.farmer}</p>
              <div className="mt-4 flex items-center">
                <RatingStars rating={product.rating} />
                <span className="ml-2 text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
              <p className="mt-6 text-3xl font-bold">
                ${product.price.toFixed(2)}{' '}
                <span className="text-lg font-normal text-muted-foreground">/{product.unit}</span>
              </p>
              <p className="mt-6 text-base">{product.description}</p>
              <Separator className="my-8" />
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                   <Button variant="outline" size="icon" onClick={() => setQuantity(q => q + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button size="lg" onClick={handleAddToCart}>Add to Cart</Button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 md:mt-24">
            <h2 className="font-headline text-3xl">Customer Reviews</h2>
            <Separator className="my-6"/>
            <div className="space-y-8">
              {reviews.length > 0 ? reviews.map(review => (
                <div key={review.id} className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={review.avatarUrl} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold">{review.name}</p>
                      <RatingStars rating={review.rating} />
                    </div>
                    <p className="mt-2 text-muted-foreground italic">"{review.comment}"</p>
                  </div>
                </div>
              )) : (
                <p className="text-muted-foreground">No reviews yet for this product.</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
