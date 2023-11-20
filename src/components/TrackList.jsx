import {
  List, ListItem, Card
} from "@material-tailwind/react";
import { useContext } from "react";
import TrackContext from "./TrackContext";

export function TrackList({ tracks }) {
  const { setUri } = useContext(TrackContext);
  return (
    <Card className="w-full">
      <List className="text-[#003E5C] bg-[#BFD7EA]">
        {tracks.map((track, index) => (
          <ListItem
            key={index}
            className={`hover:bg-blue-gray-700 rounded-none w-full ${index !== tracks.length - 1 ? 'border-b border-black' : ''}`}
            onClick={() => setUri(track.uri)}
          >
            <div className="flex items-start">
              <div className="w-24 flex-shrink-0">
                <img src={track.album.images[0].url} alt={track.id} className="w-full h-auto" />
              </div>

              <div className="flex flex-col justify-center w-full pl-4">
                <h1 className="font-semibold xl:text-xl">{track.name}</h1>
                <h3 className="text-[#007BB8] font-light text-xs xl:text-base">{track.album.name}</h3>
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
export default TrackList;
