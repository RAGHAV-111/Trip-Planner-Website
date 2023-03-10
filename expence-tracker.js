function addExpense() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    if (name && email && phoneNumber) {
        axios
            .post('https://crudcrud.com/api/bdd99c4da68043df8192ae03862c81b9/appointmentData', {
                "name": name,
                "email": email,
                "phoneNumber": phoneNumber
            })
            .then((response) => {
                console.log(`Expense added with ID: ${response.data._id}`);
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('phoneNumber').value = '';
                displayExpenses();
            })
            .catch((error) => {
                console.log(`Error adding expense: ${error}`);
            });
    }
}

function deleteExpense(id) {
  axios
      .delete(`https://crudcrud.com/api/bdd99c4da68043df8192ae03862c81b9/appointmentData/${id}`)
      .then((response) => {
          console.log(`Expense with ID ${response.data._id} deleted successfully`);
          displayExpenses();
      })
      .catch((error) => {
          console.log(`Error deleting expense: ${error}`);
      });
}


function displayExpenses() {
  const tableBody = document.getElementById('expense-body');

  axios
    .get('https://crudcrud.com/api/bdd99c4da68043df8192ae03862c81b9/appointmentData')
    .then((response) => {
      console.log(response);

      // clear previous table data
      tableBody.innerHTML = '';

      // iterate over response data and add to table
      response.data.forEach((expense) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = expense.name;
        row.appendChild(nameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = expense.email;
        row.appendChild(emailCell);

        const phoneNumberCell = document.createElement('td');
        phoneNumberCell.textContent = expense.phoneNumber;
        row.appendChild(phoneNumberCell);

        const editCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
          const editForm = document.getElementById('edit-form');
          editForm.style.display = 'block';
          editForm.elements['name'].value = expense.name;
          editForm.elements['email'].value = expense.email;
          editForm.elements['phoneNumber'].value = expense.phoneNumber;
          editForm.elements['expenseId'].value = expense._id;
        });
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          deleteExpense(expense._id);
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

async function editExpense(formData) {
  try {
    const response = await axios.put(`'https://crudcrud.com/api/bdd99c4da68043df8192ae03862c81b9/appointmentData/${formData.get('expenseId')}`, {
      name: formData.get('name'),
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Error editing expense: ${error}`);
  }
}

displayExpenses()