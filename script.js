document.addEventListener('DOMContentLoaded', function () {
    const logo = document.getElementById('logo');
    const overlay = document.getElementById('overlay');
    const micButton = document.getElementById('micButton');
    const speechTextContainer = document.getElementById('speechTextContainer');
    const spinner = document.getElementById('spinner');
    const closeBtn = document.getElementById('closeBtn');

    // Function to start speech recognition
    function startSpeechRecognition() {
        const recognition = new webkitSpeechRecognition() || SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
    
        recognition.start();
    
        recognition.onresult = function (event) {
            const speechResult = event.results[0][0].transcript;
            console.log('Speech result:', speechResult);
            displaySpeechText(speechResult);
    
            setTimeout(function () {
                recognition.stop();
                overlay.style.display = 'none'; // Close the overlay
                spinner.style.display = 'block'; // Show the buffering GIF
    
                // Hide the buffering GIF after another 3 seconds (total 4 seconds delay)
                setTimeout(function () {
                    spinner.style.display = 'none';
                }, 3000); // Change 3000 to the duration of your buffering animation
            }, 4000); // Show the text for 4 seconds
    
        };
    
        recognition.onerror = function (event) {
            console.error('Speech recognition error:', event.error);
            recognition.stop();
        };
    }
    // Function to display speech text in a read-only input box
    function displaySpeechText(text) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = text;
        input.readOnly = true;
        input.placeholder = 'Speech text';
        input.classList.add('input-box'); // Add input-box class to the input element
        speechTextContainer.innerHTML = ''; // Clear previous content
        speechTextContainer.appendChild(input);
    }

    // Event listener for logo click
    logo.addEventListener('click', function () {
        overlay.style.display = 'block';
        startSpeechRecognition();
    });

    // Event listener for closing the overlay
    closeBtn.addEventListener('click', function () {
        overlay.style.display = 'none';
    });

    // You can add more functionality as needed
});
