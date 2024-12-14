document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".buy-button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const productName = button.dataset.name;
            const productPrice = button.dataset.price;
            alert(`Ви вибрали "${productName}" за ${productPrice} грн. Наш менеджер звяжеться з вами для оформления заказу!`);
        });
    });
});