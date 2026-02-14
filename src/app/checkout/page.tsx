
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

export default function CheckoutPage() {
    const { cart, totalPrice, clearCart } = useCart();
    const { user } = useUserProfile();
    const { toast } = useToast();
    const router = useRouter();

    if (cart.length === 0) {
        // Redirect to home if cart is empty, maybe show a toast
        if (typeof window !== 'undefined') {
            router.push('/');
        }
        return null;
    }

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        
        // In a real app, you'd process payment here
        
        toast({
            title: "Order Placed!",
            description: "Thank you for your purchase. Your fresh produce is on its way!",
        });

        clearCart();
        router.push('/dashboard');
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
                                                <Label htmlFor="first-name">First Name</Label>
                                                <Input id="first-name" defaultValue={user?.displayName?.split(' ')[0]} required/>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="last-name">Last Name</Label>
                                                <Input id="last-name" defaultValue={user?.displayName?.split(' ').slice(1).join(' ')} required/>
                                            </div>
                                        </div>
                                         <div className="space-y-2">
                                            <Label htmlFor="address">Address</Label>
                                            <Input id="address" placeholder="123 Farm Road" required/>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="city">City</Label>
                                                <Input id="city" placeholder="Greenville" required/>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="state">State</Label>
                                                <Input id="state" placeholder="CA" required/>
                                            </div>
                                             <div className="space-y-2">
                                                <Label htmlFor="zip">ZIP Code</Label>
                                                <Input id="zip" placeholder="90210" required/>
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
                                    <Button type="submit" form="checkout-form" className="w-full" size="lg">Place Order</Button>
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
