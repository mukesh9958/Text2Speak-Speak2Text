const synth = speechSynthesis;

const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

// init voices
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  console.log(voices);

  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.textContent = voice.name + "(" + voice.lang + ")";
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

const speak = () => {
  //check if speaking
  if (synth.speaking) {
    console.error("already speaking...");
    return;
  }
  if (textInput.value !== "") {
    //adding background
    body.style.background = "#141414 url(img/wave.gif)";
    body.style.backgroundRepeat = "#repeat-x";
    body.style.backgroundSize = "100% 100%";

    const speakText = new SpeechSynthesisUtterance(textInput.value);

    speakText.onend = (e) => {
      console.log("Done speaking...");
      body.style.background = "#000000";
    };

    speakText.error = (e) => {
      console.error("speaking went wrong..");
    };

    const selectedVoice =
      voiceSelect.selectedOptions[0].getAttribute("data-name");

    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    synth.speak(speakText);
  }
};

textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));
pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));

voiceSelect.addEventListener("change", (e) => speak());
