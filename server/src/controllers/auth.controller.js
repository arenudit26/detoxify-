import admin from "../config/firebaseAdmin.js";

export const authCheck = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ authenticated: false });
    }

    const idToken = authHeader.split(" ")[1];

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    return res.json({
      authenticated: true,
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email || "",
        name: decodedToken.name || "",
        picture: decodedToken.picture || "",
      },
    });
  } catch (err) {
    console.error("authCheck error:", err.message);
    return res.status(401).json({ authenticated: false });
  }
};
