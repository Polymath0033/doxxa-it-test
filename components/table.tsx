import { FC } from "react";
import { formatNumber } from "@/lib/number-formatter";
import { _fetchInventories } from "@/lib/config";
import { TDAction } from "./atoms/td-action";
import { InventoryData } from "@/types/inventory";
export const Table: FC<{ inventories: InventoryData[]; search: string }> = ({
  inventories,
  search,
}) => {
  return (
    <table className="min-w-full rounded-bl-xl divide-y bg-white  divide-gray-200">
      <thead className="bg-01  text-white ">
        <tr className=" *:px-3 *:py-3 *:text-sm sm:*:text-base">
          <td className="rounded-tl-lg">Name</td>
          <td>Category</td>
          {/* <td>Description</td> */}
          <td>price</td>
          <td>Units Available</td>
          <td className="rounded-tr-lg">Quantity</td>
        </tr>
      </thead>
      <tbody className="bg-white border-t rounded-2xl border-gray-200">
        {inventories.length === 0 && (
          <tr className="">
            <td
              colSpan={5}
              className="text-xl text-center mx-auto  !py-5 font-bold text-red-500 "
            >
              Couldn&rsquo;t find any inventory with the name &lsquo;{search}
              &rsquo;
            </td>
          </tr>
        )}
        {inventories.map((inventory) => (
          <tr
            key={inventory.id}
            className="*:px-3 *:text-sm sm:*:text-base *:py-3"
          >
            <td>{inventory.name}</td>
            <td>{inventory.category}</td>
            {/* <td>{inventory.description}</td> */}
            <td>{formatNumber(inventory.price)}</td>
            <td>{inventory?.unit_available}</td>
            <TDAction
              title={inventory.name}
              id={inventory.id}
              name={inventory.quantity}
            />
          </tr>
        ))}
      </tbody>
      {/* I would have handled the pagination but since this is take-home test and coming from backend is not paginated as well though it is bad practice for large data */}
    </table>
  );
};
