import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import { ShoppingCart } from "./BusinessLayer";
import { AssetInventory} from "./DataLayer";

// Boot express. Port 5000.
const app: Application = express();
const port = 5000;
const inventory = new AssetInventory();

app.use(logger("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Instance health check URL
// Returns "OK" for browser check
app.use("/health", (req: Request, res: Response) => {
  console.debug("health check");
  res.status(200).send("OK");
});

app.put("/promotion", (req: Request, res: Response) => {
  console.debug("PUT promotion");
  try {
    const items = req.body;
    const shoppingCart = new ShoppingCart(inventory, items);
    // Process order
    // Populate prices
    shoppingCart.ProcessOrder();
    res.status(200).send(items);
  } catch (e) {
    console.error(e.message);
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(e.message);
  }
});

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));

export default app;
