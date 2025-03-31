"use client"
import React, { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";


interface CategoryCardProps {
    _id: string;
    description: string;
    name: string;
    image: string;
}

const Page = () => {
    const [categories, setCategories] = useState<CategoryCardProps[]>([])

    const fetchCategories = async() => {
        const data = await fetch("api/categories");
        const searchedCategories = await data.json()
        console.log(searchedCategories.categories)
        setCategories(searchedCategories.categories)
        
    }

    useEffect(() => {
        fetchCategories()
    }, [])
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <main className="flex-grow">
        {/* Categories Grid */}
        <section className="py-16 px-6 md:px-8 lg:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              {/* <span className="inline-block py-1 px-3 text-lg font-medium bg-secondary text-secondary-foreground rounded-full mb-2">
                Categories
              </span> */}
              <h2 className="text-3xl font-bold mb-4">Find Your Interest</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Select a category below to explore events tailored to your
                interests.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  id={category._id}
                  key={category.name}
                  name={category.name}
                  image={category.image}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
