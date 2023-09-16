import {
  List, ListItem, Card
} from "@material-tailwind/react";
import { useContext } from "react";
import TrackContext from "./TrackContext";

export function TrackList({ tracks }) {
  const { setUri } = useContext(TrackContext);
  return (
    <Card>
      <List className="text-[#003E5C] bg-[#BFD7EA]">
        {tracks.map((track, index) => (
          <ListItem
            key={index}
            className={`hover:bg-blue-gray-700 rounded-none ${index !== tracks.length - 1 ? 'border-b border-black' : ''}`}
            onClick={() => setUri(track.uri)}
          >

            <div className="w-full">
              <img src={track.album.images[0].url} alt={track.id} />
            </div>

            <div className="text-center w-full pl-4">
              <h1 className="font-semibold"> {index + 4 + ". " + track.name}</h1>
              {/* should i keep this colour for the artist text? */}
              <h3 className="text-[#007BB8] font-light text-xs">{track.album.name}</h3>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
export default TrackList;
