import express from "express";
import { google } from "googleapis";

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:5000/auth/google/callback"
);

router.get("/google", (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/youtube.readonly",
            "profile",
            "email",
        ],
    });

    res.redirect(url);
});
router.get("/google/callback", async (req, res) => {
    const code = req.query.code;

    try {
        const { tokens } = await oauth2Client.getToken(code);

        oauth2Client.setCredentials(tokens);
        global.youtubeAuth = oauth2Client;
        const youtube = google.youtube({
            version: "v3",
            auth: oauth2Client,
        });

        const response = await youtube.subscriptions.list({
            part: "snippet",
            mine: true,
            maxResults: 10,
        });

        console.log(response.data);

        console.log("ACCESS TOKEN:", tokens.access_token);

        // res.send("Google authentication successful!");
        const encodedData = encodeURIComponent(
            JSON.stringify(response.data.items)
        );

        res.redirect("http://localhost:5173/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Authentication failed");
    }
});

export default router;