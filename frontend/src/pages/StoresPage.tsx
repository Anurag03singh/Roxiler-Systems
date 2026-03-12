import { useState, useEffect } from 'react';
import { storesAPI, ratingsAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function StoresPage() {
  const [stores, setStores] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStores();
  }, [search]);

  const fetchStores = async () => {
    try {
      const response = await storesAPI.getAll(search);
      setStores(response.data);
    } catch (error) {
      toast.error('Failed to fetch stores');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-jakarta font-bold mb-8">Browse Stores</h1>

        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stores by name or address..."
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-neutral-600">Loading stores...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <div key={store.id} className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
                <h3 className="text-xl font-jakarta font-bold mb-2">{store.name}</h3>
                <p className="text-neutral-600 text-sm mb-4">{store.address}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <span className="text-xl font-bold">{store.averageRating || 'N/A'}</span>
                  </div>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors">
                    Rate
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
