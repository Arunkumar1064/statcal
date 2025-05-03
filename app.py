import os
import logging
from flask import Flask, render_template, request, jsonify

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "agricultural_calculator_default_key")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/land_area')
def land_area():
    return render_template('land_area.html')

@app.route('/soil_fertilizer')
def soil_fertilizer():
    return render_template('soil_fertilizer.html')

@app.route('/water_irrigation')
def water_irrigation():
    return render_template('water_irrigation.html')

@app.route('/seed_planting')
def seed_planting():
    return render_template('seed_planting.html')

@app.route('/crop_yield')
def crop_yield():
    return render_template('crop_yield.html')

@app.route('/additional')
def additional():
    return render_template('additional.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
