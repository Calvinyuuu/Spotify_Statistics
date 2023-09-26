import { Card } from "@material-tailwind/react";
import { useContext } from "react";
import TrackContext from "./TrackContext";
import { spotify_black } from "../assets";

function TrackCard({ track, term }) {
    const { setUri } = useContext(TrackContext);
    return (
        <Card className="text-[#003E5C] shadow-none bg-transparent p-3 hover:cursor-pointer m-auto xl:h-full xl:justify-center"
            onClick={() => setUri(track.uri)}>
            <div id="header" className="max-h-2/6 pt-2">
                <div className="flex justify-between items-center">
                    <img src={spotify_black} className="h-7 xl:h-10" alt="Spotify Logo" />
                    <h1 className="my-auto font-semibold text-xl xl:text-2xl">{term}</h1>
                </div>
                <div className="font-bold text-xl my-1 text-center xl:text-4xl">
                    <h1>GENERAL ADMISSION</h1>
                </div>
            </div>

            <div id="body" className="2xl:flex 2xl:w-3/4 2xl:m-auto">
                <img src={track.album.images[0].url} alt={track.id} className="w-4/5 mx-auto pt-3" />
            </div>

            <div id="footer" className="mt-2 font-semibold">
                <h2 className="text-center w-3/4 m-auto xl:text-2xl">{track.name}</h2>
                <div className="flex flex-wrap gap-3 justify-center my-4">
                    {track.artists.map((artist) => (
                        <h2 className="text-center text-sm font-light xl:text-xl" key={artist.id}>
                            {artist.name}
                        </h2>
                    ))}
                </div>
            </div>
        </Card>

    );
}

export default TrackCard;