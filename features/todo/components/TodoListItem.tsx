import { AppButton } from '@/components/AppButton'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import { useDeleteTodo } from '../api/deleteTodo'
import { Todo } from '../types/todo'

export type TodoListItemProps = {
  todo: Todo
  onToggleComplete: (todo: Todo) => void
  onEdit: (todoId: number) => void
  onDeleted: (todoId: number) => void
}

export function TodoListItem({
  todo,
  onToggleComplete,
  onEdit,
  onDeleted,
}: Readonly<TodoListItemProps>) {
  const deleteTodo = useDeleteTodo()

  function handleDeleteTodo(todoId: number) {
    deleteTodo.mutate(todoId, {
      onSuccess: () => {
        onDeleted(todoId)
      },
    })
  }

  return (
    <li className="flex items-center gap-2">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggleComplete(todo)}
      />
      <p className={`w-full ${todo.completed ? 'line-through' : ''}`}>
        {todo.text}
      </p>
      <Button variant="outline" onClick={() => onEdit(todo.id)}>
        Edit
      </Button>
      <AppButton
        variant="destructive"
        loading={deleteTodo.isPending}
        onClick={() => handleDeleteTodo(todo.id)}
      >
        Delete
      </AppButton>
    </li>
  )
}
