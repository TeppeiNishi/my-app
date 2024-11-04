import { Todo } from '../types/todo'

export function fetchTodoList(): Promise<Todo[]> {
  return fetch('/api/todo').then((res) => res.json())
}
