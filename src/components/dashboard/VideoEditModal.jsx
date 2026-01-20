import { Edit, Save, X } from "lucide-react";

export default function VideoEditModal({
  isOpen,
  onClose,
  video,
  setVideo,
  onSave,
  loading,
  availableSubjects,
}) {
  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-card w-full max-w-lg rounded-3xl shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/30">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Edit size={18} className="text-primary" /> Edit Video
          </h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded-md"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="space-y-6">
            {/* Subject & Year Selection */}
            <div className="p-5 rounded-lg border border-border bg-muted/5 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-5 w-1 bg-primary rounded-full"></div>
                <label className="text-sm font-bold text-foreground">
                  Change Root
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label text-[10px] font-bold uppercase text-muted-foreground mb-1">
                    Department
                  </label>
                  <select
                    className="select select-bordered w-full rounded-md text-sm bg-background border-border focus:border-primary p-3"
                    value={video.department || ""}
                    onChange={(e) => {
                      setVideo({
                        ...video,
                        department: e.target.value,
                        yearLevel: "",
                        subjectId: "",
                        subjectTitle: "",
                      });
                    }}
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    {[...new Set(availableSubjects.map((s) => s.department))]
                      .filter(Boolean)
                      .map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label text-[10px] font-bold uppercase text-muted-foreground mb-1">
                    Year Level
                  </label>
                  <select
                    className="select select-bordered w-full rounded-md text-sm bg-background border-border focus:border-primary p-3"
                    value={video.yearLevel || ""}
                    disabled={!video.department}
                    onChange={(e) => {
                      setVideo({
                        ...video,
                        yearLevel: e.target.value,
                        subjectId: "",
                        subjectTitle: "",
                      });
                    }}
                  >
                    <option value="" disabled>
                      Select Year
                    </option>
                    {[
                      ...new Set(
                        availableSubjects
                          .filter((s) => s.department === video.department)
                          .map((s) => s.yearLevel),
                      ),
                    ]
                      .filter(Boolean)
                      .map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label text-[10px] font-bold uppercase text-muted-foreground mb-1">
                  Subject
                </label>
                <select
                  className="select select-bordered w-full rounded-md text-sm bg-background border-border focus:border-primary p-3"
                  value={video.subjectId || ""}
                  disabled={!video.yearLevel}
                  onChange={(e) => {
                    const selectedSubject = availableSubjects.find(
                      (s) => s._id === e.target.value,
                    );
                    if (selectedSubject) {
                      setVideo({
                        ...video,
                        subjectId: selectedSubject._id,
                        subjectTitle: selectedSubject.title,
                      });
                    }
                  }}
                >
                  <option value="" disabled>
                    Select Subject
                  </option>
                  {availableSubjects
                    .filter(
                      (s) =>
                        s.department === video.department &&
                        s.yearLevel === video.yearLevel,
                    )
                    .map((s) => (
                      <option key={s._id} value={s._id}>
                        [{s.code}] {s.title}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border w-full"></div>

            {/* Title */}
            <div className="form-control">
              <label className="label text-xs font-bold uppercase text-muted-foreground">
                Video Title
              </label>
              <input
                type="text"
                className="input input-bordered w-full rounded-md bg-surface border-border focus:outline-none focus:ring-2 focus:ring-primary/20 p-3"
                value={video.title}
                onChange={(e) =>
                  setVideo({
                    ...video,
                    title: e.target.value,
                  })
                }
              />
            </div>

            {/* Chapter Name & Part Number */}
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label text-xs font-bold uppercase text-muted-foreground">
                  Chapter Name
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full rounded-md bg-surface border-border focus:outline-none focus:ring-2 focus:ring-primary/20 p-3"
                  value={video.chapterName}
                  onChange={(e) =>
                    setVideo({
                      ...video,
                      chapterName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label text-xs font-bold uppercase text-muted-foreground">
                  Part Number
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full rounded-md bg-surface border-border focus:outline-none focus:ring-2 focus:ring-primary/20 p-3"
                  value={video.partNumber}
                  onChange={(e) =>
                    setVideo({
                      ...video,
                      partNumber: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            {/* URL & Link */}
            <div className="form-control">
              <label className="label text-xs font-bold uppercase text-muted-foreground">
                Video URL
              </label>
              <input
                type="text"
                className="input input-bordered w-full rounded-md bg-surface border-border focus:outline-none focus:ring-2 focus:ring-primary/20 p-3"
                value={video.videoUrl}
                onChange={(e) =>
                  setVideo({
                    ...video,
                    videoUrl: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control">
              <label className="label text-xs font-bold uppercase text-muted-foreground">
                Note Link (Optional)
              </label>
              <input
                type="text"
                className="input input-bordered w-full rounded-md bg-surface border-border focus:outline-none focus:ring-2 focus:ring-primary/20 p-3"
                value={video.noteLink || ""}
                onChange={(e) =>
                  setVideo({
                    ...video,
                    noteLink: e.target.value,
                  })
                }
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label text-xs font-bold uppercase text-muted-foreground">
                Description
              </label>
              <textarea
                className="textarea textarea-bordered w-full rounded-md bg-surface border-border focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px] p-3"
                value={video.description || ""}
                onChange={(e) =>
                  setVideo({
                    ...video,
                    description: e.target.value,
                  })
                }
              />
            </div>

            {/* Access Type */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4 p-3 bg-muted/10 rounded-md border border-border">
                <span className="label-text text-sm font-bold">
                  Is this video free?
                </span>
                <input
                  type="checkbox"
                  className="toggle toggle-success toggle-sm"
                  checked={video.isFree}
                  onChange={(e) =>
                    setVideo({
                      ...video,
                      isFree: e.target.checked,
                    })
                  }
                />
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-border bg-muted/10 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-10 py-2 rounded-md text-sm font-bold text-muted-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={loading}
            className="px-6 py-2 rounded-md text-sm font-bold bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/20 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <Save size={16} />
            )}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
