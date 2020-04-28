var synth = window.speechSynthesis;
var voices = [];


    window.speechSynthesis.onvoiceschanged  = e => {
        voices = synth.getVoices();
    }


var utterThis = new SpeechSynthesisUtterance();

window.speechSynthesis.onvoiceschanged = function () {
    utterThis.voice = speechSynthesis.getVoices()[11];
};
synth.cancel()
// 音声の指定（ここでは日本語音声を指定）
// 音量の指定（0-1.0）
utterThis.volume = 1.0;
// 速度の指定（0.1-10.0）
utterThis.rate = 1.0;
// 音程の指定（0-2.0）
utterThis.pitch = 1.0;
// 言語の指定
utterThis.lang = 'ja-JP';

utterThis.text = '読み上げるテキスト';

console.log(utterThis)

// 読み上げの実行
window.onload=function() {
    synth.speak(utterThis);
}
