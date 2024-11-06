'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
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
import { Loading } from '@/components/Loading'

import { Todo } from '../types/todo'

type TodoEditFormProps = {
  todoId: number
  onSubmit: (todo: Todo) => void
}

const formSchema = z.object({
  task: z.string().min(1, {
    message: 'Task is required',
  }),
})

export function TodoEditForm({
  todoId,
  onSubmit,
}: Readonly<TodoEditFormProps>) {
  const todo = useAppSelector((state) =>
    state.todo.todoList.find((todo) => todo.id === todoId)
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: todo?.text,
    },
  })

  if (!todo) {
    return (
      <DialogContent className="flex items-center justify-center">
        <Loading />
      </DialogContent>
    )
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription>
          Edit the task below and click save to update it.
        </DialogDescription>
      </DialogHeader>
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
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
