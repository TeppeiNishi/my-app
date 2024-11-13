import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import { Todo } from '../types/todo'

export type TodoListItemProps = {
  todo: Todo
  onToggleComplete: (todo: Todo) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export function TodoListItem({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
}: Readonly<TodoListItemProps>) {
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
      <Button variant="destructive" onClick={() => onDelete(todo.id)}>
        Delete
      </Button>
    </li>
  )
}
