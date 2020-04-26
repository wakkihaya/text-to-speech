import dotenv from 'dotenv';
import textToSpeech from "@google-cloud/text-to-speech";
import fs from 'fs-extra';
import getMessages from './slack.js';

dotenv.config({ path: '../.env'});

const ToSpeech = async function(array) {
    const client = new textToSpeech.TextToSpeechClient();
    const outFile = '../output/output.mp3';

    const request = {
        input: {text: array[1] },
        voice: {languageCode: 'en-US', name: 'en-US-Wavenet-D'},
        audioConfig: {
            audioEncoding: `MP3`,
            pitch: 0.00,
            speakingRate: 1.00
        },
    };

    console.log("get the value: ", array[1])
    const [response] = await client.synthesizeSpeech(request);
    fs.writeFileSync(outFile, response.audioContent, `binary`)
    console.log('Audio content written to file ' + outFile);

};

const main = async () =>{
    const array = await getMessages();
    await ToSpeech(array);
};

main()
