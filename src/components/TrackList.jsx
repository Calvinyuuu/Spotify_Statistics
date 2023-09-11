function TrackList(props) {
    const { tracks } = props

    return (
        <div
            className="block w-full max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700" >
            {tracks.length && (
                <div>
                    <ol className="w-full" start={4}>
                        {tracks.map((track) => (
                            <li className="w-full border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50" key={track.id}>
                                <div className="flex my-[5px] mr-4 h-[50px]">
                                    <img
                                        src={track.album.images[0].url}
                                        alt="track album cover"
                                        className="my-0 mr-[8px] h-[inherit] w-[inherit]" />
                                    <p>{track.name}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    )
}
export default TrackList;