
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useBlog } from '@/hooks/use-blog';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import type { BlogPost } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';

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

export default function DashboardBlogPage() {
    const { posts, addPost, removePost } = useBlog();
    const { user } = useAuth();
    const { toast } = useToast();

    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');

    const handleSavePost = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !excerpt || !content) {
            toast({
                title: "Missing fields",
                description: "Please fill out all fields to save the post.",
                variant: "destructive"
            });
            return;
        }

        const newPost: Omit<BlogPost, 'id' | 'date'> = {
            title,
            excerpt,
            content,
            slug: slugify(title),
            author: user?.name || 'Farm Fresh Direct',
            imageId: 'blog-gardening', // Placeholder image
        };

        addPost(newPost);
        toast({
            title: "Blog Post Saved!",
            description: `"${title}" has been successfully published.`
        });
        
        // Reset form
        setTitle('');
        setExcerpt('');
        setContent('');
    };


    return (
        <div className="grid gap-8 md:grid-cols-2">
            <div>
                <h1 className="font-headline text-4xl">Blog Management</h1>
                <p className="text-muted-foreground">Create and manage your blog posts.</p>

                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Create New Post</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSavePost} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="post-title">Title</Label>
                                <Input id="post-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="My Awesome Blog Post" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="post-excerpt">Excerpt</Label>
                                <Textarea id="post-excerpt" value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="A short summary of the post." rows={3} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="post-content">Content</Label>
                                <Textarea id="post-content" value={content} onChange={e => setContent(e.target.value)} placeholder="Write your blog post here. You can use HTML." rows={10} />
                            </div>
                            <Button type="submit">Save and Publish</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Published Posts</CardTitle>
                        <CardDescription>Your currently live blog posts.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.map(post => (
                                    <TableRow key={post.id}>
                                        <TableCell className="font-medium">{post.title}</TableCell>
                                        <TableCell>{post.author}</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" onClick={() => removePost(post.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
