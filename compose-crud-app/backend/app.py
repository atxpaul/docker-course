import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask (__name__)
CORS(app)
CORS(app, resources={r"/*":{"origins":"*"}})

db_user = os.getenv('POSTGRES_USER')
db_password = os.getenv('POSTGRES_PASSWORD')
db_host = os.getenv('POSTGRES_HOST','db')
db_name = os.getenv('POSTGRES_DB')

app.config['SQLALCHEMY_DATABASE_URI']= f'postgresql://{db_user}:{db_password}@{db_host}:5432/{db_name}'
app.config['SQLCHEMY_TRACK_MODIFICATIONS']=False

db = SQLAlchemy(app)

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200), nullable=True)


with app.app_context():
    db.create_all()

@app.route('/items',methods=['POST'])
def create_item():
    data = request.get_json()
    new_item = Item(name=data['name'] ,description=data.get('description',''))
    db.session.add(new_item)
    db.session.commit()
    return jsonify({"message":"Item created"}), 201

@app.route('/items',methods=['GET'])
def get_items():
    items = Item.query.all()
    result = []
    for item in items:
        result.append({"id":item.id, "name":item.name, "description":item.description})
    return jsonify(result), 200

@app.route('/items/<int:id>',methods=['GET'])
def get_item(id):
    item = Item.query.get_or_404(id)
    return({"id":item.id, "name":item.name, "description":item.description}), 200

@app.route('/items/<int:id>',methods=['PUT'])
def update_item(id):
    item = Item.query.get_or_404(id)
    data = request.get_json()
    item.name = data['name']
    item.description = data.get('description','')
    db.session.commit()
    return jsonify({"message":"Item updated"}), 200

@app.route('/items/<int:id>',methods=['DELETE'])
def delete_item(id):
    item = Item.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message":"Item deleted"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)