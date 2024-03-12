# routes.py

"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Burger, Ingredient
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

import os
import requests
import stripe
#new
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

stripe.api_key = "STRIPE_SECRET"


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
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    print (email)
    print(password)
    # Query your database for username and password
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad email or password"}), 401
    
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
# this will be used to populate your "create a burger" component with ingrdients
# Stripe Payment PRocessing
@api.route("/process_payment", methods=["POST"])
def process_payment():
    # Retrieve payment details from request
    data = request.json
    burgers = data.get("burgers")
    total_price = data.get("total_price")
    
    try:
        # Create a charge using Stripe API
        charge = stripe.Charge.create(
            total_price=total_price,
            currency="usd",
            source="STRIPE_SECRET",
            description="Payment for order"
        )
        
        # Payment was successful
        return jsonify({"message": "Payment successful", "charge": charge}), 200
    except stripe.error.StripeError as e:
        # Payment failed
        return jsonify({"error": str(e)}), 500

# Kaci, Valerie -- use for stripe webhook < -- use to determine if customer has paid
@api.route('/webhook', methods=['POST'])
def webhook():
    event = None
    payload = request.data
    endpoint_secret= os.getenv("STRIPE_SECRET")
    sig_header = request.environ.get['HTTP_STRIPE_SIGNATURE']

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        print('INVALID PAYLOAD')
        return {}, 400
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        print('INVALID SIGNATURE')
        return {}, 400

    # Handle the event
    print('Unhandled event type {}'.format(event['type']))

    return jsonify(success=True)
# openweathermap api
@api.route('/weather', methods=['GET'])
def get_weather():
    city = 'Hamburg'
    country_code = 'DE'
    api_key = '9cf29c08ac230ef0b12c893bc75755fa'
    url = f'http://api.openweathermap.org/data/2.5/weather?q={city},{country_code}&appid={api_key}&units=metric'
    
    response = requests.get(url)  # Corrected typo: requests.get instead of request.get
    data = response.json()

    return jsonify(data)



# post a burger route ***works <--2/26/24
@api.route("/burgers", methods=["POST"])
@jwt_required(protected)
def create_burger():
    user_id = get_jwt_identity()
    burger = Burger(user_id=user_id)
    db.session.add(burger)
    db.session.commit()
# list of burg.s user has
    db.session.refresh(burger)
    return jsonify(burger.serialize())

# delete a burger
@api.route('/burgers/<int:burger_id>', methods=['DELETE'])
def delete_burger(burger_id):
    try:
        # Find the burger with the given burger_id
        burger = Burger.query.get(burger_id)
        if burger:
            # Delete the burger
            db.session.delete(burger)
            # Commit changes to the database
            db.session.commit()
            return jsonify({'message': f'Burger with ID {burger_id} deleted successfully'}), 200
        else:
            return jsonify({'error': f'Burger with ID {burger_id} not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ***use for favorites ***works <--2/28/24
@api.route("/burgers/reorder/<int:burger_id>", methods=["POST"])
@jwt_required(protected)
def reorder_burger(burger_id):
    user_id = get_jwt_identity()
    old_burger = Burger.query.get(burger_id)
    burger = Burger(user_id=user_id, ingredients = old_burger.ingredients )
    db.session.add(burger)
    db.session.commit()
# list of burg.s user has
    db.session.refresh(burger)
    return jsonify(burger.serialize())
#send id of the burger you want to reorder 
#do query of burgers using id of the burger
#create a new burger with all of the properties of the burger you found

#get all burgers ***works
@api.route("/burgers", methods=["GET"])
def get_all_burger():
    burgers = Burger.query.all()
    return jsonify(
        burgers=[burger.serialize() for burger in burgers])

# get a burger by using id ***works
@api.route('/burgers/<int:burger_id>', methods=['GET'])
def get_burger(burger_id):
    burger = Burger.query.get(burger_id)
    if not burger:
        return jsonify({'error': 'Burger not found'}), 404
    return jsonify(burger.serialize())

# get all ingredients  ***works
@api.route("/ingredients", methods=["GET"])
def get_ingredients():
    ingredients = Ingredient.query.all()
    serialized_ingredients = []
    for ingredient in ingredients:
        serialized_ingredients.append(ingredient.serialize())    
    return jsonify(serialized_ingredients)

#get ingredient by using id ***works
@api.route("/ingredients/<int:ingredient_id>", methods=["GET"])
def get_ingredient(ingredient_id):
    ingredient = Ingredient.query.get(ingredient_id)
    if not ingredient:
        return jsonify({'error': 'Burger not found'}), 404
    return jsonify(ingredient.serialize())

#get ingredients of a given burger using id ***works <-- use this for burger builder previewer
@api.route("/burgers/<int:burger_id>/ingredients", methods=["GET"])
def get_burger_ingredients(burger_id):
    burger = Burger.query.get(burger_id) 
    if not burger:
        return jsonify({"error": "Burger not found"}), 404
    ingredients = burger.ingredients
    serialized_ingredients = [ingredient.serialize() for ingredient in ingredients] 
    return jsonify(serialized_ingredients)

# put changes in burger to burgers(edit burgers route) <-- ***works
@api.route("/burgers/<int:burger_id>", methods=["PUT"])
def update_burger(burger_id):
    data = request.get_json()
    burger = Burger.query.get(burger_id)
    if not burger:
        return jsonify({"error": "Burger not found"}), 404
    ingredient = Ingredient.query.get(data["id"])
    if not ingredient:
        return jsonify({"error": "Ingredient not found"}), 404
    # to update the ingredients list:
    if burger.ingredients is None:
        burger.ingredients=[]
    if ingredient in burger.ingredients:
        burger.ingredients.remove(ingredient)
        db.session.commit()
        db.session.refresh(burger)
        return jsonify({"message": "Ingredient successfully removed", "burger":burger.serialize()}), 200
    burger.ingredients.append(ingredient)
    db.session.commit()
    db.session.refresh(burger)
    return jsonify({"message": "Ingredient successfully added", "burger":burger.serialize()}), 200


#get specific ingredient of a specific burger
@api.route("/burgers/<int:burger_id>/ingredients/<int:ingredient_id>", methods=["GET"])
def get_burger_ingredient(burger_id, ingredient_id):
    burger = Burger.query.get(burger_id) 
    if not burger:
        return jsonify({"error": "Burger not found"}), 404
    ingredient = Ingredient.query.get(ingredient_id)
    if not ingredient:
        return jsonify({"error": "Ingredient not found"}), 404
    if ingredient not in burger.ingredients:
        return jsonify({"error": "Ingredient not found in this burger"}), 404
    serialized_ingredient = ingredient.serialize()  
    return jsonify(serialized_ingredient)

#put ingredient to ingredients array of a specific burger
@api.route("/burgers/<int:burger_id>/ingredients/<int:ingredient_id>", methods=["PUT"])
def add_ingredient_to_burger(burger_id, ingredient_id):
    burger = Burger.query.get(burger_id)
    if not burger:
        return jsonify({"error": "Burger not found"}), 404
    data = request.get_json()
    ingredient_id = data.get('ingredient_id')
    if ingredient_id not in burger.ingredients:
        burger.ingredients.append(ingredient_id)
        db.session.commit()
        return jsonify({"message": "Ingredient added successfully"}), 200
    else:
        return jsonify({"error": "Ingredient already exists in burger"}), 400 

# Work this delete Define a route to clear all ingredients from a specific burger
@api.route('/burgers/<int:burger_id>/ingredients', methods=['DELETE'])
def clear_burger_ingredients(burger_id):
    try:
        # Find the burger with the given burger_id
        burger = Burger.query.get(burger_id)
        if burger:
            # Clear the ingredients associated with the burger
            burger.ingredients.clear()
            # Commit changes to the database
            db.session.commit()
            return jsonify({'message': f'Ingredients cleared from burger with ID {burger_id}'}), 200
        else:
            return jsonify({'error': f'Burger with ID {burger_id} not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# get shoppingCart (Burgers)
@api.route('/api/shopping-cart/<int:user_id>/burgers', methods=['GET'])
@jwt_required()
def get_shopping_cart_burgers(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    
    shopping_cart_burgers = user.shopping_cart
    return jsonify([burger.serialize() for burger in shopping_cart_burgers])

# post a burger to shopping cart
@api.route('/api/shopping-cart/<int:user_id>/burgers', methods=['POST'])
@jwt_required()
def add_burger_to_shopping_cart(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    
    data = request.json
    burger_id = data.get('burger_id')
    if burger_id is None:
        return jsonify({'error': 'Burger ID not provided'}), 400
    
    burger = Burger.query.get(burger_id)
    if burger is None:
        return jsonify({'error': 'Burger not found'}), 404
    
    shopping_cart_item = ShoppingCart(user_id=user.id, burger_id=burger.id)
    db.session.add(shopping_cart_item)
    db.session.commit()
    
    return jsonify({'message': 'Burger added to shopping cart successfully'})

# Get favorite burgers
@api.route('/api/favorite-burgers/<int:user_id>', methods=['GET'])
def get_favorite_burgers(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    
    favorite_burgers = user.favorite_burgers
    return jsonify([burger.serialize() for burger in favorite_burgers])

@api.route('/api/favorite-burgers/<int:user_id>', methods=['POST'])
def add_burger_to_favorite_burgers(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    
    data = request.json
    burger_id = data.get('burger_id')
    if burger_id is None:
        return jsonify({'error': 'Burger ID not provided'}), 400
    
    burger = Burger.query.get(burger_id)
    if burger is None:
        return jsonify({'error': 'Burger not found'}), 404
    
    favorite_burger = FavoriteBurger(user_id=user.id, burger_id=burger.id)
    db.session.add(favorite_burger)
    db.session.commit()
    
    return jsonify({'message': 'Burger added to favorite burgers successfully'})



# #delete ingredient --> nope
# @api.route("/burgers/<int:burger_id>/remove_ingredient", methods=["PUT"])
# def remove_ingredient_from_burger(burger_id):
#     burger = Burger.query.get(burger_id)
#     if not burger:
#         return jsonify({"error": "Burger not found"}), 404
    
#     data = request.get_json()
#     ingredient_id = data.get('ingredient_id')
#     ingredient = Ingredient.query.get(ingredient_id)
#     if not ingredient:
#         return jsonify({"error": "Ingredient not found"}), 404

#     burger.remove_ingredient(ingredient)
    
#     db.session.commit()
#     return jsonify({"message": "Ingredient removed from burger successfully"}), 200






# Route for adding an ingredient to a burger
# @api.route("/burgers/<int:burger_id>/add_ingredient", methods=["PUT"])
# def add_ingredient_to_burger(burger_id):
#     burger = Burger.query.get(burger_id)
#     if not burger:
#         return jsonify({"error": "Burger not found"}), 404
    
#     data = request.get_json()
#     ingredient_id = data.get('ingredient_id')
#     ingredient = Ingredient.query.get(ingredient_id)
#     if not ingredient:
#         return jsonify({"error": "Ingredient not found"}), 404

#     burger.add_ingredient(ingredient)
    
#     db.session.commit()
#     return jsonify({"message": "Ingredient added to burger successfully"}), 200

# Route for removing an ingredient from a burger
# @api.route("/burgers/<int:burger_id>/remove_ingredient", methods=["PUT"])
# def remove_ingredient_from_burger(burger_id):
#     burger = Burger.query.get(burger_id)
#     if not burger:
#         return jsonify({"error": "Burger not found"}), 404
    
#     data = request.get_json()
#     ingredient_id = data.get('ingredient_id')
#     ingredient = Ingredient.query.get(ingredient_id)
#     if not ingredient:
#         return jsonify({"error": "Ingredient not found"}), 404

#     burger.remove_ingredient(ingredient)
    
#     db.session.commit()
#     return jsonify({"message": "Ingredient removed from burger successfully"}), 200



# # edit burgers route 
# @api.route("/burgers/<int:burger_id>", methods=["PUT"])
# def update_burger(burger_id):
#     burger = Burger.query.get(burger_id)
#     if not burger:
#         return jsonify({"error": "Burger not found"}), 404
    
#     data = request.get_json()
#     ingredient_ids = data.get('ingredients', [])
    
#     burger.update_ingredients(ingredient_ids)
    
#     db.session.commit()
#     return jsonify({"message": "Burger updated successfully"}), 200


 









# this will be used to post ingredients (From commands.py) for use in the front end
# @api.route('/add-ingredient', methods=['POST'])
# def add_ingredient_to_burger():
    """
    User starts burger      -->     POST new burger to backend
    Frontend finishes loading page    <--     Backend sends back burger details w/ burger.id
    User edits burger --> PUT request /api/burger/<burger_id>
    {
        ingredients: [
            # a list of ingredients from your frontend
        ]
    }
    Backend sends back a 201 no content
    """
    # Get Burger() with id `burger_id` from the db.
    # Get list of ingredients from the db.
    # Turn request.ingredients into an array of Ingredient()
    # Burger().ingredients = array of Ingredient()s
    # db.session.merge(burger object)
    # db.session.commit()

    data = request.get_json()
    name = data.get('name')
    price = data.get('price') 

    # Create a new Ingredient 
    new_ingredient = Ingredient(name=name, price=price)

    # Add the new ingredient to the database 
    db.session.add(new_ingredient)
    db.session.commit()

    return jsonify({"message": "Ingredient added to burger successfully", "name": name, "price": price}), 200

# @api.route('/remove-ingredients/<string:ingredient_name>', methods=['DELETE'])
# def remove_ingredient_from_burger(ingredient_name):
#     try:
#         # Retrieve the ingredient from the database based on the provided name
#         ingredient = Ingredient.query.filter_by(name=ingredient_name).first()

#         if ingredient:
#             # If the ingredient exists, remove it from the database
#             db.session.delete(ingredient)
#             db.session.commit()
#             return jsonify({"message": f"Ingredient '{ingredient_name}' removed from burger successfully"}), 200
#         else:
#             return jsonify({"error": f"Ingredient '{ingredient_name}' not found"}), 404
#     except Exception as e:
#         # Handle any errors that may occur
#         return jsonify({"error": str(e)}), 500


# @api.route('/burgeringredient', methods=['POST'])
# def add_ing_to_burger():
#     data = request.get_json()
#     ingredients_data = data.get('ingredients', [])
#     user_id = get_jwt_identity()

#     # Create a new Burger instance for the user
#     burger = Burger(user_id=user_id)
#     db.session.add(burger)
#     db.session.commit()

#     # Retrieve all ingredients IDs from the request
#     ingredient_ids = [ingredient['id'] for ingredient in ingredients_data]

#     # Query for all Ingredients objects by IDs
#     ingredients = Ingredient.query.filter(Ingredient.id.in_(ingredient_ids)).all()

#     # Add queried Ingredient objects to the Burger's ingredients relationship
#     burger.ingredients.extend(ingredients)

#     db.session.commit()

#     return jsonify(burger.serialize()), 201



@api.route('/burgeringredient', methods=['POST'])
def add_ing_to_burger():
    data = request.get_json()
    ingredients = data.get('ingredients', [])
    user_id = get_jwt_identity()

    burger = Burger(user_id=user_id)
    db.session.add(burger)
    db.session.commit()
# list of burg.s user has
    burgers=Burger.query.filter_by(user_id=user_id)
    
    burger=burgers[len(burgers)-1]


    for ingredient_data in ingredients:
        ingredient_id = ingredient_data['id']
        quantity = ingredient_data['quantity']
        ingredient = Ingredient.query.get(ingredient_id)
        if ingredient:
            burger_to_ingredient= burger_to_ingredient(
                burger_id=burger.id, 
                ingredient_id=ingredient.id, 
                quantity=quantity
                )
            db.session.add(burger_to_ingredient)
            db.session.commit()
            
    
    burger.calculate_total_price()
    # db.session.commit() <--redundant
    
    return jsonify(burger.serialize()), 201