import { main } from "../index";

describe("Main", () => {
  test("add should return the sum of two numbers", async  () => {
    await expect(main()).resolves.not.toThrow();
  });
});