import type { Task } from "../generated/client";
import { db } from "./client";

const DEFAULT_TASKS = [
  {
    title: "Task 1",
    done: false,
    description: "Description 1",
  },
  {
    title: "Task 2",
    done: false,
    description: "Description 2",
  },
  {
    title: "Task 3",
    done: false,
    description: "Description 3",
  },
  {
    title: "Task 4",
    done: false,
    description: "Description 4",
  },
  {
    title: "Task 5",
    done: false,
    description: "Description 5",
  },
] as Array<Partial<Task>>;

(async () => {
  try {
    await Promise.all(
      DEFAULT_TASKS.map((task) =>
        db.task.create({
          data: {
            title: task.title || "Task",
            done: task.done || false,
            description: task.description || "Description",
          },
        }),
      ),
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
})();
