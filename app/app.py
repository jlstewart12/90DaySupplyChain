from flask import Flask, jsonify, request, render_template  
import pymongo
import json
import pandas as pd
import pprint
from bson.json_util import dumps
from bson.json_util import loads
from bson import json_util

app = Flask(__name__)

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

db = client['USDAtransports']
export_sales = db['Export_Sales']
grain_inspections = db['Grain_Inspections']
truck_volumes = db['Ref_Truck_Volumes']
# fuel_prices = db['Diesel_Fuel_Prices']

Efields = {'Year':True,'Country':True,'Commodity':True,'Outstanding Sales, Total':True,'_id':False}
Gfields = {'Week':True,'Month':True,'Year':True,'Grain':True,'Destination':True, 'Port':True, 'MT':True, 'Pounds':True, 'Field_Office':True,'_id':False}
fcol = {'Weekday':True,'Month':True,'Year':True,'Region':True, 'Origin':True, 'Commodity':True, 'Tenklbs':True,'_id':False}
Ffields = {'Week':True,'Month':True,'Year':True,'Region':True, 'Diesel Price':True,'_id':False}

@app.route("/exportsales")
def exports():
    y16Values = export_sales.aggregate([
        { '$match': { 'Year': 2016} },
        { '$group': { '_id': '$Week', 'total': { '$sum': '$Outstanding Sales, Total'} } },
        { '$sort': { '_id': 1}}
    ])
    # y16Array = []
    y16Values = pd.DataFrame(y16Values).drop(columns=['_id'])
    # for totals in y16Values:
    #     y16Array.append(totals)

    y17Values = export_sales.aggregate([
        { '$match': { 'Year': 2017} },
        { '$group': { '_id': '$Week', 'total': { '$sum': '$Outstanding Sales, Total'} } },
        { '$sort': { '_id': 1}}
    ])
    # y17Array = []
    y17Values = pd.DataFrame(y17Values).drop(columns=['_id'])
    # for totals in y17Values:
    #     y17Array.append(totals)

    y18Values = export_sales.aggregate([
        { '$match': { 'Year': 2018} },
        { '$group': { '_id': '$Week', 'total': { '$sum': '$Outstanding Sales, Total'} } },
        { '$sort': { '_id': 1}}
    ])
    # y18Array = []
    y18Values = pd.DataFrame(y18Values).drop(columns=['_id'])
    # for totals in y18Values:
    #     y18Array.append(totals)

    y19Values = export_sales.aggregate([
        { '$match': { 'Year': 2019} },
        { '$group': { '_id': '$Week', 'total': { '$sum': '$Outstanding Sales, Total'} } },
        { '$sort': { '_id': 1}}
    ])
    y19Array = []
    y19Values = pd.DataFrame(y19Values).drop(columns=['_id'])
    for totals in y19Values:
        y19Array.append(totals)

    y20Values = export_sales.aggregate([
        { '$match': { 'Year': 2020} },
        { '$group': { '_id': '$Week', 'total': { '$sum': '$Outstanding Sales, Total'} } },
        { '$sort': { '_id': 1}}
    ])
    y20Array = []
    y20Values = pd.DataFrame(y20Values).drop(columns=['_id'])
    for totals in y20Values:
        y20Array.append(totals)
    
    xLabels = export_sales.distinct( 'Week', { 'Year': 2018})
    weekArray = []
    for week in xLabels:
        weekArray.append(week)
    return render_template("index.html", week=weekArray, min=20000000, max=44000000, y16Values=y16Values.to_dict(), y17Values=y17Values.to_dict(), y18Values=y18Values.to_dict(), y19Values=y19Values.to_dict(), y20Values=y20Values.to_dict())

@app.route("/usdaSupplies")
def supply():
    
    # write a statement that finds all the items in the db and sets it to a variable
    
    supplies = list(db.truck_volumes.find({'Month':3},projection=fcol, limit=40))
    supplies2 = list(db.collection.find({'Month':1},projection=fcol, limit=40))
    data = pd.DataFrame(supplies).drop(columns=['_id'])
    data2 = pd.DataFrame(supplies2).drop(columns=['_id'])
    return render_template("index.html", product=data.to_dict(), productComp=data2.to_dict())   

# @app.route("/graininspections")
# def grains():
#     graindb = grain_inspections.find({'Year':2020}, projection=Gfields, limit=20)
#     response = []
#     for i in graindb:
#         response.append(i)
#     return render_template("index.html", sale=json.dumps(response))

# @app.route("/dieselprices")
# def prices():
#     fueldb = fuel_prices.find({'Year':2020}, projection=Ffields, limit=20)
#     response = []
#     for price in fueldb:
#         response.append(price)
#     return render_template("index.html", sale=json.dumps(response))

@app.route("/graininspections")
def index():
    x = []
    cursor = collection.find()
    for i in cursor:
        x.append(i)
    # x = pd.DataFrame(list(db.grainUSDA.find())).to_dict()
    # #
    return render_template("index.html",Data=x)


if __name__ == "__main__":
     app.run(debug=True)
