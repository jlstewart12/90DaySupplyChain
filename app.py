from flask import Flask, jsonify, request, render_template
import pprint
import pymongo 
from bson.json_util import dumps
from bson.json_util import loads
import json
import pandas as pd

app = Flask(__name__)

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client['USDA_consolidated_db']
collection = db['collection']




@app.route("/")
def index():
    
    # write a statement that finds all the items in the db and sets it to a variable
    x   = []
    cursor = db.collection.find()
    for i in cursor:
        x.append(i)
    print(x)
    #print (json.dumps(x))
    
    x = pd.DataFrame(list(db.collection.find())).to_dict()
        
    return render_template("index.html", x = x)
    
    # render an index.html template and pass it the data you retrieved from the database
    #return render_template("index.html", x=x)




if __name__ == "__main__":
    app.run(debug=True)

