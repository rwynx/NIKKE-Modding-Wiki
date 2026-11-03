import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Cookie, BarChart3, Database, Globe } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-10 font-sans">
      
      {/* top nav */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-neutral-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Wiki</span>
        </button>

        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
          Privacy Policy · Effective October 2026
        </span>
      </div>

      {/* header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-mono text-neutral-300">
          <Lock className="w-3.5 h-3.5 text-[rgb(95,227,103)]" />
          <span>DATA PRIVACY & COOKIE POLICY</span>
        </div>

        <h1 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          Privacy-First. <br />
          <span className="text-neutral-400">Zero tracking, zero cookies.</span>
        </h1>

        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl">
          As a community, we believe in complete digital privacy. This documentation wiki is designed to operate without personal profiling, advertising networks, or intrusive tracking mechanisms.
        </p>
      </div>

      {/* sections */}
      <div className="space-y-8 text-neutral-300 text-sm leading-relaxed">
        
        <section className="epic-card p-6 sm:p-8 space-y-3 border-white/[0.1]">
          <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg">
            <EyeOff className="w-5 h-5 text-[rgb(95,227,103)] shrink-0" />
            <h2>1. No Personal Data Collected or Stored</h2>
          </div>
          <p className="text-neutral-400">
            This website does not require user registration, account creation, or login credentials. We do not solicit, collect, store, or process any Personally Identifiable Information (PII) such as your real name, email address, physical location, phone number, or payment details.
          </p>
          <p className="text-neutral-400">
            You can browse all modding documentation, character ID databases, and technical tutorials completely anonymously without providing any identity credentials.
          </p>
        </section>

        <section className="epic-card p-6 sm:p-8 space-y-4 border-white/[0.1]">
          <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg">
            <BarChart3 className="w-5 h-5 text-[rgb(160,225,255)] shrink-0" />
            <h2>2. Privacy-Preserving Web Analytics (Cloudflare)</h2>
          </div>
          <p className="text-neutral-400">
            To understand overall site performance, page popularity, and guide traffic, we use <strong>Cloudflare Web Analytics</strong>. Unlike traditional tracking platforms (such as Google Analytics or Meta Pixel), Cloudflare Web Analytics is completely privacy-focused:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-neutral-400 pl-1">
            <li><strong className="text-neutral-200">No Cookies or Local Storage:</strong> Cloudflare does not set any cookies or persistent identifiers in your browser.</li>
            <li><strong className="text-neutral-200">No Cross-Site Profiling:</strong> Your browsing habits are never linked to any other website or personal profile.</li>
            <li><strong className="text-neutral-200">No IP Tracking:</strong> IP addresses are discarded immediately and never stored in any database.</li>
            <li><strong className="text-neutral-200">Aggregated Metrics Only:</strong> Metrics are limited to high-level anonymous aggregates (e.g., page views, referring sites, country of origin, browser name, and operating system).</li>
          </ul>
          <p className="text-neutral-400 pt-1">
            Because this approach complies fully with GDPR, CCPA, and ePrivacy (PECR) regulations without tracking individuals, no intrusive cookie consent banner is required.
          </p>
        </section>

        <section className="epic-card p-6 sm:p-8 space-y-3 border-white/[0.1]">
          <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg">
            <Database className="w-5 h-5 text-amber-400 shrink-0" />
            <h2>3. Client-Side Browser Storage (`localStorage`)</h2>
          </div>
          <p className="text-neutral-400">
            To provide a responsive user experience, this website may store purely functional UI preferences in your browser's local storage (such as your recently selected character search filters, active video player volume, or workbench modal states).
          </p>
          <p className="text-neutral-400">
            This information is strictly client-side, resides exclusively on your own personal device, is never transmitted to our servers or any third parties, and can be cleared at any time by clearing your browser cache.
          </p>
        </section>

        <section className="epic-card p-6 sm:p-8 space-y-3 border-white/[0.1]">
          <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg">
            <Globe className="w-5 h-5 text-neutral-300 shrink-0" />
            <h2>4. Third-Party External Services & Embeds</h2>
          </div>
          <p className="text-neutral-400">
            This wiki contains links to external community repositories, community Discord servers, developer tools (e.g., Spine, Paint.NET, GIMP, GitHub), and embedded media players (YouTube, Catbox).
          </p>
          <p className="text-neutral-400">
            When clicking external outbound links or interacting with embedded third-party media players, your connection is established directly with those third-party services, which operate under their own independent privacy notices and terms of service.
          </p>
        </section>

        <section className="epic-card p-6 sm:p-8 space-y-3 border-white/[0.1]">
          <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg">
            <ShieldCheck className="w-5 h-5 text-neutral-300 shrink-0" />
            <h2>5. Changes to This Policy</h2>
          </div>
          <p className="text-neutral-400">
            Any revisions to this privacy statement will be reflected directly on this page with an updated modification timestamp. We remain committed to keeping this platform free of surveillance, advertising networks, and data harvesting.
          </p>
        </section>

      </div>

      {/* footer */}
      <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
        <button
          onClick={onBack}
          className="btn-liquid-chroma"
        >
          <span className="btn-liquid-chroma-inner px-4 py-2 text-xs">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </span>
        </button>

        <p className="text-xs font-mono text-neutral-500">
          Last Updated: October 2026
        </p>
      </div>

    </div>
  );
};

