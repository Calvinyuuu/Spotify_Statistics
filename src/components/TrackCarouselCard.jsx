import { Card } from "@material-tailwind/react";
import { useContext } from "react";
import TrackContext from "./TrackContext";
import spotify_black from "../assets/Spotify_Logo_CMYK_Black.png";

function TrackCard({ track, term }) {
    const { setUri } = useContext(TrackContext);
    return (
        <Card className="text-[#003E5C] shadow-none bg-transparent p-3 hover:cursor-pointer m-auto"
            onClick={() => setUri(track.uri)}>
            <div id="header">
                <div className="flex justify-between items-center">
                    <img src={spotify_black} className="h-7" alt="Spotify Logo" />
                    <h1 className="my-auto font-semibold text-xl">{term}</h1>
                </div>
                <div className="font-bold text-xl my-1 text-center">
                    <h1>GENERAL ADMISSION</h1>
                </div>
            </div>

            <div id="body">
                <img src={track.album.images[0].url} alt={track.id} className="w-4/5 mx-auto pt-3" />
            </div>

            <div id="footer" className="mt-2 font-semibold">
                <h2 className="text-center">{track.name}</h2>
                <div className="flex flex-wrap gap-3 justify-center my-4">
                    {track.artists.map((artist) => (
                        <h2 className="text-center text-sm font-light" key={artist.id}>
                            {artist.name}
                        </h2>
                    ))}
                </div>
            </div>
        </Card>

    );
}

export default TrackCard;