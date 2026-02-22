// Store all transactions in an array
var transactions = [];

// Icons for each category
var categoryIcons = {
  "Food": "🍕",
  "Transport": "🚗",
  "Shopping": "🛍️",
  "Bills": "📄",
  "Salary": "💼",
  "Other": "💡"
};

// Add a new transaction
function addTransaction() {
  var desc = document.getElementById("descInput").value.trim();
  var amount = document.getElementById("amountInput").value;
  var type = document.getElementById("typeSelect").value;
  var category = document.getElementById("categorySelect").value;

  // Validation — check if fields are filled
  if (desc === "") {
    alert("Please enter a description.");
    return;
  }

  if (amount === "" || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  // Create transaction object
  var transaction = {
    id: Date.now(),
    description: desc,
    amount: parseFloat(amount),
    type: type,
    category: category,
    date: new Date().toLocaleDateString()
  };

  // Add to array
  transactions.push(transaction);

  // Clear inputs
  document.getElementById("descInput").value = "";
  document.getElementById("amountInput").value = "";

  // Refresh screen
  displayTransactions();
  updateSummary();
}

// Show transactions on screen
function displayTransactions() {
  var list = document.getElementById("transactionList");
  var emptyMsg = document.getElementById("emptyMsg");
  var filterCategory = document.getElementById("filterCategory").value;

  // Filter transactions
  var filtered = [];
  for (var i = 0; i < transactions.length; i++) {
    if (filterCategory === "all") {
      filtered.push(transactions[i]);
    } else if (transactions[i].category === filterCategory) {
      filtered.push(transactions[i]);
    }
  }

  // Show empty message if nothing to show
  if (filtered.length === 0) {
    list.innerHTML = "";
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  // Build HTML — show newest first
  var html = "";

  for (var j = filtered.length - 1; j >= 0; j--) {
    var t = filtered[j];
    var icon = categoryIcons[t.category] || "💡";
    var sign = t.type === "income" ? "+" : "-";

    html += '<div class="transaction-item">';
    html += '  <div class="trans-left">';
    html += '    <span class="trans-icon">' + icon + '</span>';
    html += '    <div>';
    html += '      <div class="trans-desc">' + t.description + '</div>';
    html += '      <div class="trans-category">' + t.category + ' · ' + t.date + '</div>';
    html += '    </div>';
    html += '  </div>';
    html += '  <div class="trans-right">';
    html += '    <span class="trans-amount ' + t.type + '">' + sign + '₹' + t.amount.toFixed(2) + '</span>';
    html += '    <button class="delete-btn" onclick="deleteTransaction(' + t.id + ')">✕</button>';
    html += '  </div>';
    html += '</div>';
  }

  list.innerHTML = html;
}

// Update income, expense, balance numbers
function updateSummary() {
  var totalIncome = 0;
  var totalExpense = 0;

  // Loop through all transactions and add up
  for (var i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "income") {
      totalIncome += transactions[i].amount;
    } else {
      totalExpense += transactions[i].amount;
    }
  }

  var balance = totalIncome - totalExpense;

  // Update the display
  document.getElementById("totalIncome").textContent = "₹" + totalIncome.toFixed(2);
  document.getElementById("totalExpense").textContent = "₹" + totalExpense.toFixed(2);
  document.getElementById("balance").textContent = "₹" + balance.toFixed(2);
}

// Delete a transaction by its id
function deleteTransaction(id) {
  var newList = [];

  for (var i = 0; i < transactions.length; i++) {
    if (transactions[i].id !== id) {
      newList.push(transactions[i]);
    }
  }

  transactions = newList;
  displayTransactions();
  updateSummary();
}
