import { useMutation } from '@tanstack/react-query'

import { apiClient } from '@/api/apiClient'

import { Todo } from '../types/todo'

type Payload = Omit<Todo, 'id'>

async function createTodo(payload: Payload): Promise<Todo> {
  const response = await apiClient.post('/todo', payload)
  return response.data
}

export function useCreateTodo() {
  return useMutation({
    mutationFn: createTodo,
  })
}
