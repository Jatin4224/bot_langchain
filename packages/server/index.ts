// import express from "express";
// import type { Request, Response } from "express";
// import dotenv from "dotenv";
// import { GoogleGenAI } from "@google/genai";
// dotenv.config();

// const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// const app = express();
// app.use(express.json());
// const port = process.env.PORT || 3000;

// app.get("/", (req: Request, res: Response) => {
//   res.send("hey");
// });

// app.get("/api/hello", (req: Request, res: Response) => {
//   res.json({ message: "HEllo" });
// });

// app.post("/api/chat", async (req: Request, res: Response) => {
//   const { prompt } = req.body;
//   //send to gemini
//   const response = await client.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: prompt,
//   });
//   res.json({ message: response.text });
// });

// app.listen(port, () => {
//   console.log("sever running fine");
// });
import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("hey");
});

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });

    const response = await model.generateContent([prompt]);

    const text =
      response.response.candidates[0]?.content?.parts[0]?.text || "No response";

    res.json({ message: text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
