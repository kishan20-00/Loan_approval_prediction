import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, MenuItem, Typography, Paper, Box } from "@mui/material";

function App() {
    const [formData, setFormData] = useState({
        person_age: "",
        person_income: "",
        person_home_ownership: "",
        person_emp_length: "",
        loan_intent: "",
        loan_grade: "",
        loan_amnt: "",
        loan_int_rate: "",
        loan_percent_income: "",
        cb_person_default_on_file: "",
        cb_person_cred_hist_length: ""
    });

    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setPrediction(null);

        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", formData);
            setPrediction(response.data.loan_status);
        } catch (err) {
            setError("Error making prediction. Please check inputs and try again.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>Loan Prediction Form</Typography>
                <form onSubmit={handleSubmit}>
                    <Box display="grid" gap={2}>
                        <TextField type="number" label="Person Age" name="person_age" onChange={handleChange} required />
                        <TextField type="number" label="Person Income" name="person_income" onChange={handleChange} required />
                        
                        <TextField select label="Home Ownership" name="person_home_ownership" onChange={handleChange} required>
                            <MenuItem value="RENT">RENT</MenuItem>
                            <MenuItem value="OWN">OWN</MenuItem>
                            <MenuItem value="MORTGAGE">MORTGAGE</MenuItem>
                            <MenuItem value="OTHER">OTHER</MenuItem>
                        </TextField>

                        <TextField type="number" label="Employment Length (years)" name="person_emp_length" onChange={handleChange} required />

                        <TextField select label="Loan Intent" name="loan_intent" onChange={handleChange} required>
                            <MenuItem value="EDUCATION">EDUCATION</MenuItem>
                            <MenuItem value="PERSONAL">PERSONAL</MenuItem>
                            <MenuItem value="MEDICAL">MEDICAL</MenuItem>
                            <MenuItem value="VENTURE">VENTURE</MenuItem>
                            <MenuItem value="HOMEIMPROVEMENT">HOMEIMPROVEMENT</MenuItem>
                            <MenuItem value="DEBTCONSOLIDATION">DEBTCONSOLIDATION</MenuItem>
                        </TextField>

                        <TextField select label="Loan Grade" name="loan_grade" onChange={handleChange} required>
                            <MenuItem value="A">A</MenuItem>
                            <MenuItem value="B">B</MenuItem>
                            <MenuItem value="C">C</MenuItem>
                            <MenuItem value="D">D</MenuItem>
                            <MenuItem value="E">E</MenuItem>
                            <MenuItem value="F">F</MenuItem>
                            <MenuItem value="G">G</MenuItem>
                        </TextField>

                        <TextField type="number" label="Loan Amount" name="loan_amnt" onChange={handleChange} required />
                        
                        {/* Updated to allow decimal values */}
                        <TextField 
                            type="number" 
                            inputMode="decimal" 
                            step="any" 
                            label="Loan Interest Rate" 
                            name="loan_int_rate" 
                            onChange={handleChange} 
                            required 
                        />

                        <TextField 
                            type="number" 
                            inputMode="decimal" 
                            step="any" 
                            label="Loan Percent Income" 
                            name="loan_percent_income" 
                            onChange={handleChange} 
                            required 
                        />

                        <TextField select label="Default on File" name="cb_person_default_on_file" onChange={handleChange} required>
                            <MenuItem value="Y">Yes</MenuItem>
                            <MenuItem value="N">No</MenuItem>
                        </TextField>

                        <TextField type="number" label="Credit History Length" name="cb_person_cred_hist_length" onChange={handleChange} required />

                        <Button type="submit" variant="contained" color="primary">Predict Loan Status</Button>
                    </Box>
                </form>

                {prediction !== null && (
                    <Typography 
                        variant="h6" 
                        sx={{ marginTop: 2, color: prediction === 1 ? "red" : "green", fontWeight: "bold" }}
                    >
                        {prediction === 1 ? "Fraud" : "Safe"}
                    </Typography>
                )}

                {error && (
                    <Typography variant="h6" color="error" sx={{ marginTop: 2 }}>
                        {error}
                    </Typography>
                )}
            </Paper>
        </Container>
    );
}

export default App;
