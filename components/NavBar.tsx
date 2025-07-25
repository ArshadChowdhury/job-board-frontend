import React from "react";
import Link from "next/link";
import { Briefcase } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-slate-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">JobHub</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/jobs"
              className="text-gray-700 hover:text-slate-600 hover:underline transition-colors"
            >
              Jobs
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-slate-600 hover:underline transition-colors"
            >
              Companies
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-slate-600 hover:underline transition-colors"
            >
              About
            </Link>
            <Link
              href={"/admin/login"}
              className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
