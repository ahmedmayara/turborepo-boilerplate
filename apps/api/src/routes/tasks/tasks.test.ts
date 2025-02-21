// import { tasks } from "@/routes/tasks";
// import { db } from "@repo/database/client";
// import { testClient } from "hono/testing";
// import * as HttpStatusCodes from "stoker/http-status-codes";
// import { beforeAll, beforeEach, describe, expect, it } from "vitest";

// import { env } from "@/config/env";
// import { createApp } from "@/lib/create-app";

// const client = testClient(createApp().route("/", tasks));

// describe("Tasks API", () => {
//   beforeAll(() => {
//     expect(env.NODE_ENV).toBe("test");
//     expect(env.LOG_LEVEL).toBe("silent");
//   });

//   beforeEach(async () => {
//     await db.task.deleteMany();
//   });

//   describe("GET /tasks", () => {
//     it("should return an empty array when no tasks exist", async () => {
//       const response = await client.tasks.$get();
//       expect(response.status).toBe(HttpStatusCodes.OK);
//       const tasks = await response.json();
//       expect(tasks).toEqual([]);
//     });

//     it("should return all tasks", async () => {
//       const task1 = await db.task.create({
//         data: { title: "Task 1", description: "Description 1" },
//       });
//       const task2 = await db.task.create({
//         data: { title: "Task 2", description: "Description 2" },
//       });

//       const response = await client.tasks.$get();
//       expect(response.status).toBe(HttpStatusCodes.OK);
//       const tasks = await response.json();
//       expect(tasks).toHaveLength(2);

//       expect(tasks).toEqual(
//         expect.arrayContaining([
//           expect.objectContaining({ id: task1.id, title: task1.title }),
//           expect.objectContaining({ id: task2.id, title: task2.title }),
//         ]),
//       );
//     });
//   });

//   describe("POST /tasks", () => {
//     it("should create a new task with valid data", async () => {
//       const newTask = {
//         title: "New Task",
//         description: "Task Description",
//       };

//       const response = await client.tasks.$post({
//         json: newTask,
//       });

//       expect(response.status).toBe(HttpStatusCodes.CREATED);
//       const task = await response.json();

//       expect(task).toMatchObject({
//         id: expect.any(String),
//         title: newTask.title,
//         description: newTask.description,
//         done: false,
//         createdAt: expect.any(String),
//         updatedAt: expect.any(String),
//       });
//     });

//     it("should return validation error for empty title", async () => {
//       const response = await client.tasks.$post({
//         json: { title: "", description: "Description" },
//       });

//       expect(response.status).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY);
//     });
//   });

//   describe("GET /tasks/:id", () => {
//     it("should return a task by id", async () => {
//       const task = await db.task.create({
//         data: { title: "Test Task", description: "Description" },
//       });

//       const response = await client.tasks[":id"].$get({
//         param: { id: task.id },
//       });

//       expect(response.status).toBe(HttpStatusCodes.OK);
//       const fetchedTask = await response.json();
//       expect(fetchedTask).toEqual(
//         expect.objectContaining({
//           id: task.id,
//           title: task.title,
//           description: task.description,
//         }),
//       );
//     });

//     it("should return 404 for non-existent task", async () => {
//       const response = await client.tasks[":id"].$get({
//         param: { id: "non-existent-id" },
//       });

//       expect(response.status).toBe(HttpStatusCodes.NOT_FOUND);
//     });
//   });

//   describe("PATCH /tasks/:id", () => {
//     it("should update a task", async () => {
//       const task = await db.task.create({
//         data: { title: "Original Title", description: "Original Description" },
//       });

//       const updates = {
//         title: "Updated Title",
//         description: "Updated Description",
//         done: true,
//       };

//       const response = await client.tasks[":id"].$patch({
//         param: { id: task.id },
//         json: updates,
//       });

//       expect(response.status).toBe(HttpStatusCodes.OK);
//       const updatedTask = await response.json();

//       expect(updatedTask).toEqual(expect.objectContaining(updates));
//     });

//     it("should return 404 for updating non-existent task", async () => {
//       const response = await client.tasks[":id"].$patch({
//         param: { id: "non-existent-id" },
//         json: { title: "Updated Title" },
//       });

//       expect(response.status).toBe(HttpStatusCodes.NOT_FOUND);
//     });

//     it("should handle partial updates", async () => {
//       const task = await db.task.create({
//         data: { title: "Original Title", description: "Original Description" },
//       });

//       const response = await client.tasks[":id"].$patch({
//         param: { id: task.id },
//         json: { done: true },
//       });

//       expect(response.status).toBe(HttpStatusCodes.OK);
//       const updatedTask = await response.json();

//       expect(updatedTask).toEqual(
//         expect.objectContaining({
//           id: task.id,
//           title: task.title,
//           description: task.description,
//           done: true,
//           createdAt: expect.any(String),
//           updatedAt: expect.any(String),
//         }),
//       );
//     });
//   });

//   describe("DELETE /tasks/:id", () => {
//     it("should delete a task", async () => {
//       const task = await db.task.create({
//         data: { title: "To Be Deleted", description: "Description" },
//       });

//       const response = await client.tasks[":id"].$delete({
//         param: { id: task.id },
//       });

//       expect(response.status).toBe(HttpStatusCodes.NO_CONTENT);

//       const deletedTask = await db.task.findUnique({
//         where: { id: task.id },
//       });

//       expect(deletedTask).toBeNull();
//     });

//     it("should return 404 for deleting non-existent task", async () => {
//       const response = await client.tasks[":id"].$delete({
//         param: { id: "non-existent-id" },
//       });

//       expect(response.status).toBe(HttpStatusCodes.NOT_FOUND);
//     });
//   });
// });
