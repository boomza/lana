import InventoryItemInterface from "./InventoryItemInterface";
import * as data from "./data/inventory.json";

// Class to to implement data layer.
export default class AssetInventory {
  inventory: InventoryItemInterface[] = [];

  // We emulate DB
  constructor() {
    this.inventory = data.values;
  }

  // Public function to reduce search list.
  public GetInventory(skuList: string[]): InventoryItemInterface[] {
    return this.inventory.filter((item) => skuList.includes(item.sku));
  }
}
