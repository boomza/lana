import OrderInterface from "./OrderInterface";
import InventoryItemInterface from "../DataLayer/InventoryItemInterface";
import ErrorInterface, * as CONST from "../Const";
import { AssetInventory } from "../DataLayer";

// Class to keep all promotion rules.
// Business layer
export default class ShoppingCart {
  order: OrderInterface[] = [];
  inventory: InventoryItemInterface[] = [];

  // We can put order to class property or pass as parameter to ProcessOrder function.
  constructor(assetInventory: AssetInventory, order: OrderInterface[]) {
    this.order = order;
    const skuList = this.order.map((item) => {
      return item.sku;
    });
    if (!skuList.includes("234234")) {
      skuList.push("234234");
    }
    this.inventory = assetInventory.GetInventory(skuList);
  }

  // Public function for all checks and promotions.
  public ProcessOrder(): void {
    let i = 0;
    const Errors: ErrorInterface[] = [];
    for (i = 0; i < this.order.length; i++) {
      const orderItem: OrderInterface = this.order[i];
      if (orderItem.Quantity === 0) {
        Errors.push({
          ...CONST.QUANTITY_ZERO,
          data: orderItem.sku,
        });
      }
      const inventoryItem:
        | InventoryItemInterface
        | undefined = this.inventory.find((item) => orderItem.sku === item.sku);
      if (!inventoryItem) {
        Errors.push({
          ...CONST.SKU_NOT_FOUND,
          data: orderItem.sku,
        });
      } else {
        if (inventoryItem.Quantity < orderItem.Quantity) {
          Errors.push({
            ...CONST.QUANTITY_EXCEED,
            data: orderItem.sku,
          });
        } else if (Errors.length === 0) {
          switch (orderItem.sku) {
            case "43N23P":
              this.PromotionOne(inventoryItem);
              break;
            case "120P90":
              this.PromotionTwo(orderItem, inventoryItem);
              break;
            case "A304SD":
              this.PromotionThree(orderItem, inventoryItem);
              break;
            default:
              orderItem.Price = orderItem.Quantity * inventoryItem.Price;
              break;
          }
        }
      }
    }
    if (Errors.length > 0) {
      throw new Error(JSON.stringify(Errors));
    }
  }

  // Private functions for promotions. Hard coded.

  // Each sale of a MacBook Pro comes with a free Raspberry Pi B
  private PromotionOne(inventoryItem: InventoryItemInterface): void {
    const orderItem: OrderInterface | undefined = this.order.find(
      (item) => item.sku === "234234"
    );
    if (!orderItem) {
      this.order.push({ sku: "234234", Price: 0, Quantity: 1 });
    } else {
      orderItem.Price = inventoryItem.Price * (orderItem.Quantity - 1);
    }
  }

  // Buy 3 Google Homes for the price of 2
  // Not clear what to do if customer buys 4 or 6
  private PromotionTwo(
    orderItem: OrderInterface,
    inventoryItem: InventoryItemInterface
  ): void {
    if (orderItem.Quantity === 3) {
      orderItem.Price = inventoryItem.Price * 2;
    } else {
      orderItem.Price = inventoryItem.Price * orderItem.Quantity;
    }
  }

  //  Buying more than 3 Alexa Speakers will have a 10% discount on all Alexa speakers
  private PromotionThree(
    orderItem: OrderInterface,
    inventoryItem: InventoryItemInterface
  ): void {
    if (orderItem.Quantity > 3) {
      orderItem.Price =
        Math.round(inventoryItem.Price * orderItem.Quantity * 90) / 100;
    } else {
      orderItem.Price = inventoryItem.Price * orderItem.Quantity;
    }
  }
}
