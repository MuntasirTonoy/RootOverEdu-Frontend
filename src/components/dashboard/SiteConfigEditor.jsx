"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "@/lib/firebase";
import Swal from "sweetalert2";
import { Save, Loader2, LayoutTemplate, Info } from "lucide-react";

export default function SiteConfigEditor() {
  const [activeTab, setActiveTab] = useState("banner"); // 'banner' or 'about'
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // States for form data
  const [bannerData, setBannerData] = useState({
    title: "",
    subtitle: "",
  });

  const [aboutData, setAboutData] = useState({
    title: "",
    description: "",
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerRes, aboutRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/config/banner`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/config/about`),
        ]);

        if (bannerRes.data && Object.keys(bannerRes.data).length > 0) {
          setBannerData(bannerRes.data);
        } else {
          // Default placeholder if empty
          setBannerData({
            title: "Learn Smarter\nwith Root Over Education",
            subtitle:
              "A next-generation learning platform built to simplify science, strengthen core concepts, and help you achieve real academic excellence. Learn deeply with us.",
          });
        }

        if (aboutRes.data && Object.keys(aboutRes.data).length > 0) {
          setAboutData(aboutRes.data);
        } else {
          // Default placeholder if empty
          setAboutData({
            title: "About Root Over Education",
            description:
              "Root Over Education is an innovative EdTech platform dedicated to helping SSC, HSC, and BSc Science students. We guide you from the fundamental roots of science to advanced problem-solving with clarity and confidence.",
          });
        }
      } catch (error) {
        console.error("Error fetching config:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = await auth.currentUser.getIdToken();
      const configToSave =
        activeTab === "banner"
          ? { key: "banner", value: bannerData }
          : { key: "about", value: aboutData };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/config`,
        configToSave,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: `${activeTab === "banner" ? "Banner" : "About"} settings updated successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error saving config:", error);
      Swal.fire("Error", "Failed to save settings", "error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl border border-border overflow-hidden">
      {/* Tab Header */}
      <div className="border-b border-border bg-muted/10 p-4 md:p-5">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => setActiveTab("banner")}
            className={`flex items-center justify-center sm:justify-start gap-2 px-5 py-2.5 rounded-md text-sm font-bold transition-all ${
              activeTab === "banner"
                ? "bg-primary text-primary-foreground shadow-primary/20"
                : "text-muted-foreground hover:bg-muted border border-transparent hover:border-border"
            }`}
          >
            <LayoutTemplate size={16} />
            <span>Home Banner</span>
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex items-center justify-center sm:justify-start gap-2 px-5 py-2.5 rounded-md text-sm font-bold transition-all ${
              activeTab === "about"
                ? "bg-primary text-primary-foreground  shadow-primary/20"
                : "text-muted-foreground hover:bg-muted border border-transparent hover:border-border"
            }`}
          >
            <Info size={16} />
            <span>About Page</span>
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-4 md:p-6">
        {activeTab === "banner" ? (
          <div className="space-y-5 animate-in fade-in duration-300">
            {/* Banner Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-bold text-foreground">
                  Banner Title
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full rounded-md text-sm bg-surface border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 p-3 transition-all"
                rows="3"
                placeholder='Learn Smarter<br/><span class="text-primary">with Root Over Education</span>'
                value={bannerData.title}
                onChange={(e) =>
                  setBannerData({ ...bannerData, title: e.target.value })
                }
              />
              <label className="label"></label>
            </div>

            {/* Banner Subtitle */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-bold text-foreground">
                  Banner Subtitle
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full rounded-md text-sm bg-surface border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 p-3 transition-all"
                rows="4"
                placeholder="A brief description of your platform..."
                value={bannerData.subtitle}
                onChange={(e) =>
                  setBannerData({ ...bannerData, subtitle: e.target.value })
                }
              />
            </div>
          </div>
        ) : (
          <div className="space-y-5 animate-in fade-in duration-300">
            {/* About Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-bold text-foreground">
                  About Page Title
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full rounded-md text-sm bg-surface border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 p-3 h-auto transition-all"
                placeholder="About Root Over Education"
                value={aboutData.title}
                onChange={(e) =>
                  setAboutData({ ...aboutData, title: e.target.value })
                }
              />
            </div>

            {/* About Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-bold text-foreground">
                  About Description
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full rounded-md text-sm bg-surface border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 p-3 min-h-[160px] transition-all"
                placeholder="Describe your platform's mission and values..."
                value={aboutData.description}
                onChange={(e) =>
                  setAboutData({ ...aboutData, description: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-6 pt-5 border-t border-border flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-sm font-bold bg-primary text-primary-foreground hover:brightness-110 shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto min-w-[160px]"
          >
            {loading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <Save size={16} />
            )}
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
