
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateDescription } from "@/lib/actions";
import { useProducts } from '@/hooks/use-products';
import type { Product } from '@/lib/types';

export function EditProductForm({ productId }: { productId: string }) {
    const { products, updateProduct } = useProducts();
    const product = products.find(p => p.id === productId);

    const [isGenerating, setIsGenerating] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    // Form State
    const [produceType, setProduceType] = useState("");
    const [description, setDescription] = useState("");
    const [uniqueQualities, setUniqueQualities] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [price, setPrice] = useState("");
    const [unit, setUnit] = useState("");
    const [stock, setStock] = useState("");
    const [origin, setOrigin] = useState("");
    const [category, setCategory] = useState("");
    
    useEffect(() => {
        if (product) {
            setProduceType(product.name);
            setDescription(product.description);
            setPrice(product.price.toString());
            setUnit(product.unit);
            setStock(product.stock.toString());
            setOrigin(product.farmer);
            setCategory(product.category);
            setImagePreview(product.imageUrl || null);
        }
    }, [product]);

    if (!product) {
       return <p>Product not found.</p>;
    }


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


    const handleGenerateDescription = async () => {
        if (!produceType || !origin || !uniqueQualities) {
            toast({
                title: "Missing Information",
                description: "Please fill in Product Name, Origin, and Unique Qualities to generate a description.",
                variant: "destructive",
            });
            return;
        }

        setIsGenerating(true);
        try {
            const result = await generateDescription({ produceType, origin, uniqueQualities });
            if (result.description) {
                setDescription(result.description);
                toast({
                    title: "Description Generated!",
                    description: "The AI has generated a new product description.",
                });
            } else {
                 throw new Error("Failed to generate description.");
            }
        } catch (error) {
            toast({
                title: "Generation Failed",
                description: "There was an error generating the description. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleUpdateProduct = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedProductData: Partial<Product> = {
            name: produceType,
            description,
            price: parseFloat(price) || 0,
            unit,
            stock: parseInt(stock, 10) || 0,
            farmer: origin,
            category,
            imageUrl: imagePreview || undefined,
        };
        
        updateProduct(productId, updatedProductData);
        
        toast({
            title: "Product Updated",
            description: `"${produceType}" has been updated successfully.`,
        });
        router.push('/dashboard/products');
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Update the information for your product.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleUpdateProduct}>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="md:col-span-2 grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="product-name">Product Name</Label>
                                <Input id="product-name" placeholder="e.g., Organic Apples" value={produceType} onChange={(e) => setProduceType(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <div className="relative">
                                    <Textarea id="description" placeholder="A detailed description of your product." value={description} onChange={e => setDescription(e.target.value)} rows={5} />
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        className="absolute bottom-2 right-2"
                                        onClick={handleGenerateDescription}
                                        disabled={isGenerating}
                                    >
                                        {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                                        Generate
                                    </Button>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="unique-qualities">Unique Qualities</Label>
                                <Input id="unique-qualities" placeholder="e.g., Sweet and juicy, perfect for salads, hand-picked" value={uniqueQualities} onChange={(e) => setUniqueQualities(e.target.value)} />
                                <p className="text-xs text-muted-foreground">Used by AI to generate description. Separate qualities with commas.</p>
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
                                <Select value={unit} onValueChange={setUnit}>
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
                                <Input id="origin" placeholder="e.g., Sunny Valley Farm, CA" value={origin} onChange={(e) => setOrigin(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Select value={category} onValueChange={setCategory}>
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
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
