import axios from "axios";

const YT_BASE = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.YOUTUBE_API_KEY;

export const fetchVideos = async (category) => {
  const searchRes = await axios.get(`${YT_BASE}/search`, {
    params: {
      part: "snippet",
      q: category,
      type: "video",
      order: "viewCount",
      videoDuration: "medium",
      maxResults: 50,
      key: API_KEY,
    },
  });

  const videoIds = searchRes.data.items
    .map(i => i.id.videoId)
    .filter(Boolean)
    .join(",");

  if (!videoIds) return [];

  const videoRes = await axios.get(`${YT_BASE}/videos`, {
    params: {
      part: "snippet,statistics",
      id: videoIds,
      key: API_KEY,
    },
  });

  const channelIds = [
    ...new Set(videoRes.data.items.map(v => v.snippet.channelId)),
  ].join(",");

  const channelRes = await axios.get(`${YT_BASE}/channels`, {
    params: {
      part: "snippet",
      id: channelIds,
      key: API_KEY,
    },
  });

  const avatarMap = {};
  channelRes.data.items.forEach(c => {
    avatarMap[c.id] = c.snippet.thumbnails?.default?.url || null;
  });

  return videoRes.data.items.map(v => ({
    id: v.id,
    title: v.snippet.title,
    description: v.snippet.description,
    publishedAt: v.snippet.publishedAt,
    channelTitle: v.snippet.channelTitle,
    viewCount: Number(v.statistics.viewCount || 0),
    channelThumbnail: avatarMap[v.snippet.channelId],
  }));
};
