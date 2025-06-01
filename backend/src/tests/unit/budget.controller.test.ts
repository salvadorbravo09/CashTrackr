/**
 * @file budget.controller.test.ts
 * @description Pruebas unitarias para el controlador `getAllBudgets` usando Jest y node-mocks-http.
 * Estas pruebas validan que el controlador filtre correctamente los presupuestos según el `userId` y
 * que responda con el código de estado HTTP adecuado (200).
 */

import { createRequest, createResponse } from "node-mocks-http"; // Utilidades para simular req/res
import { budgets } from "../mocks/budgets"; // Datos mock (presupuestos ficticios)
import { getAllBudgets } from "../../controllers/budget.controller"; // Función a probar
import Budget from "../../models/Budget"; // Modelo que será mockeado

// Simula el módulo 'Budget' y su método 'findAll' usando Jest
jest.mock("../../models/Budget", () => ({
  findAll: jest.fn(),
}));

describe("budget.controller.getAllBudgets", () => {
  /**
   * Test 1: Usuario con ID 1
   * Debe retornar 2 presupuestos del mock para el usuario con ID 1
   */
  it("should retrieve 2 budgets for user with ID 1", async () => {
    // Crear solicitud y respuesta mock
    const req = createRequest({
      method: "GET",
      url: "/api/v1/budgets",
      user: { id: 1 },
    });
    const res = createResponse();

    // Filtrar presupuestos del mock según userId
    const updatedBudgets = budgets.filter(
      (budget) => budget.userId === req.user.id
    );

    // Configurar el mock de findAll para que devuelva los presupuestos filtrados
    (Budget.findAll as jest.Mock).mockResolvedValue(updatedBudgets);

    // Ejecutar el controlador
    await getAllBudgets(req, res);

    // Obtener la respuesta simulada y hacer las aserciones
    const data = res._getJSONData();
    expect(data).toHaveLength(2); // Debe devolver 2 presupuestos
    expect(res.statusCode).toBe(200); // Código de respuesta esperado
    expect(res.statusCode).not.toBe(500); // No debe ser error del servidor
  });

  /**
   * Test 2: Usuario con ID 2
   * Debe retornar 1 presupuesto del mock para el usuario con ID 2
   */
  it("should retrieve 1 budget for user with ID 2", async () => {
    const req = createRequest({
      method: "GET",
      url: "/api/v1/budgets",
      user: { id: 2 },
    });
    const res = createResponse();

    const updatedBudgets = budgets.filter(
      (budget) => budget.userId === req.user.id
    );
    (Budget.findAll as jest.Mock).mockResolvedValue(updatedBudgets);

    await getAllBudgets(req, res);

    const data = res._getJSONData();
    expect(data).toHaveLength(1);
    expect(res.statusCode).toBe(200);
    expect(res.statusCode).not.toBe(500);
  });

  /**
   * Test 3: Usuario con ID 10 (sin presupuestos)
   * Debe retornar un arreglo vacío y un status 200
   */
  it("should retrieve 0 budget for user with ID 10", async () => {
    const req = createRequest({
      method: "GET",
      url: "/api/v1/budgets",
      user: { id: 10 },
    });
    const res = createResponse();

    const updatedBudgets = budgets.filter(
      (budget) => budget.userId === req.user.id
    );
    (Budget.findAll as jest.Mock).mockResolvedValue(updatedBudgets);

    await getAllBudgets(req, res);

    const data = res._getJSONData();
    expect(data).toHaveLength(0); // No presupuestos encontrados
    expect(res.statusCode).toBe(200); // Aún así, debe responder correctamente
    expect(res.statusCode).not.toBe(500);
  });
});
