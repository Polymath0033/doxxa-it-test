import { Inventory } from "@/components/atoms/Inventory";
import React, { Suspense } from "react";
import Loading from "./loading";
export default function InventoryPage({ param }: { param: { id: string } }) {
  return (
    <Suspense fallback={<Loading />}>
      <Inventory id={param?.id} />
    </Suspense>
  );
}
