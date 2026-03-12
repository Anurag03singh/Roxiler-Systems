import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      setUser(response.data.user);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-neutral-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-jakarta font-bold text-neutral-900 mb-2">Welcome Back</h1>
            <p className="text-neutral-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neutral-900 text-white py-3 rounded-xl font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-orange-600 font-semibold hover:text-orange-700">
                Register
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-neutral-500 hover:text-neutral-700">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
