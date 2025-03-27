import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  onSelectCategory: (category: string | null) => void;
  className?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  onSelectCategory,
  className,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      onSelectCategory(null);
    } else {
      setSelectedCategory(category);
      onSelectCategory(category);
    }
  };

  return (
    <div className={cn("w-full overflow-x-auto py-2", className)}>
      <div className="flex space-x-2 min-w-max">
        <button
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            "border border-gray-200 hover:border-gray-300",
            !selectedCategory
              ? "bg-foreground text-white border-transparent"
              : "bg-white text-gray-700"
          )}
          onClick={() => {
            setSelectedCategory(null);
            onSelectCategory(null);
          }}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              "border hover:border-gray-300",
              selectedCategory === category
                ? "bg-foreground text-white border-transparent"
                : "bg-white text-gray-700 border-gray-200"
            )}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
