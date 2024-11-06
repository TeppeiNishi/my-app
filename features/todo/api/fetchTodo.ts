import { useQuery } from '@tanstack/react-query'

import { Todo } from '../types/todo'

function fetchTodo(todoId: number): Promise<Todo[]> {
  return fetch(`/api/todo/${todoId}`).then((res) => res.json())
}

export function useFetchTodo(todoId: number) {
  return useQuery({
    queryKey: ['todo', todoId],
    queryFn: () => fetchTodo(todoId),
  })
}
