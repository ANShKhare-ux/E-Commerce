import React from "react";
import { db } from "@/lib/db";
import { ClipboardList, Clock, Mail, CheckCircle2, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminAuditLogsPage() {
  const auditLogs = await db.audit.getLogs();
  const jobs = await db.audit.getJobs();
  const emails = await db.audit.getEmailOutbox();

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
          Governance & Observability
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-noir-900">
          Audit Logs & Automation Monitor
        </h1>
        <p className="text-xs text-noir-500 font-light mt-0.5">
          Server-side immutable record of administrator interventions, scheduled jobs, and transactional email deliveries.
        </p>
      </div>

      {/* 1. Scheduled Background Automation Jobs */}
      <div className="bg-white border border-canvas-border rounded-sm shadow-xs p-6 space-y-4">
        <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2 border-b border-canvas-border pb-2">
          <Clock className="w-4 h-4 text-gold-600" />
          <span>Scheduled Cron Execution History ({jobs.length})</span>
        </h2>

        {jobs.length === 0 ? (
          <p className="text-xs text-noir-500 py-4">No scheduled automation runs triggered yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-canvas-border text-noir-500 uppercase tracking-wider text-[10px]">
                  <th className="py-2">Job Name</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Records Affected</th>
                  <th className="py-2">Telemetry & Details</th>
                  <th className="py-2 text-right">Execution Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-canvas-subtle font-mono text-[11px]">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-canvas-light">
                    <td className="py-2.5 font-bold text-noir-900">{job.job_name}</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {job.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-noir-700">{job.records_affected} records</td>
                    <td className="py-2.5 text-noir-600 font-sans max-w-sm truncate" title={job.details}>
                      {job.details}
                    </td>
                    <td className="py-2.5 text-right text-noir-400">
                      {new Date(job.created_at).toLocaleTimeString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 2. Administrator Audit Trail */}
      <div className="bg-white border border-canvas-border rounded-sm shadow-xs p-6 space-y-4">
        <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2 border-b border-canvas-border pb-2">
          <ClipboardList className="w-4 h-4 text-gold-600" />
          <span>Privileged Administrator Interventions ({auditLogs.length})</span>
        </h2>

        {auditLogs.length === 0 ? (
          <p className="text-xs text-noir-500 py-4">No administrator modifications recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-canvas-border text-noir-500 uppercase tracking-wider text-[10px]">
                  <th className="py-2">Timestamp</th>
                  <th className="py-2">Administrator</th>
                  <th className="py-2">Action</th>
                  <th className="py-2">Entity ID</th>
                  <th className="py-2">Audit Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-canvas-subtle font-mono text-[11px]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-canvas-light">
                    <td className="py-2.5 text-noir-400">
                      {new Date(log.created_at).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="py-2.5 text-noir-700">{log.user_email}</td>
                    <td className="py-2.5 font-bold uppercase text-gold-700">{log.action}</td>
                    <td className="py-2.5 text-noir-500">{log.entity_id}</td>
                    <td className="py-2.5 text-noir-600 font-sans max-w-sm truncate" title={log.details}>
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 3. Transactional Email Outbox */}
      <div className="bg-white border border-canvas-border rounded-sm shadow-xs p-6 space-y-4">
        <h2 className="font-serif text-base font-bold text-noir-900 flex items-center gap-2 border-b border-canvas-border pb-2">
          <Mail className="w-4 h-4 text-gold-600" />
          <span>Transactional Email Delivery Log ({emails.length})</span>
        </h2>

        {emails.length === 0 ? (
          <p className="text-xs text-noir-500 py-4">No transactional emails queued.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-canvas-border text-noir-500 uppercase tracking-wider text-[10px]">
                  <th className="py-2">Recipient</th>
                  <th className="py-2">Subject</th>
                  <th className="py-2">Template</th>
                  <th className="py-2">Status</th>
                  <th className="py-2 text-right">Queued At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-canvas-subtle font-mono text-[11px]">
                {emails.map((m) => (
                  <tr key={m.id} className="hover:bg-canvas-light">
                    <td className="py-2.5 font-bold text-noir-800">{m.recipient}</td>
                    <td className="py-2.5 font-sans text-noir-700">{m.subject}</td>
                    <td className="py-2.5 text-gold-700 uppercase text-[10px]">{m.template}</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {m.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-right text-noir-400">
                      {new Date(m.created_at).toLocaleTimeString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
