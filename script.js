// Variable declarations and initializations outside of the DOMContentLoaded event
let totalDuration, remainingTime, interval;

document.addEventListener("DOMContentLoaded", function() {
    // Other variable initializations that rely on the DOM being ready
    const myNodelist = document.getElementsByTagName("LI");
    const close = document.getElementsByClassName("close");
    const list = document.querySelector('ul');

    const form = document.querySelector("form");
    const timeDisplay = document.getElementById("timeDisplay");
    const progressBar = document.getElementById("progressBar");
    const inputTime = document.getElementById("inputTime");

    // Create a "close" button and append it to each list item
    for (let i = 0; i < myNodelist.length; i++) {
        let span = document.createElement("SPAN");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }

    // Click on a close button to hide the current list item
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }

    // Add a "checked" symbol when clicking on a list item
    list.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    }, false);

    // Timer Logic
    window.startCountdown = function() {
        totalDuration = parseInt(inputTime.value);

        if (isNaN(totalDuration) || totalDuration <= 0) {
            return alert("Please enter a valid time in seconds.");
        }

        clearInterval(interval); // Stop any previous timer
        remainingTime = totalDuration;

        updateDisplay();
        interval = setInterval(function () {
            remainingTime--;
            updateDisplay();
            if (remainingTime <= 0) clearInterval(interval);
        }, 1000);
    }

    function updateDisplay() {
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;
        timeDisplay.textContent = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        let progressWidth = (1 - remainingTime / totalDuration) * 100;
        progressBar.style.width = progressWidth + "%";
    }

    // Form submission logic
    form.addEventListener("submit", function(event) {
        event.preventDefault();
      
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let flowerType = document.getElementById("flowerType") ? document.getElementById("flowerType").value : null;
        let message = document.getElementById("message").value;
      
        // Check if any field is empty
        if (!name || !email || !flowerType || !message) {
            alert("All fields are required!");
            return;
        }

        // Check if email is valid
        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Check if name contains numbers
        if (/\d/.test(name)) { // This regex checks for any digit in the string
            alert("Name should not contain numbers.");
            return;
        }

        // If everything is valid
        form.submit();
    });
});
document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();  // Prevents the form from submitting

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const flowerType = document.getElementById("flowerType").value;
  const message = document.getElementById("message").value;

  console.log("Order Details:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Flower Type:", flowerType);
  console.log("Message:", message);
});
function newElement() {
  const inputValue = document.getElementById("myInput").value;
  const li = document.createElement("li");

  const text = document.createTextNode(inputValue);
  li.appendChild(text);

  if (inputValue === '') {
      alert("You must write something!");
  } else {
      document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";  // Reset input value

  // Add close button for new items
  const span = document.createElement("SPAN");
  const closeSymbol = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(closeSymbol);
  li.appendChild(span);

  // Close button functionality
  span.onclick = function() {
      const parent = this.parentElement;
      parent.style.display = "none";
  }

  // Check off items by clicking
  li.onclick = function() {
      this.classList.toggle('checked');
  }
}

function showNotification(message, duration = 3000) {
  const banner = document.getElementById('notification-banner');
  const messageElement = document.getElementById('notification-message');

  // Set the message
  messageElement.textContent = message;

  // Show the banner
  banner.classList.remove('hidden');

  // After 'duration' milliseconds, hide the banner
  setTimeout(() => {
      banner.classList.add('hidden');
  }, duration);
}


document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const feedbackMessage = document.createElement('div');
  feedbackMessage.setAttribute('id', 'feedback-message');

  // Insert the feedback message container after the button
  form.querySelector('button').after(feedbackMessage);

  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

      const messageValue = document.getElementById('message').value;

      if (messageValue.trim() === '') {
          feedbackMessage.textContent = 'Please enter a message.';
          feedbackMessage.style.color = 'red'; // Red color indicates an error
          feedbackMessage.style.display = 'block'; // Show the feedback
      } else {
          feedbackMessage.textContent = 'Thank you! Your message has been sent.';
          feedbackMessage.style.color = 'green'; // Green color indicates success
          feedbackMessage.style.display = 'block'; // Show the feedback

          // Here, you can send the message to the server or do whatever you'd like with it
          // For this example, we'll simply reset the form after a short delay
          setTimeout(function() {
              document.getElementById('message').value = '';
              feedbackMessage.style.display = 'none'; // Hide the feedback
          }, 3000); // 3 seconds delay
      }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const timerInput = document.getElementById('timerInput');
  const setButton = document.getElementById('button-addon2');
  const progressBar = document.querySelector('.progress-bar');
  const timeRemaining = document.getElementById('timeRemaining');

  let timerDuration = 0;
  let timer;

  setButton.addEventListener('click', function() {
      clearInterval(timer);
      timerDuration = parseInt(timerInput.value, 10);

      if (isNaN(timerDuration) || timerDuration <= 0) {
          alert('Please enter a valid number of seconds.');
          return;
      }

      let timeLeft = timerDuration;
      timeRemaining.textContent = `Time remaining: ${timeLeft} seconds`;
      progressBar.style.width = '100%';

      timer = setInterval(function() {
          timeLeft -= 1;
          let percentageLeft = (timeLeft / timerDuration) * 100;
          progressBar.style.width = `${percentageLeft}%`;
          timeRemaining.textContent = `Time remaining: ${timeLeft} seconds`;

          if (timeLeft <= 0) {
              clearInterval(timer);
              alert('Time is up!');
              progressBar.style.width = '0%';
              timeRemaining.textContent = '';
          }
      }, 1000);
  });
});

document.addEventListener("DOMContentLoaded", function() {    


});
function changeTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
  });
  document.getElementById(tabName).classList.add('active');
}

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Show a notification
  const notificationBanner = document.getElementById('notification-banner');
  const notificationMessage = document.getElementById('notification-message');

  notificationMessage.textContent = 'Your message has been sent. Thank you for your feedback!';
  notificationBanner.style.display = 'block';
  notificationBanner.classList.add('fade-in');

  // Hide notification after 3 seconds
  setTimeout(() => {
      notificationBanner.style.display = 'none';
      notificationBanner.classList.remove('fade-in');
  }, 3000);

  // Clear the message textarea
  document.getElementById('message').value = '';
});
