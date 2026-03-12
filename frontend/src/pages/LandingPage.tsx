import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2547&auto=format&fit=crop"
            alt="Cafe Interior"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
        </div>

        {/* Navbar */}
        <nav className="relative z-50 py-8 px-8 md:px-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-orange-400">
              ⭐
            </div>
            <div className="flex flex-col">
              <span className="text-white font-jakarta font-bold text-lg leading-tight">Rate My Store</span>
              <span className="text-white/70 font-jakarta text-[10px] font-medium tracking-widest uppercase">
                Store Rating System
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-6 py-2 rounded-full border border-white/10 text-white bg-white/10 backdrop-blur-md text-sm font-medium hover:bg-white/20 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-neutral-100 transition-colors"
            >
              Register
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-8 md:px-16">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center gap-2 bg-white text-black px-4 py-1.5 rounded-full text-xs font-semibold">
              ⭐ 4.9 <span className="text-neutral-400 font-medium">(840+ reviews)</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-8xl font-jakarta font-semibold tracking-tighter leading-[0.95] mb-8 max-w-5xl">
            Good Store...<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-white to-white">
              Good Life.
            </span>
          </h1>

          <p className="text-neutral-300 text-lg md:text-xl font-light max-w-lg leading-relaxed mb-12">
            Rate and discover the best stores. Share your experience and help others make informed decisions.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <Link
              to="/register"
              className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold text-sm hover:bg-neutral-100 transition-all"
            >
              Get Started
              <span className="bg-black text-white p-2 rounded-full">→</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-medium text-sm hover:bg-white/20 transition-all border border-white/10"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white text-neutral-900 py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-jakarta font-medium tracking-tight mb-16 text-center">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-100">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-6 text-2xl">
                ⭐
              </div>
              <h3 className="text-xl font-jakarta font-semibold mb-3">Rate Stores</h3>
              <p className="text-neutral-600">Share your experience and help others discover great places.</p>
            </div>
            <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-6 text-2xl">
                🔍
              </div>
              <h3 className="text-xl font-jakarta font-semibold mb-3">Discover</h3>
              <p className="text-neutral-600">Find the best-rated stores in your area with ease.</p>
            </div>
            <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-100">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6 text-2xl">
                🛡️
              </div>
              <h3 className="text-xl font-jakarta font-semibold mb-3">Trusted</h3>
              <p className="text-neutral-600">Authentic reviews from real customers you can trust.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
