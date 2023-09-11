function Card(props) {
    const { track } = props;
    return (
        <div
            className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 p-5 m-3" key={track.id}>
            <h3>Spotify Logo</h3>
            <h2>Admit One replace with picture?</h2>
            <img
                src={track.album.images[0].url}
                alt="track album cover" />
            <div className="p-6">
                <h5
                    className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {track.name}
                </h5>
                <p>Remember to put the play button here</p>
            </div>
        </div>

    )
}

export default Card;