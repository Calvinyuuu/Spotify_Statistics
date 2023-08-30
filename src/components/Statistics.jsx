import { useEffect, useState } from 'react';


const params = new URLSearchParams(window.location.search);

async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
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
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function topTracks(token) {
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

function populateTracks(tracks) {
    const list = document.getElementById("trackList")
    if (tracks.items != undefined) {
        tracks.items.forEach(element => {
            const item = document.createElement("li");
            item.textContent = element.name;
            list.appendChild(item);
        });
    }
}
const code = params.get("code");
function Statistics() {
    useEffect(() => {
        async function fetchData() {
            if (!code) {
                redirectToAuthCodeFlow(clientId);
            } else {
                const accessToken = await getAccessToken(clientId, code);
                if (accessToken != undefined) {
                    const tracks = await topTracks(accessToken);
                    populateTracks(tracks);
                }
            }
        }

        fetchData();
    }, []);

    return (
        <div id="tracks">
            <ol id="trackList">

            </ol>
        </div>
    );
}

export default Statistics;
