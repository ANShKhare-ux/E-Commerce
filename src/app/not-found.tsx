import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center space-y-4">
      <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600">
        404 • Silhouette Not Located
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl text-noir-900 font-medium">
        Piece Not Found
      </h1>
      <p className="text-xs text-noir-500 max-w-sm font-light leading-relaxed">
        The design or page you requested does not exist or has been archived from our current atelier edit.
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 bg-noir-900 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm hover:bg-gold-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
