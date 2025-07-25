"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle, User, Mail, FileText } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

// Validation Schema
const applicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .refine(
      (val) => val.length > 0 || z.string().email().safeParse(val).success,
      {
        message: "Email address is required",
      }
    )
    .refine(
      (val) => val.length === 0 || z.string().email().safeParse(val).success,
      {
        message: "Invalid Email format",
      }
    ),
  cvLink: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  coverLetter: z
    .string()
    .min(50, "Cover letter must be at least 50 characters"),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

// Types
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
}

// API functions
const fetchJob = async (id: string): Promise<Job> => {
  const { data } = await axiosInstance.get(`/jobs/${id}`);
  return data;
};

const submitApplication = async (data: ApplicationForm & { jobId: string }) => {
  const { data: response } = await axiosInstance.post("/applications", data);
  return response;
};

export default function JobApplicationPage() {
  const params = useParams();
  const jobId = params.id as string;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: job, isLoading: jobLoading } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => fetchJob(jobId),
    enabled: !!jobId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
  });

  const mutation = useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      setIsSubmitted(true);
      reset();
      toast.success("Successfully applied to the job");
    },
  });

  const onSubmit = (data: ApplicationForm) => {
    mutation.mutate({ ...data, jobId });
  };

  if (jobLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-24 mb-6"></div>
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 shadow-sm border">
              <div className="h-8 bg-gray-300 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Job not found
            </h2>
            <p className="text-gray-600">
              The job you&apos;re trying to apply for doesn&apos;t exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm border text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Application Submitted!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for applying to <strong>{job.title}</strong> at{" "}
                <strong>{job.company}</strong>. We&apos;ll review your
                application and get back to you soon.
              </p>
              <div className="space-y-3">
                <Link
                  href={`/jobs/${jobId}`}
                  className="block w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back to Job Details
                </Link>
                <Link
                  href="/jobs"
                  className="block w-full px-6 py-3 text-white font-medium rounded-lg transition-colors hover:opacity-90 bg-slate-600"
                >
                  Browse More Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href={`/jobs/${jobId}`}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Job Details
        </Link>

        <section className="max-w-2xl mx-auto">
          {/* Header */}
          <header className="bg-white rounded-lg p-6 shadow-sm border mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Apply for {job.title}
            </h2>
            <p className="text-gray-600">
              <span className="font-medium">{job.company}</span> •{" "}
              {job.location}
            </p>
          </header>

          {/* Application Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-lg p-8 shadow-sm border"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Your Information
            </h2>

            {/* Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                />
              </div>
              {errors.name && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* CV Link Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CV/Resume Link (Optional)
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("cvLink")}
                  type="url"
                  placeholder="https://drive.google.com/your-cv-link"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                />
              </div>
              {errors.cvLink && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  {errors.cvLink.message}
                </p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Provide a link to your online CV, LinkedIn profile, or portfolio
              </p>
            </div>

            {/* Cover Letter Field */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter *
              </label>
              <textarea
                {...register("coverLetter")}
                rows={6}
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none"
              />
              {errors.coverLetter && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  {errors.coverLetter.message}
                </p>
              )}
            </div>

            {/* Error Message */}
            {mutation.isError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm text-center">
                  Something went wrong. Please try again.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={mutation.isPending}
              className={`
    cursor-pointer
    w-full
    py-3
    px-4
    text-white
    font-semibold
    rounded-xl
    shadow-lg
    hover:shadow-xl
    transform
    hover:-translate-y-0.5
    disabled:transform-none
    transition-all
    duration-200
    flex
    items-center
    justify-center
    gap-2
    disabled:opacity-50
    ${
      mutation.isPending
        ? "bg-[#666]" // Gray when pending
        : "bg-[oklch(44.6%_0.043_257.281)]" // Your specific OKLCH color when not pending
    }
  `}
            >
              {/* Button content goes here, e.g., "Submit" or a loading spinner */}
              {mutation.isPending ? "Processing..." : "Submit"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
