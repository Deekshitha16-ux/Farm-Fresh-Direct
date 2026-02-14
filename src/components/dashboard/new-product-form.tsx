
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateDescription } from "@/lib/actions";

export function NewProductForm() {
    const [isGenerating, setIsGenerating] = useState(false);
    const { toast } = useToast();
    const [description, setDescription] = useState("");
    const [produceType, setProduceType] = useState("");
    const [origin, setOrigin] = useState("");
    const [uniqueQualities, setUniqueQualities] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

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


    return (
        <Card>
            <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Provide the necessary information for your new product.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="md:col-span-2 grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="product-name">Product Name</Label>
                            <Input id="product-name" placeholder="e.g., Organic Apples" value={produceType} onChange={(e) => setProduceType(e.target.value)} />
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
                            <Input id="price" type="number" placeholder="2.99" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="unit">Unit</Label>
                             <Select>
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
                            <Input id="stock" type="number" placeholder="100" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="origin">Origin</Label>
                            <Input id="origin" placeholder="e.g., Sunny Valley Farm, CA" value={origin} onChange={(e) => setOrigin(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                             <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fruits">Fruits</SelectItem>
                                    <SelectItem value="vegetables">Vegetables</SelectItem>
                                    <SelectItem value="dairy">Dairy</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                 <div className="mt-8 flex justify-end">
                    <Button>Save Product</Button>
                </div>
            </CardContent>
        </Card>
    );
}
