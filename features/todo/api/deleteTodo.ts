import { useMutation } from '@tanstack/react-query'

import { apiClient } from '@/api/apiClient'

import { Todo } from '../types/todo'

async function deleteTodo(todoId: number): Promise<Todo> {
  const response = await apiClient.delete(`/todo/${todoId}`)
  return response.data
}

export function useDeleteTodo() {
  return useMutation({
    mutationFn: deleteTodo,
  })
}
