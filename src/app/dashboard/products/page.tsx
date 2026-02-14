import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ProductsTable } from "@/components/dashboard/products-table";

export default function DashboardProductsPage() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-headline text-4xl">Your Products</h1>
                    <p className="text-muted-foreground">Manage your inventory and product listings.</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/products/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Product
                    </Link>
                </Button>
            </div>
            <div className="mt-8">
                <ProductsTable />
            </div>
        </div>
    );
}
