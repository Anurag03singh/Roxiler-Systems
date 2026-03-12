import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-neutral-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl">
              ⭐
            </div>
            <div>
              <h1 className="font-jakarta font-bold text-lg">Rate My Store</h1>
              <p className="text-xs text-neutral-500">Store Rating System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-600">
              Welcome, <span className="font-semibold">{user?.name}</span>
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
          <h2 className="text-2xl font-jakarta font-bold mb-4">Dashboard</h2>
          <p className="text-neutral-600 mb-6">Role: <span className="font-semibold">{user?.role}</span></p>

          {user?.role === 'USER' && (
            <div>
              <p className="text-neutral-600 mb-4">As a user, you can:</p>
              <ul className="list-disc list-inside space-y-2 text-neutral-600">
                <li>Browse and search stores</li>
                <li>Rate stores (1-5 stars)</li>
                <li>Edit your existing ratings</li>
                <li>Update your password</li>
              </ul>
              <button
                onClick={() => navigate('/stores')}
                className="mt-6 px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors"
              >
                Browse Stores
              </button>
            </div>
          )}

          {user?.role === 'ADMIN' && (
            <div>
              <p className="text-neutral-600 mb-4">As an admin, you can:</p>
              <ul className="list-disc list-inside space-y-2 text-neutral-600">
                <li>View dashboard statistics</li>
                <li>Add and manage stores</li>
                <li>Add and manage users</li>
                <li>Filter and sort all data</li>
              </ul>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
                  <h3 className="text-3xl font-bold text-orange-600 mb-2">--</h3>
                  <p className="text-neutral-600">Total Stores</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 className="text-3xl font-bold text-blue-600 mb-2">--</h3>
                  <p className="text-neutral-600">Total Users</p>
                </div>
                <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                  <h3 className="text-3xl font-bold text-green-600 mb-2">--</h3>
                  <p className="text-neutral-600">Total Ratings</p>
                </div>
              </div>
            </div>
          )}

          {user?.role === 'STORE_OWNER' && (
            <div>
              <p className="text-neutral-600 mb-4">As a store owner, you can:</p>
              <ul className="list-disc list-inside space-y-2 text-neutral-600">
                <li>View your store's average rating</li>
                <li>See all user ratings</li>
                <li>Sort ratings by name, rating, or date</li>
                <li>Update your password</li>
              </ul>
              <div className="mt-6 p-6 bg-orange-50 rounded-xl border border-orange-200">
                <h3 className="text-4xl font-bold text-orange-600 mb-2">--</h3>
                <p className="text-neutral-600">Average Store Rating</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
