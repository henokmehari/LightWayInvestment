// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";


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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add Category Form
document.getElementById('addCategoryForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const categoryName = document.getElementById('categoryName').value.trim();
  if (!categoryName) return alert('Category name is required!');

  try {
    // Add category to Firestore
    await addDoc(collection(db, 'categories'), { name: categoryName });
    alert('Category added successfully!');
    document.getElementById('categoryName').value = ''; // Clear the input field
    loadCategories(); // Refresh the category dropdown
  } catch (error) {
    console.error('Error adding category: ', error);
    alert('Failed to add category!');
  }
});
//add product
document.getElementById('addProductForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const productCategory = document.getElementById('productCategory').value;
  const productName = document.getElementById('productName').value.trim();
  const productPrice = document.getElementById('productPrice').value.trim();
  const productDescription = document.getElementById('productDescription').value.trim();
  const productLink = document.getElementById('productLink').value.trim();
  const productImage = document.getElementById('productImage').files[0];

  if (!productCategory || !productName || !productPrice || !productDescription || !productImage || !productLink) {
    return alert('All fields are required!');
  }

  // Convert image to Base64
  const reader = new FileReader();
  reader.onload = async function (event) {
    const productImageBase64 = event.target.result;

    // Create product object
    const product = {
      category: productCategory,
      name: productName,
      price: productPrice,
      description: productDescription,
      link: productLink,
      image: productImageBase64,
    };

    try {
      // Add product to Firestore
      await addDoc(collection(db, 'products'), product);
      alert('Product added successfully!');
      document.getElementById('addProductForm').reset(); // Clear the form
    } catch (error) {
      console.error('Error adding product: ', error);
      alert('Failed to add product!');
    }
  };
  reader.readAsDataURL(productImage); // Read the image file
});

//loading categories
async function loadCategories() {
  const categorySelect = document.getElementById('productCategory');
  categorySelect.innerHTML = '<option value="">Select Category</option>';

  try {
    // Fetch categories from Firestore
    const querySnapshot = await getDocs(collection(db, 'categories'));
    querySnapshot.forEach((doc) => {
      const category = doc.data();
      const option = document.createElement('option');
      option.value = category.name;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading categories: ', error);
  }
}

// Load categories when the page loads
loadCategories();
