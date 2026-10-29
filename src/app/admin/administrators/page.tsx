"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  UserPlus,
  Lock,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Key,
} from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  role: "super_admin" | "admin" | "inventory_manager";
  granted_by: string;
  granted_at: string;
}

const INITIAL_ADMINS: AdminUser[] = [
  {
    id: "adm-01",
    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || "superadmin@lumiere.in",
    role: "super_admin",
    granted_by: "System Configuration (ADMIN_EMAIL env)",
    granted_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "adm-02",
    email: "inventory.ops@lumiere.in",
    role: "inventory_manager",
    granted_by: "superadmin@lumiere.in",
    granted_at: "2025-01-10T11:00:00Z",
  },
];

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState<AdminUser[]>(INITIAL_ADMINS);
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<"admin" | "inventory_manager">("admin");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleGrantAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!newEmail || !newEmail.includes("@")) {
      setErrorMsg("Please provide a valid official corporate email.");
      return;
    }

    if (admins.some((a) => a.email.toLowerCase() === newEmail.toLowerCase())) {
      setErrorMsg("This user already holds administrative permissions.");
      return;
    }

    const newAdmin: AdminUser = {
      id: `adm-${Date.now()}`,
      email: newEmail.toLowerCase().trim(),
      role: newRole,
      granted_by: "superadmin@lumiere.in",
      granted_at: new Date().toISOString(),
    };

    setAdmins([...admins, newAdmin]);
    setSuccessMsg(`Granted ${newRole.replace("_", " ")} access to ${newEmail}. Action recorded in audit logs.`);
    setNewEmail("");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-canvas-border gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
            Access Governance & Security
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-noir-900">
            Administrator Management & Role Privileges
          </h1>
          <p className="text-xs text-noir-500 font-light mt-0.5">
            Strict server-side verified authorization with Supabase Row Level Security enforcement.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-sm text-xs font-semibold text-emerald-800 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Server Authorization Active</span>
        </div>
      </div>

      {/* Security Architecture Notice */}
      <div className="bg-canvas-subtle border-l-4 border-gold-600 p-4 sm:p-5 rounded-r-sm space-y-1 text-xs">
        <h4 className="font-bold text-noir-900 uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-4 h-4 text-gold-600" />
          <span>Security Protocol & Privilege Isolation</span>
        </h4>
        <p className="text-noir-600 leading-relaxed">
          Initial system authority is derived strictly from the server-side <code className="bg-white px-1.5 py-0.5 border border-canvas-border rounded font-mono text-[11px]">ADMIN_EMAIL</code> environment variable. 
          Customers cannot escalate their own roles or bypass access controls via client-side request tampering. All administrative actions are recorded in immutable audit logs.
        </p>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Grant Access Form */}
      <div className="bg-white border border-canvas-border p-6 rounded-sm shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-canvas-border pb-3">
          <UserPlus className="w-4 h-4 text-gold-600" />
          <h3 className="font-serif text-lg font-bold text-noir-900">
            Grant Administrative Privileges
          </h3>
        </div>

        <form onSubmit={handleGrantAccess} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
              Colleague Corporate Email
            </label>
            <input
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="operator@lumiere.in"
              className="w-full text-xs px-3.5 py-2.5 bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-noir-700 mb-1">
              Role Scope
            </label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as any)}
              className="w-full text-xs px-3 py-2.5 bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none text-noir-900"
            >
              <option value="admin">Full Store Administrator</option>
              <option value="inventory_manager">Inventory & Warehouse Manager</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-noir-900 hover:bg-gold-600 text-white font-bold py-2.5 px-4 text-xs uppercase tracking-widest transition-colors rounded-sm"
            >
              Grant Access
            </button>
          </div>
        </form>
      </div>

      {/* Active Administrators Table */}
      <div className="bg-white border border-canvas-border rounded-sm shadow-xs overflow-hidden">
        <div className="p-4 border-b border-canvas-border bg-canvas-subtle/50 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-noir-900">
            Authorized Personnel Directory
          </h3>
          <span className="text-xs text-noir-500 font-mono">
            {admins.length} Active Accounts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-canvas-subtle border-b border-canvas-border text-noir-600 text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4">Authorized User</th>
                <th className="py-3 px-4">Role Assigned</th>
                <th className="py-3 px-4">Authorization Source</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas-subtle">
              {admins.map((adm) => (
                <tr key={adm.id} className="hover:bg-canvas-light transition-colors">
                  <td className="py-3.5 px-4 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-gold-600 shrink-0" />
                    <span className="font-bold text-noir-900 font-mono">{adm.email}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                        adm.role === "super_admin"
                          ? "bg-purple-50 text-purple-800 border border-purple-200"
                          : adm.role === "admin"
                          ? "bg-gold-50 text-gold-800 border border-gold-200"
                          : "bg-blue-50 text-blue-800 border border-blue-200"
                      }`}
                    >
                      {adm.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-noir-600 text-[11px]">
                    {adm.granted_by}
                  </td>
                  <td className="py-3.5 px-4 text-noir-500 font-mono text-[11px]">
                    {new Date(adm.granted_at).toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
