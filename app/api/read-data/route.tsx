'use server';
import { MongoClient, ServerApiVersion } from "mongodb";
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

export async function GET(req: NextRequest) {
  //
  // const bcrypt = require('bcrypt');
  // const saltRounds = 10;
  // const example_password = "example-password";
  // const wrong_example_password = "examplee-password";
  // const hashedPassword = await bcrypt.hash(example_password, saltRounds);
  // console.log("The password: ", example_password);
  // console.log("Hashed password: ", hashedPassword);
  // console.log("Is it valid password? ", await bcrypt.compare(wrong_example_password, hashedPassword));
  //

  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    console.log("Received credentials:", email, "and", password);

    const client = await connectToDB();
    const db = client.db("db1");
    const collection = db.collection("collection1");

    const user = await collection.findOne({ email, password });

    if (!user) {
      console.log("No user found");
      return NextResponse.json({ error: "No user found" }, { status: 404 });
    }

    console.log("User found:", user);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "An error occurred while connecting to the database." }, { status: 500 });
  }
}
