from flask import Flask, jsonify, request, render_template
import pymongo
import json
import pandas as pd

app = Flask(__name__)

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.grainUSDA_db
collections = db.collection

@app.route("/")
def index():
    x = []
    cursor = collections.find()
    for i in cursor:
        x.append(i)
    # x = pd.DataFrame(list(db.grainUSDA.find())).to_dict()
    # #
    return render_template("index.html",Data=x)

if __name__ == "__main__":
    app.run(debug=True)