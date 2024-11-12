import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/api/apiClient'

import { Todo } from '../types/todo'

function fetchTodoList(): Promise<Todo[]> {
  return apiClient.get('/todo').then((response) => response.data)
}

export function useFetchTodoList() {
  return useQuery({
    queryKey: ['todoList'],
    queryFn: fetchTodoList,
  })
}
