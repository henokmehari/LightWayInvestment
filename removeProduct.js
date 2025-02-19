

document.addEventListener('DOMContentLoaded', () => {
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const categoriesDiv = document.getElementById('categories');

  // Clear existing content
  categoriesDiv.innerHTML = '';

  // Display products by category
  categories.forEach((category, index) => {
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
//dropDown list page
// Function to populate the dropdown
function populateDropdown() {
    // Retrieve the JSON data from local storage
    const categoriesJSON = localStorage.getItem('categories');

    // Check if data exists
    if (!categoriesJSON) {
        console.error('No data found in local storage for key "categories".');
        return;
    }

    // Parse the JSON data
    const categories = JSON.parse(categoriesJSON);

    // Get the dropdown element
    const dropdown = document.getElementById('category-dropdown');

    // Clear any existing options
    dropdown.innerHTML = '<option value="" disabled selected>Select a products</option>';

    // Populate the dropdown with the "name" values
    categories.forEach((category, index) => {
        const option = document.createElement('option');
              option.innerHTML = `<h5 class="options">${category.name}</h5>`;
              dropdown.appendChild(option); // Add the option to the dropdown
    });

    // Add an event listener to handle selection
    
}

// Call the function to populate the dropdown
populateDropdown();


