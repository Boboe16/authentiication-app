export default async function MongoPromise() {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://jeric18:znZlGfCcDhA1vvNn@cluster0.7pjgd.mongodb.net/?appName=Cluster0";

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
    });
    
    return await client.connect();
}