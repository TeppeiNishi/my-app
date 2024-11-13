import { NextResponse } from 'next/server'

import { Todo } from '@/features/todo/types/todo'

export async function GET() {
  return NextResponse.json({})
}

export async function PUT(req: Request) {
  const data = await req.json()

  const updatedTodo: Todo = {
    ...data,
  }

  return NextResponse.json(updatedTodo)
}

export async function DELETE() {
  return NextResponse.json({})
}
