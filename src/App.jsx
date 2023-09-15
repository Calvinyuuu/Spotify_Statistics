import { Statistics, TrackContext, Hero } from './components';
import { useState } from 'react';


function App() {
  const [currentTrack, setCurrentTrack] = useState("");


  return (
    <TrackContext.Provider value={{ uri: currentTrack, setUri: setCurrentTrack }}>
      <Hero />
      <Statistics />
    </TrackContext.Provider>
  )
}



export default App
