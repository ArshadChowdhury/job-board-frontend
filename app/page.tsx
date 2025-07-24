import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import {
  Search,
  Briefcase,
  Users,
  TrendingUp,
  Star,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200">
      {/* Hero Section */}
      <NavBar />
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Dream Job
            <span className="block text-red-600">Today</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with top companies and discover opportunities that match
            your skills and ambitions
          </p>

          {/* Search Bar */}
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-[13px] h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="text-gray-900 w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-transparent placeholder-gray-600"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-[13px] h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="text-gray-900 w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-transparent placeholder-gray-600"
                />
              </div>
              <button className="cursor-pointer bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
                Search Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">200+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">1M+</div>
              <div className="text-gray-600">Success Stories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose JobHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make job searching simple, efficient, and successful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Smart Search
              </h3>
              <p className="text-gray-600">
                Advanced filters and AI-powered matching to find jobs that fit
                your profile perfectly
              </p>
            </div>

            <div className="text-center p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Top Companies
              </h3>
              <p className="text-gray-600">
                Connect with leading companies across all industries and
                experience levels
              </p>
            </div>

            <div className="text-center p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Career Growth
              </h3>
              <p className="text-gray-600">
                Tools and resources to help you advance your career and achieve
                your goals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Jobs
            </h2>
            <p className="text-xl text-gray-600">
              Discover trending opportunities from top companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Senior Frontend Developer",
                company: "TechCorp",
                location: "San Francisco",
                type: "Full-time",
                salary: "$120K - $150K",
              },
              {
                title: "Product Manager",
                company: "InnovateLab",
                location: "New York",
                type: "Full-time",
                salary: "$100K - $130K",
              },
              {
                title: "UX Designer",
                company: "DesignStudio",
                location: "Remote",
                type: "Contract",
                salary: "$80K - $100K",
              },
            ].map((job, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-red-600 font-medium">{job.company}</p>
                  </div>
                  <Star className="h-5 w-5 text-gray-300 hover:text-red-500 cursor-pointer" />
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{job.type}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    {job.salary}
                  </span>
                  <button className="text-red-600 hover:text-red-700 font-medium">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors cursor-pointer">
              View All Jobs
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Join thousands of professionals who found their dream jobs through
            JobHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={"#"}
              className="bg-white text-red-600 px-8 py-[14px] rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Create Account
            </Link>
            <Link
              href={"/jobs"}
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-red-600 transition-colors font-semibold"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
