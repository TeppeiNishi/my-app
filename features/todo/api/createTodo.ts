import { Todo } from '../types/todo'

type Payload = Omit<Todo, 'id'>

export function createTodo(payload: Payload): Promise<Todo> {
  return fetch('/api/todo', {
    method: 'POST',
    body: JSON.stringify(payload),
  }).then((res) => res.json())
}
