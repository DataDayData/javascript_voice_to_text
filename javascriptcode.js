// JavaScript
var startButton = document.getElementById("start");
var resultDiv = document.getElementById("result");

startButton.style.position = "absolute";
startButton.style.left = "400px";
startButton.style.top = "15px";

var startButtonBorderColor = startButton.style.borderColor;

startButton.addEventListener("mouseover", function() {
  startButton.style.borderColor = "red";
  startButton.style.boxShadow = "0 0 10px red";
});

startButton.addEventListener("mouseout", function() {
  startButton.style.borderColor = startButtonBorderColor;
  startButton.style.boxShadow = "";
});

startButton.addEventListener("click", function() {
  // Check if the browser supports the SpeechRecognition API
  if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.lang = "en-US"; // Set the language
    recognition.start(); // Start speech recognition

    recognition.onresult = function(event) {
      var text = event.results[0][0].transcript; // Get the recognized text
      resultDiv.textContent = text; // Display the text in the resultDiv

      // Send the recognized text to the server
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "connect.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log("Text saved to the database.");
        }
      };
      xhr.send("text=" + encodeURIComponent(text));
    };
  } else {
    resultDiv.textContent = "Speech recognition is not supported in this browser.";
  }
});