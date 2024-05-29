document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tab-content');
  
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove 'active' class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
  
            // Add 'active' class to the clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(tab.getAttribute('data-tab') + 'Form').classList.add('active');
        });
    });
  
    // Sign In form submission handling
    document.getElementById('signinForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('signin-error');
  
        // Simulating user data
        const users = [
            { username: 'admin', password: 'admin123', role: 'admin' },
            { username: 'user', password: 'user123', role: 'user' }
        ];
  
        // Check if the entered credentials match any user
        const user = users.find(user => user.username === username && user.password === password);
  
        if (user) {
            // Store logged in user in local storage and redirect based on role
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            if (user.role === 'admin') {
                window.location.href = '../admin/admin.html';  // Adjust the path as per your directory structure
            } else {
                window.location.href = '../front_office/index.html';  // Adjust the path as per your directory structure
            }
        } else {
            // Display error message if credentials are invalid
            errorMessage.textContent = 'Invalid username or password';
        }
    });
  
    // Sign Up form submission handling
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const errorMessage = document.getElementById('signup-error');
  
        // Simulating user registration (you would typically send this data to your server)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.username === username)) {
            // Display error message if username already exists
            errorMessage.textContent = 'Username already exists';
        } else {
            // Add new user to local storage
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            errorMessage.textContent = 'User registered successfully';
        }
    });
  
    // Forgot Password form submission handling
    document.getElementById('forgotForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('forgot-email').value;
        const errorMessage = document.getElementById('forgot-error');
  
        // Simulating password reset (you would typically send this data to your server)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email);
        if (user) {
            // Display message if email is found
            errorMessage.textContent = 'Password reset link has been sent to your email';
        } else {
            // Display error message if email is not found
            errorMessage.textContent = 'Email not found';
        }
    });
  });
  