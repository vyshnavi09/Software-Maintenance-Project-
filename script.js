//!initial values
var selectedRow = null;
var deletedRecords = []; // Array to store deleted records
var modifiedRecords = []; // Array to store modified records

//!form submit logic
function onFormSubmit(e) {
  event.preventDefault();
  var formData = readFormData();
  if (selectedRow == null) {
    insertNewRecord(formData);
  } else {
    saveModifiedRecord(selectedRow); // Save the original record before updating
    updateRecord(formData);
  }
  resetForm();
}

//!get method (Retrieving the data)
function readFormData() {
  var formData = {};
  formData["productCode"] = document.getElementById("productCode").value;
  formData["product"] = document.getElementById("product").value;
  formData["qty"] = document.getElementById("qty").value;
  formData["perPrice"] = document.getElementById("perPrice").value;
  return formData;
}

//!insert the data (Post method)
function insertNewRecord(data) {
  var table = document.getElementById("storeList").getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.productCode;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.product;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.qty;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.perPrice;
  cell5 = newRow.insertCell(4);
  cell5.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

//!edit functionality (Update method)
function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("productCode").value = selectedRow.cells[0].innerHTML;
  document.getElementById("product").value = selectedRow.cells[1].innerHTML;
  document.getElementById("qty").value = selectedRow.cells[2].innerHTML;
  document.getElementById("perPrice").value = selectedRow.cells[3].innerHTML;
}

//! Save modified record
function saveModifiedRecord(row) {
  var modifiedData = {
    productCode: row.cells[0].innerHTML,
    product: row.cells[1].innerHTML,
    qty: row.cells[2].innerHTML,
    perPrice: row.cells[3].innerHTML
  };
  modifiedRecords.push(modifiedData); // Save original data to modified records
}

//! Update the data in the selected row
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.productCode;
  selectedRow.cells[1].innerHTML = formData.product;
  selectedRow.cells[2].innerHTML = formData.qty;
  selectedRow.cells[3].innerHTML = formData.perPrice;
  selectedRow = null; // Reset selected row after updating
}

//!deleting the data (delete method)
function onDelete(td) {
  if (confirm("Are you sure about deleting😒 the data?")) {
    row = td.parentElement.parentElement;
    var deletedData = {
      productCode: row.cells[0].innerHTML,
      product: row.cells[1].innerHTML,
      qty: row.cells[2].innerHTML,
      perPrice: row.cells[3].innerHTML
    };
    deletedRecords.push(deletedData); // Save deleted data
    document.getElementById("storeList").deleteRow(row.rowIndex);
    resetForm();
  }
}

//! Display deleted records view
function showDeletedRecords() {
  var table = document.getElementById("deletedList").getElementsByTagName("tbody")[0];
  table.innerHTML = ""; // Clear existing rows
  deletedRecords.forEach(function(record) {
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = record.productCode;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = record.product;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = record.qty;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = record.perPrice;
  });
  document.getElementById("deletedRecordsView").style.display = "block";
  document.getElementById("modifiedRecordsView").style.display = "none";
}

//! Display modified records view
function showModifiedRecords() {
  var table = document.getElementById("modifiedList").getElementsByTagName("tbody")[0];
  table.innerHTML = ""; // Clear existing rows
  modifiedRecords.forEach(function(record) {
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = record.productCode;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = record.product;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = record.qty;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = record.perPrice;
  });
  document.getElementById("modifiedRecordsView").style.display = "block";
  document.getElementById("deletedRecordsView").style.display = "none";
}

//!resetting the values in form
function resetForm() {
  document.getElementById("productCode").value = "";
  document.getElementById("product").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("perPrice").value = "";
  selectedRow = null;
}
