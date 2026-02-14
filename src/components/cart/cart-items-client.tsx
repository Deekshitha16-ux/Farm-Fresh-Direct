
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItemsClient() {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="mt-6">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Product</TableHead>
                  <TableHead></TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map(({ product, quantity }) => {
                  let imageUrl = product.imageUrl;
                  if (!imageUrl) {
                      const productImage = PlaceHolderImages.find((p) => p.id === product.imageId);
                      imageUrl = productImage?.imageUrl;
                  }
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                          {imageUrl && (
                            <Image
                              src={imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <Link href={`/products/${product.id}`}>{product.name}</Link>
                        <p className="text-xs text-muted-foreground">{product.farmer}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(product.id, quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input type="number" value={quantity} readOnly className="h-7 w-12 border-0 bg-transparent p-0 text-center" />
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(product.id, quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell className="font-semibold">${(product.price * quantity).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(product.id)}>
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(totalPrice + 5).toFixed(2)}</span>
            </div>
            <Button asChild className="w-full" size="lg">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
