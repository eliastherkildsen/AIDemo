import React from 'react';
import ImageRecognizerComponent from './ImageRecognizerComponent';
import './App.css';

import exampleImage1 from './assets/u1.jpg';
import exampleImage2 from './assets/u2.jpg';
import exampleImage3 from './assets/u3.jpg';
import exampleImage4 from './assets/u4.jpg';
import exampleImage5 from './assets/u5.jpg';

const images = [exampleImage1, exampleImage2, exampleImage3, exampleImage4, exampleImage5];

function App() {
    return (
        <div>
            <h1>Billedegenkendelse - {images.length} ukendte billeder</h1>
            <div className="image-wrapper">
                {images.map((src, index) => (
                    <div key={index}>
                        <ImageRecognizerComponent
                            inputId={`input-${index}`}
                            imageSrc={src}
                            labels={["Bear", "Cat", "Indecisive"]}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;