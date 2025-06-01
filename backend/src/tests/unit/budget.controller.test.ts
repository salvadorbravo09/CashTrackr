import { createRequest, createResponse } from "node-mocks-http";
import { budgets } from "../mocks/budgets";
import { getAllBudgets } from "../../controllers/budget.controller";

describe("budget.controller.getAllBudgets", () => {
  it("should return 3 budgets", async () => {
    const req = createRequest({
      method: "GET",
      url: "/api/v1/budgets",
      user: {
        id: 500,
      },
    });
    const res = createResponse();

    await getAllBudgets(req, res);
    console.log(res._getJSONData)
  });
});
