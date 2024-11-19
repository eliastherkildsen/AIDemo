import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

function ImageRecognizerComponent({ imageSrc, inputId, labels }) {
    const imageRef = useRef(null);
    const inputRef = useRef(null);
    const [predictions, setPredictions] = useState([]);
    const [isModelLoaded, setIsModelLoaded] = useState(false);

    useEffect(() => {
        tf.loadLayersModel('/model.json')
            .then(loadedModel => {
                window.model = loadedModel;
                setIsModelLoaded(true);
            })
            .catch(error => console.error('Failed to load model', error));
    }, []);

    async function recognizeImage() {
        if (!window.model) {
            console.log('Model not loaded yet');
            return;
        }

        try {
            const tensor = tf.browser.fromPixels(imageRef.current)
                .resizeNearestNeighbor([224, 224])
                .toFloat()
                .expandDims(0);

            const prediction = await window.model.predict(tensor).data();
            const predictionArray = Array.from(prediction);

            // Pair predictions with labels and sort by probability
            const sortedPredictions = predictionArray
                .map((probability, index) => ({
                    label: labels[index],
                    probability: (probability * 100).toFixed(2), // Convert to percentage
                }))
                .sort((a, b) => b.probability - a.probability);

            setPredictions(sortedPredictions);

            if (inputRef.current) {
                inputRef.current.value = sortedPredictions[0].label;
            }
        } catch (error) {
            console.error('Error during prediction:', error);
        }
    }

    return (
        <div className="image-container">
            <h5>Ukendt billede</h5>
            <img
                ref={imageRef}
                src={imageSrc}
                width="224"
                height="224"
                alt="To be recognized"
            />


            <div className="image-container-footer">
                <button onClick={recognizeImage} disabled={!isModelLoaded}>
                    {isModelLoaded ? 'Kør' : 'Indlæser model...'}
                </button>
                <input
                    ref={inputRef}
                    id={inputId}
                    type="text"
                    readOnly
                    placeholder="Prediction will appear here"
                />
            </div>

            {predictions.length > 0 && (
                <div className="predictions">
                    <h6>Predictions:</h6>
                    <ul>
                        {predictions.map(({ label, probability }, index) => (
                            <li key={index}>
                                <strong>{label}</strong>: {probability}%
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ImageRecognizerComponent;
