const users = JSON.parse(localStorage.getItem('users')) || [];

const userProfiles = document.getElementById("adminUserProfiles");
const searchInput = document.getElementById("adminSearchInput");
const addUserBtn = document.getElementById("adminAddUserBtn");

document.addEventListener('DOMContentLoaded', () => {
  // Check if an admin is logged in, otherwise redirect to login page
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!loggedInUser || loggedInUser.role !== 'admin') {
    window.location.href = '../login/login.html';
  } else {
    // Render user profiles if admin is logged in
    renderUserCards(users);
  }
});

function generateUserCard(user, index) {
  return `
    <div class="user-card" data-index="${index}">
      <img src="${user.photo}" alt="${user.name}" title="${user.name}">
      <h3>${user.name}</h3>
      <div class="menu">
        <li style="--i:1;--clr:#ff0000"><a href="${user.youtube}" target="_blank"><i class="fab fa-youtube"></i></a></li>
        <li style="--i:2;--clr:#010101;"><a href="${user.tiktok}" target="_blank"><i class="fab fa-tiktok"></i></a></li>
        <li style="--i:3;--clr:#c32aa3;"><a href="${user.instagram}" target="_blank"><i class="fab fa-instagram"></i></a></li>
        <li style="--i:4;--clr:#d32323;"><a href="#" onclick="removeUser(${index})"><i class="fas fa-trash-alt"></i></a></li>
        <li style="--i:5;--clr:#25d366;"><a href="#" onclick="markDone(this)"><i class="fas fa-check"></i></a></li>
        <div class="toggle">
          <i class="fas fa-ellipsis-h"></i>
          <i class="fas fa-times"></i>
        </div>
      </div>
    </div>
  `;
}

function renderUserCards(usersToRender) {
  // Clear existing user profiles
  userProfiles.innerHTML = "";
  usersToRender.forEach((user, index) => {
    const userCard = document.createElement("div");
    userCard.innerHTML = generateUserCard(user, index);
    userProfiles.appendChild(userCard);
  });
  localStorage.setItem('users', JSON.stringify(users));

  // Add toggle functionality for user menu
  let toggles = document.querySelectorAll('.toggle');
  toggles.forEach(toggle => {
    toggle.onclick = function () {
      this.parentElement.classList.toggle('active');
    }
  });
}

function filterUsers() {
  // Filter users based on search input
  const searchValue = searchInput.value.trim().toLowerCase();
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchValue) || 
    user.country.toLowerCase().includes(searchValue)
  );
  renderUserCards(filteredUsers);
}

function markDone(button) {
  // Mark user as done by changing background color and disabling the button
  button.closest('.user-card').style.backgroundColor = '#28a745';
  button.onclick = null; // Disable the button
}

function promptInput(message) {
  return new Promise((resolve) => {
    // Create a prompt overlay to get user input
    const overlay = document.createElement('div');
    overlay.className = 'prompt-overlay';

    const container = document.createElement('div');
    container.className = 'prompt-container';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'prompt-input';
    input.placeholder = message;

    container.appendChild(input);
    overlay.appendChild(container);
    document.body.appendChild(overlay);

    input.focus();

    // Resolve the promise with input value when Enter key is pressed
    input.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        resolve(input.value);
        document.body.removeChild(overlay);
      }
    });
  });
}

function removeUser(index) {
  // Remove user from the list and re-render user profiles
  users.splice(index, 1);
  renderUserCards(users);
}

addUserBtn.addEventListener("click", async () => {
  // Prompt for new user details and add user to the list
  const newName = await promptInput("Enter the user's name:");
  const newCountry = await promptInput("Enter the user's country:");
  const newPhoto = await promptInput("Enter the user's photo URL:");
  const newYouTube = await promptInput("Enter the user's YouTube URL:");
  const newTikTok = await promptInput("Enter the user's TikTok URL:");
  const newInstagram = await promptInput("Enter the user's Instagram URL:");

  if (newName && newCountry && newPhoto && newYouTube && newTikTok && newInstagram) {
    const newUser = { name: newName, country: newCountry, photo: newPhoto, youtube: newYouTube, tiktok: newTikTok, instagram: newInstagram };
    users.push(newUser);
    renderUserCards(users);
  } else {
    alert("All fields are required to add a new user.");
  }
});

searchInput.addEventListener("input", filterUsers);

document.getElementById('logoutBtn').addEventListener('click', () => {
  // Log out the admin by removing logged in user from local storage
  localStorage.removeItem('loggedInUser');
  window.location.href = '../login/login.html';
});
