from flask import Flask, render_template # For flask implementation    
from bson.objectid import ObjectId # For ObjectId to work    
import pymongo
import os

app = Flask(__name__)

client = MongoClient("mongodb://127.0.0.1:27017") #host uri    
db = client.mymongodb    #Select the database    
exports_sales = db.collection #Select the collection name 

# MONGODB_HOST = 'localhost'
# MONGODB_PORT = 27017
# DBS_NAME = 'exports_db'
# COLLECTION_NAME = 'collection'
# FIELDS = {'Week':True,'Month':True,'Year':True,'Marketing Year':True,'Marketing Year':True,'Country':True,'Commodity':True,'Commodity Type':True,'Marketing Year Start or End':True,'Unit':True,'Weekly Exports CMY':True,'Accumulated Exports CMY':True,'Outstanding Sales CMY':True,'Gross Sales CMY':True, 'Net Sales CMY':True, 'Total Commitments CMY':True, 'Outstanding Sales NMY':True, 'Net Sales NMY':True, 'Marketing Month':True, 'Net Sales, Total':True, 'Outstanding Sales, Total':True,'_id':False}


firstWeek = {'Week': '1'}
soybeans = {'Commodity': 'Soybeans'}
brazil = {'Country': 'Brazil'}

@app.route("/")
def index():
    inventory = list(export_sales.find())
    print(inventory)

    return render_template("index.html", holder1 = firstWeek, holder2 = soybeans, holder3 = brazil)

#@app.route('/line')
#def line():
    #line_labels=labels
    #line_values=values
    #return render_template('line_chart.html', title='Bitcoin Monthly Price in USD', max=17000, labels=line_labels, values=line_values)

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