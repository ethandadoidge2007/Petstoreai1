const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: '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'
});

app.post('/ask', async (req, res) => {
  const userMsg = req.body.message;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {role: 'system', content: 'You are a helpful assistant for a pet store website. Answer questions about pets, pet care, pet products, and adoption.'},
        {role: 'user', content: userMsg}
      ]
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    res.json({ reply: 'AI error.' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));