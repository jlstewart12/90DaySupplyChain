from flask import Flask, request, jsonify, render_template  
import pymongo
from pymongo import MongoClient
import json
import os

app = Flask(__name__)

client = pymongo.MongoClient("mongodb://127.0.0.1:27017")  
db = client.exports_db   
export_sales = db.collection

@app.route("/")
def index():
    export_data = export_sales.find({'Year': '2020'}, {'Commodity':'Soybeans'})
    export_data = json.dumps(export_data, indent=2)
    data = {'export_data': export_data}
    return render_template("index.html", data=data)

if __name__ == "__main__":
     app.run(debug=True)