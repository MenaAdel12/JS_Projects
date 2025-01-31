let speech = new SpeechSynthesisUtterance();

let voices = [];
let voiceSelect = document.querySelector('select');

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.map((voice, i) => (
        voiceSelect.options[i] = new Option(voice.name, i)
    ));
}

voiceSelect.addEventListener('change', (e) => {
    let voiceIndex = e.currentTarget.value;
    speech.voice = voices[voiceIndex];
})

document.querySelector('button').addEventListener('click', ()=>{
    speech.text = document.querySelector('textarea').value;
    window.speechSynthesis.speak(speech);
})