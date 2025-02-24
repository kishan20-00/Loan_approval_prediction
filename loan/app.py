from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

# Load the trained model, scaler, and label encoders
best_model = joblib.load("best_loan_status_model.pkl")
scaler = joblib.load("scaler.pkl")
label_encoders = joblib.load("label_encoders.pkl")

# Define categorical columns
categorical_cols = ["person_home_ownership", "loan_intent", "loan_grade", "cb_person_default_on_file"]

# Create Flask app
app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON input
        data = request.get_json()

        # Convert input JSON to DataFrame
        input_df = pd.DataFrame([data])

        # Encode categorical variables
        for col in categorical_cols:
            if col in input_df.columns:
                input_df[col] = label_encoders[col].transform(input_df[col])

        # Scale numerical features
        input_df[input_df.columns] = scaler.transform(input_df)

        # Make prediction
        prediction = best_model.predict(input_df)[0]

        # Return result
        return jsonify({"loan_status": int(prediction)})

    except Exception as e:
        return jsonify({"error": str(e)})

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
