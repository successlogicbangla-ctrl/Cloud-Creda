import { Quote } from "lucide-react";
import type { Review } from "@/lib/types";
import { StarRating } from "@/components/ui/StarRating";

export function ReviewCard({ review }: { review: Review }) {
  const initials = review.customer_name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="card-surface flex h-full flex-col p-6">
      <Quote className="h-6 w-6 text-sky-accent/40" />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink">{review.quote}</p>
      <StarRating rating={review.rating} className="mt-4" />
      <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-deep-blue text-sm font-semibold text-white">
          {initials}
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">{review.customer_name}</p>
          {review.customer_title && <p className="text-xs text-ink-muted">{review.customer_title}</p>}
        </div>
      </div>
    </div>
  );
}
