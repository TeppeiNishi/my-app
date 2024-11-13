'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { AppButton } from '@/components/AppButton'
import { Loading } from '@/components/Loading'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
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
import { useDeleteTodo } from '../api/deleteTodo'
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
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

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
  const deleteTodo = useDeleteTodo()

  function handleAddTodo(data: z.infer<typeof formSchema>) {
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

  function handleDeleteTodo(todoId: number) {
    deleteTodo.mutate(todoId, {
      onSuccess: () => {
        const updatedTodoList = todoList.filter((todo) => todo.id !== todoId)
        dispatch(setTodoList(updatedTodoList))
        setIsDeleteDialogOpen(false)
      },
    })
  }

  if (!data) {
    return <Loading />
  }

  const todoSections: {
    title: string
    todoList: Todo[]
  }[] = [
    {
      title: 'My Task',
      todoList: uncompletedTodoList,
    },
    {
      title: 'Completed',
      todoList: completedTodoList,
    },
  ]

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
          {todoSections.map(({ title, todoList }) => (
            <TodoCard
              key={title}
              title={title}
              todoList={todoList}
              onToggleComplete={handleToggleComplete}
              onEdit={(todoId) => {
                setSelectedTodoId(todoId)
                setIsEditDialogOpen(true)
              }}
              onDelete={(todoId) => {
                setSelectedTodoId(todoId)
                setIsDeleteDialogOpen(true)
              }}
            />
          ))}
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        {selectedTodoId && (
          <TodoEditForm
            key={selectedTodoId}
            todoId={selectedTodoId}
            isSubmitting={updateTodo.isPending}
            onSubmit={handleUpdateTodo}
          />
        )}
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteTodo.isPending}>
              Cancel
            </AlertDialogCancel>
            <AppButton
              loading={deleteTodo.isPending}
              onClick={() => {
                if (selectedTodoId == null) return
                handleDeleteTodo(selectedTodoId)
              }}
            >
              Continue
            </AppButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
