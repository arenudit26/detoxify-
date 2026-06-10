import { fetchVideos } from "../services/videos.service.js";
import * as filterService from "../services/filter.service.js";

export const getFeed = async (req, res) => {
  console.log("🔥 FEED HIT", req.query);

  try {
    const category = req.query.category || "gaming";

    const allVideos = await fetchVideos(category);

    const scored = filterService.filterVideos(allVideos, category, {
      minScore: 0,
    });

    scored.sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.publishedAt) - new Date(a.publishedAt)
    );

    res.json({
      count: scored.length,
      results: scored.slice(0, 50),
    });
  } catch (err) {
    console.error("🔥 FEED ERROR:", err);
    res.status(500).json({
      error: "Feed failed",
      message: err.message,
    });
  }
};













