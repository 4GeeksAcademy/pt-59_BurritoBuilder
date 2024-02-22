# routes.py

"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Ingredient, OrderIngredient, Order 
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

#new
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

#new
#app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this "super secret" with something else!
#jwt = JWTManager(app)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#login
@api.route('/token', methods=['POST'])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    print (username)
    print(password)
    # Query your database for username and password
    user = User.query.filter_by(email=username, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id }) ,200

#create user
@api.route('/signup', methods=['POST'])
def createUser():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    is_active = request.json.get("is_active", None)
    user = User.query.filter_by(email=username).first()
    if user != None:
        return jsonify({"msg": "username exists"}), 401
    
    user = User(email=username, password=password, is_active=is_active)
    db.session.add(user)
    db.session.commit()
    
    response_body = {
        "msg": "User successfully added "
    }

    return jsonify(response_body), 200

#private route
@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()    
    user = User.query.get(current_user_id)

    if user == None:
        response_body = {
            "msg": "Please login to continue"
        }
        return jsonify(response_body)
    
    return jsonify({"id": user.id, "username": user.email }), 200

# forgot password

# routes for the burger builder webapp tool, Ingredient, OrderIngredient, Order
@api.route('/ingredients', methods=['GET'])
def get_ingredients():
    ingredients = Ingredient.query.all()
    ingredient_names = [ingredient.name for ingredient in ingredients]
    return jsonify(ingredient_names)

@api.route('/add-ingredient', methods=['POST'])
def add_ingredient_to_order():
    try:
        data = request.get_json()
        name = data.get('name')
        price = data.get('price')
        is_selected = data.get('is_selected')
        ingredient_img = data.get('ingredientImg')

        # Create a new Ingredient instance
        new_ingredient = Ingredient(name=name, price=price)

        # Add the new ingredient to the database session
        db.session.add(new_ingredient)
        db.session.commit()

        # Here you can perform any necessary logic
        # For demonstration purposes, let's assume we just return a success message
        return jsonify({"message": "Ingredient added to order successfully"}), 200
    except Exception as e:
        # Rollback the transaction if an error occurs
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    ingredients = data.get('ingredients', [])
    
    order = Order()
    for ingredient_data in ingredients:
        ingredient_id = ingredient_data['id']
        quantity = ingredient_data['quantity']
        ingredient = Ingredient.query.get(ingredient_id)
        if ingredient:
            order_ingredient = OrderIngredient(ingredient=ingredient, quantity=quantity)
            order.order_ingredients.append(order_ingredient)
    
    order.calculate_total_price()
    db.session.add(order)
    db.session.commit()
    
    return jsonify(order.serialize()), 201

@api.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404
    return jsonify(order.serialize())
