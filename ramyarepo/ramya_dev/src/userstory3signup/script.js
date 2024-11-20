document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const eventSection = document.getElementById('eventSection');
    const eventsContainer = document.getElementById('eventsContainer');
    const descriptionModal = document.getElementById('descriptionModal');
    const closeModal = document.getElementById('closeModal');
    const signUpModalBtn = document.getElementById('signUpModalBtn');
    const loginError = document.getElementById('loginError');
    const signUpDetailsContainer = document.getElementById('signUpDetailsContainer'); // New element to display details

    let loggedInUser = null; // Store user info once logged in
    let selectedEvent = null; // Store the event selected for sign-up

    // Sample events array (replace with actual API call)
    const events = [
        { id: '55', name: 'Event 55', date: '2024-12-24', time: '10:00 AM', place: 'Community Park',description: 'A conference for all attendees.' },
        { id: '65', name: 'Event 65', date: '2024-12-25', time: '2:00 PM', place: 'Book Market', description: 'A Book Market for the public.'},
        { id: '95', name: 'Event 95', date: '2024-12-26', time: '1:00 PM', place: 'Music Arena',description: 'The biggest music festival this summer.'}
    ];

    // Handle login form submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const apiUrl = 'https://itse-2374-app-2-back-2bgx.onrender.com/api/users/login';

        const loginData = {
            username: username,
            email: email,
            password: password
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
            return response.json(); // Assuming the response contains the user details
        })
        .then(data => {
            loggedInUser = {
                userId: data.userId,
                username: data.username,
                email: data.email,
                message: data.message // Get the message from the backend
            };
             // Log userId, username, and email to the console
       // console.log("User ID:", loggedInUser.userId); // Log the userId
        console.log("Username:", loggedInUser.username); // Log the username
        console.log("Message:", loggedInUser.message); // Log the message

            loginSection.style.display = 'none'; // Hide login section
            eventSection.style.display = 'flex'; // Show event section
            loadEventList(); // Load events after login
        })
        .catch(error => {
            console.error('Login failed:', error);
            loginError.style.display = 'block'; // Show error message for invalid login
        });
    });

    // Load event buttons after login
    function loadEventList() {
        eventsContainer.innerHTML = ''; // Clear any existing events

        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.classList.add('event-button');
            eventElement.setAttribute('data-event-id', event.id);
            eventElement.textContent = event.name;

            // Right-click event to show event details in modal
            eventElement.addEventListener('contextmenu', function (event) {
                event.preventDefault(); // Prevent default right-click menu
                selectedEvent = event.target; // Store the selected event
                const eventId = event.target.getAttribute('data-event-id');

                // Show event details in modal
                showEventDetails(eventId);
            });

            eventsContainer.appendChild(eventElement);
        });
    }

    // Show event details in modal
    function showEventDetails(eventId) {
        const apiUrl = `https://itse-2374-app-2-back-2bgx.onrender.com/api/events/${eventId}`;
//---------------newcode------------------------
// Assuming you already have the `events` array, use a descriptive name like 'eventData'
const eventData = events.find(evt => evt.id === eventId);


//--------end code-------------
        // Fetch event details from the backend API
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch event details');
                }
                return response.json();
            })
            .then(eventDetails => {
                document.getElementById('eventName').textContent = `Name: ${selectedEvent.textContent}`;
                document.getElementById('eventDate').textContent = `Date: ${eventData.date}`;
                document.getElementById('eventTime').textContent = `Time: ${eventData.time}`;
                document.getElementById('eventPlace').textContent = `Place: ${eventData.place}`;
                document.getElementById('eventDescription').textContent = `Description: ${eventDetails.description}`;
                
// Initially hide confirmation message (only show after sign-up)-----
document.getElementById('confirmationMessage').style.display = 'none';


                descriptionModal.style.display = 'block'; // Show modal
            })
            .catch(error => {
                console.error('Error fetching event details:', error);
                alert('Could not load event details at this time.');
            });
    }

    // Handle Sign Up button in the modal
    signUpModalBtn.addEventListener('click', function () {
        if (selectedEvent && loggedInUser) {
            const eventId = selectedEvent.getAttribute('data-event-id');
            const userId = loggedInUser.userId;
            signUpForEvent(userId, eventId);
        } else {
            alert("Error: No event selected or user is not logged in.");
        }
    });
    //-------close button functionality
    // Close button logic for the Thank You message
document.getElementById('closeConfirmationMessage').addEventListener('click', function() {
    // Hide the Thank You message
    document.getElementById('confirmationMessage').style.display = 'none';
  });

    // Send the sign-up request to the backend
    function signUpForEvent(userId, eventId) {
        // Stub: Simulated backend response for testing
        const simulatedResponse = {
            success: true,
            message: `You have successfully signed up for the event with ID: ${eventId}.`
        };

        // Simulate a delay (optional, like a real network request)
        setTimeout(() => {
            // Log to the console
            console.log(`User ID: ${userId}`);
            console.log(`Event ID: ${eventId}`);

            // Show details on the page
            if (signUpDetailsContainer) {
                signUpDetailsContainer.innerHTML = `
                    <p><strong>User ID:</strong> ${userId}</p>
                    <p><strong>Event ID:</strong> ${eventId}</p>
                `;
            }

            // Check if the signup was "successful" (simulated)
            if (simulatedResponse.success) {
//new code-----------------------------------
document.getElementById('confirmationMessage').style.display = 'block'; // Show confirmation message
descriptionModal.querySelector('button#signUpModalBtn').disabled = true; // Disable sign-up button after success

// Optionally, display sign-up details
if (signUpDetailsContainer) {
    signUpDetailsContainer.innerHTML = `
        <p><strong>User ID:</strong> ${userId}</p>
        <p><strong>Event ID:</strong> ${eventId}</p>
    `;
}

 //--------------------------------------------               
                alert(simulatedResponse.message);
                descriptionModal.style.display = 'none'; // Hide modal after sign-up
            } else {
                alert('Error signing up for the event. Please try again later.');
            }
        }, 1000); // Delay of 1 second for the simulated network request
    }

    // Close modal when clicking the close button
    closeModal.addEventListener('click', function () {
        descriptionModal.style.display = 'none'; // Hide the modal
    });
});
