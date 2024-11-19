import React, { useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

// Load the model
let model = null;
tf.loadLayersModel('/model.json').then(loadedModel => {
    model = loadedModel;
}).catch(error => console.error('Failed to load model', error));

function ImageRecognizerComponent({ imageSrc, inputId }) {
    const imageRef = useRef(null);
    const inputRef = useRef(null);  // Ref for the input element

    async function recognizeImage() {
        if (!model) {
            console.log('Model not loaded yet');
            return;
        }

        const tensor = tf.browser.fromPixels(imageRef.current)
            .resizeNearestNeighbor([224, 224])
            .toFloat()
            .expandDims(0);

        try {
            const prediction = await model.predict(tensor);
            const predictedIndex = prediction.argMax(1).dataSync()[0];

            console.log(prediction)
            console.log(predictedIndex)

            // Set the value of the input element using the ref
            if (inputRef.current) {
                inputRef.current.value = predictedIndex;
            } else {
                console.error(`Input element with id ${inputId} not found`);
            }
        } catch (error) {
            console.error('Error during prediction', error);
        }
    }

    return (
        <div>
            <h5>Ukendt billede #1</h5>
            <img ref={imageRef} src={imageSrc} width="224" height="224" alt="To be recognized" /> <br />
            <button onClick={recognizeImage}>Kør billedegenkendelse...</button> <br />
            <input ref={inputRef} id={inputId} type="text" readOnly />
        </div>
    );
}

export default ImageRecognizerComponent;
