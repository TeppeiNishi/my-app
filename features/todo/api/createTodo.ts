import { useMutation } from '@tanstack/react-query'

import { apiClient } from '@/api/apiClient'

import { Todo } from '../types/todo'

type Payload = Omit<Todo, 'id'>

function createTodo(payload: Payload): Promise<Todo> {
  return apiClient.post('/todo', payload).then((response) => response.data)
}

export function useCreateTodo() {
  return useMutation({
    mutationFn: createTodo,
  })
}
