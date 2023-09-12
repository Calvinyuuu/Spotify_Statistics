import {
  List, ListItem, Card, CardHeader,
  CardBody, Typography
} from "@material-tailwind/react";
import { useContext } from "react";
import TrackContext from "./TrackContext";

export function TrackList({ tracks }) {
  const { setUri } = useContext(TrackContext);
  return (
    <Card>
      <List className="text-[#003E5C] bg-[#BFD7EA]">
        {tracks.map((track, index) => (
          <ListItem key={index} className="hover:bg-blue-gray-700" onClick={() => setUri(track.uri)}>
            <div className="flex">
              <div className="w-1/3">
                <img src={track.album.images[0].url} alt={track.id} />
              </div>
              <div className="text-center m-auto w-2/3 pl-4">
                <h1 className="font-bold text-2xl"> {index + 4 + ". " + track.name}</h1>
                <h3 className="text-[#007BB8] font-semibold">{track.album.name}</h3>
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
export default TrackList;