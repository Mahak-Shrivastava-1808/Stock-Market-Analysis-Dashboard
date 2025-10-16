import React, { useEffect, useState } from "react";

/**
 * Settings page for StockScope
 * - Profile: name, email, avatar upload (preview)
 * - Theme toggle: light / dark (persist in localStorage)
 * - Notifications toggle (persist in localStorage)
 * - Logout and Delete Account (demo: clears localStorage)
 */

function Settings() {
  // load initial values from localStorage (or defaults)
  const [name, setName] = useState(() => localStorage.getItem("ss_name") || "Sheikh Nikhat");
  const [email, setEmail] = useState(() => localStorage.getItem("ss_email") || "youremail@example.com");
  const [avatar, setAvatar] = useState(() => localStorage.getItem("ss_avatar") || "");
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const v = localStorage.getItem("ss_notifications");
    return v === null ? true : v === "true";
  });
  const [theme, setTheme] = useState(() => localStorage.getItem("ss_theme") || "light");

  // local state for delete-confirm modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saving, setSaving] = useState(false);

  // apply theme on mount & when theme changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("ss_theme", theme);
  }, [theme]);

  // handlers
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatar(ev.target.result); // base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaving(true);
    // simulate save -> persist to localStorage (or call API here)
    setTimeout(() => {
      localStorage.setItem("ss_name", name);
      localStorage.setItem("ss_email", email);
      if (avatar) localStorage.setItem("ss_avatar", avatar);
      localStorage.setItem("ss_notifications", notificationsEnabled.toString());
      setSaving(false);
      alert("Profile settings saved.");
    }, 600);
  };

  const handleLogout = () => {
    // replace with real auth logout logic
    localStorage.removeItem("auth_token"); // example
    alert("Logged out (demo). Redirect to login.");
    // optionally redirect: window.location.href = "/login";
  };

  const handleDeleteAccount = () => {
    // WARNING: destructive. In real app call API then clear storage + redirect.
    // Here demo: clear all app-related localStorage keys
    localStorage.removeItem("ss_name");
    localStorage.removeItem("ss_email");
    localStorage.removeItem("ss_avatar");
    localStorage.removeItem("ss_theme");
    localStorage.removeItem("ss_notifications");
    localStorage.removeItem("auth_token");
    setShowDeleteConfirm(false);
    alert("Account deleted (demo). Redirecting to signup/login.");
    // window.location.href = "/signup";
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">Profile & Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Profile card */}
        <div className="col-span-1 bg-white/80 dark:bg-slate-900/80 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-2 ring-emerald-500 mb-3">
              {avatar ? (
                // preview avatar
                <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 text-xl font-semibold">
                    {name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
              )}
            </div>

            <p className="text-lg font-medium text-slate-800 dark:text-white">{name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{email}</p>

            <label className="cursor-pointer inline-block">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <div className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:opacity-90 transition">
                Upload Avatar
              </div>
            </label>

            <button
              onClick={() => {
                setAvatar("");
                localStorage.removeItem("ss_avatar");
              }}
              className="mt-3 text-sm text-red-500 hover:underline"
            >
              Remove Avatar
            </button>
          </div>
        </div>

        {/* Right column: settings form */}
        <div className="col-span-2 bg-white/80 dark:bg-slate-900/80 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Basic info */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none"
                type="email"
              />
            </div>

            {/* Theme toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Theme</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Choose light or dark mode</p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  {theme === "dark" ? "Dark" : "Light"}
                </button>
              </div>
            </div>

            {/* Notifications toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Notifications</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Enable market push / email notifications</p>
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationsEnabled}
                    onChange={() => {
                      const next = !notificationsEnabled;
                      setNotificationsEnabled(next);
                      localStorage.setItem("ss_notifications", next.toString());
                    }}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-checked:bg-emerald-500 rounded-full peer-focus:ring-2 peer-focus:ring-emerald-300 transition" />
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition" />
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:opacity-95 disabled:opacity-50 transition"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 bg-white/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition"
              >
                Logout
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="ml-auto px-4 py-2 bg-red-500 text-white rounded-xl hover:opacity-90 transition"
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Delete confirmation modal (simple) */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">Delete account</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              This will permanently remove your account and all related data. This demo will clear stored data in the browser.
            </p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
                Cancel
              </button>
              <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-600 text-white rounded-xl">
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
