import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";

function TrackCard({ track }) {
    return (
        <Card className="bg-blue-gray-700 w-[inherit] h-[inherit] flex flex-col justify-center items-center p-3">
            <CardHeader floated={false} className="bg-blue-gray-700" shadow={false}>
                <Typography variant="h4" color="black" className="mb-2">
                    {track.name}
                </Typography>
            </CardHeader >

            <CardBody className="text-center">
                <img src={track.album.images[0].url} alt={track.id} />
            </CardBody>

            <CardFooter className="flex flex-col justify-center gap-7 pt-2">
                <div className="flex gap-3">
                    {track.artists.map((track) => (
                        <Typography variant="h4" color="blue-gray" className="text-center">
                            {track.name}
                        </Typography>
                    ))}
                </div>
                <Typography color="blue-gray" className="font-medium text-center" textGradient>
                    {track.album.name}
                </Typography>
            </CardFooter>
        </Card >
    );
}

export default TrackCard;

// function Card({ track }) {
//     return (
//         <div
//             className=" rounded-lg bg-blue-gray-700 w-[inherit] flex flex-col justify-center items-center p-3" key={track.id}>
//             <h3>Spotify Logo</h3>
//             <h2>Admit One replace with picture?</h2>
//             <img
//                 src={track.album.images[0].url}
//                 alt="track album cover" />
//             <div className="p-6">
//                 <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
//                     {track.name}
//                 </h5>
//                 <p>Remember to put the play button here</p>
//             </div>
//         </div>

//     )
// }

// export default Card;