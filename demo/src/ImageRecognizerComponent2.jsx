import React, { useRef } from 'react';
import exampleImage from './assets/u2.jpg';
import * as tf from '@tensorflow/tfjs';

let model = null;
tf.loadLayersModel('/model.json').then(loadedModel => {
    model = loadedModel;
}).catch(error => console.error('Failed to load model', error));

function ImageRecognizerComponent2() {
    const imageRef = useRef(null);

    async function recognizeImage() {
        // 
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
            const probabilities = await prediction.data();
            // Get the class index with the highest probability
            const predictedIndex = prediction.argMax(1).dataSync()[0];
            document.getElementById('i2').value = predictedIndex;
           
        } catch (error) {
            console.error('Error during prediction', error);
        }
    }

    return (
        <div>
            <h5>Ukendt billede #2</h5>
            <img ref={imageRef} src={exampleImage} width="224" height="224" /> <br/>
            <button onClick={recognizeImage}>Kør billedegenkendelse...</button> <br/>
            <input id="i2" type="text"  readOnly />
        </div>
    );
}

export default ImageRecognizerComponent2;
