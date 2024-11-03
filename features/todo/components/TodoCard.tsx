import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TodoList } from '../components/TodoList'
import { Todo } from '../types/todo'

type TodoCardProps = Readonly<{
  title: string
  todoList: Todo[]
  onToggleComplete: (id: number) => void
  onDelete: (id: number) => void
}>

export function TodoCard({
  title,
  todoList,
  onToggleComplete,
  onDelete,
}: TodoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <TodoList
          todoList={todoList}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      </CardContent>
    </Card>
  )
}
