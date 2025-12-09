import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FilterBar({ initial = "gaming" }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [category, setCategory] = useState(initial);
  const navigate = useNavigate();

     const BACKEND = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
  
  useEffect(() => {
    fetch(`${BACKEND}/auth/status`, {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error("not ok");
        return res.json();
      })
      .then(data => setLoggedIn(Boolean(data.loggedIn)))
      .catch(() => setLoggedIn(false));
  }, []);
  
  const handleLogin = () => {
    const loginUrl = `${BACKEND}/auth/google`;
console.log("CLIENT: redirecting to login url:", loginUrl);
  window.location.href = loginUrl;
  };
  
  const handleLogout = () => {
    fetch(`${BACKEND}/auth/logout`, {
      method: "POST",
      credentials: "include"
    })
      .then(() => setLoggedIn(false))
      .catch(() => setLoggedIn(false));
  };
  
  const handleFilter = () => {
    navigate(`/feed?category=${encodeURIComponent(category)}`);
    console.log("CLIENT: your selected category is:", category);
  };
  
  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Top Navigation Bar */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-4 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <svg className="w-8 h-6" viewBox="0 0 90 20" fill="red">
            <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 0 14.285 0 14.285 0C14.285 0 5.35042 0 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C0 5.35042 0 10 0 10C0 10 0 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="red"/>
            <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"/>
          </svg>
          <span className="text-2xl font-black text-white tracking-tight">DETOXIFY</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm">
          <button className="text-gray-400 hover:text-white transition-colors font-medium">Home</button>
          <button className="text-gray-400 hover:text-white transition-colors font-medium">Features</button>
          <button className="text-gray-400 hover:text-white transition-colors font-medium">About</button>
          <button className="text-gray-400 hover:text-white transition-colors font-medium">Support</button>
        </div>

        <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all">
          Get Started
        </button>
      </nav>

      {/* Main Content Area */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Hero Section */}
          <div className="text-left space-y-6">
            <div className="inline-block px-4 py-2 bg-red-600/20 border border-red-600/30 rounded-full text-red-400 text-sm font-semibold mb-4">
              ✨ AI-Powered Content Filter
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black text-white leading-tight">
              Clean Your<br/>
              <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                YouTube Feed
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
              Filter toxic content, discover quality discussions, and enjoy a healthier viewing experience with our intelligent content moderation.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-medium">AI-Powered Filtering</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-medium">Real-Time Protection</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-medium">100% Privacy Safe</span>
              </div>
            </div>
          </div>

          {/* Right Side - Filter Card */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-3xl blur opacity-20"></div>
            
            <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              {/* Category Selection */}
              <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-3 tracking-wide">
                  Select Content Category
                </label>
                <div className="relative">
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200 cursor-pointer hover:bg-white/15 appearance-none text-base font-medium"
                  >
                    <option value="gaming" className="bg-gray-900">🎮 Gaming</option>
                    <option value="coding" className="bg-gray-900">💻 Coding</option>
                    <option value="fitness" className="bg-gray-900">💪 Fitness</option>
                    <option value="music" className="bg-gray-900">🎵 Music</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Toxicity Level Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white text-sm font-bold tracking-wide">
                    Toxicity Threshold
                  </label>
                  <span className="text-red-500 text-sm font-bold">75%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  defaultValue="75"
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Lenient</span>
                  <span>Strict</span>
                </div>
              </div>

              {/* Explore Button */}
              <button 
                onClick={handleFilter}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-red-900/50 hover:shadow-red-600/50 text-base mb-6 flex items-center justify-center gap-2"
              >
                <span>Start Filtering Now</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-white/5 text-gray-500 font-semibold tracking-widest uppercase">Account</span>
                </div>
              </div>

              {/* Auth Buttons */}
              <div className="flex gap-3 mb-5">
                <button 
                  onClick={handleLogin}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 border border-white/20 hover:border-white/30 text-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                  Login with Google
                </button>
                <button 
                  onClick={handleLogout}
                  className="bg-white/10 hover:bg-red-900/40 text-white hover:text-red-400 font-semibold py-3 px-4 rounded-xl transition-all duration-200 border border-white/20 hover:border-red-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Features Bar */}
      <div className="relative z-20 pb-8 pt-4">
        <div className="flex items-center justify-center gap-8 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>All Systems Operational</span>
          </div>
          <span>•</span>
          <span>Powered by AI</span>
          <span>•</span>
          <span>Privacy Protected</span>
        </div>
      </div>
    </div>
  );
}
