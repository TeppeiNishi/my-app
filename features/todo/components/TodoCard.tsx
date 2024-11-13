import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { TodoList, TodoListProps } from '../components/TodoList'

type TodoCardProps = {
  title: string
} & Pick<TodoListProps, 'todoList' | 'onToggleComplete' | 'onEdit' | 'onDelete'>

export function TodoCard({ title, ...restProps }: Readonly<TodoCardProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <TodoList {...restProps} />
      </CardContent>
    </Card>
  )
}
