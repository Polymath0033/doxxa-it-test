// I have issue when creating the type of the inventory data, what I got when I logged the api has description but no units_available while the data shown in postman no description but has units_available. So I created Inventory type that accepts both. I thought typescript would have solved the issues but I don't this api has such.
export type InventoryData = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  unit_available: number;
};
//omitted the property id
export type Inventory = Omit<InventoryData, "id">;
