import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration
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

// DOM elements
const categoriesList = document.getElementById('categories-list');
const productsList = document.getElementById('products-list');
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const editName = document.getElementById('edit-name');
const editPrice = document.getElementById('edit-price');
const editDescription = document.getElementById('edit-description');
const editLink = document.getElementById('edit-link');
const cancelEditButton = document.getElementById('cancel-edit');

let currentEditId = null;
let currentEditType = null; // 'category' or 'product'

// Load categories
async function loadCategories() {
  const snapshot = await getDocs(collection(db, 'categories'));
  categoriesList.innerHTML = ''; // Clear existing list
  snapshot.forEach(doc => {
    const category = doc.data();
    const li = document.createElement('li');
    li.innerHTML = `
      ${category.name}
      <button onclick="editCategory('${doc.id}', '${category.name}')">Edit</button>
      <button onclick="deleteCategory('${doc.id}')">Delete</button>
    `;
    categoriesList.appendChild(li);
  });
}

// Load products
async function loadProducts() {
  const snapshot = await getDocs(collection(db, 'products'));
  productsList.innerHTML = ''; // Clear existing list
  snapshot.forEach(doc => {
    const product = doc.data();
    const li = document.createElement('li');
    li.innerHTML = `
      ${product.name} (${product.category})
      <button onclick="editProduct('${doc.id}', ${JSON.stringify(product)})">Edit</button>
      <button onclick="deleteProduct('${doc.id}')">Delete</button>
    `;
    productsList.appendChild(li);
  });
}

// Load data when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadCategories();
  loadProducts();
});

// Delete a category
async function deleteCategory(categoryId) {
  if (!confirm('Are you sure you want to delete this category and all its products?')) return;

  // Delete the category
  await deleteDoc(doc(db, 'categories', categoryId));

  // Delete all products under this category
  const productsSnapshot = await getDocs(collection(db, 'products'));
  productsSnapshot.forEach(async productDoc => {
    if (productDoc.data().category === categoryId) {
      await deleteDoc(doc(db, 'products', productDoc.id));
    }
  });

  alert('Category and its products deleted successfully!');
  loadCategories();
  loadProducts();
}

// Delete a product
async function deleteProduct(productId) {
  if (!confirm('Are you sure you want to delete this product?')) return;
  await deleteDoc(doc(db, 'products', productId));
  alert('Product deleted successfully!');
  loadProducts();
}

// Open edit modal for a category
function editCategory(categoryId, categoryName) {
  currentEditId = categoryId;
  currentEditType = 'category';
  editName.value = categoryName;
  editPrice.value = '';
  editDescription.value = '';
  editLink.value = '';
  editModal.style.display = 'block';
}

// Open edit modal for a product
function editProduct(productId, product) {
  currentEditId = productId;
  currentEditType = 'product';
  editName.value = product.name;
  editPrice.value = product.price;
  editDescription.value = product.description;
  editLink.value = product.link;
  editModal.style.display = 'block';
}

// Save changes
editForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (currentEditType === 'category') {
    await updateDoc(doc(db, 'categories', currentEditId), { name: editName.value });
  } else if (currentEditType === 'product') {
    await updateDoc(doc(db, 'products', currentEditId), {
      name: editName.value,
      price: editPrice.value,
      description: editDescription.value,
      link: editLink.value,
    });
  }
  editModal.style.display = 'none';
  alert('Changes saved successfully!');
  loadCategories();
  loadProducts();
});

// Close modal
cancelEditButton.addEventListener('click', () => {
  editModal.style.display = 'none';
});

// Expose functions to the global scope for inline event handlers
window.editCategory = editCategory;
window.deleteCategory = deleteCategory;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;