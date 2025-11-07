import numpy as np
import pandas as pd
import tensorflow as tf
import os

# ==================== LOAD DATA ====================
print("[1/5] Loading data...")
housing_data = pd.read_csv('../data/dataset.csv')
print(f"Original dataset shape: {housing_data.shape}")

# ==================== DATA CLEANING ====================
print("[2/5] Cleaning data...")
housing_data = housing_data.dropna()
print(f"After dropna: {housing_data.shape}")

# ==================== CATEGORICAL ENCODING ====================
print("[3/5] Encoding categorical variables...")

# First, let's see what unique values we have
print("\nUnique values before encoding:")
for col in housing_data.columns:
    if housing_data[col].dtype == 'object':  # Only string columns
        print(f"  {col}: {housing_data[col].unique()}")

encoding_map = {
    'mainroad': {'yes': 1, 'no': 0},
    'guestroom': {'yes': 1, 'no': 0},
    'basement': {'yes': 1, 'no': 0},
    'hotwaterheating': {'yes': 1, 'no': 0},
    'airconditioning': {'yes': 1, 'no': 0},
    'prefarea': {'yes': 1, 'no': 0},
    'furnishingstatus': {'unfurnished': 0, 'semi-furnished': 1, 'furnished': 2}
}

# Apply encoding
housing_data = housing_data.replace(encoding_map)

print(f"\nAfter replace: {housing_data.shape}")
print(f"Data types:\n{housing_data.dtypes}")

# Convert to numeric - this will show what columns still have issues
housing_data = housing_data.apply(pd.to_numeric, errors='coerce')

print(f"\nAfter to_numeric: {housing_data.shape}")

# Check how many NaN values exist
nan_count = housing_data.isna().sum().sum()
print(f"Total NaN values: {nan_count}")

# Drop NaN rows
housing_data = housing_data.dropna()
print(f"After dropping NaN: {housing_data.shape}")

# ==================== TRAIN-TEST SPLIT ====================
print("[4/5] Splitting data...")

# Split FIRST
indices = np.arange(len(housing_data))
train_indices = np.random.RandomState(42).choice(indices, size=int(0.8 * len(housing_data)), replace=False)
test_indices = np.setdiff1d(indices, train_indices)

train_data_full = housing_data.iloc[train_indices].reset_index(drop=True)
test_data_full = housing_data.iloc[test_indices].reset_index(drop=True)

# THEN extract labels
train_labels = train_data_full.pop('price').values
test_labels = test_data_full.pop('price').values

print(f"Train features: {train_data_full.shape}, Train labels: {train_labels.shape}")
print(f"Test features: {test_data_full.shape}, Test labels: {test_labels.shape}")

# ==================== NORMALIZATION ====================
print("[5/5] Normalizing features...")

mean = train_data_full.mean()
std = train_data_full.std()

train_data_normalized = (train_data_full - mean) / std
test_data_normalized = (test_data_full - mean) / std

# Create directory if it doesn't exist
model_dir = '../models'
os.makedirs(model_dir, exist_ok=True)

# Save normalization parameters
np.save(os.path.join(model_dir, 'mean.npy'), mean.values)
np.save(os.path.join(model_dir, 'std.npy'), std.values)

print("✓ Data preprocessing complete!")
print(f"Final training data: {train_data_normalized.shape}")
print(f"Final test data: {test_data_normalized.shape}")

# ==================== MODEL DEFINITION ====================
print("\n[6/6] Building model...")

model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(train_data_normalized.shape[1],)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(1)
])

model.compile(optimizer='adam', loss='mse', metrics=['mae'])
print("✓ Model built and compiled")

# ==================== MODEL TRAINING ====================
print("\n[7/7] Training model...")

history = model.fit(
    train_data_normalized, train_labels,
    epochs=100,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)

# ==================== EVALUATION ====================
print("\n========== EVALUATION ==========")
loss, mae = model.evaluate(test_data_normalized, test_labels, verbose=0)
print(f"Test Loss (MSE): {loss:,.2f}")
print(f"Test MAE: {mae:,.2f}")

# ==================== SAVE MODEL ====================
print("\n========== SAVING MODEL ==========")
model.save(os.path.join(model_dir, 'house_price_model.keras'))
print(f"✓ Model saved to {model_dir}/house_price_model.keras")
