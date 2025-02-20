'use server'
import { MongoClient, ServerApiVersion} from "mongodb";
// import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const uri = "mongodb+srv://jeric18:Qkl8Fs0FTQnH7kID@cluster0.7pjgd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const data = await req.json()
  console.log("Output: ", data);
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const db = client.db("db1");
    const collection = await db.collection("ewan").find({ item: 'card'  }).toArray();
    console.log(collection);
    return NextResponse.json(collection);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred while connecting to the database." });  
  } finally {
    NextResponse.json({ success:"API is working" })
    await client.close();
  }
}