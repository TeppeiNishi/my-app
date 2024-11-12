import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/api/apiClient'

import { Todo } from '../types/todo'

function fetchTodo(todoId: number): Promise<Todo[]> {
  return apiClient.get(`/todo/${todoId}`).then((response) => response.data)
}

export function useFetchTodo(todoId: number) {
  return useQuery({
    queryKey: ['todo', todoId],
    queryFn: () => fetchTodo(todoId),
  })
}
