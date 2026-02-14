import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export function RatingStars({ rating, maxRating = 5, className }: RatingStarsProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={cn(
            "h-4 w-4",
            rating > index
              ? "fill-accent text-accent"
              : "fill-muted text-muted-foreground"
          )}
        />
      ))}
    </div>
  );
}
