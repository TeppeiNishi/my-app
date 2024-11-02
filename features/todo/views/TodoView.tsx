"use client";

import { useState } from "react";

import { TodoItem } from "../components/TodoItem";
import { setTodoList } from "@/lib/features/todo/todoSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col gap-4 p-6 max-w-xl mx-auto">
      <h1 className="text-3xl">Todo List</h1>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={newTodo}
          placeholder="Add a new task"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button onClick={handleAddTodo}>Add</Button>
      </div>

      <ul>
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={() => handleToggleComplete(todo.id)}
            onDelete={() => handleDeleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
}
