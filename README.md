# Loan Fraud Prediction App - Executable Setup

## Prerequisites
Before running the executable file, ensure you have the following installed on your Windows machine:
- [Python 3.11+]([https://www.python.org/downloads/](https://www.python.org/downloads/release/python-3119/))
- [Node.js & npm](https://nodejs.org/)

## Installation Steps
1. **Download and Extract**
   - Download the provided ZIP file containing the executable and extract it.
   
2. **Run the Executable**
   - Navigate to the extracted folder.
   - Double-click on `run_app.exe` to start both the Flask backend and React frontend.

## How It Works
The executable will:
1. Set up and activate a Python virtual environment.
2. Install required Python dependencies:
   ```sh
   pip install flask flask-cors numpy scikit-learn pandas
   ```
3. Start the Flask backend by running:
   ```sh
   python app.py
   ```
4. Navigate to the React frontend directory and install dependencies:
   ```sh
   npm install axios @mui/material @mui/icons-material
   ```
5. Start the frontend with:
   ```sh
   npm start
   ```

## Troubleshooting
- If the app does not start, ensure Python and Node.js are properly installed and added to the system PATH.
- If dependencies fail to install, run the above commands manually in their respective directories.

## Notes
- The Flask backend runs on `http://127.0.0.1:5000/` by default.
- The React frontend runs on `http://localhost:3000/`.
- Keep the command window open while the app is running.

Enjoy using the Loan Fraud Prediction App! 🚀

