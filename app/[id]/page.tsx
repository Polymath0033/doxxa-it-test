import { Inventory } from "@/components/molecules/Inventory";
import React, { Suspense } from "react";
import Loading from "./loading";

export default function InventoryPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Inventory />
    </Suspense>
  );
}
