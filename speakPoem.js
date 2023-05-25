const axios = require('axios');
const fs = require('fs');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ELEVENLABS_API_KEY = process.env.ELEVEN_LABS_API_KEY;
const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/completions';

async function generatePoemAndConvertToMP3(prompt) {
  const fullPrompt = "Please write a peom about " + prompt + " in less than 500 characters";
  try {
    // Generate poem using OpenAI Completions API
    const openAIResponse = await axios.post(OPENAI_API_ENDPOINT, {
      model: 'text-davinci-003',
      prompt: fullPrompt,
      max_tokens: 500,
      temperature: 0.5
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      }
    });

    const poem = openAIResponse.data.choices[0].text;
    //console.log(poem)

   const henry = 'kj5Y0VDltizflG3p64JW'; //only work with JVs key
   const sam = 'yoZ06aMxZJJ28mfd3POQ';
   let endpoint = 'https://api.elevenlabs.io/v1/text-to-speech/' + sam;

    // Convert text to MP3 using Eleven Labs Text-to-Speech API
    const elevenLabsResponse = await axios.post(endpoint, {
      text: poem,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5,
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'audio/mpeg',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      responseType: 'arraybuffer'
    });

    fs.writeFileSync('output.mp3', elevenLabsResponse.data);
    console.log('Audio file saved successfully.');
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

const prompt = process.argv[2];
generatePoemAndConvertToMP3(prompt);

