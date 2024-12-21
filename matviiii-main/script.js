document.addEventListener('DOMContentLoaded', function() {
    // Дані про товари
    const productDescriptions = {
        'Годзила і черепашка ніндзя': 'Унікальна 3D модель, що поєднує двох легендарних персонажів. Висота: 15 см. Матеріал: якісний пластик.',
        'Robot': 'Футуристичний робот з рухомими частинами. Висота: 20 см. Матеріал: ABS пластик.',
        'Фігури': 'Набір геометричних фігур з цікавим дизайном. Розмір: Від 10 до 20см. Матеріал: PLA.',
        'Змія': 'Реалістична модель змії з детальною текстурою. Довжина: 30 см. Матеріал: еко-пластик.',
        'Капібара': 'Мила фігурка капібари в натуральну величину. Розмір: 15x9 см. Матеріал: біорозкладний пластик.',
        'Жіноча фігура': 'Елегантна жіноча статуетка в сучасному стилі. Висота: 30 см. Матеріал: premium пластик.',
        'Чепашка': 'Декоративна модель черепашки з детальним панциром. Розмір: 10x8 см. Матеріал: PLA.',
        'Драконі яйця': 'Набір декоративних яєць з драконячою текстурою. Розмір: 10 см кожне. Матеріал: композитний пластик.',
        'Динозаври': 'Декоративні моделі динозаври. Розмір: 10x7 см. Матеріал: premium пластик'
    };

    // Кошик
    let cart = [];
    const modal = document.getElementById('cartModal');
    const cartIcon = document.getElementById('cartIcon');
    const closeBtn = document.querySelector('.close');
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const cartCountElement = document.querySelector('.cart-count');

    // Відкриття/закриття модального вікна
    cartIcon.onclick = function() {
        modal.style.display = "block";
        updateCartDisplay();
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Додавання товару в кошик
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const title = card.querySelector('h3').textContent;
            const price = parseInt(card.querySelector('.price').textContent.match(/\d+/));
            
            const item = {
                title: title,
                price: price
            };
            
            cart.push(item);
            updateCartCount();
            showNotification('Товар додано до кошика!');
        });
    });

    // Оновлення відображення кошика
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.title}</span>
                <span>${item.price} грн.</span>
                <button onclick="removeFromCart(${index})">Видалити</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });

        totalPriceElement.textContent = total;
    }

    // Видалення товару з кошика
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartDisplay();
        updateCartCount();
    }

    // Оновлення лічильника товарів
    function updateCartCount() {
        cartCountElement.textContent = cart.length;
    }

    // Повідомлення про додавання товару
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    // Оформлення замовлення
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Ваш кошик порожній!');
            return;
        }
        alert('Дякуємо за замовлення! З вами зв\'яжеться наш менеджер.');
        cart = [];
        updateCartDisplay();
        updateCartCount();
        modal.style.display = "none";
    });

    // Додаємо обробники подій для кнопок
    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('.description');
            
            description.textContent = productDescriptions[title];
            
            if (description.style.display === 'none') {
                description.style.display = 'block';
                this.textContent = 'Приховати';
            } else {
                description.style.display = 'none';
                this.textContent = 'Деталі';
            }
        });
    });
});
