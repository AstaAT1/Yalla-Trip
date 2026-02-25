import { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Images from "../../constants/Images";
import { Camera, Trash, MapPin } from "lucide-react";
import { motion } from "motion/react";

function readFileAsDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

const makeId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function Profile() {
  const defaultProfile = useMemo(
    () => ({
      name: "",
      email: "",
      location: "",
      bio: "",
      avatar: Images.profil,
    }),
    [],
  );

  const defaultPlaces = useMemo(
    () => [
      {
        id: makeId(),
        title: "Taghazout",
        location: "Agadir, Morocco",
        note: "Surf vibes",
        img: Images.hometaghazout,
      },
      {
        id: makeId(),
        title: "Merzouga",
        location: "Errachidia, Morocco",
        note: "Desert sunset",
        img: Images.homemerzouga,
      },
    ],
    [],
  );

  const [profile, setProfile] = useState(defaultProfile);
  const [places, setPlaces] = useState(defaultPlaces);

  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [form, setForm] = useState({
    name: defaultProfile.name,
    email: defaultProfile.email,
    location: defaultProfile.location,
    bio: defaultProfile.bio,
    avatar: defaultProfile.avatar,
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (e.g., 2MB limit for localStorage safety)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image is too large. Please choose an image smaller than 2MB.");
      return;
    }

    const dataUrl = await readFileAsDataURL(file);
    if (dataUrl) {
      setAvatarPreview(dataUrl);
      setForm((f) => ({ ...f, avatar: dataUrl }));
    }
  };

  const [placeForm, setPlaceForm] = useState({
    title: "",
    location: "",
    note: "",
    img: "",
  });

  // Load once: yt_profile + currentUser (name/email) + yt_places
  useEffect(() => {
    try {
      const savedProfileRaw = localStorage.getItem("yt_profile");
      const savedPlacesRaw = localStorage.getItem("yt_places");
      const currentUserRaw = localStorage.getItem("currentUser");

      const savedProfile = savedProfileRaw ? JSON.parse(savedProfileRaw) : null;
      const currentUser = currentUserRaw ? JSON.parse(currentUserRaw) : null;

      const mergedProfile = {
        ...defaultProfile,
        ...savedProfile,
        ...(currentUser?.name ? { name: currentUser.name } : {}),
        ...(currentUser?.email ? { email: currentUser.email } : {}),
      };

      setProfile(mergedProfile);
      setForm(mergedProfile);

      if (savedPlacesRaw) {
        const pl = JSON.parse(savedPlacesRaw);
        if (Array.isArray(pl)) setPlaces(pl);
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist profile + notify navbar
  useEffect(() => {
    if (!profile.name && !profile.email && profile.avatar === Images.profil)
      return;
    try {
      localStorage.setItem("yt_profile", JSON.stringify(profile));
      window.dispatchEvent(new Event("yt_profile_updated"));
    } catch (e) {
      console.error("Profile save failed:", e);
    }
  }, [profile]);

  // Persist places
  useEffect(() => {
    try {
      localStorage.setItem("yt_places", JSON.stringify(places));
    } catch (e) {
      console.error("Places save failed:", e);
    }
  }, [places]);

  const startEdit = () => {
    setForm({
      name: profile.name,
      email: profile.email,
      location: profile.location,
      bio: profile.bio,
      avatar: profile.avatar,
    });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setForm({
      name: profile.name,
      email: profile.email,
      location: profile.location,
      bio: profile.bio,
      avatar: profile.avatar,
    });
    setAvatarPreview(null);
    setIsEditing(false);
  };

  const saveEdit = () => {
    const newName = form.name?.trim() || profile.name;
    const newEmail = form.email?.trim() || profile.email;

    const newProfile = {
      ...profile,
      name: newName,
      email: newEmail,
      location: form.location?.trim() || profile.location,
      bio: form.bio,
      avatar: form.avatar,
    };

    setProfile(newProfile);

    try {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ name: newName, email: newEmail }),
      );
    } catch (e) {
      console.error("User storage failed:", e);
    }

    setAvatarPreview(null);
    setIsEditing(false);
  };

  const onPickAvatar = handleAvatarChange;

  const onPickPlaceImg = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    if (dataUrl) setPlaceForm((f) => ({ ...f, img: dataUrl }));
  };

  const addPlace = () => {
    if (!placeForm.title.trim()) return;

    const newPlace = {
      id: makeId(),
      title: placeForm.title.trim(),
      location: placeForm.location.trim(),
      note: placeForm.note.trim(),
      img: placeForm.img || "",
    };

    setPlaces((prev) => [newPlace, ...prev]);
    setPlaceForm({ title: "", location: "", note: "", img: "" });

    const input = document.getElementById("placeImgInput");
    if (input) input.value = "";
  };

  const removePlace = (id) =>
    setPlaces((prev) => prev.filter((p) => p.id !== id));

  const currentAvatar = isEditing ? form.avatar : profile.avatar;

  return (
    <div className="min-h-screen bg-(--bg-main) transition-colors duration-500">
      <Navbar />

      {/* Background decoration */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 dark:opacity-100">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-logo-sky/15 blur-3xl" />
          <div className="absolute top-40 -right-24 h-80 w-80 rounded-full bg-logo-soft/10 blur-3xl" />
        </div>

        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-20 lg:px-8">
          {/* Profile Header */}
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-(--text-main)">
                Your Profile
              </h1>
              <p className="mt-2 text-sm text-(--text-main) opacity-60 font-bold">
                Manage your details and your favorite travel spots.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={startEdit}
                  className="rounded-xl bg-linear-to-r from-logo-sky to-logo-dark px-5 py-2 text-sm font-semibold text-white shadow-md hover:opacity-95"
                >
                  Edit profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={saveEdit}
                    className="rounded-xl bg-linear-to-r from-logo-sky to-logo-dark px-5 py-2 text-sm font-semibold text-white shadow-md hover:opacity-95"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="rounded-xl bg-white/5 px-5 py-2 text-sm font-semibold text-white/85 hover:bg-white/10"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Top layout */}
          <div className="mt-10 flex flex-col gap-8 lg:flex-row">
            {/* Main Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex-1 rounded-[2.5rem] bg-(--bg-main) shadow-(--card-shadow) overflow-hidden"
            >
              <div className="p-8 sm:p-10">
                <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
                  {/* Avatar Section */}
                  <div className="group relative">
                    <div className="relative h-32 w-32 overflow-hidden rounded-[2.5rem] bg-(--bg-main) shadow-xl">
                      <img
                        src={avatarPreview || profile.avatar}
                        alt="Profile Avatar"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    {isEditing && (
                      <label
                        htmlFor="avatarInput"
                        className="absolute -bottom-2 -right-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl bg-logo-sky text-white shadow-lg transition-all hover:scale-110 active:scale-95"
                      >
                        <Camera size={20} />
                        <input
                          id="avatarInput"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    )}
                  </div>

                  {/* Basic Info Display */}
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-xs font-black text-logo-sky uppercase tracking-widest mb-1">
                      Traveler
                    </p>
                    <h2 className="text-xl sm:text-2xl font-black text-(--text-main)">
                      {profile.name || "No name"}
                    </h2>
                    <p className="mt-1 text-sm text-(--text-main) opacity-70 font-bold">
                      {profile.email || "No email"}
                    </p>
                    <p className="text-sm text-(--text-main) opacity-40 font-black mt-1">
                      {profile.location || "No location"}
                    </p>
                  </div>
                </div>

                {/* Form Grid */}
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {[
                    {
                      label: "Full Name",
                      key: "name",
                      placeholder: "Alex Johnson",
                    },
                    {
                      label: "Email Address",
                      key: "email",
                      placeholder: "alex@example.com",
                    },
                    {
                      label: "Location",
                      key: "location",
                      placeholder: "Casablanca, Morocco",
                    },
                    {
                      label: "Travel Title",
                      key: "title",
                      placeholder: "Adventure Seeker",
                    },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="mb-2 block text-xs font-black text-(--text-main) uppercase tracking-widest opacity-40">
                        {field.label}
                      </label>
                      <input
                        disabled={!isEditing}
                        value={form[field.key]}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            [field.key]: e.target.value,
                          }))
                        }
                        className="w-full bg-(--bg-main) px-6 py-4 rounded-2xl text-(--text-main) font-black border-none! shadow-sm focus:ring-2 focus:ring-logo-sky/30 transition-all outline-none"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>

                {/* Bio */}
                <div className="mt-10 rounded-3xl bg-(--bg-main) p-8 shadow-inner">
                  <p className="text-xs font-black text-(--text-main) uppercase tracking-widest opacity-40">
                    Bio
                  </p>

                  {!isEditing ? (
                    <p className="mt-4 text-base text-(--text-main) opacity-80 font-bold leading-relaxed">
                      {profile.bio || "No bio yet."}
                    </p>
                  ) : (
                    <textarea
                      value={form.bio}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, bio: e.target.value }))
                      }
                      className="mt-4 w-full rounded-2xl bg-(--bg-main) border-none px-4 py-3.5 text-sm text-(--text-main) placeholder-(--text-main)/30 outline-none focus:ring-2 focus:ring-logo-sky/40 transition-all font-bold shadow-sm"
                      rows={4}
                      placeholder="Write your bio..."
                    />
                  )}
                </div>
              </div>
            </motion.div>

            {/* Quick panel */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="w-full lg:w-[360px] rounded-[2.5rem] bg-(--bg-main) shadow-(--card-shadow) overflow-hidden"
            >
              <div className="p-8 px-6 sm:p-7">
                <h3 className="text-lg font-black text-(--text-main)">
                  Quick Actions
                </h3>
                <p className="mt-2 text-sm text-(--text-main) opacity-60 font-bold">
                  Shortcuts to keep your journey organized.
                </p>

                <div className="mt-8 flex flex-col gap-4">
                  <button className="rounded-2xl bg-(--bg-main) px-4 py-3.5 text-left text-sm font-black text-(--text-main) opacity-60 hover:opacity-100 hover:text-logo-sky transition-all shadow-sm">
                    My trips
                  </button>
                  <button className="rounded-2xl bg-(--bg-main) px-4 py-3.5 text-left text-sm font-black text-(--text-main) opacity-60 hover:opacity-100 hover:text-logo-sky transition-all shadow-sm">
                    Saved trips
                  </button>
                  <button className="rounded-2xl bg-(--bg-main) px-4 py-3.5 text-left text-sm font-black text-(--text-main) opacity-60 hover:opacity-100 hover:text-logo-sky transition-all shadow-sm">
                    Account settings
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Favorite Places */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="mt-10 rounded-[2.5rem] bg-(--bg-main) shadow-(--card-shadow) overflow-hidden"
          >
            <div className="p-8 sm:p-12">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
                <div>
                  <h3 className="text-2xl font-black text-(--text-main)">
                    Favorite places
                  </h3>
                  <p className="mt-2 text-sm text-(--text-main) opacity-60 font-bold">
                    Add places you love. Image is optional.
                  </p>
                </div>

                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-(--text-main) uppercase tracking-widest opacity-40 ml-1">
                        Place Name
                      </label>
                      <input
                        value={placeForm.title}
                        onChange={(e) =>
                          setPlaceForm((f) => ({ ...f, title: e.target.value }))
                        }
                        className="w-full rounded-2xl bg-(--bg-main) border border-(--border-color) px-5 py-3.5 text-sm text-(--text-main) placeholder-(--text-main)/30 outline-none focus:ring-2 focus:ring-logo-sky/40 transition-all font-black shadow-sm"
                        placeholder="e.g. Chefchaouen"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-(--text-main) uppercase tracking-widest opacity-40 ml-1">
                        Location
                      </label>
                      <input
                        value={placeForm.location}
                        onChange={(e) =>
                          setPlaceForm((f) => ({
                            ...f,
                            location: e.target.value,
                          }))
                        }
                        className="w-full rounded-2xl bg-(--bg-main) border border-(--border-color) px-5 py-3.5 text-sm text-(--text-main) placeholder-(--text-main)/30 outline-none focus:ring-2 focus:ring-logo-sky/40 transition-all font-black shadow-sm"
                        placeholder="City, Country"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-(--text-main) uppercase tracking-widest opacity-40 ml-1">
                        Note
                      </label>
                      <input
                        value={placeForm.note}
                        onChange={(e) =>
                          setPlaceForm((f) => ({ ...f, note: e.target.value }))
                        }
                        className="w-full rounded-2xl bg-(--bg-main) border border-(--border-color) px-5 py-3.5 text-sm text-(--text-main) placeholder-(--text-main)/30 outline-none focus:ring-2 focus:ring-logo-sky/40 transition-all font-black shadow-sm"
                        placeholder="Tell us why..."
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="placeImgInput"
                        className="flex-1 cursor-pointer rounded-2xl bg-(--bg-main) border border-(--border-color) px-5 py-3.5 text-center text-[11px] font-black text-(--text-main) hover:bg-(--bg-secondary) hover:text-logo-sky hover:border-logo-sky/50 transition-all shadow-sm whitespace-nowrap"
                      >
                        {placeForm.img ? "Change image" : "Add image"}
                      </label>
                      <input
                        id="placeImgInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onPickPlaceImg}
                      />

                      <button
                        type="button"
                        onClick={addPlace}
                        className="rounded-2xl bg-linear-to-r from-logo-sky to-logo-dark px-10 py-3.5 text-[11px] font-black text-white shadow-lg shadow-logo-sky/20 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                {places.map((p) => (
                  <motion.div
                    key={p.id}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="group w-full sm:w-[calc(50%-0.6rem)] lg:w-[calc(33.333%-0.8rem)] overflow-hidden rounded-[2.5rem] bg-(--bg-main) shadow-(--card-shadow) hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="relative h-56 w-full overflow-hidden">
                      {p.img ? (
                        <img
                          src={p.img}
                          alt={p.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-(--bg-main) shadow-inner">
                          <span className="text-[10px] font-black text-(--text-main) opacity-20 uppercase tracking-[0.2em]">
                            No image
                          </span>
                        </div>
                      )}

                      <button
                        onClick={() => removePlace(p.id)}
                        className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-500 opacity-0 transition-all hover:bg-red-500 hover:text-white group-hover:opacity-100 shadow-sm"
                      >
                        <Trash size={16} />
                      </button>
                    </div>

                    <div className="p-8">
                      <h4 className="text-lg font-black text-(--text-main) tracking-tight">
                        {p.title}
                      </h4>
                      {p.note ? (
                        <p className="mt-2 text-sm text-(--text-main) opacity-60 font-bold italic line-clamp-2">
                          "{p.note}"
                        </p>
                      ) : (
                        <p className="mt-2 text-[10px] text-(--text-main) opacity-20 font-black uppercase tracking-widest">
                          Unlabeled
                        </p>
                      )}
                      <div className="mt-6 flex items-center gap-2 text-logo-sky">
                        <MapPin size={14} />
                        <span className="text-[10px] font-black uppercase tracking-[0.15em]">
                          {p.location}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
