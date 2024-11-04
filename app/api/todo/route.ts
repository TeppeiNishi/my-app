import { NextResponse } from 'next/server'

import { Todo } from '@/features/todo/types/todo'

export async function GET() {
  return NextResponse.json([])
}

export async function POST(req: Request) {
  const data = await req.json()

  const newTodo: Todo = {
    id: Date.now(),
    ...data,
  }

  return NextResponse.json(newTodo)
}
