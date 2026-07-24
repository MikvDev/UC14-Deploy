import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  JoinColumn, 
  CreateDateColumn, 
  UpdateDateColumn 
} from "typeorm";
import { User } from "./User.js";

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED"
}

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  title!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.PENDING
  })
  status!: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}