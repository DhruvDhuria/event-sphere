import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  id: string
  name: string;
  icon?: React.ReactNode;
  image?: string;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  icon,
  image,
  className,
}) => {

  return (
    <Link
      href={`/categories/${id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl bg-white hover-lift",
        "border border-gray-200/60 transition-all duration-300 h-full",
        className
      )}
    >
      {/* Category Image */}
      <div className="relative overflow-hidden aspect-square">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10" />
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Category Icon on Top */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center p-4 z-20">
          <div className="bg-white/90 backdrop-blur-sm text-primary p-3 rounded-full">
            {icon}
          </div>
        </div>

        {/* Category Name */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          {/* <p className="text-white/80 text-sm">{count} events</p> */}
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
