import os
import numpy as np
import tensorflow as tf
from django.conf import settings

ML_MODEL = None
MEAN = None
STD = None

def get_model_and_stats():
    global ML_MODEL, MEAN, STD
    if ML_MODEL is not None and MEAN is not None and STD is not None:
        return ML_MODEL, MEAN, STD

    model_path = os.path.join(
        settings.BASE_DIR, "ml_training", "models", "house_price_model.h5"
    )
    mean_path = os.path.join(settings.BASE_DIR, "ml_training", "models", "mean.npy")
    std_path = os.path.join(settings.BASE_DIR, "ml_training", "models", "std.npy")

    ML_MODEL = tf.keras.models.load_model(model_path, compile=False)
    MEAN = np.load(mean_path)
    STD = np.load(std_path)
    return ML_MODEL, MEAN, STD
