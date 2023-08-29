import { useState } from 'react';

function Statistics() {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    const checkScriptLoaded = () => {
        if (!scriptLoaded) {
            const script = document.createElement('script');
            script.src = '/script.js';
            script.async = true;
            script.onload = () => {
                setScriptLoaded(true);
            };
            document.body.appendChild(script);
        }
    };

    return (
        <div>
            <button onClick={checkScriptLoaded}>Authenticate</button>
        </div>
    );
}

export default Statistics; 