'use server';
import { MongoClient, ServerApiVersion } from "mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const uri = process.env.URI;
if (!uri) throw new Error("Missing MongoDB URI in environment variables");

let client: MongoClient | null = null;

async function connectToDB() {
  if (!client) {
    client = new MongoClient(uri as string, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    console.log("Connected to MongoDB");
  }
  return client;
}

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const data = { ...requestBody, _id: new ObjectId() };

  try {
    const client = await connectToDB();
    const db = client.db("db1");
    console.log("Request Body Before Insert:", requestBody);
    console.log("Generated Data:", data);
    console.log("Previously Existing Documents:", await db.collection("collection1").find().toArray());
    const result = await db.collection("collection1").insertOne(data);
    console.log("Current Existing Documents:", await db.collection("collection1").find().toArray());
    if (!result.acknowledged) {
      throw new Error("Failed to insert document");
    }
    return NextResponse.json({ message: "Successfully created account", insertedId: result.insertedId });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "An error occurred while connecting to the database." }, { status: 500 });
  }
}
