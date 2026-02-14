
'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { useBlog } from "@/hooks/use-blog";

export default function BlogPage() {
    const { posts } = useBlog();

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <div className="bg-secondary/30 py-12">
                    <div className="container">
                        <h1 className="font-headline text-5xl">Farm Fresh Blog</h1>
                        <p className="mt-2 max-w-2xl text-muted-foreground">
                            Tips, recipes, and stories from our community of farmers. Get to know the people and practices behind your food.
                        </p>
                    </div>
                </div>
                <div className="container py-12 md:py-16">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map(post => (
                            <BlogPostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
