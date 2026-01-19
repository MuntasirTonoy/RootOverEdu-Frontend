"use client";

import { useEffect, useState } from 'react';
import { Plus, Download, Filter, Trash, Edit, X } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import Swal from 'sweetalert2';

export default function ManageCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    yearLevel: '',
    thumbnail: '',
  });

  const fetchCourses = async () => {
    try {
        const token = await auth.currentUser.getIdToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(response.data);
    } catch (error) {
        console.error("Error fetching courses:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
        fetchCourses();
    }
  }, [user]);

  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      yearLevel: '',
      thumbnail: '',
    });
    setIsEditing(false);
    setCurrentCourse(null);
  };

  const handleOpenModal = (course = null) => {
    if (course) {
      setIsEditing(true);
      setCurrentCourse(course);
      setFormData({
        title: course.title,
        department: course.department,
        yearLevel: course.yearLevel,
        thumbnail: course.thumbnail,
      });
    } else {
      resetForm();
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await auth.currentUser.getIdToken();
      if (isEditing) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/course/${currentCourse._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Success', 'Course updated successfully', 'success');
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/course`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Success', 'Course created successfully', 'success');
      }
      setModalOpen(false);
      resetForm();
      fetchCourses();
    } catch (error) {
      console.error("Error saving course:", error);
      Swal.fire('Error', 'Failed to save course', 'error');
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = await auth.currentUser.getIdToken();
          await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/course/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire('Deleted!', 'Your course has been deleted.', 'success');
          fetchCourses();
        } catch (error) {
          console.error("Error deleting course:", error);
          Swal.fire('Error', 'Failed to delete course', 'error');
        }
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Courses</h1>
          <p className="text-base-content/70">Manage your course inventory.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="btn btn-primary gap-2 text-white shadow-lg shadow-primary/30"
        >
          <Plus size={20} />
          Add New Course
        </button>
      </div>

      {/* Course Inventory Table */}
      <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body p-0">
            {/* Table Header Controls */}
            <div className="p-6 border-b border-base-200 flex justify-between items-center bg-base-100/50 rounded-t-2xl">
                <h2 className="text-lg font-bold">Course Inventory</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr className="bg-base-200/50 text-base-content/70 uppercase text-xs tracking-wider font-bold">
                        <th className="py-4 pl-6">Course Name</th>
                        <th className="py-4">Department</th>
                        <th className="py-4">Year Level</th>
                        <th className="py-4 pr-6 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
                    ) : courses.length === 0 ? (
                        <tr><td colSpan="4" className="text-center py-4">No courses found.</td></tr>
                    ) : (
                        courses.map((course) => (
                        <tr key={course._id} className="hover:bg-base-200/50 transition-colors border-b border-base-200 last:border-0">
                        <td className="pl-6 py-4">
                            <div className="flex items-center gap-4">
                            <div className="avatar rounded-lg overflow-hidden w-12 h-12">
                                <img src={course.thumbnail} alt={course.title} className="object-cover" />
                            </div>
                            <div className="font-bold text-base">{course.title}</div>
                            </div>
                        </td>
                        <td className="font-medium text-base-content/80">{course.department}</td>
                        <td className="font-bold">{course.yearLevel}</td>
                        <td className="pr-6 text-right">
                             <div className="flex justify-end gap-2">
                                <button onClick={() => handleOpenModal(course)} className="btn btn-ghost btn-xs text-info"><Edit size={16} /></button>
                                <button onClick={() => handleDelete(course._id)} className="btn btn-ghost btn-xs text-error"><Trash size={16} /></button>
                             </div>
                        </td>
                        </tr>
                    )))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-base-100 p-6 rounded-lg w-full max-w-md shadow-xl">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-lg">{isEditing ? 'Edit Course' : 'Add New Course'}</h3>
               <button onClick={() => setModalOpen(false)} className="btn btn-ghost btn-sm btn-circle"><X size={20} /></button>
             </div>
             <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Course Title</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g Physics Masterclass" 
                    className="input input-bordered w-full" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Department</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g Science" 
                    className="input input-bordered w-full" 
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Year Level</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g HSC 2024" 
                    className="input input-bordered w-full" 
                    value={formData.yearLevel}
                    onChange={(e) => setFormData({...formData, yearLevel: e.target.value})}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Thumbnail URL</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="https://..." 
                    className="input input-bordered w-full" 
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                    required
                  />
                </div>
                <div className="modal-action">
                    <button type="submit" className="btn btn-primary text-white">{isEditing ? 'Update Course' : 'Create Course'}</button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
