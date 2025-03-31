import CategoryEvents from "@/app/components/CategoryEvents";
import React from "react";

const Page = async ({ params }: { params: Promise<{ categoryId: string }> }) => {
  const {categoryId} = await params

  return (
  <CategoryEvents categoryId={categoryId} />
  )
};

export default Page;