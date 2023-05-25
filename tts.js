const axios = require('axios');
const fs = require('fs');

const voiceId = 'kj5Y0VDltizflG3p64JW';
const apiKey = process.env.ELEVEN_LABS_API_KEY;
const text = process.argv[2];

const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

const requestData = {
  text,
  model_id: 'eleven_monolingual_v1',
  voice_settings: {
    stability: 0.5,
    similarity_boost: 0.5,
  },
};

const headers = {
  'Content-Type': 'application/json',
  'accept': 'audio/mpeg',
  'xi-api-key': apiKey,
};

axios.post(apiUrl, requestData, { headers, responseType: 'arraybuffer' })
  .then(response => {
    fs.writeFileSync('output.mp3', response.data);
    console.log('Audio file saved successfully.');
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

