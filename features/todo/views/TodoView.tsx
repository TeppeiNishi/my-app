"use client";

import { useState } from "react";

import {
  Button,
  Checkbox,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export function TodoView() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    const newTask: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, newTask]);
    setNewTodo("");
  };

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Stack
      spacing={2}
      sx={{
        p: 3,
        maxWidth: 600,
        m: "0 auto",
      }}
    >
      <Typography variant="h4">Todo List</Typography>

      <Stack direction="row" spacing={2}>
        <TextField
          value={newTodo}
          placeholder="Add a new task"
          size="small"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddTodo}>
          Add
        </Button>
      </Stack>

      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
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
                onChange={() => handleToggleComplete(todo.id)}
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
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </Button>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
