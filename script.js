function toggleChat() {
  const body = document.querySelector('.chat-body');
  const inputArea = document.querySelector('.chat-input-area');
  const isVisible = body.style.display !== 'none';

  body.style.display = isVisible ? 'none' : 'flex';
  inputArea.style.display = isVisible ? 'none' : 'flex';
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  appendMessage(msg, 'user');

  // Simulate AI response
  setTimeout(() => {
    const response = getBotReply(msg);
    appendMessage(response, 'bot');
  }, 500);

  input.value = "";
}

function appendMessage(text, sender) {
  const chatBody = document.getElementById("chatBody");
  const msgDiv = document.createElement("div");
  msgDiv.className = `chat-msg ${sender}`;
  
  // Wrap message text in a span to apply color
  msgDiv.innerHTML = `<span>${text}</span>`;
  
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}


// Placeholder AI logic – replace with real API call later
function getBotReply(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("best stock")) return "Reliance and TCS are good options right now.";
  if (msg.includes("ipo")) return "ABC Ltd's IPO looks promising.";
  if (msg.includes("mutual fund")) return "Try Axis Bluechip for large cap exposure.";
  return "Sorry, I am still learning. Please ask something else!";
}

    // Theme toggle logic
    function toggleTheme() {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    }

    // Load saved theme
    window.onload = () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
      }
      document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
    };

    // Existing JS functions
    function showSection(id) {
      document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
      document.getElementById(id).classList.add('active');
    }

    function showStockTable(term) {
      document.querySelectorAll('.stock-table').forEach(tbl => tbl.classList.remove('active'));
      document.getElementById(term).classList.add('active');
    }

    function showMutualTable(type) {
      document.querySelectorAll('.mutual-table').forEach(tbl => tbl.classList.remove('active'));
      document.getElementById(type).classList.add('active');
    }

    function loginUser() {
  const email = document.getElementById('userEmail').value;
  const password = document.getElementById('userPassword').value;

  if (!email || !email.includes("@")) {
    alert("Please enter a valid email.");
    return;
  }

  if (!password || password.length < 4) {
    alert("Please enter a valid password (min 4 characters).");
    return;
  }

  // Simulate a successful login (you can enhance this with real backend validation later)
  localStorage.setItem('portfolioEmail', email);
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('portfolioContent').style.display = 'block';
  document.getElementById('welcomeMsg').textContent = `Welcome, ${email}`;
  loadStocks();
}


    function addStock() {
      const stock = document.getElementById('stockName').value;
      const price = document.getElementById('buyPrice').value;
      const qty = document.getElementById('qty').value;

      if (!stock || !price || !qty) {
        alert("Fill in all fields.");
        return;
      }

      let portfolio = JSON.parse(localStorage.getItem('portfolioData')) || [];
      portfolio.push({ stock, price, qty, status: "Pending review by admin" });
      localStorage.setItem('portfolioData', JSON.stringify(portfolio));
      loadStocks();
    }

    function deleteStock(index) {
      if (confirm("Are you sure you want to delete this stock?")) {
        let portfolio = JSON.parse(localStorage.getItem('portfolioData')) || [];
        portfolio.splice(index, 1);
        localStorage.setItem('portfolioData', JSON.stringify(portfolio));
        loadStocks();
      }
    }

    function loadStocks() {
  const table = document.getElementById('userStockTable');
  table.innerHTML = `<tr><th>Stock Name</th><th>Buy Price</th><th>Quantity</th><th>Status</th><th>Action</th></tr>`;

  let portfolio = JSON.parse(localStorage.getItem('portfolioData')) || [];
  portfolio.forEach((item, index) => {
    const row = table.insertRow();
    row.insertCell(0).textContent = item.stock;
    row.insertCell(1).textContent = item.price;
    row.insertCell(2).textContent = item.qty;
    row.insertCell(3).textContent = item.status;

    const deleteCell = row.insertCell(4);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteStock(index);
    deleteCell.appendChild(deleteBtn);
  });
}

    function togglePassword() {
  const passwordInput = document.getElementById("userPassword");
  const toggleBtn = passwordInput.nextElementSibling;
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleBtn.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    toggleBtn.textContent = "Show";
  }
}

function loginUser() {
  const email = document.getElementById('userEmail').value.trim();
  const password = document.getElementById('userPassword').value;
  const rememberMe = document.getElementById('rememberMe').checked;
  const loginBtn = document.getElementById('loginBtn');

  loginBtn.textContent = "Logging in...";

  if (!email || !email.includes("@") || !email.endsWith(".com")) {
    alert("⚠️ Please enter a valid email address (e.g., user@example.com).");
    loginBtn.textContent = "Login";
    return;
  }

  if (!password || password.length < 4) {
    alert("⚠️ Password must be at least 4 characters long.");
    loginBtn.textContent = "Login";
    return;
  }

  // Simulate backend check and response delay
  setTimeout(() => {
    if (rememberMe) {
      localStorage.setItem('portfolioEmail', email);
    } else {
      sessionStorage.setItem('portfolioEmail', email);
    }

    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('portfolioContent').style.display = 'block';
    document.getElementById('welcomeMsg').textContent = `Welcome, ${email}`;
    loadStocks();
    loginBtn.textContent = "Login";
  }, 1000);
}
function showCalculator(calculatorId) {
  const calculators = document.querySelectorAll('.calculator-section');
  calculators.forEach(cal => cal.style.display = 'none');
  document.getElementById(calculatorId).style.display = 'block';
}

function calculateEMI() {
  const principal = parseFloat(document.getElementById("loanAmount").value);
  const annualRate = parseFloat(document.getElementById("interestRate").value);
  const years = parseFloat(document.getElementById("tenure").value);
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
              (Math.pow(1 + monthlyRate, months) - 1);
  document.getElementById("emiResult").textContent = `Monthly EMI: ₹${emi.toFixed(2)}`;
}

function calculateSIP() {
  const amount = parseFloat(document.getElementById("sipAmount").value);
  const rate = parseFloat(document.getElementById("sipReturn").value) / 100 / 12;
  const months = parseFloat(document.getElementById("sipYears").value) * 12;
  const futureValue = amount * ((Math.pow(1 + rate, months) - 1) * (1 + rate)) / rate;
  document.getElementById("sipResult").textContent = `Future Value: ₹${futureValue.toFixed(2)}`;
}

function calculateLumpsum() {
  const principal = parseFloat(document.getElementById("lumpsumAmount").value);
  const rate = parseFloat(document.getElementById("lumpsumReturn").value) / 100;
  const years = parseFloat(document.getElementById("lumpsumYears").value);
  const amount = principal * Math.pow(1 + rate, years);
  document.getElementById("lumpsumResult").textContent = `Future Value: ₹${amount.toFixed(2)}`;
}

function calculateFD() {
  const principal = parseFloat(document.getElementById("fdPrincipal").value);
  const rate = parseFloat(document.getElementById("fdRate").value) / 100;
  const time = parseFloat(document.getElementById("fdTenure").value);
  const maturity = principal * Math.pow((1 + rate / 1), 1 * time);
  document.getElementById("fdResult").textContent = `Maturity Amount: ₹${maturity.toFixed(2)}`;
}
function toggleLiveMarket() {
    const section = document.getElementById("live-market");
    const dateHeading = document.getElementById("market-date");

    if (section.style.display === "none" || section.style.display === "") {
      const today = new Date();
      const formatted = today.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      dateHeading.textContent = "📅 Market Summary for " + formatted;
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  }