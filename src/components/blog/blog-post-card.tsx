import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { BlogPost } from "@/lib/types";
import { format } from 'date-fns';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  let imageUrl = post.imageUrl;
  let imageHint;
  if (!imageUrl) {
      const postImage = PlaceHolderImages.find((p) => p.id === post.imageId);
      imageUrl = postImage?.imageUrl;
      imageHint = postImage?.imageHint;
  }

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="relative aspect-video w-full">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                data-ai-hint={imageHint}
              />
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <CardTitle className="font-headline text-xl">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
        <CardDescription className="mt-2 line-clamp-3">{post.excerpt}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="text-sm text-muted-foreground">
            By {post.author} on {format(new Date(post.date), 'MMMM d, yyyy')}
        </div>
      </CardFooter>
    </Card>
  );
}
