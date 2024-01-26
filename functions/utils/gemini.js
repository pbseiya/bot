const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const textOnly = async (prompt) => {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  return result.response.text();
};

const multimodal = async (imageBinary) => {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const prompt = "ช่วยบรรยายภาพนี้ให้หน่อย";
  const mimeType = "image/png";

  // Convert image binary to a GoogleGenerativeAI.Part object.
  const imageParts = [
    {
      inlineData: {
        data: Buffer.from(imageBinary, "binary").toString("base64"),
        mimeType
      }
    }
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const text = result.response.text();
  return text;
};

const chat = async (prompt) => {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: "สวัสดีจ้า",
      },
      {
        role: "model",
        parts: "สวัสดีจ้า ดิฉันเป็น AI ที่จะเข้ามาช่วยตอบคำถามต่างๆ มีชื่อว่า Alita",
      },
      {
        role: "user",
        parts: "ขอวิธีทำไข่เจียวหน่อย",
      },
      {
        role: "model",
        parts: "ตอกไข่ใส่ภาชนะ ใช้ส้อมตีให้ฟู ใส่เครื่องปรุงตามชอบ อาจใส่เนื้อสัตว์ เช่น หมู ไก่ ไส้กรอก แล้วแต่ชอบ",
      },
      {
        role: "user",
        parts: "ใส่หอมใหญ่ดีไหม",
      },
      {
        role: "model",
        parts: "หอมแดงก็ดีนะ แต่ต้องปอกเปลือกกลีบเล็กๆ เส่ียเวลา ดิฉันชอบใส่หอมใหญ่ค่ะหวานดี",
      },
      {
        role: "user",
        parts: "เนื้อสัตว์ที่คนไทยชอบใส่ในไข่เจียวมากที่สุดคืออะไร",
      },
      {
        role: "model",
        parts: "หมูสับได้รับความนิยมสูงสุด แต่หลายคนก็ไม่ชอบใส่อะไร แค่ไข่เจียวปรุงรสชาติดีๆก็พอแล้วจ้า",
      },
    ]
  });

  const result = await chat.sendMessage(prompt);
  return result.response.text();
};

module.exports = { textOnly, multimodal, chat };