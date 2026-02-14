
'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { useUserProfile } from '@/hooks/use-user-profile';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Order, OrderItem } from '@/lib/types';
import { useState } from 'react';

export default function CheckoutPage() {
    const { cart, totalPrice, clearCart } = useCart();
    const { user } = useUserProfile();
    const { toast } = useToast();
    const router = useRouter();
    const firestore = useFirestore();

    const [shippingInfo, setShippingInfo] = useState({
        firstName: user?.displayName?.split(' ')[0] || '',
        lastName: user?.displayName?.split(' ').slice(1).join(' ') || '',
        address: '',
        city: '',
        state: '',
        zip: '',
    });
     const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setShippingInfo(prev => ({ ...prev, [id]: value }));
    }

    if (cart.length === 0) {
        if (typeof window !== 'undefined') {
            router.push('/');
        }
        return null;
    }

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast({ title: "Please log in", description: "You must be logged in to place an order.", variant: "destructive" });
            return;
        }
        setIsPlacingOrder(true);

        const orderItems: OrderItem[] = cart.map(item => ({
            product: item.product,
            quantity: item.quantity,
            pricePerUnit: item.product.price,
            subtotal: item.product.price * item.quantity,
            productId: item.product.id,
            farmerId: item.product.farmerId,
        }));

        const farmerIds = [...new Set(cart.map(item => item.product.farmerId))];

        const newOrder: Order = {
            customerId: user.uid,
            customerName: user.displayName || 'Unknown',
            orderDate: new Date().toISOString(),
            totalAmount: totalPrice + 5.00, // including shipping
            status: 'Pending',
            shippingAddress: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}`,
            items: orderItems,
            farmerIds: farmerIds
        };
        
        const ordersRef = collection(firestore, 'orders');
        addDocumentNonBlocking(ordersRef, newOrder)
            .then(() => {
                toast({
                    title: "Order Placed!",
                    description: "Thank you for your purchase. Your fresh produce is on its way!",
                });
                clearCart();
                router.push('/dashboard');
            })
            .catch(err => {
                 toast({
                    title: "Order Failed",
                    description: "There was a problem placing your order. Please try again.",
                    variant: "destructive",
                });
            })
            .finally(() => {
                setIsPlacingOrder(false);
            });
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <div className="bg-secondary/30 py-12">
                    <div className="container">
                        <h1 className="font-headline text-5xl">Checkout</h1>
                        <p className="mt-2 text-muted-foreground">Complete your purchase</p>
                    </div>
                </div>

                <div className="container py-12">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Shipping Information</CardTitle>
                                    <CardDescription>Enter the address where you want to receive your order.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input id="firstName" value={shippingInfo.firstName} onChange={handleInputChange} required/>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input id="lastName" value={shippingInfo.lastName} onChange={handleInputChange} required/>
                                            </div>
                                        </div>
                                         <div className="space-y-2">
                                            <Label htmlFor="address">Address</Label>
                                            <Input id="address" placeholder="123 Farm Road" value={shippingInfo.address} onChange={handleInputChange} required/>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="city">City</Label>
                                                <Input id="city" placeholder="Greenville" value={shippingInfo.city} onChange={handleInputChange} required/>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="state">State</Label>
                                                <Input id="state" placeholder="CA" value={shippingInfo.state} onChange={handleInputChange} required/>
                                            </div>
                                             <div className="space-y-2">
                                                <Label htmlFor="zip">ZIP Code</Label>
                                                <Input id="zip" placeholder="90210" value={shippingInfo.zip} onChange={handleInputChange} required/>
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline">Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        {cart.map(item => (
                                            <div key={item.product.id} className="flex justify-between items-center text-sm">
                                                <span className="text-muted-foreground">{item.product.name} x {item.quantity}</span>
                                                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>$5.00</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>${(totalPrice + 5).toFixed(2)}</span>
                                    </div>
                                    <Button type="submit" form="checkout-form" className="w-full" size="lg" disabled={isPlacingOrder}>
                                        {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
