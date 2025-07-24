"use client";

import { useQuery } from "@tanstack/react-query";
import { MapPin, Building2, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
const fetchJob = async (id: string): Promise<Job> => {
  const { data } = await axiosInstance.get(`/jobs/${id}`);
  return data;
};

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params.id as string;

  const {
    data: job,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => fetchJob(jobId),
    enabled: !!jobId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-24 mb-6"></div>
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/5"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/jobs"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Job not found
            </h2>
            <p className="text-gray-600">
              The job you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/jobs"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              {/* Job Header */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {job.title}
                </h1>

                <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Job Description
                </h2>
                <div className="prose prose-gray max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {job.description}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Ready to Apply?
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                Take the next step in your career journey and apply for this
                position.
              </p>

              <Link
                href={`/jobs/${job.id}/apply`}
                className="block w-full text-center px-6 py-3 text-white font-medium rounded-lg transition-colors duration-200 hover:opacity-90 mb-4"
                style={{ backgroundColor: "#d10000" }}
              >
                Apply Now
              </Link>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Job Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Company:</span>
                    <span className="font-medium text-gray-600">
                      {job.company}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium text-gray-600">
                      {job.location}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posted:</span>
                    <span className="font-medium text-gray-600">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
