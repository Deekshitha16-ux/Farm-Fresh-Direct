
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DashboardBlogPage() {
    return (
        <div>
            <h1 className="font-headline text-4xl">Community Blog</h1>
            <p className="text-muted-foreground">This is where our community shares their experiences.</p>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Blog Management Has Moved</CardTitle>
                    <CardDescription>
                        To make it easier for everyone to share their experiences, all blog-related activities are now on the main blog page.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>You can read, write, and manage posts directly on the community blog page.</p>
                    <Button asChild className="mt-4">
                        <Link href="/blog">Go to the Blog</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
