from flask import Flask, request, render_template  
import pymongo
import json
# import pandas as pd

app = Flask(__name__)

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

db = client['USDAtransports']
export_sales = db['Export_Sales']
grain_inspections = db['Grain_Inspections']
truck_volumes = db['Ref_Truck_Volumes']
fuel_prices = db['Diesel_Fuel_Prices']

Efields = {'Year':True,'Country':True,'Commodity':True,'Outstanding Sales, Total':True,'_id':False}
Gfields = {'Week':True,'Month':True,'Year':True,'Grain':True,'Destination':True, 'Port':True, 'MT':True, 'Pounds':True, 'Field_Office':True,'_id':False}
Tfields = {'Weekday':True,'Month':True,'Year':True,'Region':True, 'Origin':True, 'Commodity':True, 'Tenklbs':True,'_id':False}
Ffields = {'Week':True,'Month':True,'Year':True,'Region':True, 'Diesel Price':True,'_id':False}

@app.route("/exportsales")
def exports():
    exportdb = export_sales.find({'Year':2020}, projection=Efields, limit=20)
    response = []
    for sale in exportdb:
        response.append(sale)
    return render_template("index.html", sale=json.dumps(response))

@app.route("/graininspections")
def grains():
    graindb = grain_inspections.find({'Year':2020}, projection=Gfields, limit=20)
    response = []
    for i in graindb:
        response.append(i)
    return render_template("index.html", sale=json.dumps(response))

@app.route("/truckvolumes")
def trucks():
    truckdb = truck_volumes.find({'Year':2020}, projection=Tfields, limit=20)
    response = []
    for vol in truckdb:
        response.append(vol)
    return render_template("index.html", sale=json.dumps(response))

@app.route("/dieselprices")
def prices():
    fueldb = fuel_prices.find({'Year':2020}, projection=Ffields, limit=20)
    response = []
    for price in fueldb:
        response.append(price)
    return render_template("index.html", sale=json.dumps(response))

if __name__ == "__main__":
     app.run(debug=True)
