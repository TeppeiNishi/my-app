'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { AppButton } from '@/components/AppButton'
import { Loading } from '@/components/Loading'
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

import { useCreateTodo } from '../api/createTodo'
import { useFetchTodoList } from '../api/fetchTodoList'
import { useUpdateTodo } from '../api/updateTodo'
import { TodoCard } from '../components/TodoCard'
import { TodoEditForm } from '../components/TodoEditForm'
import { Todo } from '../types/todo'

const formSchema = z.object({
  task: z.string().min(1, {
    message: 'Task is required',
  }),
})

export function TodoView() {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const { data } = useFetchTodoList()
  const todoList = useAppSelector((state) => state.todo.todoList)

  const dispatch = useAppDispatch()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: '',
    },
  })

  const uncompletedTodoList = useMemo(
    () => todoList.filter((todo) => !todo.completed),
    [todoList],
  )

  const completedTodoList = useMemo(
    () => todoList.filter((todo) => todo.completed),
    [todoList],
  )

  const createTodo = useCreateTodo()
  const updateTodo = useUpdateTodo()

  async function handleAddTodo(data: z.infer<typeof formSchema>) {
    createTodo.mutate(
      {
        text: data.task,
        completed: false,
      },
      {
        onSuccess: (newTodo) => {
          const updatedTodoList = [...todoList, newTodo]
          dispatch(setTodoList(updatedTodoList))
          form.reset()
        },
      },
    )
  }

  function handleToggleComplete(todo: Todo) {
    updateTodo.mutate(todo, {
      onSuccess: (updatedTodo) => {
        const updatedTodoList = todoList.map((todo) =>
          todo.id === updatedTodo.id
            ? {
                ...updatedTodo,
                completed: !todo.completed,
              }
            : todo,
        )
        dispatch(setTodoList(updatedTodoList))
      },
    })
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

  function handleUpdateTodo(todo: Todo) {
    updateTodo.mutate(todo, {
      onSuccess: (updatedTodo) => {
        const updatedTodoList = todoList.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        )
        dispatch(setTodoList(updatedTodoList))
        setIsEditDialogOpen(false)
      },
    })
  }

  if (!data) {
    return <Loading />
  }

  return (
    <>
      <div className="mx-auto flex size-full max-w-xl flex-col gap-4 p-4">
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
              <AppButton loading={createTodo.isPending} type="submit">
                Add
              </AppButton>
            </div>
          </form>
        </Form>

        <div className="flex h-full flex-col gap-4">
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
