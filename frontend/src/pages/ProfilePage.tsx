import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { usersAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await usersAPI.updatePassword(formData);
      toast.success('Password updated successfully');
      setFormData({ currentPassword: '', newPassword: '' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-jakarta font-bold mb-8">Profile</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 mb-6">
          <h2 className="text-xl font-jakarta font-bold mb-4">Account Information</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-neutral-500">Name</label>
              <p className="font-semibold">{user?.name}</p>
            </div>
            <div>
              <label className="text-sm text-neutral-500">Email</label>
              <p className="font-semibold">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm text-neutral-500">Role</label>
              <p className="font-semibold">{user?.role}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
          <h2 className="text-xl font-jakarta font-bold mb-4">Update Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                New Password (8-16 chars, 1 uppercase, 1 special)
              </label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                minLength={8}
                maxLength={16}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neutral-900 text-white py-3 rounded-xl font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
