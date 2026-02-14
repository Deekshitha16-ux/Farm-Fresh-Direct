import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Bringing the farm's finest directly to your doorstep.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <h4 className="font-headline text-lg">Shop</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">All Products</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Fruits</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Vegetables</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-headline text-lg">About Us</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Our Story</Link></li>
                <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Our Farmers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-headline text-lg">Support</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">My Account</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact Us</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">FAQs</Link></li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-headline text-lg">Stay in Touch</h4>
            <p className="mt-4 text-sm text-muted-foreground">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <div className="mt-4 flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" />
              <Button type="submit">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Farm Fresh Direct. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
