import { useEffect } from 'react';

const clientId = ""; // Replace with your 
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

<div id="listParent">
    <div id="albumCoverParent">
        <div id="albumCoverChildren">
            <h3>Album Title</h3>
            <img>actual image</img>
        </div>
        <div id="albumCoverChildren">
            <h3>Album Title</h3>
            <img>actual image</img>
        </div>
        <div id="albumCoverChildren">
            <h3>Album Title</h3>
            <img>actual image</img>
        </div>
    </div>

    <ol>
        <li></li>
        <li></li>
        <li></li>
    </ol>
</div>

function populateTracks(tracks, term) {
    const listParent = document.getElementById(term);
    const albumCoverParent = document.createElement("div");
    const trackTitles = document.createElement("ol");
    let counter = 0;
    trackTitles.start = 4;

    if (tracks.items != undefined) {
        tracks.items.forEach(element => {
            //this statement is to display the album cover of the top three songs on the list
            if (counter < 3) {
                //optional set id
                const albumCoverChild = document.createElement("div");
                const albumTitle = document.createElement("h3");
                const albumImage = document.createElement("img");

                albumImage.setAttribute("src", element.album.images[0].url);
                albumTitle.textContent = element.name;
                albumCoverChild.appendChild(albumTitle);
                albumCoverChild.appendChild(albumImage);

                albumCoverParent.appendChild(albumCoverChild);
            } else {
                //this creates a simple list element to display the track name
                const item = document.createElement("li");
                item.textContent = element.name;
                trackTitles.appendChild(item);
            }

            counter++;
        });
    }
    listParent.appendChild(albumCoverParent);
    listParent.appendChild(trackTitles);
}

function tallyArtists(tracks) {
    const tally = {};
    // Initialize an empty array for combined artists
    const combinedArtists = [];

    // Iterate through the JSON data
    tracks.forEach(item => {
        // Concatenate the artists array with the combined artists array
        combinedArtists.push(...item.artists);
    });

    combinedArtists.forEach(item => {
        if (tally[item.name]) {
            tally[item.name]++;
        } else {
            tally[item.name] = 1;
        }
    });

    // The combinedArtists array now contains all the artists from the JSON data
    console.log(tally);
    const dataArray = Object.entries(tally);
    dataArray.sort((a, b) => b[1] - a[1]);
    return dataArray;
}
function populateTopArtists(artists) {
    const list = document.getElementById("artists");
    artists.forEach(element => {
        const item = document.createElement("li");
        item.textContent = element[0];
        list.appendChild(item);
    })
}

function Statistics() {

    useEffect(() => {
        async function fetchData() {
            const code = params.get("code");
            if (!code) {
                redirectToAuthCodeFlow(clientId);
            } else {
                try {
                    const accessToken = await getAccessToken(clientId, code);

                    const [short_term_tracks, medium_term_tracks, long_term_tracks] = await Promise.all([
                        topTracks(accessToken, "short_term"),
                        topTracks(accessToken, "medium_term"),
                        topTracks(accessToken, "long_term"),
                    ]);
                    console.log(short_term_tracks);
                    const combineTerms = [...short_term_tracks.items, ...medium_term_tracks.items, ...long_term_tracks.items];
                    const talliedArtists = tallyArtists(combineTerms);
                    populateTopArtists(talliedArtists.slice(0, 10));

                    populateTracks(short_term_tracks, "short");
                    populateTracks(medium_term_tracks, "medium");
                    populateTracks(long_term_tracks, "long");

                } catch (error) {
                    console.log(error);
                }
            }
        }

        fetchData();
    }, []);

    return (
        <div id="tracks">
            <div>
                <h2>Most listened to Artists from recent tracks</h2>
                <ol id="artists" />
            </div>

            <div>
                <h2>Past Month</h2>
                <div id="short" />
            </div>

            <div>
                <h2>Past Six Months</h2>
                <div id="medium" />
            </div>

            <div>
                <h2>Total history</h2>
                <div id="long" />
            </div>
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