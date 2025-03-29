import { NextResponse, NextRequest } from "next/server";
import MongoClient from "../../mongoPromise";

export async function POST(req: NextRequest) {
    try {
        // Parse request body safely
        const bcrypt = require("bcrypt");
        const body = await req.json();
        const { username, email, password } = body;

        // Validate required fields
        if (!username || !email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Connect to MongoDB
        const client = await MongoClient();
        const db = client.db("db1");
        const collection = db.collection("collection1");

        // Check if the email already exists
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            await client.close();
            return NextResponse.json({ error: "Email already exists" }, { status: 409 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const newUser = { username, email, password: hashedPassword };
        await collection.insertOne(newUser);

        return NextResponse.json({ status: "success", message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}
