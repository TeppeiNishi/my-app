'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { PropsWithChildren } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { AppButton } from '@/components/AppButton'
import { Loading } from '@/components/Loading'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAppSelector } from '@/lib/hooks'

import { useFetchTodo } from '../api/fetchTodo'
import { Todo } from '../types/todo'

type TodoEditFormProps = {
  todoId: number
  isSubmitting: boolean
  onSubmit: (todo: Todo) => void
}

const formSchema = z.object({
  task: z.string().min(1, {
    message: 'Task is required',
  }),
})

function Wrapper({ children }: Readonly<PropsWithChildren>) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription>
          Edit the task below and click save to update it.
        </DialogDescription>
      </DialogHeader>
      {children}
    </DialogContent>
  )
}

export function TodoEditForm({
  todoId,
  isSubmitting,
  onSubmit,
}: Readonly<TodoEditFormProps>) {
  const { data } = useFetchTodo(todoId)
  const todo = useAppSelector((state) =>
    state.todo.todoList.find((todo) => todo.id === todoId),
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: todo?.text,
    },
  })

  if (!data) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            if (!todo) return
            onSubmit({
              ...todo,
              text: data.task,
            })
          })}
        >
          <FormField
            control={form.control}
            name="task"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Task" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="mt-4">
            <AppButton type="submit" loading={isSubmitting}>
              Save
            </AppButton>
          </DialogFooter>
        </form>
      </Form>
    </Wrapper>
  )
}
