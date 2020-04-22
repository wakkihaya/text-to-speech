const dotenv = require('dotenv');
const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require('fs-extra');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: false }));


dotenv.config({ path: '../.env'});

app.get('/',(req,res)=>{
   res.render('index.html')
});

app.post('/output',(req,res)=>{
    var input = req.body['msg'];
    main(input);
    res.redirect('/')
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});

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

    console.log("get the value: ", value)
    const [response] = await client.synthesizeSpeech(request);
    fs.writeFileSync(`../output/output.mp3`, response.audioContent, `binary`)
};

