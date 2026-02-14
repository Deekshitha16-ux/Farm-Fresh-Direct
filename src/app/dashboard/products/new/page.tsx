import { NewProductForm } from "@/components/dashboard/new-product-form";

export default function NewProductPage() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-headline text-4xl">Add New Product</h1>
                    <p className="text-muted-foreground">Fill in the details to list a new product.</p>
                </div>
            </div>
            <div className="mt-8">
               <NewProductForm />
            </div>
        </div>
    );
}
