'use client'

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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Todo } from '../types/todo'

type TodoEditFormProps = {
  todo: Todo
  onSubmit: (todo: Todo) => void
}

const formSchema = z.object({
  task: z.string().min(1, {
    message: 'Task is required',
  }),
})

export function TodoEditForm({ todo, onSubmit }: Readonly<TodoEditFormProps>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: todo.text,
    },
  })

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
