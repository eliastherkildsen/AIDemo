import React from 'react';

import ImageRecognizerComponent from './ImageRecognizerComponent'

import exampleImage1 from './assets/u1.jpg';
import exampleImage2 from './assets/u2.jpg';
import exampleImage3 from './assets/u3.jpg';
import exampleImage4 from './assets/u4.jpg';
import exampleImage5 from './assets/u5.jpg';

const images = [exampleImage1, exampleImage2, exampleImage3, exampleImage4, exampleImage5];

function App() {
  return (
    <div>
      <h1> Billedegenkendelse - {images.length} ukendte billeder</h1>
      <table>    
        <tr> 
          {images.map((src, index) => (
            <td key={index}>
              <ImageRecognizerComponent inputId={`input-${index}`} imageSrc={src} />
            </td>
          ))}
        </tr>
      </table>
    </div>
  );
}

export default App;