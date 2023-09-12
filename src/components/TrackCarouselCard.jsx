import { Card } from "@material-tailwind/react";
import { useContext } from "react";
import TrackContext from "./TrackContext";
import spotify_black from "../assets/Spotify_Logo_CMYK_Black.png";

function TrackCard({ track, term }) {
    const { setUri } = useContext(TrackContext);
    return (
        <Card className="text-[#003E5C] bg-[#BFD7EA] w-[inherit] h-[inherit] flex flex-col justify-center items-center p-3 hover:cursor-pointer"
            onClick={() => setUri(track.uri)}>
            <div>
                <div>
                    <div className="flex justify-between">
                        <img src={spotify_black} className="h-10"></img>
                        <h1 className="my-auto font-semibold text-4xl">{term}</h1>
                    </div>
                    <div className="font-bold text-5xl my-2 text-center">
                        <h1>GENERAL ADMISSION</h1>
                    </div>
                </div>
                <div>
                    <img src={track.album.images[0].url} alt={track.id} />
                </div>
                <div className="my-3 font-semibold">
                    <h2 className="text-center mb-0">{track.name}</h2>
                    <div className="flex gap-3 justify-center">
                        {track.artists.map((artist) => (
                            <h2 className="text-center" key={artist.id}>
                                {artist.name}
                            </h2>
                        ))}
                    </div>
                </div>
            </div>
        </Card >
    );
}

export default TrackCard;