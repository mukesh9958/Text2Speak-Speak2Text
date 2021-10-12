var speechrecognition = webkitSpeechRecognition;

var recognition = new speechrecognition();
var textbox = $("#textbox");
var instruction = $("#instruction");

var content = "";

recognition.continuous = true;

recognition.onstart = function () {
  instruction.text("Voice Recognition is On");
};

recognition.onspeechend = function () {
  instruction.text("No Activity");
};

recognition.onerror = function () {
  instruction.text("Try Again");
};

recognition.onresult = function (event) {
  var current = event.resultIndex;

  var transcript = event.results[current][0].transcript;

  content += transcript;

  textbox.val(content);
};

$("#speakbtn").click(function (event) {
  if (content.length) {
    content += "";
  }

  recognition.start();
});

$("#stopbtn").click(function (event) {
  if (content.length) {
    content += "";
  }

  recognition.stop();
});
