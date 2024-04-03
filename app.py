from flask import *
import os
import requests

app = Flask(__name__)

@app.route('/')
def home():
    return render_template()

@app.route('/submit',methods=["POST","GET"])
def page1():
    if request.method == "POST":
        pass
    else:
        return render_template('error')
    
