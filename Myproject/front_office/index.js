const users = JSON.parse(localStorage.getItem('users')) || [];

const userProfiles = document.getElementById("userProfiles");
const searchInput = document.getElementById("userSearchInput");

document.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!loggedInUser || loggedInUser.role !== 'user') {
    window.location.href = '../login/login.html';
  } else {
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
  userProfiles.innerHTML = "";
  usersToRender.forEach((user, index) => {
    const userCard = document.createElement("div");
    userCard.innerHTML = generateUserCard(user, index);
    userProfiles.appendChild(userCard);
  });

  let toggles = document.querySelectorAll('.toggle');
  toggles.forEach(toggle => {
    toggle.onclick = function () {
      this.parentElement.classList.toggle('active');
    }
  });
}

function filterUsers() {
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

searchInput.addEventListener("input", filterUsers);

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('loggedInUser');
  window.location.href = '../login/login.html';
});