# routes.py

"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Ingredient
# BurgertoIngredient, Burger 
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

# routes for the burger builder webapp tool, IngredieBrugertoIngredientpi.route('/ingredients', methods=['GET'])
@api.route("/ingredients", methods=["GET"])
def get_ingredients():
    ingredients = Ingredient.query.all()
    serialized_ingredients = []
    for ingredient in ingredients:
        serialized_ingredients.append(ingredient.serialize())    
    return jsonify(serialized_ingredients)

@api.route('/add-ingredient', methods=['POST'])
def add_ingredient_to_burger():
    try:
        data = request.get_json()
        name = data.get('name')
        price = data.get('price') 

        # Create a new Ingredient 
        new_ingredient = Ingredient(name=name, price=price)

        # Add the new ingredient to the database 
        db.session.add(new_ingredient)
        db.session.commit()

        return jsonify({"message": "Ingredient added to burger successfully", "name": name, "price": price}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api.route('/remove-ingredient/<string:ingredient_name>', methods=['DELETE'])
def remove_ingredient_from_burger(ingredient_name):
    try:
        # Retrieve the ingredient from the database based on the provided name
        ingredient = Ingredient.query.filter_by(name=ingredient_name).first()

        if ingredient:
            # If the ingredient exists, remove it from the database
            db.session.delete(ingredient)
            db.session.commit()
            return jsonify({"message": f"Ingredient '{ingredient_name}' removed from burger successfully"}), 200
        else:
            return jsonify({"error": f"Ingredient '{ingredient_name}' not found"}), 404
    except Exception as e:
        # Handle any errors that may occur
        return jsonify({"error": str(e)}), 500




@api.route('/burgers', methods=['POST'])
def create_burger():
    data = request.get_json()
    ingredients = data.get('ingredients', [])
    user_id = get_jwt_identity()

    burger = Burger(user_id=user_id)
    db.session.add(burger)
    db.session.commit()
# list of burg.s user has
    burgers=Burger.query.filter_by(user_id=user_id)
    # gets last item from line 137.
    burger=burgers[len(burgers)-1]


    for ingredient_data in ingredients:
        ingredient_id = ingredient_data['id']
        quantity = ingredient_data['quantity']
        ingredient = Ingredient.query.get(ingredient_id)
        if ingredient:
            burger_to_ingredient= BurgertoIngredient(
                burger_id=burger.id, 
                ingredient_id=ingredient.id, 
                quantity=quantity
                )
            db.session.add(burger_to_ingredient)
            db.session.commit()
            
    
    burger.calculate_total_price()
    # db.session.commit() <--redundant
    
    return jsonify(burger.serialize()), 201

@api.route('/burgers/<int:burger_id>', methods=['GET'])
def get_burger(burger_id):
    burger = Burger.query.get(burger_id)
    if not burger:
        return jsonify({'error': 'Burger not found'}), 404
    return jsonify(burger.serialize()) 
