from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Sample menu (In a real app, this would come from a database)
menu_items = [
    {"id": 1, "name": "Burger", "price": 5.00},
    {"id": 2, "name": "Pizza", "price": 8.00},
    {"id": 3, "name": "Pasta", "price": 6.50},
    {"id": 4, "name": "Salad", "price": 4.00}
]

# Route to display the menu
@app.route('/')
def index():
    return render_template('index.html', menu_items=menu_items)

# Route to handle the order
@app.route('/order', methods=['POST'])
def order():
    order_data = request.json
    total_price = sum(item['price'] for item in order_data)
    return jsonify({"total_price": total_price})

if __name__ == '__main__':
    app.run(debug=True)
