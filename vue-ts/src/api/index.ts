import { Todo } from "../types";
import http from "./http";

export function getItem(id: number): any {
  return http.get<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`);
}
