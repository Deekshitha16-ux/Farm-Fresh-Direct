
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { ProductsTable } from "@/components/dashboard/products-table";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DashboardProductsPage() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-headline text-4xl">Your Products</h1>
                    <p className="text-muted-foreground">Manage your inventory and product listings.</p>
                </div>
                <Link href="/dashboard/products/new" className={cn(buttonVariants({ variant: "default" }))}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Product
                </Link>
            </div>
            <div className="mt-8">
                <ProductsTable />
            </div>
        </div>
    );
}
