import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

app.use('/UnWrapped', express.static(path.join(__dirname, 'dist')));

//this is the old redirect to auth code flow
app.get('/authorize', (req,res) =>{
    const verifier = generateCodeVerifier(128);
    const challenge = generateCodeChallenge(verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    console.log(redirectURL);
    params.append("redirect_uri", redirectURL);
    //need to change this depending on what im requesting.
    params.append("scope", "streaming user-read-private user-read-email user-read-playback-state user-modify-playback-state user-library-read user-read-recently-played user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = Buffer.from(codeVerifier);
    const digest = crypto.createHash('sha256').update(data).digest();
    
    return Buffer.from(digest)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}