"use client";

import { useState } from "react";
import { Button, List, Stack, TextField, Typography } from "@mui/material";
import { TodoItem } from "../components/TodoItem";
import { setTodoList } from "@/lib/features/todo/todoSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export function TodoView() {
  const [newTodo, setNewTodo] = useState("");
  const todoList = useAppSelector((state) => state.todo.todoList);
  const dispatch = useAppDispatch();

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    const updatedTodoList = [
      ...todoList,
      {
        id: Date.now(),
        text: newTodo,
        completed: false,
      },
    ];
    dispatch(setTodoList(updatedTodoList));
    setNewTodo("");
  };

  const handleToggleComplete = (id: number) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            completed: !todo.completed,
          }
        : todo
    );
    dispatch(setTodoList(updatedTodoList));
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    dispatch(setTodoList(updatedTodoList));
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
