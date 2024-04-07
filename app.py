from flask import *
import os
import requests
import joblib
import numpy as np


app = Flask(__name__)

@app.route('/')
def home():
    return render_template("main.html",prompt=0)


def predictor(model_path,X_scaler_path,y_scaler_path,encoder_path,input):
    model= joblib.load(model_path)
    X_scaler = joblib.load(X_scaler_path)
    Y_scaler = joblib.load(y_scaler_path)
    encoder= joblib.load(encoder_path)
    print(input)
    input = np.array(input)
    input= input.reshape(1,-1)
    input_f=input[:,:-2]
    input_s= input[:,-1]
    input_sp= input[:,-2]
    input_s= np.reshape(input_s, (-1,1))
    input_sp = np.reshape(input_sp, (-1,1))
    input_merge= np.concatenate((input_f, input_s), axis=1)
    input_enc = encoder.transform(input_merge)
    input_enc_merge= np.concatenate((input_enc, input_sp), axis=1)
    input_scaled= X_scaler.transform(input_enc_merge)
    result_scaled= model.predict(input_scaled)
    result= result_scaled.reshape(1,-1)
    result=Y_scaler.inverse_transform(result)
    result= result.reshape(-1,1)
    print("Result",result)
    print(result)
    return render_template("main.html",prompt=1 ,value_pred=result[0][0])

@app.route('/submit',methods=["POST","GET"])
def page1():
    input=[]
    if request.method == "POST":
        input= [request.form.get("region"),
                request.form.get("category"),
                request.form.get("parameter"),
                request.form.get("mode"),
                request.form.get("powertrain"),
                request.form.get("year"),
                request.form.get("unit")
                ]
        print(input)
        for i in input:
            if i==None:
                return render_template("main.html",prompt=2)
        try:
            if input[6] == 'Vehicles':
                return predictor("model/model1.pkl",
                                 "scaler/X_scaler1.pkl",
                                 "scaler/Y_scaler1.pkl",
                                 "encoder/encoder1.pkl",
                                 input=input)


            elif input[6] == 'percent':
                return predictor("model/model2.pkl",
                                 "scaler/X_scaler2.pkl",
                                 "scaler/Y_scaler2.pkl",
                                 "encoder/encoder2.pkl",
                                 input=input)

            elif input[6] == 'charging points':
                return predictor("model/model3.pkl",
                                 "scaler/X_scaler3.pkl",
                                 "scaler/Y_scaler3.pkl",
                                 "encoder/encoder3.pkl",
                                 input=input)


            elif input[6] == 'GWh':
                return predictor("model/model4.pkl",
                                 "scaler/X_scaler4.pkl",
                                 "scaler/Y_scaler4.pkl",
                                 "encoder/encoder4.pkl",
                                 input=input)

            elif input[6] == 'Milion barrels per day':
                return predictor("model/model5.pkl",
                                 "scaler/X_scaler5.pkl",
                                 "scaler/Y_scaler5.pkl",
                                 "encoder/encoder5.pkl",
                                 input=input)

            
            elif input[6] == 'Oil displacement, million lge':
                return predictor("model/model6.pkl",
                                 "scaler/X_scaler6.pkl",
                                 "scaler/Y_scaler6.pkl",
                                 "encoder/encoder6.pkl",
                                 input=input)
            
            else:
                return render_template("main.html",prompt=2)
        
        except Exception as e:
            print("Error:-",type(e).__name__)
            return render_template("main.html",prompt=2)
    else:
        return redirect("/")

if __name__ == '__main__':
    app.run(debug=True)