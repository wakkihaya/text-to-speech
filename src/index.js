import TextToSpeechClient from "@google-cloud/text-to-speech"

const main = async function() {
    const client = new TextToSpeechClient();

    const request = {
        input: {text: 'Hi, how are you doing?'},
        voice: {languageCode: 'en-US', name: 'en-US-Wavenet-D'},
        audioConfig: {
            audioEncoding: `MP3`,
            pitch: 0.00,
            speakingRate: 1.00
        },
    };

    const [response] = await client.synthesizeSpeech(request);
    fs.writeFileSync(`output.mp3`, response.audioContent, `binary`)
};

main();
