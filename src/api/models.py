from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
# This db class is used by jwt authentication
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
# These db classes represent the burger builder wep app tool
class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    price = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<Ingredient {self.name}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price
        }
class OrderIngredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredient.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    order = db.relationship('Order', backref=db.backref('order_ingredients', lazy=True))
    ingredient = db.relationship('Ingredient')

    def subtotal(self):
        return self.ingredient.price * self.quantity

    def __repr__(self):
        return f'<OrderIngredient {self.id}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'ingredient_id': self.ingredient_id,
            'ingredient_name': self.ingredient.name,
            'quantity': self.quantity,
            'subtotal': self.subtotal()
        }

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    total_price = db.Column(db.Float, nullable=False, default=0.0)

    def calculate_total_price(self):
        total_price = sum(oi.subtotal() for oi in self.order_ingredients)
        self.total_price = total_price
        db.session.commit()

    def __repr__(self):
        return f'<Order {self.id}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'total_price': self.total_price,
            'ingredients': [oi.serialize() for oi in self.order_ingredients]
        }