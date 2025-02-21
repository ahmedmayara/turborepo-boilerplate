import {
  AuthenticationApi,
  Configuration,
  TasksApi,
} from "@/lib/api/client/src";

const configuration = new Configuration({
  basePath: "http://localhost:4000",
});

export const tasksApi = new TasksApi(configuration);
export const authenticationApi = new AuthenticationApi(configuration);
