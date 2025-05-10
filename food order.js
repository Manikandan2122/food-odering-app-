
let order = [];

document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function() {
        const item = {
            id: this.getAttribute('data-id'),
            name: this.getAttribute('data-name'),
            price: parseFloat(this.getAttribute('data-price'))
        };
        order.push(item);
        updateOrderSummary();
    });
});

document.getElementById('checkout-btn').addEventListener('click', function() {
    if (order.length > 0) {
        fetch('/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(response => response.json())
        .then(data => {
            alert('Your total is: $' + data.total_price.toFixed(2));
            order = [];  // Clear the order
            updateOrderSummary();  // Update the UI
        });
    } else {
        alert('Your order is empty!');
    }
});

function updateOrderSummary() {
    const orderList = document.getElementById('order-list');
    const totalPriceElement = document.getElementById('total-price');
    
    orderList.innerHTML = '';  // Clear current order list
    let totalPrice = 0;

    order.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.name + ' - $' + item.price.toFixed(2);
        orderList.appendChild(listItem);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = 'Total: $' + totalPrice.toFixed(2);
}

