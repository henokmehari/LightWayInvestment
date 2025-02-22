// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase configuration (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyAqgQTTS7UDdKNuRSYrfZ_bA7SyESE7IW0",
  authDomain: "mystore-bdff6.firebaseapp.com",
  projectId: "mystore-bdff6",
  storageBucket: "mystore-bdff6.appspot.com",
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

// Add Product Form
document.getElementById('addProductForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const productCategory = document.getElementById('productCategory').value;
  const productName = document.getElementById('productName').value.trim();
  const productPrice = document.getElementById('productPrice').value.trim();
  const productDescription = document.getElementById('productDescription').value.trim();
  const productLink = document.getElementById('productLink').value.trim();
  const productImage1 = document.getElementById('productImage1').files[0];
  const productImage2 = document.getElementById('productImage2').files[0];
  const productImage3 = document.getElementById('productImage3').files[0];
  const productVideo = document.getElementById('productVideo').files[0];

  if (!productCategory || !productName || !productPrice || !productDescription || !productLink || !productImage1 || !productImage2 || !productImage3 || !productVideo) {
    return alert('All fields are required!');
  }

  // Function to read a file and return a Base64 data URL
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  try {
    // Read all files as Base64
    const [image1Base64, image2Base64, image3Base64, videoBase64] = await Promise.all([
      readFileAsDataURL(productImage1),
      readFileAsDataURL(productImage2),
      readFileAsDataURL(productImage3),
      readFileAsDataURL(productVideo),
    ]);

    // Create product object
    const product = {
      category: productCategory,
      name: productName,
      price: productPrice,
      description: productDescription,
      link: productLink,
      image1: image1Base64,
      image2: image2Base64,
      image3: image3Base64,
      video: videoBase64,
    };

    // Add product to Firestore
    await addDoc(collection(db, 'products'), product);
    alert('Product added successfully!');
    document.getElementById('addProductForm').reset(); // Clear the form
  } catch (error) {
    console.error('Error adding product: ', error);
    alert('Failed to add product!');
  }
});

// Load Categories
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
