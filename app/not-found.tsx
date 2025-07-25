import Link from "next/link";

export default function Custom404() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <section className="text-center max-w-lg mx-auto">
        {/* Large 404 Text */}
        <div className="mb-8">
          <h2 className="text-7xl font-bold text-slate-600 mb-4 animate-pulse">
            404
          </h2>
          <div className="w-24 h-1 bg-slate-500 mx-auto mb-6"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-slate-700 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            The page you&apos;re looking for seems to have wandeslate off.
            Don&apos;t worry, it happens to the best of us!
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-slate-200 rounded-full flex items-center justify-center shadow-lg">
            <div className="text-6xl">🔍</div>
          </div>
        </div>

        {/* Go Home Button */}
        <Link
          href={"/"}
          className="inline-flex items-center px-8 py-4 bg-slate-600 text-white font-semibold rounded-lg shadow-lg hover:bg-slate-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-slate-300"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Go Back Home
        </Link>

        {/* Additional Help Text */}
        <p className="mt-6 text-slate-500 text-sm">
          Lost? Try checking the URL or use the navigation menu.
        </p>
      </section>
    </main>
  );
}
