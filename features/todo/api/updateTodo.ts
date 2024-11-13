import { useMutation } from '@tanstack/react-query'

import { apiClient } from '@/features/api/apiClient'

import { Todo } from '../types/todo'

async function updateTodo(todo: Todo): Promise<Todo> {
  const response = await apiClient.put(`/todo/${todo.id}`, todo)
  return response.data
}

export function useUpdateTodo() {
  return useMutation({
    mutationFn: updateTodo,
  })
}
