import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";


const app = express();


const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

async function createConnection() {
    const client = new MongoClient(MONGO_URL)
    await client.connect(); //pressing call button
    console.log("MongoDB is connected!");
    return client;
}
export const client = await createConnection();

app.use(express.json());
app.use(cors());


app.get("/", function (request, response) {
    response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

// To get Phones from DB
app.get("/mobiles", async (request, response) => {
    console.log(request.query)
    const getAllPhones = await client
        .db("DemoProjectPhones")
        .collection("Phones")
        .find({})
        .toArray();
    response.send(getAllPhones);
})

// To post Phones to DB
app.post("/mobiles", express.json(), async (request, response) => {
    const data = request.body
    console.log(data)
    const createPhone = await client
        .db("DemoProjectPhones")
        .collection("Phones")
        .insertMany(data)
    response.send(createPhone);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
