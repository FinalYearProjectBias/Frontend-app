// Function to display form fields based on user type selection
function showFormFields() {
    const userType = document.getElementById('user-type').value;

    // Hide all specific fields initially
    document.getElementById('student-fields').style.display = 'none';
    document.getElementById('teacher-fields').style.display = 'none';
    document.getElementById('non-teaching-fields').style.display = 'none';

    // Show specific fields based on the selected user type
    if (userType === 'student') {
        document.getElementById('student-fields').style.display = 'block';
    } else if (userType === 'teacher') {
        document.getElementById('teacher-fields').style.display = 'block';
    } else if (userType === 'non-teaching-staff') {
        document.getElementById('non-teaching-fields').style.display = 'block';
    }
}

// Function to handle form submission for signup
function signup(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Get common form data
    const userType = document.getElementById('user-type').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contactNumber = document.getElementById('contact-number').value;
    const password = document.getElementById('password').value;

    // Get specific data based on user type
    let specificData = {};
    if (userType === 'student') {
        specificData = {
            course: document.getElementById('course').value,
            batch: document.getElementById('batch').value,
            rollNo: document.getElementById('roll-no').value
        };
    } else if (userType === 'teacher') {
        specificData = {
            department: document.getElementById('department').value,
            designation: document.getElementById('designation').value
        };
    } else if (userType === 'non-teaching-staff') {
        specificData = {
            department: document.getElementById('nt-department').value,
            designation: document.getElementById('nt-designation').value
        };
    }

    // Combine common data and specific data
    const formData = {
        name,
        email,
        contactNumber,
        password,
        userType,
        ...specificData
    };

const formDataModified={
    name:name,
    email:email,
    password:password
}

    console.log('Form Data:', formDataModified); // For debugging

    // Make an API call for signup (replace with your actual backend API endpoint)
    fetch('https://backend-server-ohpm.onrender.com/signup/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Notify the user of success or failure
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to sign up. Please try again.');
    });
}
// Function to handle login form submission
async function login(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get login form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create the payload
    const loginData = {
        email: email,
        password: password
    };

    // Log the form data for debugging
    console.log('Login Data:', loginData);

    // Make an API call to the FastAPI login endpoint
    await fetch('https://backend-server-ohpm.onrender.com/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful') {
            // Notify the user of successful login
            alert('Login successful! Welcome, ' + data.user.name);

            // You can redirect the user to another page (dashboard, etc.)
            // window.location.href = '/dashboard.html';
        } else {
            // Notify the user of login failure
            alert('Login failed: ' + data.detail);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed. Please try again.');
    });
}

// Adding event listener for login form submission when the DOM is fully loaded
