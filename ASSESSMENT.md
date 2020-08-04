# Shopping Cart
Have you shopped online? Let’s imagine that you need to build the
checkout business logic that will support different promotions with the
given inventory.
Build a checkout system as a standalone NodeJS API with these items: 


| SKU | Name | Price | Inventory Qty |
| --------------- | --------------- | --------------- | --------------- |
| 120P90 | Google Home | $49.99 | 10 |
| 43N23P | MacBook Pro | $5,399.99 | 5 |
| A304SD | Alexa Speaker | $109.50 | 10 |
| 234234 | Raspberry Pi B | $30.00 | 2 |

The system should have the following promotions:
- Each sale of a MacBook Pro comes with a free Raspberry Pi B
- Buy 3 Google Homes for the price of 2
- Buying more than 3 Alexa Speakers will have a 10% discount on all Alexa speakers

## Example Scenarios:
- Scanned Items: MacBook Pro, Raspberry Pi B Total: $5,399.99
- Scanned Items: Google Home, Google Home, Google Home Total: $99.98
- Scanned Items: Alexa Speaker, Alexa Speaker, Alexa Speaker Total: $295.65 
