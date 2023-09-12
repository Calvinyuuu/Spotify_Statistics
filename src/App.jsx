import { Statistics, TrackContext } from './components';
import { useState } from 'react';


function App() {
  const [currentTrack, setCurrentTrack] = useState("");


  return (
    <TrackContext.Provider value={{ uri: currentTrack, setUri: setCurrentTrack }}>
      <h1>Welcome to shitty spotify wrapped</h1>
      <Statistics />
    </TrackContext.Provider>
  )
}



export default App
