import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// // OpenAI Client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_KEY,
// });

// Groq Client
const groq = new Groq({
  apiKey: process.env.GROQ_KEY,
});

// ROUTE /fix-code
app.post("/fix-code", async (req, res) => {
  try {
    const { code, stacktrace, language } = req.body;

    const prompt = `
Anda adalah AI Debugger untuk bahasa: ${language}. 
Berikan output berikut:

1. Analisa error
2. Penyebab utama
3. Solusi perbaikan
4. Kode revisi (jika relevan)
5. Catatan tambahan

STACKTRACE:
${stacktrace}

CODE:
${code}
`;

    const response = await groq.chat.completions.create({
    //   model: "gpt-4o-mini",
    //   messages: [{ role: "user", content: prompt }],
    // });
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

    res.json({
      success: true,
      result: response.choices[0].message.content,
    });
  } catch (e) {
    res.json({
      success: false,
      error: e.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
