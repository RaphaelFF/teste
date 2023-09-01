document.addEventListener('DOMContentLoaded', function () {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const productCheckboxes = document.querySelectorAll('.product-checkbox');

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

        if (selectedProducts.length > 0) {
            const whatsappMessage = selectedProducts.map(product => {
                return `*${product.description}*\n${product.image}`;
            }).join('\n\n');

            const encodedMessage = encodeURIComponent(whatsappMessage);
            window.open(`https://wa.me/96984008141?text=${encodedMessage}`, '_blank');
        } else {
            alert('Selecione pelo menos um produto para adicionar ao carrinho.');
        }
    });
});
