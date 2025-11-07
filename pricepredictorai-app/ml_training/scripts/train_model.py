import numpy as np
import pandas as pd
import tensorflow as tf

housing_data = pd.read_csv('../data/dataset.csv')

# Data Preprocessing
housing_data = housing_data.dropna()
