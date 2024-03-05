from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# This db class is used by jwt authentication
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    burgers = db.relationship("Burger", back_populates="user")
    shopping_carts = db.relationship("ShoppingCart", back_populates="user")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            'burgers': [burger.serialize() for burger in self.burgers],
            'shopping_carts': [cart.serialize() for cart in self.shopping_carts]
            # do not serialize the password, it's a security breach
        }


burger_to_ingredient = db.Table(
    "burger_to_ingredient",
    db.metadata,
    db.Column(
        "burger_id",
        db.ForeignKey("burger.id")
    ),
    db.Column(
        "ingredient_id",
        db.ForeignKey("ingredient.id")
    ),
)


class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    image = db.Column(db.String(256), default="/img/missing.png")
    price = db.Column(db.Float, nullable=False)
    z_index=db.Column(db.Integer, nullable=False)
    burgers = db.relationship(
        "Burger",
        secondary=burger_to_ingredient,
        primaryjoin=(id == burger_to_ingredient.c.ingredient_id),
        uselist=True,
    )

    def __repr__(self):
        return f'<Ingredient {self.name}>'

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'image': self.image,
            'price': self.price,
            'z_index': self.z_index
        }


class Burger(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    shopping_cart_id = db.Column(db.Integer, db.ForeignKey('shoppingcart.id'), nullable=False)
    user = db.relationship('User', back_populates="burgers")
    is_favorite = db.Column(db.Boolean(), unique=False, nullable=False)
    
    ingredients = db.relationship(
        "Ingredient",
        secondary=burger_to_ingredient,
        primaryjoin=(id == burger_to_ingredient.c.burger_id),
        uselist=True,
    )

    def calculate_total_price(self):
        total_price = sum([bi.price for bi in self.ingredients])
        return total_price

    def add_ingredient(self, ingredient):
        if ingredient not in self.ingredients:
            self.ingredients.append(ingredient)
            db.session.commit()

    def remove_ingredient(self, ingredient):
        if ingredient in self.ingredients:
            self.ingredients.remove(ingredient)
            db.session.commit()

    def __repr__(self):
        return f'<Burger {self.id}>'

    def serialize(self):
        return {
            'id': self.id,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'total_price': self.calculate_total_price(),
            'ingredients': [bi.serialize() for bi in self.ingredients]
        }

class ShoppingCart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
   
    # Define any additional columns as needed

    # Define the relationship to the User table
    user = db.relationship('User', back_populates='shopping_carts')
    # Define the relationship to the Burger table
    burgers = db.relationship('Burger')

    def __repr__(self):
        return f'<ShoppingCart id={self.id}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'burgers': [burger.serialize() for burger in self.burgers]
        }



#<--Do not use below this line. This is an example of my previous thought on how to handle this data.-->
# class FavoriteBurger(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     burger_id = db.Column(db.Integer, db.ForeignKey('burger.id'), nullable=False)
#     # Define any additional columns as needed

#     # Define the relationship to the User table
#     user = db.relationship('User', backref='favorite_burgers')
#     # Define the relationship to the Burger table
#     burger = db.relationship('Burger', backref='favorite_burgers')

#     def __repr__(self):
#         return f'<FavoriteBurger user_id={self.user_id}, burger_id={self.burger_id}>'



# class BurgerIngredient(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     burger_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
#     ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredient.id'), nullable=False)
#     quantity = db.Column(db.Integer, nullable=False)

#     order = db.relationship('Order', backref=db.backref('order_ingredients', lazy=True))
#     ingredient = db.relationship('Ingredient')

#     def subtotal(self):
#         return self.ingredient.price * self.quantity

#     def __repr__(self):
#         return f'<OrderIngredient {self.id}>'
    
#     def serialize(self):
#         return {
#             'id': self.id,
#             'ingredient_id': self.ingredient_id,
#             'ingredient_name': self.ingredient.name,
#             'quantity': self.quantity,
#             'subtotal': self.subtotal()
#         }    
    
#     def serialize(self):
#         return {
#             'id': self.id,
#             'ingredient_id': self.ingredient_id,
#             'ingredient_name': self.ingredient.name,
#             'quantity': self.quantity,
#             'subtotal': self.subtotal()
#         }    