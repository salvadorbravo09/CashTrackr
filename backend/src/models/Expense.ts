import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";
import Budget from "./Budget";

/**
 * Modelo que representa un gasto en el sistema.
 * Cada gasto está asociado a un presupuesto específico.
 */
@Table({
  tableName: "expenses",
})
class Expense extends Model {
  /**
   * Nombre o descripción del gasto
   * @type {string}
   */
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  /**
   * Monto del gasto
   * @type {number}
   */
  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL,
  })
  declare amount: number;

  /**
   * ID del presupuesto al que pertenece este gasto
   * @type {number}
   */
  @ForeignKey(() => Budget)
  declare budgetId: number;

  /**
   * Relación con el modelo Budget
   * Permite acceder a los datos del presupuesto asociado
   * @type {Budget}
   */
  @BelongsTo(() => Budget)
  declare budget: Budget;
}

export default Expense;
