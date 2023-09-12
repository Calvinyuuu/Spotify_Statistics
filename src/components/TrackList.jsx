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
      <List className="bg-blue-gray-700">
        {tracks.map((track, index) => (
          <ListItem ripple={false} key={index} className="hover:bg-blue-gray-700" onClick={() => setUri(track.uri)}>
            <CardHeader floated={false} className="w-1/3">
              <img src={track.album.images[0].url} alt={track.id} />
            </CardHeader >
            <CardBody className="text-center w-2/3">
              <Typography variant="h4" color="blue-gray" className="mb-2">
                {index + 4 + ". " + track.name}
              </Typography>
              <Typography color="blue-gray" className="font-medium" textGradient>
                {track.album.name}
              </Typography>
            </CardBody>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
export default TrackList;