// ==========================
// LOAD PRODUCTS (Home Page)
// ==========================
if (document.getElementById("products")) {
  fetch("http://localhost:5000/api/products")
    .then(res => res.json())
    .then(data => {
      if (!data.success) return;

      let output = "";

      data.products.forEach(p => {
        output += `
          <div class="card">
            <img src="https://via.placeholder.com/200" />
            <h3>${p.name}</h3>
            <p>₹${p.price}/month</p>
            <p>${p.category}</p>

            <button onclick="goOrder('${p._id}', ${p.price})">
              Rent Now
            </button>
          </div>
        `;
      });

      document.getElementById("products").innerHTML = output;
    })
    .catch(err => console.log(err));
}

// ==========================
// GO TO ORDER PAGE
// ==========================
function goOrder(productId, price) {
  localStorage.setItem("productId", productId);
  localStorage.setItem("price", price);
  window.location = "order.html";
}

// ==========================
// LOGIN
// ==========================
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem("userId", data.user._id);
        alert("Login Successful ✅");
        window.location = "index.html";
      } else {
        alert(data.message);
      }
    })
    .catch(err => {
      console.log(err);
      alert("Server error ❌");
    });
}

// ==========================
// REGISTER
// ==========================
function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  })
    .then(res => res.json())
    .then(data => {
      alert("Registered Successfully ✅");
      window.location = "login.html";
    })
    .catch(err => {
      console.log(err);
      alert("Registration failed ❌");
    });
}

// ==========================
// PLACE ORDER
// ==========================
function order() {
  const userId = localStorage.getItem("userId");
  const productId = localStorage.getItem("productId");
  const price = localStorage.getItem("price");
  const duration = document.getElementById("duration").value;

  if (!userId) {
    alert("Please login first ❌");
    return;
  }

  const totalPrice = price * duration;

  fetch("http://localhost:5000/api/orders/place", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId,
      productId,
      duration,
      totalPrice,
      deliveryDate: new Date().toISOString().split("T")[0]
    })
  })
    .then(res => res.text())
    .then(data => {
      alert("Order Placed ✅");
      window.location = "index.html";
    })
    .catch(err => {
      console.log(err);
      alert("Order failed ❌");
    });
}


// ==========================
// ADD PRODUCT (ADMIN)
// ==========================
function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("category").value;

  fetch("http://localhost:5000/api/products/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, price, category })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Product Added ✅");
        window.location = "index.html";
      } else {
        alert("Failed ❌");
      }
    })
    .catch(err => {
      console.log(err);
      alert("Error ❌");
    });
}