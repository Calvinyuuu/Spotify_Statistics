import { createContext } from "react";

const TrackContext = createContext({
    uri: "",
    setUri: () => { }
});

export default TrackContext;