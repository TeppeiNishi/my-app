import { Todo } from '../types/todo'
import { TodoListItem, TodoListItemProps } from './TodoListItem'

export type TodoListProps = {
  todoList: Todo[]
} & Pick<TodoListItemProps, 'onToggleComplete' | 'onEdit' | 'onDelete'>

export function TodoList({ todoList, ...restProps }: Readonly<TodoListProps>) {
  return (
    <ul className="flex flex-col gap-2">
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} {...restProps} />
      ))}
    </ul>
  )
}
