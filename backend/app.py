from flask import Flask, jsonify, request

app = Flask(__name__)

# Mock transactions
transactions = [
    {"id": 1, "title": "Coffee", "amount": 120},
    {"id": 2, "title": "Book", "amount": 450},
    {"id": 3, "title": "Groceries", "amount": 2000}
]

@app.route("/transactions", methods=["GET"])
def get_transactions():
    return jsonify(transactions)

@app.route("/advice", methods=["POST"])
def get_advice():
    data = request.json
    income = data.get("income", 10000)
    expense = data.get("expense", 7000)
    saving = income - expense
    return jsonify({"advice": f"Try to save ₹{saving} this month to improve your credit health."})

if __name__ == "__main__":
    app.run(debug=True)
