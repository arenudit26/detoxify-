import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api"; // adjust path if needed

export default function Feed() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();


  
  

  useEffect(() => {
    console.log("CLIENT: Category from URL ->", category);
    if (!category) return;

    (async () => {
      try {
        const url = `${API_BASE}/feed?category=${encodeURIComponent(category)}`;
        console.log("CLIENT: about to fetch ->", url);
        const res = await fetch(url, {
          method: "GET",
          credentials: "include"
        });
        
        console.log("CLIENT: network status:", res.status);
        const data = await res.json();
        console.log("CLIENT: fetched data:", data);
        console.log("CLIENT: First 3 videos sample:");
        
        const videoArray = data.results || data.data || (Array.isArray(data) ? data : []);
        const sample = videoArray.slice(0, 3);
        
        sample.forEach((vid, idx) => {
          console.log(`Video ${idx}:`, vid);
          console.log(`Video ${idx} has channelThumbnail?:`, !!vid.channelThumbnail);
        });
        
        console.log("CLIENT: setting videos array:", videoArray);
        console.log("CLIENT: videos array length:", videoArray.length);
        setVideos(videoArray);
        
      } catch (err) {
        console.error("CLIENT: fetch error:", err);
      }
    })();
  }, [category]);

  const handleHome = () => {
  navigate("/");
};

  const getCategoryEmoji = (cat) => {
    const emojis = {
      gaming: "🎮",
      coding: "💻",
      fitness: "💪",
      music: "🎵"
    };
    return emojis[cat?.toLowerCase()] || "📹";
  };

  const getTimeAgo = (publishedAt) => {
    if (!publishedAt) return `${Math.floor(Math.random() * 7 + 1)} days ago`;
    
    try {
      const publishedDate = new Date(publishedAt);
      const now = new Date();
      const diffMs = now - publishedDate;
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHour = Math.floor(diffMin / 60);
      const diffDay = Math.floor(diffHour / 24);
      const diffWeek = Math.floor(diffDay / 7);
      const diffMonth = Math.floor(diffDay / 30);
      const diffYear = Math.floor(diffDay / 365);

      if (diffYear > 0) return `${diffYear} year${diffYear > 1 ? 's' : ''} ago`;
      if (diffMonth > 0) return `${diffMonth} month${diffMonth > 1 ? 's' : ''} ago`;
      if (diffWeek > 0) return `${diffWeek} week${diffWeek > 1 ? 's' : ''} ago`;
      if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
      if (diffHour > 0) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
      if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
      return 'Just now';
    } catch (error) {
      console.error('Error parsing date:', publishedAt, error);
      return `${Math.floor(Math.random() * 7 + 1)} days ago`;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* YouTube-style Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left - Menu & Logo */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-full">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </button>
            <div className="flex items-center gap-1">
              
              <svg className="w-7 h-5" viewBox="0 0 90 20" fill="red">
                <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 0 14.285 0 14.285 0C14.285 0 5.35042 0 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C0 5.35042 0 10 0 10C0 10 0 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="red"/>
                <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"/>
              </svg>
              
              <button className="text-xl font-semibold ml-1" onClick={handleHome}>DETOXIFY</button>
              
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:flex">
            <div className="flex w-full">
              <input 
                type="text" 
                placeholder="Search"
                className="flex-1 bg-black border border-gray-700 rounded-l-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
              <button className="bg-gray-800 border border-gray-700 border-l-0 rounded-r-full px-6 hover:bg-gray-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </button>
              
            </div>
          </div>

          {/* Right - Icons */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/10 rounded-full">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
              </svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-semibold">
              U
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="fixed top-14 left-0 right-0 z-40 bg-black border-b border-gray-900">
        <div className="flex items-center gap-3 px-4 py-3 overflow-x-auto">
          <button className="bg-white text-black px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-gray-200">
            All
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap">
            Gaming
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap">
            Live
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap">
            Music
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap">
            Playlists
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap">
            Mixes
          </button>
          <span className="text-2xl">{getCategoryEmoji(category)}</span>
          <span className="text-white/70 text-sm font-medium capitalize">{category}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-28 px-6">
        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-gray-500 text-lg">Loading....</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
            {videos.map((v, i) => (
              <div key={i} className="cursor-pointer">
                <a 
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {/* Thumbnail */}
                  <div className="relative rounded-xl overflow-hidden mb-3 group">
                    {v.id ? (
                      <img 
                        src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                        alt={v.title || 'Video thumbnail'}
                        className="w-full aspect-video object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : null}
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-semibold px-1 py-0.5 rounded">
                      {Math.floor(Math.random() * 20 + 5)}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="flex gap-3">
                    {/* Channel Avatar */}
                    <div className="flex-shrink-0">
                      <img 
                        src={v.channelThumbnail || `https://ui-avatars.com/api/?name=${encodeURIComponent(v.channelTitle || 'C')}&background=random&size=128`}
                        alt={v.channelTitle}
                        className="w-9 h-9 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(v.channelTitle || 'C')}&background=random&size=128`;
                        }}
                      />
                    </div>

                    {/* Video Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white line-clamp-2 mb-1 leading-5">
                        {v.title || 'Untitled Video'}
                      </h3>
                      <p className="text-xs text-gray-400 hover:text-gray-300 mb-0.5">
                        {v.channelTitle || v.channelName || v.channel || 'Channel Name'}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <span>
                          {v.viewCount 
                            ? (v.viewCount >= 1000000 
                                ? `${(v.viewCount / 1000000).toFixed(1)}M views` 
                                : `${Math.floor(v.viewCount / 1000)}K views`)
                            : `${Math.floor(Math.random() * 900 + 100)}K views`}
                        </span>
                        <span>•</span>
                        <span>{getTimeAgo(v.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

