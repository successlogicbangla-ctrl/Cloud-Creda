"use client";

import { MessageCircle } from "lucide-react";
import { createLead } from "@/lib/actions/leads";
import { cn } from "@/lib/utils";
import { TELEGRAM_URL } from "@/lib/telegram";

interface BuyNowButtonProps {
  productId: string;
  label?: string;
  className?: string;
  size?: "md" | "lg";
}

export function BuyNowButton({
  productId,
  label = "Buy Now on Telegram",
  className,
  size = "md",
}: BuyNowButtonProps) {
  function handleClick() {
    void createLead({
      productId,
      eventType: "buy_click",
      referrer: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }

  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn("btn-primary", size === "lg" && "w-full py-3.5 text-base", className)}
    >
      <MessageCircle className="h-4 w-4" />
      {label}
    </a>
  );
}
