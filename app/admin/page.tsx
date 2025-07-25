"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  Building2,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import AdminGuard from "@/components/AdminGuard";
import toast from "react-hot-toast";

// Validation Schema
const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
});

type JobForm = z.infer<typeof jobSchema>;

// Types
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  hidden: boolean;
  createdAt: string;
}

interface Application {
  id: string;
  name: string;
  email: string;
  cvLink?: string;
  coverLetter: string;
  jobId: string;
  createdAt: string;
}

// API functions
const fetchJobs = async (): Promise<Job[]> => {
  const { data } = await axiosInstance.get("/jobs/admin");
  return data;
};

const createJob = async (jobData: JobForm) => {
  const { data } = await axiosInstance.post("/jobs", jobData);
  return data;
};

const fetchApplications = async (): Promise<Application[]> => {
  const { data } = await axiosInstance.get("/applications");
  return data;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<
    "jobs" | "applications" | "create"
  >("jobs");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    data: jobs,
    isLoading: jobsLoading,
    refetch: refetchAdminJobs,
  } = useQuery({
    queryKey: ["admin-jobs"],
    queryFn: fetchJobs,
  });

  const {
    data: applications,
    isLoading: applicationsLoading,
    refetch: refetchApplications,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobForm>({
    resolver: zodResolver(jobSchema),
  });

  const createJobMutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
      reset();
      setActiveTab("jobs");
    },
  });

  const onSubmit = (data: JobForm) => {
    createJobMutation.mutate(data);
    toast.success("Successfully created the job");
  };

  const filteredApplications = selectedJob
    ? applications?.filter((app) => app.jobId === selectedJob)
    : applications;

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage job postings and applications
              </p>
            </div>
            <Link className="text-gray-800 underline" href={"/admin/logout"}>
              Log Out
            </Link>
          </div>
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-slate-600">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Jobs
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {jobs?.length || 0}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-500">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Applications
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {applications?.length || 0}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-500">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    This Month
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {jobs?.filter(
                      (job) =>
                        new Date(job.createdAt).getMonth() ===
                        new Date().getMonth()
                    ).length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab("jobs")}
                  className={`cursor-pointer py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "jobs"
                      ? "border-slate-500 text-slate-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  style={
                    activeTab === "jobs"
                      ? {
                          borderColor: "#oklch(44.6% 0.043 257.281)",
                          color: "#oklch(44.6% 0.043 257.281)",
                        }
                      : {}
                  }
                >
                  Job Listings
                </button>
                <button
                  onClick={() => setActiveTab("applications")}
                  className={`cursor-pointer py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "applications"
                      ? "border-slate-500 text-slate-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  style={
                    activeTab === "applications"
                      ? {
                          borderColor: "#oklch(44.6% 0.043 257.281)",
                          color: "#oklch(44.6% 0.043 257.281)",
                        }
                      : {}
                  }
                >
                  Applications
                </button>
                <button
                  onClick={() => setActiveTab("create")}
                  className={`cursor-pointer py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === "create"
                      ? "border-slate-500 text-slate-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  style={
                    activeTab === "create"
                      ? {
                          borderColor: "#oklch(44.6% 0.043 257.281)",
                          color: "#oklch(44.6% 0.043 257.281)",
                        }
                      : {}
                  }
                >
                  <Plus className="w-4 h-4" />
                  Create Job
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Jobs Tab */}
              {activeTab === "jobs" && (
                <div>
                  {jobsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="animate-pulse border rounded-lg p-4"
                        >
                          <div className="h-6 bg-gray-300 rounded mb-2"></div>
                          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                        </div>
                      ))}
                    </div>
                  ) : jobs && jobs.length > 0 ? (
                    <div className="space-y-4">
                      {jobs.map((job) => (
                        <div
                          key={job.id}
                          className="border rounded-lg p-4 hover:bg-gray-50"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {job.title}
                              </h3>
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Building2 className="w-4 h-4" />
                                  {job.company}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {job.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(job.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                              <p className="text-gray-600 mt-2 line-clamp-2">
                                {job.description.substring(0, 150)}...
                              </p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                                {job.hidden ? (
                                  <EyeOff
                                    onClick={async () => {
                                      const confirmed = window.confirm(
                                        "Are you sure you want to unhide this job ?"
                                      );
                                      if (!confirmed) return;

                                      try {
                                        const response =
                                          await axiosInstance.patch(
                                            `/jobs/${job.id}/unhide`
                                          );

                                        if (response) {
                                          toast.success(
                                            "Successfully unhidden the job"
                                          );
                                          refetchAdminJobs();
                                        }

                                        // optionally open a modal, redirect, or update UI
                                      } catch (error) {
                                        console.error(
                                          "Failed to fetch application",
                                          error
                                        );
                                        alert(
                                          "Something went wrong while fetching the application."
                                        );
                                      }
                                    }}
                                    className="w-4 h-4"
                                  />
                                ) : (
                                  <Eye
                                    onClick={async () => {
                                      const confirmed = window.confirm(
                                        "Are you sure you want to hide this job ?"
                                      );
                                      if (!confirmed) return;

                                      try {
                                        const response =
                                          await axiosInstance.patch(
                                            `/jobs/${job.id}/hide`
                                          );

                                        if (response) {
                                          toast.success(
                                            "Successfully hidden the job"
                                          );
                                          refetchAdminJobs();
                                        }

                                        // optionally open a modal, redirect, or update UI
                                      } catch (error) {
                                        console.error(
                                          "Failed to fetch application",
                                          error
                                        );
                                        alert(
                                          "Something went wrong while fetching the application."
                                        );
                                      }
                                    }}
                                    className="w-4 h-4"
                                  />
                                )}
                              </button>
                              <button
                                onClick={async () => {
                                  const confirmed = window.confirm(
                                    "Are you sure you want to delete this job ?"
                                  );
                                  if (!confirmed) return;

                                  try {
                                    const response = await axiosInstance.delete(
                                      `/jobs/${job.id}`
                                    );

                                    if (response) {
                                      toast.success(
                                        "Successfully deleted the job"
                                      );
                                      refetchAdminJobs();
                                      refetchApplications();
                                    }

                                    // optionally open a modal, redirect, or update UI
                                  } catch (error) {
                                    console.error(
                                      "Failed to fetch application",
                                      error
                                    );
                                    alert(
                                      "Something went wrong while fetching the application."
                                    );
                                  }
                                }}
                                className="p-2 text-gray-400 hover:text-red-600 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No jobs posted yet
                      </h3>
                      <p className="text-gray-600">
                        Create your first job posting to get started.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Applications Tab */}
              {activeTab === "applications" && (
                <div>
                  {/* Job Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filter by Job
                    </label>
                    <select
                      value={selectedJob || ""}
                      onChange={(e) => setSelectedJob(e.target.value || null)}
                      className="text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    >
                      <option value="">All Jobs</option>
                      {jobs?.map((job) => (
                        <option
                          className="text-gray-900"
                          key={job.id}
                          value={job.id}
                        >
                          {job.title} - {job.company}
                        </option>
                      ))}
                    </select>
                  </div>

                  {applicationsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="animate-pulse border rounded-lg p-4"
                        >
                          <div className="h-6 bg-gray-300 rounded mb-2"></div>
                          <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                        </div>
                      ))}
                    </div>
                  ) : filteredApplications &&
                    filteredApplications.length > 0 ? (
                    <div className="space-y-4">
                      {filteredApplications.map((application) => {
                        const job = jobs?.find(
                          (j) => j.id === application.jobId
                        );
                        return (
                          <div
                            key={application.id}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {application.name}
                                </h3>
                                <p className="text-gray-600">
                                  {application.email}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Applied for: {job?.title} at {job?.company}
                                </p>
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(
                                  application.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>

                            {application.cvLink && (
                              <div className="mb-3">
                                <a
                                  href={application.cvLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  View CV/Resume →
                                </a>
                              </div>
                            )}

                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">
                                Cover Letter:
                              </h4>
                              <p className="text-gray-700 text-sm whitespace-pre-wrap">
                                {application.coverLetter}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No applications yet
                      </h3>
                      <p className="text-gray-600">
                        Applications will appear here once people start
                        applying.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Create Job Tab */}
              {activeTab === "create" && (
                <div className="max-w-2xl">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Create New Job Posting
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title *
                      </label>
                      <input
                        {...register("title")}
                        type="text"
                        placeholder="e.g. Senior Software Engineer"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                      />
                      {errors.title && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        {...register("company")}
                        type="text"
                        placeholder="e.g. TechCorp Inc."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                      />
                      {errors.company && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.company.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        {...register("location")}
                        type="text"
                        placeholder="e.g. San Francisco, CA / Remote"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                      />
                      {errors.location && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.location.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Description *
                      </label>
                      <textarea
                        {...register("description")}
                        rows={8}
                        placeholder="Describe the role, responsibilities, requirements..."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none"
                      />
                      {errors.description && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    {createJobMutation.isError && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 text-sm">
                          Failed to create job. Please try again.
                        </p>
                      </div>
                    )}

                    {/* <button
                      type="submit"
                      disabled={createJobMutation.isPending}
                      className="cursor-pointer w-full py-3 px-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                      style={{
                        background: createJobMutation.isPending
                          ? "#666"
                          : "#oklch(44.6% 0.043 257.281)",
                      }}
                    >
                      {createJobMutation.isPending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Creating Job...
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5" />
                          Create Job Posting
                        </>
                      )}
                    </button> */}

                    <button
                      type="submit"
                      disabled={createJobMutation.isPending}
                      className={`cursor-pointer w-full py-3 px-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50  ${
                        createJobMutation.isPending
                          ? "bg-[#666]" // Gray when pending
                          : "bg-[oklch(44.6%_0.043_257.281)]" // Your specific OKLCH color when not pending
                      }
  `}
                    >
                      {/* Button content goes here, e.g., "Submit" or a loading spinner */}
                      {createJobMutation.isPending ? "Processing..." : "Submit"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
