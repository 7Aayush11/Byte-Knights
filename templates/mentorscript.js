const mentors = [
    {
        id: 1,
        name: "Dr. Birmohan Singh",
        availability: [
            { "time": "10:00 AM - 11:00 AM", "booked": false },
            { "time": "2:00 PM - 3:00 PM", "booked": true },
            { "time": "4:00 PM - 5:00 PM", "booked": false }
        ]
    },
    {
        id: 2,
        name: "Dr. Damanpreet Singh",
        availability: [
            { "time": "9:00 AM - 10:00 AM", "booked": true },
            { "time": "11:00 AM - 12:00 PM", "booked": false },
            { "time": "2:00 PM - 3:00 PM", "booked": true }
        ]
    },
    {
        id: 3,
        name: "Dr. Major Singh Goraya",
        availability: [
            { "time": "10:30 AM - 11:30 AM", "booked": false },
            { "time": "12:30 PM - 1:30 PM", "booked": true },
            { "time": "3:30 PM - 4:30 PM", "booked": false }
        ]
    },
    {
        id: 4,
        name: "Dr. Manoj Sachan",
        availability: [
            { "time": "8:00 AM - 9:00 AM", "booked": true },
            { "time": "1:00 PM - 2:00 PM", "booked": false },
            { "time": "4:00 PM - 5:00 PM", "booked": true }
        ]
    },
    {
        id: 5,
        name: "Dr. Gurjinder Kaur",
        availability: [
            { "time": "9:30 AM - 10:30 AM", "booked": false },
            { "time": "12:00 PM - 1:00 PM", "booked": true },
            { "time": "3:00 PM - 4:00 PM", "booked": false }
        ]
    },
    {
        id: 6,
        name: "Dr. Amar Nath",
        availability: [
            { "time": "10:00 AM - 11:00 AM", "booked": true },
            { "time": "2:00 PM - 3:00 PM", "booked": false },
            { "time": "4:00 PM - 5:00 PM", "booked": true }
        ]
    },
    {
        id: 7,
        name: "Dr. Jagdeep Singh",
        availability: [
            { "time": "9:00 AM - 10:00 AM", "booked": false },
            { "time": "11:00 AM - 12:00 PM", "booked": true },
            { "time": "3:00 PM - 4:00 PM", "booked": false }
        ]
    },
    {
        id: 8,
        name: "Dr. Manminder Singh",
        availability: [
            { "time": "10:00 AM - 11:00 AM", "booked": false },
            { "time": "1:00 PM - 2:00 PM", "booked": true },
            { "time": "4:00 PM - 5:00 PM", "booked": false }
        ]
    },
    {
        id: 9,
        name: "Dr. Preetpal Kaur Buttar",
        availability: [
            { "time": "10:00 AM - 11:00 AM", "booked": false },
            { "time": "12:00 PM - 1:00 PM", "booked": true },
            { "time": "3:00 PM - 4:00 PM", "booked": false }
        ]
    },
    {
        id: 10,
        name: "Dr. Rakesh Kumar",
        availability: [
            { "time": "10:00 AM - 11:00 AM", "booked": false },
            { "time": "12:00 PM - 1:00 PM", "booked": true },
            { "time": "3:00 PM - 4:00 PM", "booked": false }
        ]
    }
];

function getMentorById(id) {
    return mentors.find(mentor => mentor.id === parseInt(id));
}

function renderAvailability(mentor) {
    const grid = document.getElementById('availabilityGrid');
    grid.innerHTML = '';

    mentor.availability.forEach((slot, index) => {
        const slotElement = document.createElement('div');
        slotElement.classList.add('time-slot');
        if (slot.booked) {
            slotElement.classList.add('booked');
        }
        slotElement.innerHTML = `<p>${slot.time}</p>`;

        if (!slot.booked) {
            slotElement.addEventListener('click', () => toggleSlotSelection(slotElement, index));
        }

        grid.appendChild(slotElement);
    });
}

function toggleSlotSelection(slotElement, index) {
    slotElement.classList.toggle('selected');
    updateBookButton();
}

function updateBookButton() {
    const selectedSlots = document.querySelectorAll('.time-slot.selected');
    const bookButton = document.getElementById('bookButton');
    bookButton.disabled = selectedSlots.length === 0;
}

document.getElementById('bookButton').addEventListener('click', () => {
    const selectedSlots = document.querySelectorAll('.time-slot.selected');
    if (selectedSlots.length > 0) {
        alert('Booking successful! An email confirmation will be sent shortly.');
        location.reload(); // Refresh the page to reset selections
    }
});

// Get mentor ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const mentorId = urlParams.get('id');

if (mentorId) {
    const mentor = getMentorById(parseInt(mentorId));
    if (mentor) {
        document.querySelector('h1').textContent = `${mentor.name}'s Availability`;
        renderAvailability(mentor);
    } else {
        document.querySelector('.container').innerHTML = '<h1>Mentor not found</h1>';
    }
} else {
    document.querySelector('.container').innerHTML = '<h1>Invalid mentor ID</h1>';
}
