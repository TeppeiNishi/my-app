import { Todo } from '../types/todo'
import { TodoListItem } from './TodoListItem'

type TodoListProps = Readonly<{
  todoList: Todo[]
  onToggleComplete: (id: number) => void
  onDelete: (id: number) => void
}>

export function TodoList({
  todoList,
  onToggleComplete,
  onDelete,
}: TodoListProps) {
  return (
    <ul className="flex flex-col gap-2">
      {todoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onToggleComplete={() => onToggleComplete(todo.id)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </ul>
  )
}
