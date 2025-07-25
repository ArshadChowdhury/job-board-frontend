"use client";

import { useQuery } from "@tanstack/react-query";
import { MapPin, Building2, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

// Types
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  createdAt: string;
}

// API function
const fetchJobs = async (): Promise<Job[]> => {
  const { data } = await axiosInstance.get("/jobs/public");

  return data;
};

export default function PublicJobsPage() {
  const {
    data: jobs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-6 shadow-sm border"
                >
                  <div className="h-6 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600">
            Unable to load jobs. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Dream Job
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing opportunities from top companies around the world
          </p>
        </header>
        {/* Stats */}
        <section className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <Link className="text-slate-800 hover:underline" href={"/"}>
            Go Back To Home
          </Link>

          <div className="bg-white rounded-lg px-6 py-3 shadow-sm border flex items-center">
            <span className="text-2xl font-bold text-slate-600">
              {jobs?.length || 0}
            </span>
            <span className="text-gray-600 ml-3 pt-1">Active Jobs</span>
          </div>
          <Link
            className="text-slate-800 hover:underline"
            href={"/admin/login"}
          >
            Login as an Admin
          </Link>
        </section>

        {/* Jobs Grid */}
        {jobs && jobs.length > 0 ? (
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 leading-tight">
                    {job.title}
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      New
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Building2 className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.company}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {job.description.substring(0, 60)}...
                </p>

                <Link
                  href={`/jobs/${job.id}`}
                  className="inline-flex items-center justify-center w-full px-4 py-2 text-white font-medium rounded-lg transition-colors duration-200 hover:opacity-90 bg-slate-700"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </section>
        ) : (
          <section className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Building2 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No jobs available
            </h3>
            <p className="text-gray-600">
              Check back later for new opportunities!
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
