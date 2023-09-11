import {
  List, ListItem, Card, CardHeader,
  CardBody, Typography
} from "@material-tailwind/react";

export function TrackList({ tracks }) {
  return (
    <Card>
      <List className="bg-blue-gray-700">
        {tracks.map((track, index) => (
          <ListItem ripple={false} key={index} className="hover:bg-blue-gray-700 hover:opacity-100 pointer-events-none">
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
export default TrackList
// function TrackList(props) {
//   const { tracks } = props

//   return (
//     <div
//       className="block w-full max-w-[18rem] rounded-lg bg-blue-gray-700" >
//       {tracks.length && (
//         <div>
//           <ol className="w-full" start={4}>
//             {tracks.map((track) => (
//               <li className="w-full border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50" key={track.id}>
//                 <div className="flex my-[5px] mr-4 h-[50px]">
//                   <img
//                     src={track.album.images[0].url}
//                     alt="track album cover"
//                     className="my-0 mr-[8px] h-[inherit] w-[inherit]" />
//                   <p>{track.name}</p>
//                 </div>
//               </li>
//             ))}
//           </ol>
//         </div>
//       )}
//     </div>
//   )
// }
// export default TrackList;