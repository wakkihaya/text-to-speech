const dotenv = require('dotenv');
const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require('fs-extra');
const express = require('express');

var app = express();

dotenv.config({ path: '../.env'});

app.post('/output',(req,res)=>{
    var input = req["text"];
    main(input);
})

const main = async function(value) {
    const client = new textToSpeech.TextToSpeechClient();

    const request = {
        input: {text: value },
        voice: {languageCode: 'en-US', name: 'en-US-Wavenet-D'},
        audioConfig: {
            audioEncoding: `MP3`,
            pitch: 0.00,
            speakingRate: 1.00
        },
    };

    const [response] = await client.synthesizeSpeech(request);
    fs.writeFileSync(`../output/output.mp3`, response.audioContent, `binary`)
};

