import { main } from "../index";

describe("Main", () => {
  test("running main should not throw any errors", async  () => {
    await expect(main()).resolves.not.toThrow();
  });
});