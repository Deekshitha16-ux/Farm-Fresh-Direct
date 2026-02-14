
"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/products/product-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/lib/types";

export default function ProductsPage() {
  const { products, isLoading } = useProducts();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [selectedFarmers, setSelectedFarmers] = useState<string[]>(['All']);
  const [sortOrder, setSortOrder] = useState('popularity');

  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map(p => p.category)))], [products]);
  const farmers = useMemo(() => ["All", ...Array.from(new Set(products.map(p => p.farmer)))], [products]);

  const handleFilterChange = (
    value: string,
    filterType: 'category' | 'farmer',
    isChecked: boolean | 'indeterminate'
  ) => {
    const setter = filterType === 'category' ? setSelectedCategories : setSelectedFarmers;
    
    setter(prev => {
      if (value === 'All') {
        return isChecked ? ['All'] : [];
      }

      let newSelection = prev.filter(item => item !== 'All');

      if (isChecked) {
        newSelection.push(value);
      } else {
        newSelection = newSelection.filter(item => item !== value);
      }

      if (newSelection.length === 0) {
        return ['All'];
      }

      return newSelection;
    });
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts: Product[] = [...products];

    // Filter by category
    if (!selectedCategories.includes('All') && selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter(p => selectedCategories.includes(p.category));
    }

    // Filter by farmer
    if (!selectedFarmers.includes('All') && selectedFarmers.length > 0) {
      filteredProducts = filteredProducts.filter(p => selectedFarmers.includes(p.farmer));
    }

    // Sort
    switch (sortOrder) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
      default:
         filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
    
    return filteredProducts;
  }, [products, selectedCategories, selectedFarmers, sortOrder]);


  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-secondary/30 py-12">
          <div className="container">
            <h1 className="font-headline text-5xl">All Products</h1>
            <p className="mt-2 text-muted-foreground">Browse our selection of fresh, locally-sourced produce.</p>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            <aside className="md:col-span-1">
              <h2 className="font-headline text-2xl">Filters</h2>
              <Separator className="my-4" />
              <div>
                <h3 className="font-semibold">Category</h3>
                <div className="mt-2 space-y-2">
                    {categories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                            <Checkbox 
                                id={`category-${category.toLowerCase()}`}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={(checked) => handleFilterChange(category, 'category', checked)}
                             />
                            <Label htmlFor={`category-${category.toLowerCase()}`}>{category}</Label>
                        </div>
                    ))}
                </div>
              </div>
              <Separator className="my-6" />
               <div>
                <h3 className="font-semibold">Farmer</h3>
                <div className="mt-2 space-y-2">
                    {farmers.map(farmer => (
                        <div key={farmer} className="flex items-center space-x-2">
                            <Checkbox 
                                id={`farmer-${farmer.toLowerCase().replace(/\s+/g, '-')}`}
                                checked={selectedFarmers.includes(farmer)}
                                onCheckedChange={(checked) => handleFilterChange(farmer, 'farmer', checked)}
                            />
                            <Label htmlFor={`farmer-${farmer.toLowerCase().replace(/\s+/g, '-')}`}>{farmer}</Label>
                        </div>
                    ))}
                </div>
              </div>
            </aside>
            <div className="md:col-span-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Showing {filteredAndSortedProducts.length} products</p>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {isLoading && <p>Loading products...</p>}
                {!isLoading && filteredAndSortedProducts.length > 0 ? (
                  filteredAndSortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  !isLoading && <p>No products match your filters.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
