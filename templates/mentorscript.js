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
        const button = document.createElement('button');
        button.textContent = slot.time;
        button.disabled = slot.booked;
        slotElement.appendChild(button);

        if (!slot.booked) {
            button.addEventListener('click', () => toggleSlotSelection(slotElement, index));
        }

        grid.appendChild(slotElement);
    });
}

function toggleSlotSelection(slotElement, index) {
    const allSlots = document.querySelectorAll('.time-slot');
    allSlots.forEach(slot => slot.classList.remove('selected'));
    slotElement.classList.add('selected');
    updateBookButton();
}

function updateBookButton() {
    const selectedSlot = document.querySelector('.time-slot.selected');
    const dateInput = document.getElementById('dateInput');
    const bookButton = document.getElementById('bookButton');
    bookButton.disabled = !selectedSlot || !dateInput.value;
}

const urlParams = new URLSearchParams(window.location.search);
const mentorId = urlParams.get('id');

if (mentorId) {
    const mentor = getMentorById(parseInt(mentorId));
    if (mentor) {
        document.querySelector('h1').textContent = `${mentor.name}'s Availability`;
        renderAvailability(mentor);

        // Add date input
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        // Add this inside the if block where date input is created
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.id = 'dateInput';
        dateInput.addEventListener('change', updateBookButton);
        document.querySelector('.container').insertBefore(dateInput, document.getElementById('availabilityGrid'));
    } else {
        document.querySelector('.container').innerHTML = '<h1>Mentor not found</h1>';
    }
} else {
    document.querySelector('.container').innerHTML = '<h1>Invalid mentor ID</h1>';
}

// Modal functionality
const modal = document.getElementById('modal');
const bookButton = document.getElementById('bookButton');
const closeModal = document.getElementById('closeModal');

bookButton.addEventListener('click', () => {
    const selectedSlot = document.querySelector('.time-slot.selected button');
    const selectedDate = document.getElementById('dateInput').value;

    if (selectedSlot && selectedDate) {
        document.getElementById('selectedDateTime').textContent = `${selectedDate} at ${selectedSlot.textContent}`;
        modal.style.display = 'block';
    }
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const selectedDateTime = document.getElementById('selectedDateTime').textContent;

    console.log(`Name: ${name}, Email: ${email}, Phone: ${phone}, Selected Date/Time: ${selectedDateTime}`);

    modal.style.display = 'none';
});