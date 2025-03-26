import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Status, State, Forecast } from '@prisma/client'

export async function POST(req: Request) {
  try {
    const { userId, state, hours, forecast, notes } = await req.json()
    console.log('Received data:', { userId, state, hours, forecast, notes })

    // Validate input
    if (!userId) {
      return NextResponse.json(
        { error: "Missing user ID" },
        { status: 400 }
      )
    }

    if (!state || !Object.values(State).includes(state)) {
      return NextResponse.json(
        { error: "Invalid status state" },
        { status: 400 }
      )
    }

    if (hours < 1 || hours > 8) {
      return NextResponse.json(
        { error: "Hours must be between 1 and 8" },
        { status: 400 }
      )
    }

    if (!forecast || !Object.values(Forecast).includes(forecast)) {
      return NextResponse.json(
        { error: "Invalid forecast value" },
        { status: 400 }
      )
    }

    // Verify user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!userExists) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Create status record
    const newStatus = await prisma.status.create({
      data: {
        userId,
        state,
        hours,
        forecast,
        notes: notes || null,
      },
    })

    return NextResponse.json(newStatus, { status: 201 })

  } catch (error) {
    console.error("Error saving status:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}