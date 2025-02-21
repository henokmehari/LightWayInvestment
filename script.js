

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase configuration (replace with your own)
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load products and categories when the page loads
document.addEventListener('DOMContentLoaded', async () => {
  const categoriesDiv = document.getElementById('categories');

  // Clear existing content
  categoriesDiv.innerHTML = '';

  try {
    // Fetch categories from Firestore
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    const categories = categoriesSnapshot.docs.map(doc => doc.data());

    // Fetch products from Firestore
    const productsSnapshot = await getDocs(collection(db, 'products'));
    const products = productsSnapshot.docs.map(doc => doc.data());

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
  } catch (error) {
    console.error('Error fetching data: ', error);
    alert('Failed to load products. Please try again later.');
  }
});

// Populate the dropdown with categories
async function populateDropdown() {
  const dropdown = document.getElementById('category-dropdown');
  dropdown.innerHTML = '<option value="" disabled selected>Select a category</option>';

  try {
    const snapshot = await getDocs(collection(db, 'categories'));
    snapshot.forEach(doc => {
      const category = doc.data();
      const option = document.createElement('option');
      option.value = category.name;
      option.textContent = category.name;
      dropdown.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching categories: ', error);
  }
}

// Load categories when the page loads
document.addEventListener('DOMContentLoaded', () => {
  populateDropdown();
});
document.getElementById('category-dropdown').addEventListener('change', async (e) => {
  const selectedCategory = e.target.value;
  const categoriesDiv = document.getElementById('categories');
  categoriesDiv.innerHTML = ''; // Clear existing content

  if (!selectedCategory) return;

  try {
    const snapshot = await getDocs(collection(db, 'products'));
    snapshot.forEach(doc => {
      const product = doc.data();
      if (product.category === selectedCategory) {
        const productDiv = document.createElement('div');
        const productTitle = document.createElement('h1');
              productsTitle.innerHTML = ` <h3 class="option">${product.category}</h3>`;
        productDiv.classList.add('category');
        producstDiv.classList.add('product');
        productsDiv.innerHTML = `
        <div class="option">
          <img src="${product.image}" alt="${product.name}" width="100">
          <h4>${product.name}</h4>
          <p>Price: ${product.price}</p>
          <p>${product.description}</p>
          <a href="${product.link}" class="buyBtn" target='_blank'>Buy</a>
        </div>
        `;
        categoriesDiv.appendChild(productTitles);
        categoriesDiv.appendChild(productDiv);
      }
    });
  } catch (error) {
    console.error('Error fetching products: ', error);
  }
});
