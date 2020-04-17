from flask import Flask, request, render_template  
import pymongo
import json
# import pandas as pd

app = Flask(__name__)

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

db = client['USDAtransports']
export_sales = db['Export_Sales']
# grain_inspections = db['Grain_Inspections']
# truck_volumes = db['Ref_Truck_Volumes']
# fuel_prices = db['Diesel_Fuel_Prices']

# Efields = {'Year':True,'Country':True,'Commodity':True,'Outstanding Sales, Total':True,'_id':False}
# Gfields = {'Week':True,'Month':True,'Year':True,'Grain':True,'Destination':True, 'Port':True, 'MT':True, 'Pounds':True, 'Field_Office':True,'_id':False}
# Tfields = {'Weekday':True,'Month':True,'Year':True,'Region':True, 'Origin':True, 'Commodity':True, '10,000 LBS':True,'_id':False}
# Ffields = {'Week':True,'Month':True,'Year':True,'Region':True, 'Diesel Price':True,'_id':False}

@app.route("/exportsales")
def exports():
    y16Values = export_sales.aggregate([
        { '$match': { 'Year': 2016} },
        { '$group': { '_id': '$Week', 'total': { '$sum': '$Outstanding Sales, Total'} } },
        { '$sort': { '_id': 1}}
    ])
    y16Array = []
    for totals in y16Values:
        y16Array.append(totals)

    y17Values = export_sales.aggregate([
        { '$match': { 'Year': 2017} },
        { '$group': { '_id': '$Week', 'total': { '$sum': '$Outstanding Sales, Total'} } },
        { '$sort': { '_id': 1}}
    ])
    y17Array = []
    for totals in y17Values:
        y17Array.append(totals)

    y18Values = export_sales.aggregate([
        { '$match': { 'Year': 2018} },
        { '$group': { '_id': '$Week', 'total': { '$sum': '$Outstanding Sales, Total'} } },
        { '$sort': { '_id': 1}}
    ])
    y18Array = []
    for totals in y18Values:
        y18Array.append(totals)

    y19Values = export_sales.aggregate([
        { '$match': { 'Year': 2019} },
        { '$group': { '_id': '$Week', 'total': { '$sum': '$Outstanding Sales, Total'} } },
        { '$sort': { '_id': 1}}
    ])
    y19Array = []
    for totals in y19Values:
        y19Array.append(totals)

    y20Values = export_sales.aggregate([
        { '$match': { 'Year': 2020} },
        { '$group': { '_id': '$Week', 'total': { '$sum': '$Outstanding Sales, Total'} } },
        { '$sort': { '_id': 1}}
    ])
    y20Array = []
    for totals in y20Values:
        y20Array.append(totals)
    
    xLabels = export_sales.distinct( 'Week', { 'Year': 2018})
    weekArray = []
    for week in xLabels:
        weekArray.append(week)
    return render_template("index.html", week=weekArray, min=20000000, max=44000000, y16Values=y16Array, y17Values=y17Array, y18Values=y18Array, y19Values=y19Array, y20Values=y20Array)

# @app.route("/graininspections")
# def grains():
#     graindb = grain_inspections.find({'Year':2020}, projection=Gfields, limit=20)
#     response = []
#     for i in graindb:
#         response.append(i)
#     return render_template("index.html", sale=json.dumps(response))

# @app.route("/truckvolumes")
# def trucks():
#     truckdb = truck_volumes.find({'Year':2020}, projection=Tfields, limit=20)
#     response = []
#     for vol in truckdb:
#         response.append(vol)
#     return render_template("index.html", sale=json.dumps(response))

# @app.route("/dieselprices")
# def prices():
#     fueldb = fuel_prices.find({'Year':2020}, projection=Ffields, limit=20)
#     response = []
#     for price in fueldb:
#         response.append(price)
#     return render_template("index.html", sale=json.dumps(response))

if __name__ == "__main__":
     app.run(debug=True)