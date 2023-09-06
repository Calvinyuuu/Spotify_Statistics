import { useEffect } from 'react';


const params = new URLSearchParams(window.location.search);
const { protocol, port, hostname } = window.location;
const redirectURL = `${protocol}//${hostname}:${port}/callback`

async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirectURL);
    //need to change this depending on what im requesting.
    params.append("scope", "user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-recently-played user-top-read");
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

async function topTracks(token, length) {
    let endpoint = "https://api.spotify.com/v1/me/top/tracks?limit=10";
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

function populateTracks(tracks, term) {
    const list = document.getElementById(term)
    if (tracks.items != undefined) {
        tracks.items.forEach(element => {
            const item = document.createElement("li");
            item.textContent = element.name;
            list.appendChild(item);
        });
    }
}
function Statistics() {

    useEffect(() => {
        async function fetchData() {
            const code = params.get("code");
            if (!code) {
                redirectToAuthCodeFlow(clientId);
            } else {
                const accessToken = await getAccessToken(clientId, code);
                const short_term_tracks = await topTracks(accessToken, "short_term");
                console.log(short_term_tracks.items[0].album.images[0]);
                const medium_term_tracks = await topTracks(accessToken, "medium_term");
                const long_term_tracks = await topTracks(accessToken, "long_term");
                populateTracks(short_term_tracks, "short");
                populateTracks(medium_term_tracks, "medium");
                populateTracks(long_term_tracks, "long");
            }
        }

        fetchData();
    }, []);

    return (
        <div id="tracks">
            <h2>Past Month</h2>
            <ol id="short" />

            <h2>Past Six Months</h2>
            <ol id="medium" />

            <h2>Total history</h2>
            <ol id="long" />
        </div>
    );
}

export default Statistics;

//setting the album src
// <img id="picture" />
// const pic = document.getElementById("picture");
// pic.setAttribute("src", short_term_tracks.items[0].album.images[0].url);

    // useEffect(() => {
    //     async function fetchData() {
    //         const code = params.get("code");
    //         if (!code) {
    //             redirectToAuthCodeFlow(clientId);
    //         } else {
    //             const accessToken = await getAccessToken(clientId, code);
    //             const tracks = await topTracks(accessToken);
    //             populateTracks(tracks);
    //         }
    //     }

    //     fetchData();
    // }, []);