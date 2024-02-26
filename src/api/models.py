from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()
# This db class is used by jwt authentication
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    burgers= db.relationship("Burger", back_populates="user")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
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


# These db classes represent the burger builder wep app tool
# this will be posted to by admins, not users to create a db of ingredients for users to access
# you can do this in commands.py - if you look at my sims IRL project you will see an example
# so when the "make a burger" componet loads, it will GET these ingridents to populate it
class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    image = db.Column(db.String(256), default="/img/missing.png")
    price = db.Column(db.Float, nullable=False)
    burgers = db.relationship(
        "Burger",
        secondary=burger_to_ingredient,
        primaryjoin=(id==burger_to_ingredient.c.ingredient_id),
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
        }



class Burger(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', back_populates="burgers")
    # total_price = db.Column(db.Float, nullable=False, default=0.0)
    ingredients = db.relationship(
        "Ingredient",
        secondary=burger_to_ingredient,
        primaryjoin=(id == burger_to_ingredient.c.burger_id),
        uselist=True,
    )

    def calculate_total_price(self):
        total_price = sum([bi.price for bi in self.ingredients])
        return total_price

    def __repr__(self):
        return f'<Order {self.id}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'total_price': self.calculate_total_price(),
            'ingredients': [bi.serialize() for bi in self.ingredients]
        }
    
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