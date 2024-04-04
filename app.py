from flask import *
import os
import requests
import joblib
import numpy as np


app = Flask(__name__)

@app.route('/')
def home():
    return render_template("main.html",prompt=0)

# def verify1(input):


@app.route('/submit',methods=["POST","GET"])
def page1():
    input=[]
    if request.method == "POST":
        # data = request.json
        # region = data.get("region")
        # input.append(region)
        # category = data.get("category")
        # input.append(category)
        # parameter = data.get("parameter")
        # input.append(parameter)
        # mode = data.get("mode")
        # input.append(mode)
        # powertrain = data.get("powertrain")
        # input.append(powertrain)
        # year = data.get("year")
        # input.append(year)
        # unit = data.get("unit")
        # input.append(unit)

    # Process the data as needed
        # print(region, category, parameter, mode, powertrain, year, unit)
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
            if len(i)==0:
                return 
        try:
            if input[6] == 'Vehicles':
                # if verify1(input) ==False:
                #     return render_template("error.html")
                model= joblib.load('model/model1.pkl')
                X_scaler = joblib.load('scaler/X_scaler1.pkl')
                Y_scaler = joblib.load('scaler/Y_scaler1.pkl')
                encoder= joblib.load('encoder/encoder1.pkl')
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
                # result = {'result':result}
                print(result)
                # result = result.tolist()
                #json_result= json.dumps(result)
                return render_template("main.html",prompt=1 ,value_pred=result[0][0])
                # return jsonify(result)
                # print(result)
                    # print("error")

            elif input[6] == 'percent':
                # if verify2(input) ==False:
                #     return render_template("error.html")
                # input[5]=int(input[5])
                model= joblib.load('model/model2.pkl')
                X_scaler = joblib.load('scaler/X_scaler2.pkl')
                Y_scaler = joblib.load('scaler/Y_scaler2.pkl')
                encoder= joblib.load('encoder/encoder2.pkl')
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
                # result = {'result':result}
                print(result)
                # result = result.tolist()
                # json_result= json.dumps(result)
                # return render_template("main.html", data=result)
                # return jsonify(result)
                return render_template("main.html",prompt=1 ,value_pred=result[0][0])

                
                # print(result)

            elif input[6] == 'charging points':
                # if verify3(input) ==False:
                #     return render_template("error.html")
                model= joblib.load('model/model3.pkl')
                X_scaler = joblib.load('scaler/X_scaler3.pkl')
                Y_scaler = joblib.load('scaler/Y_scaler3.pkl')
                encoder= joblib.load('encoder/encoder3.pkl')
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
                # result = {'result':result}
                print(result)
                # result = result.tolist()
                # json_result= json.dumps(result)
                # return render_template("main.html", data=result)
                # return jsonify(result)
                return render_template("main.html",prompt=1 ,value_pred=result[0][0])

                
                # print(result)


            elif input[6] == 'GWh':
                # if verify4(input) ==False:
                #     return render_template("error.html")
                model= joblib.load('model/model4.pkl')
                X_scaler = joblib.load('scaler/X_scaler4.pkl')
                Y_scaler = joblib.load('scaler/Y_scaler4.pkl')
                encoder= joblib.load('encoder/encoder4.pkl')
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
                # result = {'result':result}
                print(result)
                # result = result.tolist()
                # json_result= json.dumps(result)
                # return render_template("main.html", data=result)
                # return jsonify(result)
                return render_template("main.html",prompt=1 ,value_pred=result[0][0])

                
                # print(result)

            elif input[6] == 'Milion barrels per day':
                # if verify5(input) ==False:
                #     return render_template("error.html")
                model= joblib.load('model/model5.pkl')
                X_scaler = joblib.load('scaler/X_scaler5.pkl')
                Y_scaler = joblib.load('scaler/Y_scaler5.pkl')
                encoder= joblib.load('encoder/encoder5.pkl')
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
                # result = {'result':result}
                print(result)
                # result = result.tolist()
                # json_result= json.dumps(result)
                # return render_template("main.html", data=result)
                # return jsonify(result)
                return render_template("main.html",prompt=1 ,value_pred=result[0][0])

                
                # print(result)


            elif input[6] == 'Oil displacement, million lge':
                # if verify6(input) ==False:
                #     return render_template("error.html")
                model= joblib.load('model/model6.pkl')
                X_scaler = joblib.load('scaler/X_scaler6.pkl')
                Y_scaler = joblib.load('scaler/Y_scaler6.pkl')
                encoder= joblib.load('encoder/encoder6.pkl')
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
                # result = {'result':result}
                print(result)
                # result = result.tolist()
                # json_result= json.dumps(result)
                # return render_template("main.html", data=result)
                # return jsonify(result)
                return render_template("main.html",prompt=1 ,value_pred=result[0][0])

                
                # print(result)
            
            else:
                # return render_template('error')
                return redirect("/")
        
        except Exception as e:
            print("Error:-",type(e).__name__)
            return "Error"
    else:
        return redirect("/")

if __name__ == '__main__':
    app.run(debug=True)