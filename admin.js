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


//add category
document.getElementById('addCategoryForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const categoryName = document.getElementById('categoryName').value.trim();
  if (!categoryName) return alert('Category name is required!');

  // Check if category already exists
  const snapshot = await db.collection('categories').where('name', '==', categoryName).get();
  if (!snapshot.empty) return alert('Category already exists!');

  // Add category to Firestore
  await db.collection('categories').add({ name: categoryName });
  alert('Category added successfully!');
  loadCategories(); // Refresh the category dropdown
  document.getElementById('categoryName').value = ''; // Clear the input field
});


//add products 
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

    // Save product to Firestore
    await db.collection('products').add(product);
    alert('Product added successfully!');
    document.getElementById('addProductForm').reset(); // Clear the form
  };
  reader.readAsDataURL(productImage); // Read the image file
});

//load category to the 
async function loadCategories() {
  const categorySelect = document.getElementById('productCategory');
  categorySelect.innerHTML = '<option value="">Select Category</option>';

  const snapshot = await db.collection('categories').get();
  snapshot.forEach(doc => {
    const category = doc.data();
    const option = document.createElement('option');
    option.value = category.name;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}
