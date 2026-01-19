"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import Swal from 'sweetalert2';
import { User, Shield, ShieldOff } from 'lucide-react';

export default function StudentsPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
        const token = await auth.currentUser.getIdToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
    } catch (error) {
        console.error("Error fetching users:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
        fetchUsers();
    }
  }, [user]);

  const toggleRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const actionText = newRole === 'admin' ? 'Make Admin' : 'Remove Admin';

    Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${actionText.toLowerCase()} this user?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Yes, ${actionText}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = await auth.currentUser.getIdToken();
          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/${userId}/role`, { role: newRole }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire('Success', `User role updated to ${newRole}`, 'success');
          fetchUsers();
        } catch (error) {
          console.error("Error updating role:", error);
          Swal.fire('Error', 'Failed to update role', 'error');
        }
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Students</h1>
        <p className="text-base-content/70">Manage registered users and their roles.</p>
      </div>

      <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body p-0">
            <div className="p-6 border-b border-base-200 bg-base-100/50 rounded-t-2xl">
                <h2 className="text-lg font-bold">Resistered Users</h2>
            </div>
            
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr className="bg-base-200/50 text-base-content/70 uppercase text-xs tracking-wider font-bold">
                        <th className="py-4 pl-6">User</th>
                        <th className="py-4">Email</th>
                        <th className="py-4">Role</th>
                        <th className="py-4 pr-6 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
                    ) : users.length === 0 ? (
                        <tr><td colSpan="4" className="text-center py-4">No users found.</td></tr>
                    ) : (
                        users.map((u) => (
                        <tr key={u._id} className="hover:bg-base-200/50 transition-colors border-b border-base-200 last:border-0">
                            <td className="pl-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                                            <span className="text-xs">{u.name?.charAt(0)}</span>
                                        </div>
                                    </div> 
                                    <div className="font-bold">{u.name}</div>
                                </div>
                            </td>
                            <td className="font-medium text-base-content/80">{u.email}</td>
                            <td>
                                <span className={`badge badge-sm font-bold ${u.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>
                                    {u.role.toUpperCase()}
                                </span>
                            </td>
                            <td className="pr-6 text-right">
                                {u.email !== user.email && ( // Prevent changing own role if possible, or just allow it (dangerous)
                                     <button 
                                     onClick={() => toggleRole(u._id, u.role)} 
                                     className={`btn btn-sm ${u.role === 'admin' ? 'btn-error btn-outline' : 'btn-primary btn-outline'}`}
                                   >
                                     {u.role === 'admin' ? <><ShieldOff size={16}/> Remove Admin</> : <><Shield size={16}/> Make Admin</>}
                                   </button>
                                )}
                            </td>
                        </tr>
                    )))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
}
