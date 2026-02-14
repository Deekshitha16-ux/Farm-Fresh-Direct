
'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { useBlog } from '@/hooks/use-blog';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const { posts } = useBlog();
    const post = posts.find(p => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    const postImage = PlaceHolderImages.find(p => p.id === post.imageId);

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12 md:py-16">
                <div className="container">
                    <article className="prose prose-lg mx-auto max-w-4xl">
                         {postImage && (
                            <div className="relative mb-8 aspect-video w-full">
                                <Image
                                    src={postImage.imageUrl}
                                    alt={post.title}
                                    fill
                                    className="rounded-lg object-cover"
                                    data-ai-hint={postImage.imageHint}
                                />
                            </div>
                        )}
                        <div className="text-center">
                            <h1 className="font-headline text-4xl md:text-5xl">{post.title}</h1>
                            <p className="mt-2 text-muted-foreground">
                                By {post.author} on {format(new Date(post.date), 'MMMM d, yyyy')}
                            </p>
                        </div>
                        <div
                            className="mt-8"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
}
