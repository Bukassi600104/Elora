import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { UserRole } from '../types';
import { store } from '../services/store';
import { Building, Plus, MapPin, User } from 'lucide-react';

export const SuperAdminDashboard: React.FC = () => {
  const [estates, setEstates] = useState(store.getAllEstates());
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', address: '', adminName: '', adminEmail: '' });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    store.createEstate(formData.name, formData.address, formData.adminName, formData.adminEmail);
    setEstates(store.getAllEstates());
    setShowModal(false);
    setFormData({ name: '', address: '', adminName: '', adminEmail: '' });
  };

  return (
    <Layout role={UserRole.SUPER_ADMIN} title="Global Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-security-200 shadow-sm">
          <p className="text-sm text-security-500 font-medium">Total Estates</p>
          <p className="text-3xl font-bold text-security-900 mt-2">{estates.length}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-security-900">Registered Estates</h3>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-brand-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          Add Estate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {estates.map(estate => (
          <div key={estate.id} className="bg-white rounded-xl border border-security-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <h4 className="text-lg font-bold text-security-900 flex items-center gap-2">
                        <Building size={18} className="text-brand-secondary"/>
                        {estate.name}
                    </h4>
                    <p className="text-security-500 text-sm mt-1 flex items-center gap-2">
                        <MapPin size={14}/>
                        {estate.address}
                    </p>
                </div>
            </div>
            <div className="mt-6 pt-4 border-t border-security-100 flex items-center gap-2 text-sm text-security-600">
                <div className="w-6 h-6 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center">
                    <User size={12} />
                </div>
                Admin ID: <span className="font-mono text-xs bg-security-100 px-1 rounded">{estate.adminId}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">Add New Estate</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-security-700 mb-1">Estate Name</label>
                <input required className="w-full border border-security-300 rounded-lg px-3 py-2" 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-security-700 mb-1">Address</label>
                <input required className="w-full border border-security-300 rounded-lg px-3 py-2" 
                   value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-security-700 mb-1">Admin Name</label>
                    <input required className="w-full border border-security-300 rounded-lg px-3 py-2" 
                    value={formData.adminName} onChange={e => setFormData({...formData, adminName: e.target.value})} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-security-700 mb-1">Admin Email</label>
                    <input type="email" required className="w-full border border-security-300 rounded-lg px-3 py-2" 
                    value={formData.adminEmail} onChange={e => setFormData({...formData, adminEmail: e.target.value})} />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-security-600 hover:bg-security-50 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-primary text-white rounded-lg">Create Estate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};