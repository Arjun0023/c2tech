document.getElementById('logo').addEventListener('click', function() {
    var voiceInput = document.getElementById('voiceInput');
    var input = voiceInput.querySelector('input[type="text"]');
    
    voiceInput.style.display = 'flex';
    input.placeholder = 'Listening...';
    
    var recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.start();

    recognition.onresult = function(event) {
        input.placeholder = 'Speak...';
        var transcript = event.results[0][0].transcript;
        input.value = transcript;
    };

    recognition.onend = function() {
        recognition.stop();
    };
});