import { Todo } from "@/features/todo/types/todo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TodoState = {
  todoList: Todo[];
};

const initialState: TodoState = {
  todoList: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoList: (state, action: PayloadAction<Todo[]>) => {
      state.todoList = action.payload;
    },
  },
});

export const { setTodoList } = todoSlice.actions;

export default todoSlice.reducer;
