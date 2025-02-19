window.onload = function () {
    const categories = document.querySelectorAll(".category");
    const selects = document.querySelectorAll('select');

    selects.forEach((selectElement) => {
        selectElement.addEventListener('change', (event) => {
            const selectedIndex = event.target.selectedIndex;

            // Apply the transform to each category element
            categories.forEach((category, index) => {
                category.style.transform = `translateX(${-100 * selectedIndex +100}vw)`;
 
            });
        });
    });
};