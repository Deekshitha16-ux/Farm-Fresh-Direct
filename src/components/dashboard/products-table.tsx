
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useFirestore, useCollection, deleteDocumentNonBlocking, useMemoFirebase } from "@/firebase";
import { collection, query, where, doc } from "firebase/firestore";

export function ProductsTable() {
    const { user } = useUserProfile();
    const firestore = useFirestore();
    const { toast } = useToast();
    const [productToDelete, setProductToDelete] = React.useState<Product | null>(null);

    const farmerProductsQuery = useMemoFirebase(() => {
        if (!user || user.role !== 'farmer') return null;
        return query(collection(firestore, 'products'), where('farmerId', '==', user.uid));
    }, [user, firestore]);
    
    const { data: farmerProducts, isLoading } = useCollection<Product>(farmerProductsQuery);

    const handleDelete = () => {
        if (productToDelete) {
            const productDocRef = doc(firestore, 'products', productToDelete.id);
            deleteDocumentNonBlocking(productDocRef);
            toast({
                title: "Product Deleted",
                description: `"${productToDelete.name}" has been deleted successfully.`,
                variant: 'destructive',
            });
            setProductToDelete(null);
        }
    };

    if (user?.role !== 'farmer') {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This section is for farmers to manage their products.</p>
                </CardContent>
            </Card>
        );
    }
    
    if (isLoading) {
        return <p>Loading products...</p>
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>All Products</CardTitle>
                    <CardDescription>An overview of all your listed products.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Image</span>
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead className="hidden md:table-cell">Price</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {farmerProducts?.map(product => {
                                let imageUrl = product.imageUrl;
                                if (!imageUrl) {
                                    const productImage = PlaceHolderImages.find(p => p.id === product.imageId);
                                    imageUrl = productImage?.imageUrl;
                                }
                                return (
                                    <TableRow key={product.id}>
                                        <TableCell className="hidden sm:table-cell">
                                            {imageUrl && <Image
                                                alt={product.name}
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src={imageUrl}
                                                width="64"
                                            />}
                                        </TableCell>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell><Badge variant="outline">{product.category}</Badge></TableCell>
                                        <TableCell>{product.stock} {product.unit}s</TableCell>
                                        <TableCell className="hidden md:table-cell">${product.price.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/products/edit/${product.id}`}>Edit</Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                                                        onClick={() => setProductToDelete(product)}
                                                    >
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    {farmerProducts && farmerProducts.length === 0 && !isLoading && (
                        <p className="p-4 text-center text-muted-foreground">You haven't added any products yet.</p>
                    )}
                </CardContent>
            </Card>
            <AlertDialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product
                            "{productToDelete?.name}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
