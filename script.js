const express = require('express');
const app = express();
const {GoogleGenerativeAI} = require("@google/generative-ai")
const genAI = new GoogleGenerativeAI(process.env.OPEN_AI_API_KEY);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.post('/api-conversion', async(req, res) => {

  console.log(req.body);
  const { data } = req.body
  if(!data) {
    return res.status(302).json({status: 302, message: 'Empty body !'})
  }
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(data);
  return res.status(201).json({statusCode: 201, metadata: result.response.text()})

})

app.listen(5000, () => {
  console.log("App is running...");
})
