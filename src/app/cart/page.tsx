import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import CartItemsClient from '@/components/cart/cart-items-client';

export default function CartPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <div className="bg-secondary/30 py-12">
                    <div className="container">
                        <h1 className="font-headline text-5xl">Your Shopping Cart</h1>
                        <p className="mt-2 text-muted-foreground">Review your items and proceed to checkout.</p>
                    </div>
                </div>
                <div className="container py-12">
                   <CartItemsClient />
                </div>
            </main>
            <Footer />
        </div>
    );
}
