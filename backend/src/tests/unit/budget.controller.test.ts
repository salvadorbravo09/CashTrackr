import { createRequest, createResponse } from "node-mocks-http";
import { budgets } from "../mocks/budgets";
import { getAllBudgets } from "../../controllers/budget.controller";
import Budget from "../../models/Budget";

jest.mock("../../models/Budget", () => ({
  findAll: jest.fn(),
}));

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

    (Budget.findAll as jest.Mock).mockResolvedValue(budgets);
    await getAllBudgets(req, res);

    const data = res._getJSONData();
    console.log(data);
  });
});
