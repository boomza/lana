import { ShoppingCart } from "../src/BusinessLayer";
import { AssetInventory} from "../src/DataLayer";
import { expect, assert } from "chai";
import * as CONST from "../src/Const";

const inventory = new AssetInventory();

describe("Check promotions", () => {
  it("Each sale of a MacBook Pro comes with a free Raspberry Pi B", () => {
    const items = [
      {
        sku: "43N23P",
        Quantity: 1,
        Price: 0,
      },
    ];
    const shoppingCart = new ShoppingCart(inventory, items);
    shoppingCart.ProcessOrder();
    expect(items.length).to.equal(2);
  });

  it("Buy 3 Google Homes for the price of 2", () => {
    const items = [
      {
        sku: "120P90",
        Quantity: 3,
        Price: 0,
      },
    ];
    const shoppingCart = new ShoppingCart(inventory, items);
    shoppingCart.ProcessOrder();
    expect(items[0].Price).to.equal(99.98);
  });

  it("Buying more than 3 Alexa Speakers will have a 10% discount on all Alexa speakers ", () => {
    const items = [
      {
        sku: "A304SD",
        Quantity: 7,
        Price: 0,
      },
    ];
    const shoppingCart = new ShoppingCart(inventory, items);
    shoppingCart.ProcessOrder();
    expect(items[0].Price).to.equal(689.85);
  });
});

describe("Check without promotions", () => {
  it("All available items, excluding MacBook", () => {
    const items = [
      {
        sku: "120P90",
        Quantity: 1,
        Price: 0,
      },
      {
        sku: "234234",
        Quantity: 1,
        Price: 0,
      },
      {
        sku: "A304SD",
        Quantity: 1,
        Price: 0,
      },
    ];
    const shoppingCart = new ShoppingCart(inventory, items);
    shoppingCart.ProcessOrder();
    expect(items[0].Price).to.equal(49.99);
    expect(items[1].Price).to.equal(30.0);
    expect(items[2].Price).to.equal(109.5);
  });
});

describe("Check exceptions", () => {
  it("Zero quantity.", () => {
    const items = [
      {
        sku: "120P90",
        Quantity: 0,
        Price: 0,
      },
    ];
    const shoppingCart = new ShoppingCart(inventory, items);
    assert.throw(
      () => {
        shoppingCart.ProcessOrder();
      },
      Error,
      CONST.QUANTITY_ZERO.message
    );
  });

  it("Not enough quantity.", () => {
    const items = [
      {
        sku: "120P90",
        Quantity: 100,
        Price: 0,
      },
    ];
    const shoppingCart = new ShoppingCart(inventory, items);
    assert.throw(
      () => {
        shoppingCart.ProcessOrder();
      },
      Error,
      CONST.QUANTITY_EXCEED.message
    );
  });

  it("Wrong SKU.", () => {
    const items = [
      {
        sku: "0000000",
        Quantity: 1,
        Price: 0,
      },
    ];
    const shoppingCart = new ShoppingCart(inventory, items);
    assert.throw(
      () => {
        shoppingCart.ProcessOrder();
      },
      Error,
      CONST.SKU_NOT_FOUND.message
    );
  });

  it("All verification issues.", () => {
    const items = [
      {
        sku: "0000000",
        Quantity: 1,
        Price: 0,
      },
      {
        sku: "120P90",
        Quantity: 100,
        Price: 0,
      },
      {
        sku: "120P90",
        Quantity: 0,
        Price: 0,
      },
    ];
    const shoppingCart = new ShoppingCart(inventory, items);
    assert.throw(
      () => {
        shoppingCart.ProcessOrder();
      },
      Error,
      CONST.SKU_NOT_FOUND.message
    );
    assert.throw(
      () => {
        shoppingCart.ProcessOrder();
      },
      Error,
      CONST.QUANTITY_EXCEED.message
    );
    assert.throw(
      () => {
        shoppingCart.ProcessOrder();
      },
      Error,
      CONST.QUANTITY_ZERO.message
    );
  });
});
