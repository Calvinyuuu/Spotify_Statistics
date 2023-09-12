import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import { useContext } from "react";
import TrackContext from "./TrackContext";

function TrackCard({ track }) {
    const { setUri } = useContext(TrackContext);
    return (
        <Card className="bg-blue-gray-700 w-[inherit] h-[inherit] flex flex-col justify-center items-center p-3"
            onClick={() => setUri(track.uri)}>
            <CardHeader floated={false} className="bg-blue-gray-700" shadow={false}>

                <img src={track.album.images[0].url} alt={track.id} />
            </CardHeader >

            <CardBody className="text-center">
                <Typography variant="h4" color="black" className="mb-2">
                    {track.name}
                </Typography>
            </CardBody>

            <CardFooter className="flex flex-col justify-center gap-7 pt-2">
                <div className="flex gap-3">
                    {track.artists.map((artist) => (
                        <Typography variant="h4" color="blue-gray" className="text-center" key={artist.id}>
                            {artist.name}
                        </Typography>
                    ))}
                </div>
            </CardFooter>
        </Card >
    );
}

export default TrackCard;