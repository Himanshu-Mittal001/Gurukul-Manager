// Toggle Dark/Light Mode
function toggleMode() {
  const body = document.body;
  body.classList.toggle('light-mode');
  const modeToggle = document.getElementById('modeSwitch');

  if (body.classList.contains('light-mode')) {
    modeToggle.checked = true;
  } else {
    modeToggle.checked = false;
  }
}

// Toggle Hamburger Menu Visibility
function toggleMenu() {
  const navList = document.getElementById("navList");
  navList.classList.toggle("active");
}

// Add New Record to the Table
function addRecord() {
  const name = document.getElementById('nameInput').value;
  const category = document.getElementById('categoryInput').value;
  const guardian = document.getElementById('guardianInput').value;
  const address = document.getElementById('addressInput').value;
  const contact = document.getElementById('contactInput').value;
  const image = document.getElementById('imageInput').files[0];

  if (name && category) {
    const newRow = document.createElement('tr');
    const imgURL = image ? URL.createObjectURL(image) : 'images/default.jpg';

    newRow.innerHTML = `
      <td><img src="${imgURL}" alt="Image"></td>
      <td>${name}</td>
      <td>${category}</td>
      <td>${guardian || 'N/A'}</td>
      <td>${address || 'N/A'}</td>
      <td>${contact || 'N/A'}</td>
      <td><button onclick="editRecord(this)">✏️</button><button onclick="deleteRecord(this)">❌</button></td>
    `;

    document.querySelector("#recordsTable tbody").appendChild(newRow);
    resetInputFields();
  } else {
    alert('Name and Category are required!');
  }
}

// Edit Personal Record
function editRecord(button) {
  const row = button.closest('tr');
  const name = row.cells[1].textContent;
  const category = row.cells[2].textContent;
  const guardian = row.cells[3].textContent;
  const address = row.cells[4].textContent;
  const contact = row.cells[5].textContent;

  document.getElementById('nameInput').value = name;
  document.getElementById('categoryInput').value = category;
  document.getElementById('guardianInput').value = guardian;
  document.getElementById('addressInput').value = address;
  document.getElementById('contactInput').value = contact;

  row.remove();
}

// Delete Personal Record
function deleteRecord(button) {
  const row = button.closest('tr');
  row.remove();
}

// Reset Input Fields
function resetInputFields() {
  document.getElementById('nameInput').value = '';
  document.getElementById('categoryInput').value = '';
  document.getElementById('guardianInput').value = '';
  document.getElementById('addressInput').value = '';
  document.getElementById('contactInput').value = '';
  document.getElementById('imageInput').value = '';
}

// Generate PDF
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  doc.text('Transaction Report', 20, 20);
  doc.html(document.body, {
    callback: function (doc) {
      doc.save('transaction_report.pdf');
    },
    margin: [10, 10, 10, 10],
    html2canvas: { scale: 4 }
  });
}
