import React, { useState } from 'react';
import { Link2, Check } from 'lucide-react';

interface SectionAnchorProps {
  id: string;
  label?: string;
  className?: string;
}

export const SectionAnchor: React.FC<SectionAnchorProps> = ({ id, label, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/${id}/`;
    navigator.clipboard.writeText(url);
    window.history.pushState(null, '', `/${id}/`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono transition-all cursor-pointer group normal-case tracking-normal ${
        copied
          ? 'bg-[rgb(95,227,103)]/20 text-[rgb(95,227,103)] border border-[rgb(95,227,103)]/40 shadow-sm'
          : 'bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white border border-white/[0.08]'
      } ${className}`}
      title={`Click to copy direct link: /${id}/`}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 text-[rgb(95,227,103)] shrink-0" />
          <span className="text-[rgb(95,227,103)] font-semibold">Copied link!</span>
        </>
      ) : (
        <>
          <Link2 className="w-3 h-3 text-neutral-500 group-hover:text-white shrink-0 transition-colors" />
          <span className="text-neutral-400 group-hover:text-neutral-200">{label || id}</span>
        </>
      )}
    </button>
  );
};

