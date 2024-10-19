const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

app.post('/api/legal-query', async (req, res) => {
  const { query } = req.body;

  try {
    const response = await axios.post('http://localhost:5000/process-query', { query });
    const legalResponse = response.data.response;
    res.json({ response: legalResponse });
  } catch (error) {
    console.error("Error fetching response from AI model", error);
    res.status(500).json({ error: 'Error processing your request.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
