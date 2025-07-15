// MongoDB Database Seeding Script
import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/interview-tracker"

const sampleInterviews = [
  {
    company: "Google",
    position: "Software Engineer",
    date: "2024-01-15",
    time: "10:00",
    location: "Google Campus, Mountain View",
    type: "onsite",
    status: "scheduled",
    contactPerson: "Sarah Johnson",
    contactEmail: "sarah.johnson@google.com",
    notes: "Technical interview focusing on algorithms and system design",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    company: "Microsoft",
    position: "Frontend Developer",
    date: "2024-01-20",
    time: "14:30",
    location: "Microsoft Teams",
    type: "video",
    status: "completed",
    contactPerson: "Mike Chen",
    contactEmail: "mike.chen@microsoft.com",
    notes: "Great discussion about React and TypeScript. Positive feedback received.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    company: "Apple",
    position: "iOS Developer",
    date: "2024-01-25",
    time: "09:00",
    location: "Phone Interview",
    type: "phone",
    status: "scheduled",
    contactPerson: "Lisa Wang",
    contactEmail: "lisa.wang@apple.com",
    notes: "Initial screening call with HR",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    company: "Netflix",
    position: "Full Stack Engineer",
    date: "2024-01-18",
    time: "16:00",
    location: "Zoom Meeting",
    type: "video",
    status: "cancelled",
    contactPerson: "David Rodriguez",
    contactEmail: "david.rodriguez@netflix.com",
    notes: "Interview cancelled due to scheduling conflict",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    company: "Amazon",
    position: "Backend Developer",
    date: "2024-02-01",
    time: "11:00",
    location: "Amazon Office, Seattle",
    type: "onsite",
    status: "scheduled",
    contactPerson: "Jennifer Kim",
    contactEmail: "jennifer.kim@amazon.com",
    notes: "On-site interview with multiple rounds including system design",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    company: "Meta",
    position: "React Developer",
    date: "2024-01-12",
    time: "13:00",
    location: "WhatsApp Video Call",
    type: "video",
    status: "completed",
    contactPerson: "Alex Thompson",
    contactEmail: "alex.thompson@meta.com",
    notes: "Excellent technical discussion. Moving to next round.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    company: "Tesla",
    position: "Software Engineer",
    date: "2024-02-05",
    time: "15:30",
    location: "Tesla Gigafactory",
    type: "onsite",
    status: "scheduled",
    contactPerson: "Emily Davis",
    contactEmail: "emily.davis@tesla.com",
    notes: "Interview for autonomous driving software team",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    company: "Spotify",
    position: "Full Stack Developer",
    date: "2024-01-28",
    time: "11:30",
    location: "Zoom Call",
    type: "video",
    status: "completed",
    contactPerson: "Marcus Andersson",
    contactEmail: "marcus.andersson@spotify.com",
    notes: "Discussed music streaming architecture and scalability",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    company: "Airbnb",
    position: "Product Engineer",
    date: "2024-02-10",
    time: "14:00",
    location: "Phone Interview",
    type: "phone",
    status: "scheduled",
    contactPerson: "Rachel Kim",
    contactEmail: "rachel.kim@airbnb.com",
    notes: "Initial phone screening with engineering manager",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    company: "Uber",
    position: "Backend Engineer",
    date: "2024-01-30",
    time: "16:45",
    location: "Uber HQ, San Francisco",
    type: "onsite",
    status: "cancelled",
    contactPerson: "James Wilson",
    contactEmail: "james.wilson@uber.com",
    notes: "Cancelled due to team restructuring",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()
    const collection = db.collection("interviews")

    // Clear existing data
    await collection.deleteMany({})
    console.log("Cleared existing interviews")

    // Insert sample data
    const result = await collection.insertMany(sampleInterviews)
    console.log(`Inserted ${result.insertedCount} sample interviews`)

    // Create indexes for better performance
    await collection.createIndex({ company: 1 })
    await collection.createIndex({ date: 1 })
    await collection.createIndex({ status: 1 })
    await collection.createIndex({ type: 1 })
    await collection.createIndex({ createdAt: -1 })

    console.log("Created database indexes")
    console.log("Database seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
