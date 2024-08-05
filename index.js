let editingRow = null;
let totalAmount = 0;

function updateTotal(amount, isAdding) {
    if (isAdding) {
        totalAmount += amount;
    } else {
        totalAmount -= amount;
    }
    document.getElementById('totalAmount').innerText = totalAmount.toFixed(2);
}

function addExpense() {
    const inname = document.getElementById('inname').value;
    const inamoumt = parseFloat(document.getElementById('inamoumt').value);
    const incategory = document.getElementById('incategory').value;
    const indate = document.getElementById('indate').value;
    const extable = document.getElementById("extable");

    // Validate inputs
    if (!inname || isNaN(inamoumt) || !incategory || !indate) {
        alert("Please fill all the fields correctly.");
        return;
    }

    if (editingRow) {
        // Update total amount: subtract the old amount and add the new amount
        const oldAmount = parseFloat(editingRow.cells[1].innerText);
        updateTotal(oldAmount, false);
        updateTotal(inamoumt, true);

        // Edit existing row
        editingRow.cells[0].innerHTML = inname;
        editingRow.cells[1].innerHTML = inamoumt.toFixed(2);
        editingRow.cells[2].innerHTML = incategory;
        editingRow.cells[3].innerHTML = indate;
        editingRow = null;
    } else {
        // Create a new row and columns
        const row = document.createElement("tr");
        const col1 = document.createElement("td");
        const col2 = document.createElement("td");
        const col3 = document.createElement("td");
        const col4 = document.createElement("td");
        const col5 = document.createElement("td");

        // Assign input values to columns
        col1.innerHTML = inname;
        col2.innerHTML = inamoumt.toFixed(2);
        col3.innerHTML = incategory;
        col4.innerHTML = indate;

        // Create edit button
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.onclick = function() {
            document.getElementById('inname').value = col1.innerHTML;
            document.getElementById('inamoumt').value = col2.innerHTML;
            document.getElementById('incategory').value = col3.innerHTML;
            document.getElementById('indate').value = col4.innerHTML;
            editingRow = row;
        };

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.onclick = function() {
            updateTotal(parseFloat(col2.innerText), false);
            row.remove();
        };

        col5.appendChild(editBtn);
        col5.appendChild(deleteBtn);

        // Append columns to row
        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        row.appendChild(col4);
        row.appendChild(col5);

        // Append row to table body
        extable.appendChild(row);

        // Update total amount
        updateTotal(inamoumt, true);
    }

    // Clear input fields after adding the expense
    document.getElementById('inname').value = "";
    document.getElementById('inamoumt').value = "";
    document.getElementById('incategory').value = "";
    document.getElementById('indate').value = "";
}

function filterTable() {
    const filterInput = document.getElementById('filterInput').value.toLowerCase();
    const tableRows = document.getElementById('extable').getElementsByTagName('tr');

    for (const row of tableRows) {
        const cells = row.getElementsByTagName('td');
        let matchFound = false;
        for (const cell of cells) {
            if (cell.innerText.toLowerCase().includes(filterInput)) {
                matchFound = true;
                break;
            }
        }
        if (matchFound) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}

document.getElementById("inbtn").onclick = addExpense;
document.getElementById('filterInput').onkeyup = filterTable;
