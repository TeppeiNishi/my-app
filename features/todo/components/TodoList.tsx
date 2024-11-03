import { Todo } from '../types/todo'
import { TodoListItem, TodoListItemProps } from './TodoListItem'

export type TodoListProps = Readonly<
  {
    todoList: Todo[]
  } & Pick<TodoListItemProps, 'onToggleComplete' | 'onEdit' | 'onDelete'>
>

export function TodoList({
  todoList,
  onToggleComplete,
  onEdit,
  onDelete,
}: TodoListProps) {
  return (
    <ul className="flex flex-col gap-2">
      {todoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
