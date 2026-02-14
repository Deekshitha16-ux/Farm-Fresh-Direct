
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from '@/hooks/use-user-profile';
import { addDocumentNonBlocking, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Product } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from 'lucide-react';

export function NewProductForm() {
    const { toast } = useToast();
    const router = useRouter();
    const { user, isLoading: isUserLoading } = useUserProfile();
    const firestore = useFirestore();

    // Form State
    const [produceType, setProduceType] = useState("");
    const [description, setDescription] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [price, setPrice] = useState("");
    const [unit, setUnit] = useState("lb");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const origin = user?.farmName || "";

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSaveProduct = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        if (!user || user.role !== 'farmer' || !origin) {
            toast({ title: "Farm Name Required", description: "Please set your farm name in settings before adding products.", variant: "destructive" });
            setIsSaving(false);
            return;
        }

        const newProduct: Omit<Product, 'id' | 'rating' | 'reviewCount'> = {
            name: produceType,
            description,
            price: parseFloat(price) || 0,
            unit,
            stock: parseInt(stock, 10) || 0,
            farmer: origin,
            farmerId: user.uid,
            category,
            imageId: imagePreview ? '' : 'new-product-placeholder',
            imageUrl: imagePreview || undefined,
        };
        
        const productsRef = collection(firestore, 'products');
        addDocumentNonBlocking(productsRef, {
            ...newProduct,
            rating: 0,
            reviewCount: 0,
            listedAt: new Date().toISOString(),
        }).then(() => {
            toast({
                title: "Product Saved",
                description: `"${produceType}" has been saved successfully.`,
            });
            router.push('/dashboard/products');
        }).catch(err => {
            toast({
                title: "Error Saving Product",
                description: "There was a problem saving your product.",
                variant: "destructive"
            });
        }).finally(() => {
            setIsSaving(false);
        });
    }

    if (isUserLoading) {
        return <p>Loading user profile...</p>;
    }

    if (user && user.role === 'farmer' && !user.farmName) {
        return (
            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Farm Name Required</AlertTitle>
                <AlertDescription>
                    You need to set a farm name before you can add products. Please go to your{" "}
                    <Link href="/dashboard/settings" className="font-bold underline">settings</Link> to update your profile.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Provide the necessary information for your new product.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSaveProduct}>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="md:col-span-2 grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="product-name">Product Name</Label>
                                <Input id="product-name" placeholder="e.g., Organic Apples" value={produceType} onChange={(e) => setProduceType(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" placeholder="A detailed description of your product." value={description} onChange={e => setDescription(e.target.value)} rows={5} />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="product-image">Product Image</Label>
                                {imagePreview && (
                                    <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-lg border">
                                        <Image src={imagePreview} alt="Product image preview" fill className="object-cover" />
                                    </div>
                                )}
                                <Input id="product-image" type="file" onChange={handleImageChange} accept="image/*" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" type="number" placeholder="2.99" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="unit">Unit</Label>
                                <Select value={unit} onValueChange={setUnit} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="lb">Per Pound (lb)</SelectItem>
                                        <SelectItem value="bunch">Per Bunch</SelectItem>
                                        <SelectItem value="head">Per Head</SelectItem>
                                        <SelectItem value="pint">Per Pint</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="stock">Stock Quantity</Label>
                                <Input id="stock" type="number" placeholder="100" value={stock} onChange={e => setStock(e.target.value)} required/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="origin">Origin</Label>
                                <Input id="origin" value={origin} required readOnly className="bg-muted/50" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Select value={category} onValueChange={setCategory} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Fruits">Fruits</SelectItem>
                                        <SelectItem value="Vegetables">Vegetables</SelectItem>
                                        <SelectItem value="Dairy">Dairy</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <Button type="submit" disabled={isSaving || !origin}>
                            {isSaving ? 'Saving...' : 'Save Product'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
