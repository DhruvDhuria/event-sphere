import CategoryEvents from "@/app/components/CategoryEvents";
import React from "react";

const Page = async ({ params }: { params: { categoryId: string } }) => {
  const {categoryId} = await params
  
  console.log(categoryId)
  return (
  <CategoryEvents categoryId={categoryId} />
  )
};

export default Page;