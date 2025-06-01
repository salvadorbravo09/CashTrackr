import { createRequest, createResponse } from "node-mocks-http";
import { budgets } from "../mocks/budgets";
import { getAllBudgets } from "../../controllers/budget.controller";
import Budget from "../../models/Budget";

jest.mock("../../models/Budget", () => ({
  findAll: jest.fn(),
}));

describe("budget.controller.getAllBudgets", () => {
  it("should retrive 2 budgets for user with ID 1", async () => {
    const req = createRequest({
      method: "GET",
      url: "/api/v1/budgets",
      user: {
        id: 1,
      },
    });
    const res = createResponse();

    const updatedBudgets = budgets.filter(
      (budget) => budget.userId === req.user.id
    );
    (Budget.findAll as jest.Mock).mockResolvedValue(updatedBudgets);
    await getAllBudgets(req, res);

    const data = res._getJSONData();
    expect(data).toHaveLength(2);
    expect(res.statusCode).toBe(200);
    expect(res.statusCode).not.toBe(500);
  });
});
