import { useEffect, useState, useContext } from 'react';
import TrackCard from './TrackCarouselCard';
import TrackList from './TrackList';
import { CarouselDefault } from './Carousel';
import Player from './Player';
import TrackContext from './TrackContext';

const clientId = import.meta.env.VITE_API_KEY;
const params = new URLSearchParams(window.location.search);
const { protocol, port, hostname } = window.location;
let redirectURL = ""

if (process.env.NODE_ENV === 'development') {
    redirectURL = `${protocol}//${hostname}:${port}/UnWrapped/callback`;
} else {
    redirectURL = "http://calvinyuuu.github.io/UnWrapped/callback";
}

async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    console.log(redirectURL);
    params.append("redirect_uri", redirectURL);
    //need to change this depending on what im requesting.
    params.append("scope", "streaming user-read-private user-read-email user-read-playback-state user-modify-playback-state user-library-read user-read-recently-played user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectURL);
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function getTopTracks(token, length) {
    let endpoint = "https://api.spotify.com/v1/me/top/tracks?limit=20"; //time_range defaults to medium_term if not specified
    if (length != undefined) {
        endpoint = endpoint += "&time_range=" + length
    }
    //maybe do a try catch here

    if (token) {
        const result = await fetch(endpoint, {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        return await result.json();
    } else {
        return "";
    }
}

function populateTracks(tracks, duration) {
    try {
        const tracksWithHeaders = tracks.items.slice(0, 3);
        const tracksInList = tracks.items.slice(3, 20);

        return (
            <div className="flex flex-col w-full mt-5 xl:flex-row xl:w-3/4 xl:m-auto xl:gap-x-2 xl:pb-3 xl:h-screen xl:self-center">
                <div className="flex h-4/5 w-4/6 mx-auto bg-[#BFD7EA] rounded-t-lg xl:rounded-lg xl:content-center">
                    <CarouselDefault>
                        {tracksWithHeaders.length && (
                            tracksWithHeaders.map((track) => (
                                <TrackCard track={track} term={duration} key={track.id} />
                            ))
                        )}
                    </CarouselDefault>
                </div>

                <div className="flex h-[42vh] w-4/6 mx-auto overflow-y-auto rounded-b-lg xl:rounded-lg xl:h-4/5">
                    <TrackList tracks={tracksInList} />
                </div>

            </div>

        );



    } catch (error) {
        error
    }
}

function Statistics() {
    const [shortTerm, setShortTerm] = useState([]);
    const [mediumTerm, setMediumTerm] = useState([]);
    const [longTerm, setLongTerm] = useState([]);
    const [token, setAccessToken] = useState("");
    const { uri } = useContext(TrackContext);

    useEffect(() => {
        async function fetchData() {
            const code = params.get("code");
            if (!code) {
                redirectToAuthCodeFlow(clientId);
            } else {
                try {
                    window.history.pushState({}, null, "/");
                    const accessToken = await getAccessToken(clientId, code);
                    const [short_term_tracks, medium_term_tracks, long_term_tracks] = await Promise.all([
                        getTopTracks(accessToken, "short_term"),
                        getTopTracks(accessToken, "medium_term"),
                        getTopTracks(accessToken, "long_term"),
                    ]);
                    setAccessToken(accessToken);
                    setShortTerm(short_term_tracks);
                    setMediumTerm(medium_term_tracks);
                    setLongTerm(long_term_tracks);

                } catch (error) {
                    error
                }
            }
        }

        fetchData();
    }, []);

    return (
        <div id="tracks" className="max-w-screen">
            <div>
                {populateTracks(shortTerm, "Last Month")}
            </div>

            <div>
                {populateTracks(mediumTerm, "Last Six Months")}
            </div>

            <div>
                {populateTracks(longTerm, "Last Few Years")}
            </div>

            <div className="sticky bottom-0">
                <Player accessToken={token} trackUri={uri} />
            </div>
        </div>
    );
}

export default Statistics;