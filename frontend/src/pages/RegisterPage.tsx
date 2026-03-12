import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.register(formData);
      setUser(response.data.user);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.message;
      if (Array.isArray(message)) {
        message.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error(message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-neutral-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-jakarta font-bold text-neutral-900 mb-2">Create Account</h1>
            <p className="text-neutral-600">Join our community today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Name (20-60 characters)
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                placeholder="Your full name"
                minLength={20}
                maxLength={60}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Password (8-16 chars, 1 uppercase, 1 special)
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                placeholder="••••••••"
                minLength={8}
                maxLength={16}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Address (Optional, max 400 chars)
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                placeholder="Your address"
                maxLength={400}
                rows={3}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neutral-900 text-white py-3 rounded-xl font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral-600">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-600 font-semibold hover:text-orange-700">
                Sign In
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
