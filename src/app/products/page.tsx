import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/products/product-card";
import { DUMMY_PRODUCTS } from "@/lib/dummy-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const categories = ["All", "Fruits", "Vegetables"];
const farmers = ["All", "Green Valley Farms", "Sunrise Organics", "Oakwood Gardens"];

export default function ProductsPage() {
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
                            <Checkbox id={category.toLowerCase()} />
                            <Label htmlFor={category.toLowerCase()}>{category}</Label>
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
                            <Checkbox id={farmer.toLowerCase().replace(' ', '')} />
                            <Label htmlFor={farmer.toLowerCase().replace(' ', '')}>{farmer}</Label>
                        </div>
                    ))}
                </div>
              </div>
            </aside>
            <div className="md:col-span-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Showing {DUMMY_PRODUCTS.length} products</p>
                <Select>
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
                {DUMMY_PRODUCTS.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
