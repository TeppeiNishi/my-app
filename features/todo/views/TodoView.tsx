'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { setTodoList } from '@/lib/features/todo/todoSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'

import { TodoCard } from '../components/TodoCard'
import { TodoEditForm } from '../components/TodoEditForm'
import { Todo } from '../types/todo'
import { fetchTodoList } from '../api/fetchTodoList'
import { createTodo } from '../api/createTodo'

const formSchema = z.object({
  task: z.string().min(1, {
    message: 'Task is required',
  }),
})

export function TodoView() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)

  const todoList = useAppSelector((state) => state.todo.todoList)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function fetchData() {
      const data = await fetchTodoList()
      if (data) {
        dispatch(setTodoList(todoList))
      }
    }
    fetchData()
  }, [dispatch, todoList])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: '',
    },
  })

  const uncompletedTodoList = useMemo(
    () => todoList.filter((todo) => !todo.completed),
    [todoList]
  )

  const completedTodoList = useMemo(
    () => todoList.filter((todo) => todo.completed),
    [todoList]
  )

  async function handleAddTodo(data: z.infer<typeof formSchema>) {
    const newTodo = await createTodo({
      text: data.task,
      completed: false,
    })
    const updatedTodoList = [...todoList, newTodo]
    dispatch(setTodoList(updatedTodoList))
    form.reset()
  }

  function handleToggleComplete(id: number) {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            completed: !todo.completed,
          }
        : todo
    )
    dispatch(setTodoList(updatedTodoList))
  }

  function handleEditTodo(id: number) {
    const todo = todoList.find((todo) => todo.id === id)
    if (todo) {
      setSelectedTodo(todo)
      setIsEditDialogOpen(true)
    }
  }

  function handleDeleteTodo(id: number) {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id)
    dispatch(setTodoList(updatedTodoList))
  }

  function handleUpdateTodo(updatedTodo: Todo) {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    )
    dispatch(setTodoList(updatedTodoList))
    setIsEditDialogOpen(false)
  }

  return (
    <>
      <div className="flex flex-col gap-4 p-6 max-w-xl mx-auto w-full h-full">
        <h1 className="text-3xl">ToDo List</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddTodo)}>
            <div className="flex w-full max-w-sm space-x-2">
              <FormField
                control={form.control}
                name="task"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Add a new task" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Add</Button>
            </div>
          </form>
        </Form>

        <div className="flex flex-col gap-4 h-full">
          <TodoCard
            title="My Task"
            todoList={uncompletedTodoList}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
          <TodoCard
            title="Completed"
            todoList={completedTodoList}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        {selectedTodo && (
          <TodoEditForm
            key={selectedTodo.id}
            todoId={selectedTodo.id}
            onSubmit={handleUpdateTodo}
          />
        )}
      </Dialog>
    </>
  )
}
