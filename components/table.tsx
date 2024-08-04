import { FC } from "react";
import { formatNumber } from "@/lib/number-formatter";
import { TDAction } from "./atoms/td-action";
import { InventoryData } from "@/types/inventory";

export const Table: FC<{
  inventories: InventoryData[];
  search: string;
  loading?: boolean;
}> = ({ inventories, search, loading }) => {
  return (
    <div className="overflow-x-auto table-overflow">
      <table className="min-w-full  rounded-bl-xl divide-y divide-gray-200">
        <thead className="bg-01 text-white">
          <tr className="divide-y *:text-center  *:border  divide-gray-200 text-sm sm:text-base">
            <th className="rounded-tl-lg px-4 py-2">Name</th>
            <th className="px-4 py-2">Category</th>
            {/* <th>Description</th> */}
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Units Available</th>
            <th className="rounded-tr-lg px-4 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody className="bg-white border-t rounded-2xl border-gray-200">
          {!loading && inventories?.length < 1 && (
            <tr>
              <td
                colSpan={5}
                className="text-xl text-center mx-auto py-5 font-bold text-red-500"
              >
                Couldn&rsquo;t find any inventory with the name &lsquo;{search}
                &rsquo;
              </td>
            </tr>
          )}
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-4 py-2 border border-gray-200">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                </tr>
              ))
            : inventories
                ?.filter((inventory) =>
                  inventory?.name?.toLowerCase().includes(search.toLowerCase())
                )
                .map((inventory) => (
                  <tr
                    key={inventory?.id}
                    className="text-sm *:text-center  *:border *:last-of-type:border-b-none sm:text-base"
                  >
                    <td className="px-4  py-2">{inventory?.name}</td>
                    <td className="px-4 py-2">{inventory?.category}</td>
                    {/* <td className="px-4 py-2">{inventory.description}</td> */}
                    <td className="px-4 py-2">
                      {formatNumber(inventory?.price)}
                    </td>
                    <td className="px-4 py-2">{inventory?.unit_available}</td>
                    <TDAction
                      title={inventory?.name}
                      id={inventory?.id}
                      name={inventory?.quantity}
                    />
                  </tr>
                ))}
        </tbody>
        {/* I would have handled the pagination but since this is take-home test and coming from backend is not paginated as well though it is bad practice for large data */}
      </table>
    </div>
  );
};
