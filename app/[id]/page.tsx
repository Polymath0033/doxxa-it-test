import { Inventory } from "@/components/atoms/Inventory";
import React, { Suspense } from "react";
import Loading from "./loading";

export default function InventoryPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Inventory />
    </Suspense>
  );
}
