import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
  AllowNull,
} from "sequelize-typescript";
import Expense from "./Expense";
import User from "./User";

/**
 * Modelo que representa un presupuesto en el sistema.
 * Un presupuesto puede tener múltiples gastos asociados.
 */
@Table({
  tableName: "budgets",
})
class Budget extends Model {
  /**
   * Nombre o descripción del presupuesto
   * @type {string}
   */
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  /**
   * Monto total del presupuesto
   * @type {number}
   */
  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL,
  })
  declare amount: number;

  /**
   * Relación uno a muchos con el modelo Expense
   * Representa todos los gastos asociados a este presupuesto
   * Se eliminan en cascada cuando se elimina el presupuesto
   * @type {Expense[]}
   */
  @HasMany(() => Expense, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  declare expenses: Expense[];

  @ForeignKey(() => User)
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;
}

export default Budget;
