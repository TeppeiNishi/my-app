"use client";

import { useState } from "react";

import { Button, List, Stack, TextField, Typography } from "@mui/material";
import { TodoItem } from "../components/TodoItem";
import { Todo } from "../types/todo";

export function TodoView() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    const newTask: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodoList([...todoList, newTask]);
    setNewTodo("");
  };

  const handleToggleComplete = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
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
    setTodoList(todoList.filter((todo) => todo.id !== id));
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
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={() => handleToggleComplete(todo.id)}
            onDelete={() => handleDeleteTodo(todo.id)}
          />
        ))}
      </List>
    </Stack>
  );
}
