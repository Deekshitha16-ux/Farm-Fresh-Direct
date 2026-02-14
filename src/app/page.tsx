
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Leaf, Tractor, Users } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductCard } from '@/components/products/product-card';
import { DUMMY_REVIEWS } from '@/lib/dummy-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useProducts } from '@/hooks/use-products';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-farm');
  const { products, isLoading } = useProducts();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative h-[60vh] w-full">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt="A beautiful farm landscape"
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <h1 className="font-headline text-5xl md:text-7xl">
              Fresh From Farm to Table
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl">
              Discover the best local produce, delivered directly from our trusted farmers. Quality you can taste, freshness you can trust.
            </p>
            <Button asChild className="mt-8" size="lg">
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="text-center">
                <Leaf className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h3 className="font-headline text-2xl">Naturally Grown</h3>
                <p className="mt-2 text-muted-foreground">
                  Our produce is grown with care, ensuring the highest quality and nutritional value.
                </p>
              </div>
              <div className="text-center">
                <Tractor className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h3 className="font-headline text-2xl">Directly From Farmers</h3>
                <p className="mt-2 text-muted-foreground">
                  By cutting out the middleman, we bring you fresher food and support local agriculture.
                </p>
              </div>
              <div className="text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h3 className="font-headline text-2xl">Community Focused</h3>
                <p className="mt-2 text-muted-foreground">
                  Join a community that values sustainable farming and healthy living.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary/50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-headline text-4xl">Featured Products</h2>
            <p className="mb-12 mt-2 text-center text-muted-foreground">
              Hand-picked selections from our best farms.
            </p>
            {isLoading && <p className="text-center">Loading products...</p>}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild variant="outline">
                <Link href="/products">View All Products <ArrowRight className="ml-2" /></Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-headline text-4xl">What Our Customers Say</h2>
            <p className="mb-12 mt-2 text-center text-muted-foreground">
              We are proud to have happy and healthy customers.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {DUMMY_REVIEWS.slice(0, 3).map((review) => (
                <Card key={review.id} className="flex flex-col">
                  <CardContent className="flex-1 pt-6">
                    <p className="italic">"{review.comment}"</p>
                  </CardContent>
                  <CardFooter className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={review.avatarUrl} />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.location}</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
