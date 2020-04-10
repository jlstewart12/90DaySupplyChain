from flask import Flask, render_template
import pymongo
#import json
#from bson.json_util import dumps

app = Flask(__name__)

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

db = client['exports_db']
collection = db['collection']

# MONGODB_HOST = 'localhost'
# MONGODB_PORT = 27017
# DBS_NAME = 'exports_db'
# COLLECTION_NAME = 'collection'
# FIELDS = {'Week':True,'Month':True,'Year':True,'Marketing Year':True,'Marketing Year':True,'Country':True,'Commodity':True,'Commodity Type':True,'Marketing Year Start or End':True,'Unit':True,'Weekly Exports CMY':True,'Accumulated Exports CMY':True,'Outstanding Sales CMY':True,'Gross Sales CMY':True, 'Net Sales CMY':True, 'Total Commitments CMY':True, 'Outstanding Sales NMY':True, 'Net Sales NMY':True, 'Marketing Month':True, 'Net Sales, Total':True, 'Outstanding Sales, Total':True,'_id':False}

@app.route("/")
def index():
    inventory = list(collection.find())
    print(inventory)

    return render_template("index.html", inventory = inventory)

# @app.route("/exports_db/collection")
# def export_sales():
#    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
 #   collection = connection[DBS_NAME][COLLECTION_NAME]
  #  projects = collection.find(projection=FIELDS, limit=10000)
   # json_projects = []
    #for project in projects:
    #    json_projects.append(project)
    #json_projects = json.dumps(json_projects, default=json_util.default)
    #connection.close()
    #return json_projects

if __name__ == "__main__":
    app.run(debug=True)