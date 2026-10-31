"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  XCircle,
  FileText,
  Lock,
  Cookie,
  AlertCircle,
  Award,
  CreditCard,
  UserCheck,
  Sparkles,
  Eye,
  HelpCircle,
  Mail,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  effectiveDate: string;
  category?: "service" | "legal" | "compliance";
  tableOfContents?: { id: string; label: string }[];
  children: React.ReactNode;
}

interface PolicyLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  effectiveDate,
  tableOfContents = [],
  children,
}: LegalPageLayoutProps) {
  const pathname = usePathname();

  const customerServiceLinks: PolicyLink[] = [
    { label: "Shipping & Delivery", href: "/shipping-policy", icon: Truck },
    { label: "Returns & Exchanges", href: "/returns-policy", icon: RotateCcw },
    { label: "Order Cancellation", href: "/cancellation-policy", icon: XCircle },
    { label: "Payment Policy", href: "/payment-policy", icon: CreditCard },
    { label: "Contact Concierge", href: "/contact", icon: Mail },
    { label: "Frequently Asked Questions", href: "/faq", icon: HelpCircle },
  ];

  const legalPolicyLinks: PolicyLink[] = [
    { label: "Terms & Conditions", href: "/terms", icon: FileText },
    { label: "Privacy Policy", href: "/privacy-policy", icon: Lock },
    { label: "Cookie Policy", href: "/cookie-policy", icon: Cookie },
    { label: "Store Disclaimer", href: "/disclaimer", icon: AlertCircle },
    { label: "Intellectual Property", href: "/intellectual-property", icon: Award },
  ];

  const complianceLinks: PolicyLink[] = [
    { label: "Grievance Redressal", href: "/grievance-redressal", icon: UserCheck },
    { label: "Product Authenticity", href: "/authenticity", icon: Sparkles },
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure", icon: ExternalLink },
    { label: "Accessibility Statement", href: "/accessibility", icon: Eye },
  ];

  const isCurrent = (href: string) => pathname === href;

  return (
    <div className="bg-[#fcfbf9] min-h-screen py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Legal Breadcrumb"
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-noir-400"
        >
          <Link href="/" className="hover:text-noir-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-noir-300" />
          <span className="text-noir-500">Legal & Customer Care</span>
          <ChevronRight className="w-3 h-3 text-noir-300" />
          <span className="text-noir-900 font-semibold">{title}</span>
        </nav>

        {/* Header Hero Banner */}
        <div className="border-b border-[#eaeaec] pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C59B48] block mb-1">
                LUMIÈRE Governance & Trust
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-noir-900 font-bold tracking-tight">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-noir-600 mt-1 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Document Metadata Badges */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-noir-500">
              <span className="px-2.5 py-1 bg-white border border-[#eaeaec] rounded-sm">
                Effective: <strong>{effectiveDate}</strong>
              </span>
              <span className="px-2.5 py-1 bg-white border border-[#eaeaec] rounded-sm">
                Last Updated: <strong>{lastUpdated}</strong>
              </span>
              <span className="px-2.5 py-1 bg-[#faf9f5] border border-[#f0e3cc] text-[#9c782b] font-semibold rounded-sm">
                Jurisdiction: India
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Policy Tabs */}
        <div className="lg:hidden -mx-4 px-4 overflow-x-auto pb-2 scrollbar-none flex gap-2">
          {[...customerServiceLinks, ...legalPolicyLinks, ...complianceLinks].map((item) => {
            const active = isCurrent(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 px-3 py-1.5 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  active
                    ? "bg-noir-900 text-white"
                    : "bg-white border border-[#eaeaec] text-noir-700 hover:border-noir-900"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Main 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Desktop Policy Navigation Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
            <div className="bg-white border border-[#eaeaec] rounded-sm p-5 shadow-xs space-y-6">
              {/* Group 1: Customer Care */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C59B48] block mb-2.5">
                  Customer Care
                </span>
                <ul className="space-y-1">
                  {customerServiceLinks.map((item) => {
                    const active = isCurrent(item.href);
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-2 px-2.5 py-2 rounded-sm text-xs transition-colors font-medium ${
                            active
                              ? "bg-noir-900 text-white font-bold"
                              : "text-noir-700 hover:text-noir-900 hover:bg-[#fafafa]"
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${active ? "text-[#C59B48]" : "text-noir-400"}`} />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Group 2: Core Legal */}
              <div className="pt-4 border-t border-[#f5f5f6]">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C59B48] block mb-2.5">
                  Legal Documents
                </span>
                <ul className="space-y-1">
                  {legalPolicyLinks.map((item) => {
                    const active = isCurrent(item.href);
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-2 px-2.5 py-2 rounded-sm text-xs transition-colors font-medium ${
                            active
                              ? "bg-noir-900 text-white font-bold"
                              : "text-noir-700 hover:text-noir-900 hover:bg-[#fafafa]"
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${active ? "text-[#C59B48]" : "text-noir-400"}`} />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Group 3: Compliance & Trust */}
              <div className="pt-4 border-t border-[#f5f5f6]">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C59B48] block mb-2.5">
                  Compliance & Trust
                </span>
                <ul className="space-y-1">
                  {complianceLinks.map((item) => {
                    const active = isCurrent(item.href);
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-2 px-2.5 py-2 rounded-sm text-xs transition-colors font-medium ${
                            active
                              ? "bg-noir-900 text-white font-bold"
                              : "text-noir-700 hover:text-noir-900 hover:bg-[#fafafa]"
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${active ? "text-[#C59B48]" : "text-noir-400"}`} />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Quick Grievance Notice Box */}
            <div className="p-4 bg-[#faf9f5] border border-[#f0e3cc] rounded-sm text-xs text-noir-800 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-noir-900 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#C59B48]" />
                <span>Legal Metrology & Redressal</span>
              </div>
              <p className="text-[11px] text-noir-600 leading-relaxed">
                Appointed Grievance Officer in accordance with Consumer Protection (E-Commerce) Rules 2020.
              </p>
              <Link
                href="/grievance-redressal"
                className="text-[11px] font-bold text-[#9c782b] hover:underline flex items-center gap-1"
              >
                <span>View Officer Details</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </aside>

          {/* Right Main Policy Content Area (9 cols) */}
          <main className="lg:col-span-9 space-y-8">
            {/* Table of contents if present */}
            {tableOfContents.length > 0 && (
              <div className="bg-white border border-[#eaeaec] rounded-sm p-5 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-noir-800 block mb-3">
                  Document Table of Contents
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs">
                  {tableOfContents.map((section, idx) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="text-noir-600 hover:text-[#C59B48] hover:underline transition-colors flex items-baseline gap-2 py-0.5"
                    >
                      <span className="font-mono text-[10px] text-noir-400">{idx + 1}.</span>
                      <span>{section.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Policy Article Body */}
            <article className="prose prose-sm max-w-none text-noir-800">
              {children}
            </article>

            {/* Policy Footer Assistance Card */}
            <div className="mt-12 p-6 bg-white border border-[#eaeaec] rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div>
                <h4 className="font-serif text-base font-bold text-noir-900">
                  Questions regarding this document?
                </h4>
                <p className="text-xs text-noir-500 mt-0.5">
                  Our legal compliance desk and client concierge team are available Monday – Saturday.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="px-4 py-2 bg-noir-900 hover:bg-[#C59B48] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
                >
                  Contact Concierge
                </Link>
                <Link
                  href="/grievance-redressal"
                  className="px-4 py-2 border border-[#d4d5d9] hover:border-noir-900 text-noir-800 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
                >
                  Grievance Desk
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
