document.addEventListener('DOMContentLoaded', function () {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const productCheckboxes = document.querySelectorAll('.product-checkbox');

    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (storedPhoneNumber) {
        phoneNumberInput.value = storedPhoneNumber;
    }

    addToCartBtn.addEventListener('click', function () {
        const selectedProducts = [];

        productCheckboxes.forEach(function (checkbox, index) {
            if (checkbox.checked) {
                const productCard = checkbox.closest('.product-card');
                const productImage = productCard.querySelector('img').src;
                selectedProducts.push({
                    description: `Produto ${index + 1}`,
                    image: productImage
                });
            }
        });

        const phoneNumber = phoneNumberInput.value;
        if (selectedProducts.length > 0 && phoneNumber) {
            const whatsappMessage = selectedProducts.map(product => {
                return `*${product.description}*\n${product.image}`;
            }).join('\n\n');

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
            window.open(whatsappLink, '_blank');

            localStorage.setItem('phoneNumber', phoneNumber);
        } else {
            alert('Preencha seu número de telefone e selecione pelo menos um produto.');
        }
    });
});