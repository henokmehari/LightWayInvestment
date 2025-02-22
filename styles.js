let currentIndex = 0;
const items = document.querySelectorAll('.listOfItem img, .listOfItem video');
const totalItems = items.length;

function showItem(index) {
  items.forEach((item, i) => {
    item.style.opacity = i === index ? 1 : 0;
  });
}

document.querySelector('.next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalItems;
  showItem(currentIndex);
});

document.querySelector('.prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  showItem(currentIndex);
});

// Auto-play the slideshow
setInterval(() => {
  currentIndex = (currentIndex + 1) % totalItems;
  showItem(currentIndex);
}, 4000); // Adjust timing as needed
