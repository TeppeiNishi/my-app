import { useQuery } from '@tanstack/react-query'

import { Todo } from '../types/todo'

function fetchTodoList(): Promise<Todo[]> {
  return fetch('/api/todo').then((res) => res.json())
}

export function useFetchTodoList() {
  return useQuery({
    queryKey: ['todoList'],
    queryFn: fetchTodoList,
  })
}
