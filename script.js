
// Implement smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.navigation-menu a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function filterProjects(category) {
    const projects = document.querySelectorAll('.project-item');

    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Add event listeners to filter buttons
const filterButtons = document.querySelectorAll('.filter-button');

filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        const category = this.getAttribute('data-category');
        filterProjects(category);
    });
});

// Implement lightbox effect for project images
function openLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imageSrc}" alt="Project Image">
            <span class="lightbox-close">&times;</span>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Close lightbox when clicking the close button or outside the image
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox || event.target.classList.contains('lightbox-close')) {
            document.body.removeChild(lightbox);
        }
    });
}

// Add event listeners to project images
const projectImages = document.querySelectorAll('.project-item img');

projectImages.forEach(image => {
    image.addEventListener('click', function () {
        const imageSrc = this.getAttribute('src');
        openLightbox(imageSrc);
    });
});

// Add form validation for the "Contact" form
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.querySelector('#name');
        const email = document.querySelector('#email');
        const message = document.querySelector('#message');
        let isValid = true;

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(error => error.remove());

        // Validate name
        if (!name.value.trim()) {
            isValid = false;
            const error = document.createElement('span');
            error.classList.add('error-message');
            error.textContent = 'Name is required.';
            name.parentElement.appendChild(error);
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailPattern.test(email.value)) {
            isValid = false;
            const error = document.createElement('span');
            error.classList.add('error-message');
            error.textContent = 'Valid email is required.';
            email.parentElement.appendChild(error);
        }

        // Validate message
        if (!message.value.trim()) {
            isValid = false;
            const error = document.createElement('span');
            error.classList.add('error-message');
            error.textContent = 'Message is required.';
            message.parentElement.appendChild(error);
        }

        // Submit the form if all fields are valid
        if (isValid) {
            contactForm.submit();
        }
    });
}

// Provide real-time feedback for the "Contact" form
if (contactForm) {
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const message = document.querySelector('#message');

    // Helper function to show error message
    function showError(input, message) {
        const error = input.parentElement.querySelector('.error-message');
        if (error) {
            error.textContent = message;
        } else {
            const errorElement = document.createElement('span');
            errorElement.classList.add('error-message');
            errorElement.textContent = message;
            input.parentElement.appendChild(errorElement);
        }
    }

    // Helper function to clear error message
    function clearError(input) {
        const error = input.parentElement.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    }

    // Real-time validation for name
    name.addEventListener('input', function () {
        if (!name.value.trim()) {
            showError(name, 'Name is required.');
        } else {
            clearError(name);
        }
    });

    // Real-time validation for email
    email.addEventListener('input', function () {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Email is required.');
        } else if (!emailPattern.test(email.value)) {
            showError(email, 'Enter a valid email.');
        } else {
            clearError(email);
        }
    });

    // Real-time validation for message
    message.addEventListener('input', function () {
        if (!message.value.trim()) {
            showError(message, 'Message is required.');
        } else {
            clearError(message);
        }
    });
}
