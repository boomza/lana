import app from "../src";
import * as chai from "chai";
import { request } from "chai";

import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);

describe("Health check", () => {
  it("should return 200 and OK on call", () => {
    return request(app)
      .get("/health")
      .then((res) => {
        chai.expect(res.status).to.eql(200);
        chai.expect(res.text).to.eql("OK");
      });
  });
});

describe("Promotion check", () => {
  it("should return 200 on call", () => {
    return request(app)
      .put("/promotion")
      .set("Content-Type", "application/json")
      .send([
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
      ])
      .then((res) => {
        chai.expect(res.status).to.eql(200);
      });
  });
});

describe("Promotion error check", () => {
  it("should return JSON and 400 on call", () => {
    return request(app)
      .put("/promotion")
      .set("Content-Type", "application/json")
      .send([
        {
          sku: "120P90",
          Quantity: 0,
          Price: 0,
        },
        {
          sku: "0000000",
          Quantity: 1,
          Price: 0,
        },
        {
          sku: "A304SD",
          Quantity: 100,
          Price: 0,
        },
      ])
      .then((res) => {
        chai.expect(res).to.be.json;
        chai.expect(res.status).to.eql(400);
      });
  });
});
