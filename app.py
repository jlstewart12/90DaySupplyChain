from flask import Flask, request, render_template  
import pymongo
import json
# import pandas as pd

app = Flask(__name__)

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

db = client['exports_db']
export_sales = db['collection']

# @app.route("/data")
# def index():
#     db = export_sales.find({'Year': '2020'}, {'Commodity':'Soybeans'})
#     export_data = db.to_dict(orient='records')
#     export_data = json.dumps(export_data, indent=2)
#     data = {'export_data': export_data}
#     return render_template("index.html", data=data)

FIELDS = {'Year':True,'Country':True,'Commodity':True,'Outstanding Sales, Total':True,'_id':False}

@app.route("/exportsales")
def index():
    exportdb = export_sales.find({'Year':2020}, projection=FIELDS, limit=10)
    response = []
    for export in exportdb:
        # export['Year'] = str(export['Year'])
        response.append(export)
    return json.dumps(response)

if __name__ == "__main__":
     app.run(debug=True)