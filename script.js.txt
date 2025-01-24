// Function to add a new record
function addRecord() {
  const name = document.getElementById('nameInput').value;
  const category = document.getElementById('categoryInput').value;
  const guardian = document.getElementById('guardianInput').value;
  const contact = document.getElementById('contactInput').value;
  const image = document.getElementById('imageInput').files[0];

  if (name && category) {
    // Create a new row
    const newRow = document.createElement('tr');
    const imgURL = image ? URL.createObjectURL(image) : 'images/default.jpg';

    newRow.innerHTML = `
      <td><img src="${imgURL}" alt="Image" class="circular-img"></td>
      <td>${name}</td>
      <td>${category}</td>
      <td>${guardian || 'N/A'}</td>
      <td>${contact || 'N/A'}</td>
      <td><button class="edit-btn" onclick="editRecord(this)">✏️</button><button class="delete-btn" onclick="deleteRecord(this)">❌</button></td>
    `;

    // Append the new row to the table
    document.querySelector("#recordsTable tbody").appendChild(newRow);

    // Reset inputs after adding the record
    document.getElementById('nameInput').value = '';
    document.getElementById('categoryInput').value = '';
    document.getElementById('guardianInput').value = '';
    document.getElementById('contactInput').value = '';
    document.getElementById('imageInput').value = '';
  } else {
    alert('Name and Category are required!');
  }
}

// Edit a Personal Record
function editRecord(button) {
  const row = button.closest('tr');
  const name = row.cells[1].textContent;
  const category = row.cells[2].textContent;
  const guardian = row.cells[3].textContent;
  const contact = row.cells[4].textContent;

  // Fill the form with the existing data
  document.getElementById('nameInput').value = name;
  document.getElementById('categoryInput').value = category;
  document.getElementById('guardianInput').value = guardian;
  document.getElementById('contactInput').value = contact;

  // Remove the row after editing
  row.remove();
}

// Delete a Personal Record
function deleteRecord(button) {
  const row = button.closest('tr');
  row.remove();
}

// Toggle Dark/Light Mode
function toggleMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
  const modeToggle = document.getElementById('modeSwitch');

  if (body.classList.contains('dark-mode')) {
    modeToggle.checked = true;
  } else {
    modeToggle.checked = false;
  }
}

// Toggle Guardian input visibility for Workers
function toggleDateOfJoining() {
  const guardianInput = document.getElementById('guardianInput');
  if (guardianInput.value) {
    document.getElementById('guardianInput').placeholder = "Guardian Name";
  } else {
    document.getElementById('guardianInput').placeholder = "Date of Joining (for workers)";
  }
}
