import tensorflow as tf
import numpy as np
import tf2onnx, onnx

# 1. Create model
model = tf.keras.Sequential([
    tf.keras.layers.InputLayer(input_shape=(4,)),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(4, activation='sigmoid')
])

# 2. Compile model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# 3. Save model in H5 format
model_path = "Site/model_brabo.h5"
model = tf.keras.models.load_model(model_path)
print(model.input_shape)

# 4. Convert to ONNX
onnx_model, _ = tf2onnx.convert.from_keras(model)

# 5. Save ONNX model
onnx_path = "model_brabo.onnx"
onnx.save(onnx_model, onnx_path)