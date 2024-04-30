import os
import sys
import json
import subprocess

# subprocess.check_call([sys.executable, "-m", "pip", "install", "scikit-learn"])

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.preprocessing import StandardScaler

input_data = json.load(sys.stdin)

# Mapping input data
type_of_food = input_data['type_of_food']
number_of_guests = input_data['number_of_guests']
event_type = input_data['event_type']
quantity_of_food = input_data['quantity_of_food']
storage_conditions = input_data['storage_conditions']
purchase_history = input_data['purchase_history']
seasonality = input_data['seasonality']
preparation_method = input_data['preparation_method']
geographical_location = input_data['geographical_location']
pricing = input_data['pricing']

# Define the path to your dataset
file_path = os.path.join(os.path.dirname(__file__), 'food_wastage_data.csv')
df = pd.read_csv(file_path)

# Categorical columns
categorical_columns = [
    'Type of Food', 'Event Type', 'Storage Conditions', 'Purchase History', 
    'Seasonality', 'Preparation Method', 'Geographical Location', 'Pricing'
]

# Initialize LabelEncoders for categorical features
label_encoders = {col: LabelEncoder() for col in categorical_columns}
for col in categorical_columns:
    df[col] = label_encoders[col].fit_transform(df[col])

# Prepare features and target
X = df[categorical_columns + ['Number of Guests', 'Quantity of Food']]
y = df['Wastage Food Amount']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Linear Regression model
model = LinearRegression()
model.fit(X_train_scaled, y_train)

# Evaluate the model
score = model.score(X_test_scaled, y_test)
# print(f"R-squared score: {score:.2f}")

# Prediction input preparation
input_features = pd.DataFrame([[
    type_of_food, event_type, storage_conditions, purchase_history, seasonality, 
    preparation_method, geographical_location, pricing, number_of_guests, quantity_of_food
]], columns=categorical_columns + ['Number of Guests', 'Quantity of Food'])

# Encode input features
for col in categorical_columns:
    input_features[col] = label_encoders[col].transform(input_features[col])

# Scale input features
input_features_scaled = scaler.transform(input_features)

# Predict
predicted_wastage = model.predict(input_features_scaled)
if predicted_wastage.size > 0:
    print(float(predicted_wastage[0]))
else:
    print(None)
