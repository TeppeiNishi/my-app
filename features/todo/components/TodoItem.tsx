import { Button, Checkbox, Typography } from "@mui/material";
import { Todo } from "../types/todo";

type TodoItemProps = Readonly<{
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}>;

export function TodoItem({ todo, onToggleComplete, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center gap-2">
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
      />
      <Typography
        sx={{
          textDecoration: todo.completed ? "line-through" : "none",
          width: "100%",
        }}
      >
        {todo.text}
      </Typography>
      <Button
        variant="outlined"
        color="error"
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </Button>
    </li>
  );
}
