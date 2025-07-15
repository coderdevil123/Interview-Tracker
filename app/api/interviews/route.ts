import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { Interview } from "@/lib/models/interview"

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || "all"
    const type = searchParams.get("type") || "all"
    const sortBy = searchParams.get("sortBy") || "date"
    const sortOrder = searchParams.get("sortOrder") || "asc"

    // Build filter query
    const filter: any = {}

    if (search) {
      filter.$or = [
        { company: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { contactPerson: { $regex: search, $options: "i" } },
      ]
    }

    if (status !== "all") {
      filter.status = status
    }

    if (type !== "all") {
      filter.type = type
    }

    // Build sort query
    const sort: any = {}
    sort[sortBy] = sortOrder === "asc" ? 1 : -1

    // Calculate pagination
    const skip = (page - 1) * limit

    // Execute queries
    const [interviews, totalCount] = await Promise.all([
      Interview.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      Interview.countDocuments(filter),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      interviews,
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    })
  } catch (error) {
    console.error("Error fetching interviews:", error)
    return NextResponse.json({ error: "Failed to fetch interviews" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()

    const body = await request.json()

    // Validate required fields
    const requiredFields = ["company", "position", "date", "time", "location", "type", "status"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    const interview = new Interview({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await interview.save()

    return NextResponse.json(interview, { status: 201 })
  } catch (error) {
    console.error("Error creating interview:", error)
    return NextResponse.json({ error: "Failed to create interview" }, { status: 500 })
  }
}
