// JavaScript
const mentors = [
    {
        id: 1,
        name: "Dr. Birmohan Singh",
        education: ["Ph.D.", "M.E."],
        email: "birmohansingh@sliet.ac.in",
        imageUrl: "https://picsum.photos/300/300?random=1"
    },
    {
        id: 2,
        name: "Dr. Damanpreet Singh",
        education: ["Ph.D.", "M.Tech", "B.Tech"],
        email: "damanpreets@sliet.ac.in",
        imageUrl: "https://picsum.photos/300/300?random=2"
    },
    {
        id: 3,
        name: "Dr. Major Singh Goraya",
        education: ["Ph.D.", "M.Tech.", "B.Tech."],
        email: "mjrsingh@yahoo.com",
        imageUrl: "https://picsum.photos/300/300?random=3"
    },
    {
        id: 4,
        name: "Dr. Manoj Sachan",
        education: ["B.Tech(CS)", "M.E(CS)", "Ph.D (CSE)"],
        email: "manojsachan@sliet.ac.in",
        imageUrl: "https://picsum.photos/300/300?random=4"
    },
    {
        id: 5,
        name: "Dr. Gurjinder Kaur",
        education: ["B.E.", "M.S. BITS Pilani", "Ph.D SLIET"],
        email: "gurjinder13@yahoo.com",
        imageUrl: "https://picsum.photos/300/300?random=5"
    },
    {
        id: 6,
        name: "Dr. Amar Nath",
        education: ["Ph.D. (CSE)", "M. Tech. (CSE)", "B. Tech. (CSE)"],
        email: "amarnath@sliet.ac.in",
        imageUrl: "https://picsum.photos/300/300?random=6"
    },
    {
        id: 7,
        name: "Dr. Jagdeep Singh",
        education: ["Ph.D", "M.Tech(CSE)", "B.Tech(CSE)"],
        email: "jagdeep@sliet.ac.in",
        imageUrl: "https://picsum.photos/300/300?random=7"
    },
    {
        id: 8,
        name: "Dr. Manminder Singh",
        education: ["B.Tech (CSE)", "M.Tech (CSE)", "Ph. D (CSE)"],
        email: "manminderldh@gmail.com",
        imageUrl: "https://picsum.photos/300/300?random=8"
    },
    {
        id: 9,
        name: "Dr. Preetpal Kaur Buttar",
        education: ["PhD"],
        email: "preetpal@sliet.ac.in",
        imageUrl: "https://picsum.photos/300/300?random=9"
    },
];

function generateEducationBadges(education) {
    return education.map(edu => `<span class="education-badge">${edu}</span>`).join('');
}

function generateCard(mentor) {
    return `
        <div class="card">
            <div class="card-image-container">
                <img src="${mentor.imageUrl}" alt="${mentor.name}" class="card-image">
            </div>
            <div class="card-content">
                <h2 class="card-title">${mentor.name}</h2>
                <div class="education-badges">
                    ${generateEducationBadges(mentor.education)}
                </div>
                <p class="card-text">${mentor.email}</p>
                <a href="mentorpage.html?id=${mentor.id}" class="card-link">View Status</a>
            </div>
        </div>
    `;
}

function renderCards() {
    const container = document.querySelector('.container');
    if (!container) {
        console.error('Container element not found');
        return;
    }
    const cardsHTML = mentors.map(generateCard).join('');
    container.innerHTML = cardsHTML;
}

document.addEventListener('DOMContentLoaded', renderCards);

// Keep your existing functions (toggleMenu, toggleDropdown, scroll event listener) here
function toggleMenu() {
    var navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("show");
}

function toggleDropdown(item) {
    if (window.innerWidth <= 768) {
        item.classList.toggle("active");
    }
}

window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 2rem';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '1rem 2rem';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

