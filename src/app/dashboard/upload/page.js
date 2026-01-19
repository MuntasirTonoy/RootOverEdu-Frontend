"use client";

import { useState } from 'react';
import { Plus, Trash, Save, BookOpen, Video, Link as LinkIcon, DollarSign, Layers, ChevronRight, ChevronDown, Upload } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import Swal from 'sweetalert2';

// ------------------------------------------------------------------
// 1. National University Data (Math & Physics)
// ------------------------------------------------------------------
const nuData = {
  Mathematics: {
    "1st Year": [
      { code: "213701", title: "Fundamentals of Mathematics" },
      { code: "213703", title: "Calculus-I" },
      { code: "213705", title: "Linear Algebra" },
      { code: "213707", title: "Analytic and Vector Geometry" },
    ],
    "2nd Year": [
      { code: "223701", title: "Calculus-II" },
      { code: "223703", title: "Ordinary Differential Equations" },
      { code: "223705", title: "Computer Programming (Fortran)" },
      { code: "223706", title: "Math Lab (Practical)" },
    ],
    "3rd Year": [
      { code: "233701", title: "Abstract Algebra" },
      { code: "233703", title: "Real Analysis" },
      { code: "233705", title: "Numerical Analysis" },
      { code: "233707", title: "Complex Analysis" },
      { code: "233709", title: "Differential Geometry" },
      { code: "233711", title: "Mechanics" },
      { code: "233713", title: "Linear Programming" },
      { code: "233714", title: "Math Lab (Practical)" },
    ],
    "4th Year": [
      { code: "243701", title: "Theory of Numbers" },
      { code: "243703", title: "Topology & Functional Analysis" },
      { code: "243705", title: "Methods of Applied Mathematics" },
      { code: "243707", title: "Tensor Analysis" },
      { code: "243709", title: "Partial Differential Equations" },
      { code: "243711", title: "Hydrodynamics" },
      { code: "243713", title: "Discrete Mathematics" },
      { code: "243715", title: "Astronomy" },
      { code: "243717", title: "Mathematical Modeling in Biology" },
    ],
  },
  Physics: {
    "1st Year": [
      { code: "212701", title: "Mechanics" },
      { code: "212703", title: "Properties of Matter, Waves & Oscillations" },
      { code: "212705", title: "Heat, Thermodynamics and Radiation" },
      { code: "212706", title: "Physics Practical-I" },
    ],
    "2nd Year": [
      { code: "222701", title: "Electricity & Magnetism" },
      { code: "222703", title: "Geometrical & Physical Optics" },
      { code: "222705", title: "Classical Mechanics" },
      { code: "222706", title: "Physics Practical-II" },
    ],
    "3rd Year": [
      { code: "232701", title: "Atomic & Molecular Physics" },
      { code: "232703", title: "Quantum Mechanics-I" },
      { code: "232705", title: "Computer Fundamentals and Numerical Analysis" },
      { code: "232707", title: "Electronics-I" },
      { code: "232709", title: "Nuclear Physics-I" },
      { code: "232711", title: "Solid State Physics-I" },
      { code: "232713", title: "Mathematical Physics" },
      { code: "232714", title: "Physics Practical-III" },
    ],
    "4th Year": [
      { code: "242701", title: "Nuclear Physics-II" },
      { code: "242703", title: "Solid State Physics-II" },
      { code: "242705", title: "Quantum Mechanics-II" },
      { code: "242707", title: "Electronics-II" },
      { code: "242709", title: "Classical Electrodynamics" },
      { code: "242711", title: "Statistical Mechanics" },
      { code: "242713", title: "Computer Application and Programming" },
      { code: "242715", title: "Theory of Relativity and Cosmology" },
      { code: "242716", title: "Physics Practical-IV" },
    ],
  },
};

// --- Reusable Dropdown Component ---
const CustomDropdown = ({ label, value, options, onChange, disabled, placeholder }) => {
  // Helper to close dropdown on click
  const handleSelect = (val) => {
    onChange(val);
    const elem = document.activeElement;
    if (elem) {
      elem.blur();
    }
  };

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-medium">{label}</span>
      </label>
      
      <div className={`dropdown dropdown-bottom w-full ${disabled ? 'pointer-events-none opacity-50' : ''}`}>
        <div 
          tabIndex={0} 
          role="button" 
          className="btn w-full justify-between bg-base-100 border-base-300 font-normal hover:border-base-content/20"
        >
          <span className={!value ? "text-base-content/50" : ""}>
            {value || placeholder}
          </span>
          <ChevronDown size={16} className="opacity-50" />
        </div>
        
        {!disabled && (
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-full p-2 shadow-xl border border-base-200 max-h-60 overflow-y-auto flex-nowrap block">
            {options.map((opt, idx) => (
              <li key={idx} onClick={() => handleSelect(opt.value)}>
                <a>{opt.label}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default function ManageVideos() {
  const { user } = useAuth();
  
  // Selections
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(''); 
  
  // Derived Data for Dropdowns
  const departmentOptions = Object.keys(nuData).map(d => ({ label: d, value: d }));
  
  const yearOptions = selectedDept 
    ? Object.keys(nuData[selectedDept]).map(y => ({ label: y, value: y })) 
    : [];
    
  // Find currently selected subject object to display neatly
  const currentSubjectObj = (selectedDept && selectedYear && selectedSubject) 
    ? nuData[selectedDept][selectedYear].find(s => s.title === selectedSubject)
    : null;

  const subjectOptions = (selectedDept && selectedYear) 
    ? nuData[selectedDept][selectedYear].map(s => ({ 
        label: `[${s.code}] ${s.title}`, 
        value: s.title 
      })) 
    : [];

  const subjects = (selectedDept && selectedYear) ? nuData[selectedDept][selectedYear] : [];

  // Form Data
  const [chapterName, setChapterName] = useState('');
  const [videoParts, setVideoParts] = useState([
    { partNumber: 1, title: '', videoUrl: '', noteLink: '', isFree: false }
  ]);
  
  const [loading, setLoading] = useState(false);

  // Handlers
  const addPart = () => {
    setVideoParts([
      ...videoParts,
      { partNumber: videoParts.length + 1, title: '', videoUrl: '', noteLink: '', isFree: false }
    ]);
  };

  const removePart = (index) => {
    if (videoParts.length > 1) {
      const newParts = videoParts.filter((_, i) => i !== index);
      const reIndexed = newParts.map((p, i) => ({ ...p, partNumber: i + 1 }));
      setVideoParts(reIndexed);
    }
  };

  const updatePart = (index, field, value) => {
    const newParts = [...videoParts];
    newParts[index][field] = value;
    setVideoParts(newParts);
  };

  const handleSubmit = async () => {
    if (!selectedSubject || !chapterName || videoParts.some(p => !p.videoUrl)) {
      Swal.fire('Missing Fields', 'Please select Department, Year, Subject and fill in Video URLs.', 'warning');
      return;
    }

    try {
      setLoading(true);
      const token = await auth.currentUser.getIdToken();
      let successCount = 0;

      for (const part of videoParts) {
        const videoData = {
          title: part.title || `${chapterName} - Part ${part.partNumber}`,
          chapterName: chapterName,
          subjectTitle: selectedSubject,
          subjectCode: subjects.find(s => s.title === selectedSubject)?.code, 
          partNumber: part.partNumber,
          videoUrl: part.videoUrl,
          noteLink: part.noteLink,
          isFree: part.isFree
        };

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/video`, videoData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        successCount++;
      }

      Swal.fire('Success', `Uploaded ${successCount} videos for ${chapterName}`, 'success');
      setChapterName('');
      setVideoParts([{ partNumber: 1, title: '', videoUrl: '', noteLink: '', isFree: false }]);

    } catch (error) {
      console.error("Error creating videos:", error);
      Swal.fire('Upload Failed', 'Something went wrong. Check console.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 font-sans pb-40">
      
      {/* ------------------- HEADER ------------------- */}
      <div className="bg-base-100 border-b border-base-300">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary text-primary-content flex items-center justify-center shadow-lg">
             <Upload size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-base-content">Upload Panel</h1>
            <p className="text-sm text-base-content/60">Upload and organize content</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">

        {/* ------------------- 1. SELECTION CARD ------------------- */}
        <div className="card bg-base-100 shadow-sm border border-base-300 p-5">
          <div className="card-body overflow-visible z-10">
            <h2 className="card-title text-base mb-4 flex gap-2 text-base-content/70">
              <Layers size={18} /> Select options
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Department Dropdown */}
              <CustomDropdown 
                label="Department"
                placeholder="Select Dept..."
                value={selectedDept}
                options={departmentOptions}
                onChange={(val) => {
                  setSelectedDept(val);
                  setSelectedYear('');
                  setSelectedSubject('');
                }}
              />

              {/* Year Dropdown */}
              <CustomDropdown 
                label="Year Level"
                placeholder="Select Year..."
                value={selectedYear}
                options={yearOptions}
                disabled={!selectedDept}
                onChange={(val) => {
                  setSelectedYear(val);
                  setSelectedSubject('');
                }}
              />

              {/* Subject Dropdown */}
              <CustomDropdown 
                label="Subject"
                placeholder="Select Subject..."
                // Display the formatted string "[Code] Title" if selected, otherwise null
                value={currentSubjectObj ? `[${currentSubjectObj.code}] ${currentSubjectObj.title}` : ''}
                options={subjectOptions}
                disabled={!selectedYear}
                onChange={(val) => setSelectedSubject(val)}
              />

            </div>
          </div>
        </div>

        {/* ------------------- 2. CONTENT EDITOR ------------------- */}
        {selectedSubject && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Chapter Header */}
            <div className="card bg-base-100 shadow-sm border border-base-300 p-5">
              <div className="card-body">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold text-lg flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-secondary" />
                      Chapter Name
                    </span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Chapter 1: Differential Calculus" 
                    className="input input-primary shadow-none border-none bg-base-300 input-md  w-full pl-3 rounded-md"
                    value={chapterName}
                    onChange={(e) => setChapterName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Video Parts Container */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Video className="w-5 h-5 text-accent" /> Video Segments
                </h3>
                <span className="badge  p-2">{videoParts.length} Parts</span>
              </div>

              {videoParts.map((part, index) => (
                <div key={index} className="card bg-base-100 shadow-sm border border-base-300 relative group overflow-visible">
                  
                  {/* Remove Button (Floating) */}
                  {videoParts.length > 1 && (
                    <button 
                      onClick={() => removePart(index)}
                      className="absolute -top-3 -right-3 rounded-full bg-red-500 text-white p-2 opacity-0 group-hover:opacity-100 transition-all z-10"
                      title="Remove Part"
                    >
                      <Trash size={20} />
                    </button>
                  )}

                  <div className="card-body p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      
                      {/* Left: Indicator */}
                      <div className="flex md:flex-col items-center gap-2 md:w-16 md:pt-2 border-b md:border-b-0 md:border-r border-base-200 pb-4 md:pb-0">
                        <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center font-bold text-base-content/70">
                          {part.partNumber}
                        </div>
                        <span className="text-xs font-semibold text-base-content/40 uppercase tracking-widest hidden md:block rotate-180 md:rotate-0 mt-2">Part</span>
                        <span className="text-sm font-bold md:hidden text-base-content/60">Part {part.partNumber}</span>
                      </div>

                      {/* Right: Inputs */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Title & Video URL */}
                        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="form-control">
                            <label className="label label-text-alt text-base-content/60 font-semibold uppercase"> Video Title </label>
                            <input 
                              type="text" 
                              className="input input-primary shadow-none border-none bg-base-300 input-md  w-full pl-3 rounded-md  "
                              placeholder={`Part ${part.partNumber}`}
                              value={part.title}
                              onChange={(e) => updatePart(index, 'title', e.target.value)} 
                            />
                          </div>
                          <div className="form-control">
                            <label className="label label-text-alt text-primary font-bold uppercase">Video URL *</label>
                            <input 
                              type="text" 
                              className="input input-primary shadow-none border-none rounded-md bg-base-300 input-md w-full pl-3"
                              placeholder="https://youtube.com/..."
                              value={part.videoUrl}
                              onChange={(e) => updatePart(index, 'videoUrl', e.target.value)} 
                            />
                          </div>
                        </div>

                        {/* Note Link */}
                        <div className="form-control">
                           <label className="label label-text-alt text-base-content/60 font-semibold uppercase flex gap-1 items-center">
                            <LinkIcon size={12}/> PDF Note Link
                           </label>
                           <input 
                            type="text" 
                            className="input input-primary shadow-none border-none rounded-md bg-base-300 input-md w-full pl-3"
                            placeholder="Drive/Dropbox Link"
                            value={part.noteLink}
                            onChange={(e) => updatePart(index, 'noteLink', e.target.value)} 
                          />
                        </div>

                        {/* Access Control */}
                        <div className="form-control">
                          <label className="label label-text-alt text-base-content/60 font-semibold uppercase flex gap-1 items-center">
                            <DollarSign size={12}/> Access Type
                          </label>
                          <div className="flex items-center gap-3 bg-base-200/50 p-3 rounded-lg bg-base-300 border-none w-full md:w-fit h-[32px]">
                            <span className={`text-xs font-bold px-2 transition-colors ${!part.isFree ? 'text-error' : 'text-base-content/30'}`}>Paid</span>
                            <input 
                              type="checkbox" 
                              className="toggle toggle-xs md:toggle-md toggle-success"
                              checked={part.isFree}
                              onChange={(e) => updatePart(index, 'isFree', e.target.checked)}
                            />
                            <span className={`text-xs font-bold px-2 transition-colors ${part.isFree ? 'text-success' : 'text-base-content/30'}`}>Free</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button 
                onClick={addPart}
                className="btn btn-outline btn-block border-dashed border-2 text-base-content/50 hover:bg-base-100 hover:text-primary hover:border-primary transition-all h-16 normal-case"
              >
                <Plus className="w-6 h-6" /> Add Another Video Part
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ------------------- FLOATING FOOTER ------------------- */}
      <div className="fixed bottom-0 left-0 right-0 bg-base-100/90 backdrop-blur-md border-t border-base-200 p-4 z-40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="hidden md:flex items-center gap-2 text-sm">
             {selectedSubject ? (
                <>
                  <span className="badge badge-primary badge-outline">{selectedSubject}</span>
                  <ChevronRight size={14} className="text-base-content/30"/>
                  <span className={chapterName ? "font-bold" : "italic opacity-50"}>
                    {chapterName || "Untitled Chapter"}
                  </span>
                </>
             ) : (
               <span className="opacity-50 italic">No subject selected</span>
             )}
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button 
              className="btn bg-red-500 p-2 hover:bg-red-600 rounded-md text-white flex-1 md:flex-none"
              onClick={() => {
                 setChapterName('');
                 setVideoParts([{ partNumber: 1, title: '', videoUrl: '', noteLink: '', isFree: false }]);
              }}
            >
              Reset
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={loading || !selectedSubject}
              className="btn btn-primary shadow-none bg-primary text-primary-content hover:bg-primary/90 rounded-md flex-1 md:flex-none min-w-[160px]"
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : <Save size={18} />}
              Save Course
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}