
import { EditProductForm } from "@/components/dashboard/edit-product-form";

export default function EditProductPage({ params }: { params: { id: string } }) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-headline text-4xl">Edit Product</h1>
                    <p className="text-muted-foreground">Update the details for your product.</p>
                </div>
            </div>
            <div className="mt-8">
               <EditProductForm productId={params.id} />
            </div>
        </div>
    );
}
