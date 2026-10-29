"use client";

import React, { useState } from "react";
import { HomepageConfig, AnnouncementBarMessage, CampaignSectionConfig } from "@/types";
import {
  Sliders,
  CheckCircle2,
  AlertCircle,
  Megaphone,
  Image as ImageIcon,
  Sparkles,
  Plus,
  Trash2,
  Eye,
  ExternalLink
} from "lucide-react";

interface HomepageClientProps {
  initialConfig: HomepageConfig;
}

export function HomepageClient({ initialConfig }: HomepageClientProps) {
  const [config, setConfig] = useState<HomepageConfig>(initialConfig);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // New Announcement form state
  const [newBadge, setNewBadge] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newLink, setNewLink] = useState("/products");

  const handleSave = async (updatedConfig: HomepageConfig) => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedConfig),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setConfig(data.config);
        setMessage({ type: "success", text: "Storefront homepage configuration updated successfully." });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update homepage settings." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error saving homepage configuration." });
    } finally {
      setSaving(false);
    }
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newAnnouncement: AnnouncementBarMessage = {
      id: `ann-${Date.now()}`,
      badge: newBadge.trim() || "Offer",
      message: newMessage.trim(),
      link: newLink.trim() || "/products",
      is_active: true,
    };

    const updated = {
      ...config,
      announcements: [...config.announcements, newAnnouncement],
    };
    setConfig(updated);
    handleSave(updated);
    setNewBadge("");
    setNewMessage("");
    setNewLink("/products");
  };

  const handleRemoveAnnouncement = (id: string) => {
    const updated = {
      ...config,
      announcements: config.announcements.filter((a) => a.id !== id),
    };
    setConfig(updated);
    handleSave(updated);
  };

  const handleToggleAnnouncement = (id: string) => {
    const updated = {
      ...config,
      announcements: config.announcements.map((a) =>
        a.id === id ? { ...a, is_active: !a.is_active } : a
      ),
    };
    setConfig(updated);
    handleSave(updated);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-canvas-border gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
            Storefront Experience
          </span>
          <h1 className="font-serif text-3xl text-noir-900 font-medium">
            Homepage & Editorial Studio
          </h1>
          <p className="text-xs text-noir-500 font-light mt-0.5">
            Configure live announcements, campaign hero banner, and editorial feature sections.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-canvas-border hover:border-noir-900 text-noir-800 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm transition-colors flex items-center gap-2"
        >
          <Eye className="w-4 h-4 text-gold-600" />
          <span>View Live Storefront</span>
          <ExternalLink className="w-3.5 h-3.5 text-noir-400" />
        </a>
      </div>

      {/* Notifications */}
      {message && (
        <div
          className={`p-4 rounded-sm text-xs flex items-center gap-2 ${
            message.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-rose-50 border border-rose-200 text-rose-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* 1. ANNOUNCEMENT BAR SECTION */}
      <div className="bg-white border border-canvas-border rounded-sm shadow-subtle p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-canvas-border pb-3">
          <Megaphone className="w-5 h-5 text-gold-600" />
          <h2 className="font-serif text-lg font-medium text-noir-900">
            Promotional Announcement Bar
          </h2>
        </div>

        <p className="text-xs text-noir-500">
          Messages appear in the top slim announcement bar across the site. Multiple active messages rotate smoothly.
        </p>

        {/* Existing Announcements */}
        <div className="space-y-3">
          {config.announcements.map((ann) => (
            <div
              key={ann.id}
              className={`p-4 border rounded-sm flex items-center justify-between gap-4 transition-colors ${
                ann.is_active ? "border-canvas-border bg-canvas-subtle/30" : "border-canvas-border/50 bg-canvas-subtle/10 opacity-60"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="bg-noir-900 text-gold-400 text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider">
                  {ann.badge}
                </span>
                <span className="text-xs text-noir-900 font-medium">
                  {ann.message}
                </span>
                {ann.link && (
                  <span className="text-[11px] text-noir-400 font-mono hidden sm:inline">
                    ({ann.link})
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleAnnouncement(ann.id)}
                  className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded transition-colors ${
                    ann.is_active ? "bg-emerald-100 text-emerald-800" : "bg-noir-200 text-noir-700"
                  }`}
                >
                  {ann.is_active ? "Active" : "Hidden"}
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveAnnouncement(ann.id)}
                  className="p-1 text-noir-400 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Announcement */}
        <form onSubmit={handleAddAnnouncement} className="pt-3 border-t border-canvas-border space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-noir-800">
            Add Promotional Message
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <input
                type="text"
                placeholder="Badge (e.g. Free Shipping)"
                value={newBadge}
                onChange={(e) => setNewBadge(e.target.value)}
                className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder="Announcement message text..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                required
                className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Link destination (e.g. /products)"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-noir-900 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Announcement</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. HERO CAMPAIGN BANNER SECTION */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(config);
        }}
        className="bg-white border border-canvas-border rounded-sm shadow-subtle p-6 space-y-6"
      >
        <div className="flex items-center gap-2 border-b border-canvas-border pb-3">
          <ImageIcon className="w-5 h-5 text-gold-600" />
          <h2 className="font-serif text-lg font-medium text-noir-900">
            Main Editorial Campaign Hero
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1.5">
              Badge Text
            </label>
            <input
              type="text"
              value={config.hero.badge_text}
              onChange={(e) =>
                setConfig({ ...config, hero: { ...config.hero, badge_text: e.target.value } })
              }
              className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1.5">
              Hero Image URL (Licensed / CDN)
            </label>
            <input
              type="url"
              value={config.hero.image_url}
              onChange={(e) =>
                setConfig({ ...config, hero: { ...config.hero, image_url: e.target.value } })
              }
              className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1.5">
              Headline Line 1
            </label>
            <input
              type="text"
              value={config.hero.headline_line1}
              onChange={(e) =>
                setConfig({ ...config, hero: { ...config.hero, headline_line1: e.target.value } })
              }
              className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1.5">
              Headline Line 2 (Italic Accent)
            </label>
            <input
              type="text"
              value={config.hero.headline_line2}
              onChange={(e) =>
                setConfig({ ...config, hero: { ...config.hero, headline_line2: e.target.value } })
              }
              className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1.5">
              Subheading / Description
            </label>
            <textarea
              rows={2}
              value={config.hero.subheading}
              onChange={(e) =>
                setConfig({ ...config, hero: { ...config.hero, subheading: e.target.value } })
              }
              className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1.5">
              Primary Button Text
            </label>
            <input
              type="text"
              value={config.hero.primary_button_text}
              onChange={(e) =>
                setConfig({ ...config, hero: { ...config.hero, primary_button_text: e.target.value } })
              }
              className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1.5">
              Primary Button Destination Link
            </label>
            <input
              type="text"
              value={config.hero.primary_button_link}
              onChange={(e) =>
                setConfig({ ...config, hero: { ...config.hero, primary_button_link: e.target.value } })
              }
              className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1.5">
              Secondary Button Text
            </label>
            <input
              type="text"
              value={config.hero.secondary_button_text}
              onChange={(e) =>
                setConfig({ ...config, hero: { ...config.hero, secondary_button_text: e.target.value } })
              }
              className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1.5">
              Secondary Button Destination Link
            </label>
            <input
              type="text"
              value={config.hero.secondary_button_link}
              onChange={(e) =>
                setConfig({ ...config, hero: { ...config.hero, secondary_button_link: e.target.value } })
              }
              className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-canvas-border">
          <button
            type="submit"
            disabled={saving}
            className="bg-gold-600 hover:bg-gold-500 text-noir-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save Hero Configuration"}
          </button>
        </div>
      </form>

      {/* 3. SOCIAL MEDIA CHANNELS */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(config);
        }}
        className="bg-white border border-canvas-border rounded-sm shadow-subtle p-6 space-y-6"
      >
        <div className="flex items-center gap-2 border-b border-canvas-border pb-3">
          <Sparkles className="w-5 h-5 text-gold-600" />
          <h2 className="font-serif text-lg font-medium text-noir-900">
            Official Social Media Links
          </h2>
        </div>

        <p className="text-xs text-noir-500">
          Configure verified social handles shown to patrons in the website footer and brand stories.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1">
              Instagram Profile URL
            </label>
            <input
              type="url"
              value={config.social_links?.instagram || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  social_links: { ...config.social_links, instagram: e.target.value },
                })
              }
              placeholder="https://instagram.com/lumiere.atelier"
              className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1">
              X (Twitter) Profile URL
            </label>
            <input
              type="url"
              value={config.social_links?.twitter || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  social_links: { ...config.social_links, twitter: e.target.value },
                })
              }
              placeholder="https://x.com/lumiere_india"
              className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1">
              Pinterest Curations URL
            </label>
            <input
              type="url"
              value={config.social_links?.pinterest || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  social_links: { ...config.social_links, pinterest: e.target.value },
                })
              }
              placeholder="https://pinterest.com/lumiere_luxury"
              className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-noir-800 uppercase tracking-wider mb-1">
              YouTube Channel URL
            </label>
            <input
              type="url"
              value={config.social_links?.youtube || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  social_links: { ...config.social_links, youtube: e.target.value },
                })
              }
              placeholder="https://youtube.com/@lumiere_atelier"
              className="w-full text-xs p-2.5 border border-canvas-border rounded-sm focus:border-noir-900 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-canvas-border">
          <button
            type="submit"
            disabled={saving}
            className="bg-noir-900 hover:bg-gold-600 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save Social Channels"}
          </button>
        </div>
      </form>
    </div>
  );
}
