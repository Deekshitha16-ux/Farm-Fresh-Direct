
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { useBlog } from "@/hooks/use-blog";
import { useUserProfile } from '@/hooks/use-user-profile';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { BlogPost } from '@/lib/types';
import { Trash2 } from 'lucide-react';

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

export default function BlogPage() {
    const { posts, addPost, removePost } = useBlog();
    const { user } = useUserProfile();
    const { toast } = useToast();

    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
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

    const handleSavePost = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast({
                title: "Not logged in",
                description: "You must be logged in to post.",
                variant: "destructive"
            });
            return;
        }

        const newPost: Omit<BlogPost, 'id' | 'date'> = {
            title,
            excerpt,
            content,
            slug: slugify(title),
            author: user.displayName,
            imageId: imagePreview ? '' : 'new-product-placeholder',
            imageUrl: imagePreview || undefined,
        };

        addPost(newPost);
        toast({
            title: "Experience Shared!",
            description: `Thank you for sharing, ${user.displayName}!`
        });
        
        // Reset form
        setTitle('');
        setExcerpt('');
        setContent('');
        setImagePreview(null);
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <div className="bg-secondary/30 py-12">
                    <div className="container">
                        <h1 className="font-headline text-5xl">Community Experiences</h1>
                        <p className="mt-2 max-w-2xl text-muted-foreground">
                           Stories, tips, and experiences from our farmers and customers.
                        </p>
                    </div>
                </div>
                <div className="container py-12 md:py-16">
                    {user ? (
                        <Card className="mb-12">
                            <CardHeader>
                                <CardTitle>Share Your Experience</CardTitle>
                                <CardDescription>Let the community know about your story or tips.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSavePost} className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="post-title">Title</Label>
                                        <Input id="post-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="A title for your story" required/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="post-excerpt">A short summary</Label>
                                        <Textarea id="post-excerpt" value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="A brief summary of your experience." rows={3} required/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="post-content">Your Story</Label>
                                        <Textarea id="post-content" value={content} onChange={e => setContent(e.target.value)} placeholder="Tell us about your experience. You can use HTML for formatting." rows={10} required/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="post-image">Image</Label>
                                        {imagePreview && (
                                            <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg border">
                                                <Image src={imagePreview} alt="Post image preview" fill className="object-cover" />
                                            </div>
                                        )}
                                        <Input id="post-image" type="file" onChange={handleImageChange} accept="image/*" />
                                    </div>
                                    <Button type="submit">Share My Experience</Button>
                                </form>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="mb-12 text-center">
                            <CardHeader>
                                <CardTitle>Join the Conversation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">You must be logged in to share your experience.</p>
                                <Button asChild className="mt-4">
                                    <Link href="/login">Login or Sign Up</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    <h2 className="mb-8 font-headline text-3xl">What People Are Saying</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map(post => (
                            <div key={post.id} className="relative group">
                                <BlogPostCard post={post} />
                                {user && (user.displayName === post.author || user.role === 'farmer') && (
                                    <Button 
                                        variant="destructive" 
                                        size="icon" 
                                        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => {
                                            removePost(post.id)
                                            toast({ title: "Post Deleted", description: `"${post.title}" has been removed.`})
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete post</span>
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
