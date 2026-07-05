// Budget Tracker JS

let budget = 0;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

document.addEventListener("DOMContentLoaded", () => {
  displayExpenses();
  updateTotals();
});

document.getElementById("setBudgetBtn").addEventListener("click", () => {
  const input = document.getElementById("budgetInput").value;
  budget = parseFloat(input);
  document.getElementById("budgetAmount").textContent = `₹${budget}`;
  updateTotals();
});

document.getElementById("addExpenseBtn").addEventListener("click", () => {
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const category = document.getElementById("expenseCategory").value;
  const desc = document.getElementById("expenseDescription").value;
  const date = document.getElementById("expenseDate").value;

  if (amount && category && desc && date) {
    const expense = { amount, category, desc, date, id: Date.now() };
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
    updateTotals();
    clearForm();
  } else {
    alert("Fill all fields!");
  }
});

function displayExpenses() {
  const list = document.getElementById("expenseList");
  list.innerHTML = "";

  expenses.forEach((item) => {
    const row = document.createElement("div");
    row.classList.add("expense-item");
    row.innerHTML = `
      <span>₹${item.amount}</span>
      <span>${item.category}</span>
      <span>${item.desc}</span>
      <span>${item.date}</span>
      <button onclick="deleteExpense(${item.id})">Delete</button>
    `;
    list.appendChild(row);
  });
}

function deleteExpense(id) {
  expenses = expenses.filter((item) => item.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  displayExpenses();
  updateTotals();
}

function updateTotals() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const savings = budget - total;

  document.getElementById("totalExpenses").textContent = `₹${total}`;
  document.getElementById("remaining").textContent = `₹${savings >= 0 ? savings : 0}`;
}

function clearForm() {
  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseCategory").value = "";
  document.getElementById("expenseDescription").value = "";
  document.getElementById("expenseDate").value = "";
}
