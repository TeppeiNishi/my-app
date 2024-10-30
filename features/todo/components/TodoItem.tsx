import { Button, Checkbox, ListItem, Stack, Typography } from "@mui/material";
import { Todo } from "../types/todo";

type TodoItemProps = Readonly<{
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}>;

export function TodoItem({ todo, onToggleComplete, onDelete }: TodoItemProps) {
  return (
    <ListItem>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          width: "100%",
        }}
      >
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
      </Stack>
    </ListItem>
  );
}
