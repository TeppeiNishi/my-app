import { useMutation } from '@tanstack/react-query'

import { Todo } from '../types/todo'

type Payload = Omit<Todo, 'id'>

function createTodo(payload: Payload): Promise<Todo> {
  return fetch('/api/todo', {
    method: 'POST',
    body: JSON.stringify(payload),
  }).then((res) => res.json())
}

export function useCreateTodo() {
  return useMutation({
    mutationFn: createTodo,
  })
}
