const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const API_ENDPOINT = 'https://api.openai.com/v1/completions';

const prompt = 'Write me a poem about ' + process.argv[2] + ' in 500 characters or less';

async function generatePoem() {
  try {
    const response = await axios.post(API_ENDPOINT, {
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.5
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      }
    });

    const poem = response.data.choices[0].text;
    console.log(poem);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

generatePoem();

