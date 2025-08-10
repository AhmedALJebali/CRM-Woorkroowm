"use client";

import { cn } from "@/lib/utils";
import { Card, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { MouseEventHandler } from "react";

interface CompanyCardProps {
  title: string;
  description?: string;
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function CompanySearchCard({ title, description, selected, onClick }: CompanyCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer border transition-all hover:shadow-md",
        selected ? "border-primary bg-primary/5" : "border-gray-200"
      )}
    >
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {description && (
          <CardDescription className="text-xs text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  );
}
export default CompanySearchCard;