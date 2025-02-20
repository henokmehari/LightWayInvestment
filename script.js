const firebaseConfig = {
  apiKey: "AIzaSyAqgQTTS7UDdKNuRSYrfZ_bA7SyESE7IW0",
  authDomain: "mystore-bdff6.firebaseapp.com",
  projectId: "mystore-bdff6",
  storageBucket: "mystore-bdff6.firebasestorage.app",
  messagingSenderId: "353368676223",
  appId: "1:353368676223:web:cf998ead945c55f7cbac4a",
  measurementId: "G-K0L0T8E2TB"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//Display product
document.addEventListener('DOMContentLoaded', async () => {
  const categoriesDiv = document.getElementById('categories');
  categoriesDiv.innerHTML = ''; // Clear existing content

  // Fetch categories and products from Firestore
  const categoriesSnapshot = await db.collection('categories').get();
  const productsSnapshot = await db.collection('products').get();

  const categories = [];
  const products = [];

  categoriesSnapshot.forEach(doc => categories.push(doc.data()));
  productsSnapshot.forEach(doc => products.push(doc.data()));

  // Display products by category
  categories.forEach(category => {
    const categoryProducts = products.filter(product => product.category === category.name);
    if (categoryProducts.length > 0) {
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('category');
      categoryDiv.innerHTML = `<h3 class="option">${category.name}</h3>`;

      categoryProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
          <img src="${product.image}" alt="${product.name}" width="100">
          <h4>${product.name}</h4>
          <p>Price: ${product.price}</p>
          <p>${product.description}</p>
          <a href="${product.link}" class="buyBtn" target='_blank'>Buy</a>
        `;
        categoryDiv.appendChild(productDiv);
      });

      categoriesDiv.appendChild(categoryDiv);
    }
  });
});

//load to the product dropdown page//
async function populateDropdown() {
  const dropdown = document.getElementById('category-dropdown');
  dropdown.innerHTML = '<option value="" disabled selected>Select a products</option>';

  const snapshot = await db.collection('categories').get();
  snapshot.forEach(doc => {
    const category = doc.data();
    const option = document.createElement('option');
    option.innerHTML = `<h5 class="options">${category.name}</h5>`;
    dropdown.appendChild(option);
  });
}

populateDropdown();
