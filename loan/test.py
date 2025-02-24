import requests
import json

# Define API endpoint
url = "http://127.0.0.1:5000/predict"

# Sample input data (JSON format)
data = {
    "person_age": 30,
    "person_income": 45000,
    "person_home_ownership": "RENT",
    "person_emp_length": 5,
    "loan_intent": "PERSONAL",
    "loan_grade": "B",
    "loan_amnt": 5000,
    "loan_int_rate": 12.5,
    "loan_percent_income": 0.15,
    "cb_person_default_on_file": "N",
    "cb_person_cred_hist_length": 8
}

# Send POST request
response = requests.post(url, json=data)

# Print response
print("Predicted Loan Status:", response.json())
