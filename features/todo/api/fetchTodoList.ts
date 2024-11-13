import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/features/api/apiClient'

import { Todo } from '../types/todo'

async function fetchTodoList(): Promise<Todo[]> {
  const response = await apiClient.get('/todo')
  return response.data
}

export function useFetchTodoList() {
  return useQuery({
    queryKey: ['todoList'],
    queryFn: fetchTodoList,
  })
}
