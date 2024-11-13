import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/features/api/apiClient'

import { Todo } from '../types/todo'

async function fetchTodo(todoId: number): Promise<Todo> {
  const response = await apiClient.get(`/todo/${todoId}`)
  return response.data
}

export function useFetchTodo(todoId: number) {
  return useQuery({
    queryKey: ['todo', todoId],
    queryFn: () => fetchTodo(todoId),
  })
}
