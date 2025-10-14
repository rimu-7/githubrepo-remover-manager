"use client";

import Link from "next/link";
import {
  Shield,
  Fingerprint,
  Mail,
  Lock,
  Share2,
  Cookie,
  Users,
  Feather,
  GitBranch,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center space-x-4 mb-8">
        <Shield className="w-10 h-10 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Privacy Policy
        </h1>
      </div>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        At <span className="font-bold text-primary">GitHub Repo Manager</span>,
        your privacy is paramount. This Privacy Policy is specifically tailored
        to explain how we collect, use, and protect the limited information you
        provide when using our service.
      </p>

      <div className="space-y-10">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Fingerprint className="w-5 h-5 text-indigo-500" />
              <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                1. Information We Collect and Store
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When you sign up, we collect and securely store the following
              information solely for providing account access and service
              management:
            </p>
            <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border dark:border-gray-800">
              <div className="flex items-start space-x-3">
                <GitBranch className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
                <p className="text-gray-700 dark:text-gray-300">
                  GitHub Username (`name`): Used as your unique identifier on
                  our platform.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-yellow-500" />
                <p className="text-gray-700 dark:text-gray-300">
                  Email Address (`email`): Used for account management and
                  essential service communication.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Lock className="w-4 h-4 mt-1 flex-shrink-0 text-red-500" />
                <p className="text-gray-700 dark:text-gray-300">
                  Hashed Password: We store a secure, one-way hash of your
                  password (using bcrypt), not the password itself, for secure
                  account login.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Feather className="w-4 h-4 mt-1 flex-shrink-0 text-blue-500" />
                <p className="text-gray-700 dark:text-gray-300">
                  Account Timestamps: Metadata (`createdAt`, `updatedAt`)
                  recording account creation and last update.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
              We do not directly store repository metadata or extensive activity
              logs. We only access this data temporarily via the secure GitHub
              API to perform actions at your request.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-indigo-500" />
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                2. How We Use Your Data
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-gray-700 dark:text-gray-300 space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-indigo-400">•</span>
              <p>
                <strong>Authentication:</strong> To verify your identity and
                allow you to log in securely.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-indigo-400">•</span>
              <p>
                <strong>Service Provision:</strong> To link your account to the
                GitHub API, enabling repository management features.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-indigo-400">•</span>
              <p>
                <strong>Critical Communication:</strong> Sending essential
                notifications or updates related to your account security or
                service changes.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Share2 className="w-5 h-5 text-indigo-500" />
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                3. Data Sharing and Sale
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-gray-700 dark:text-gray-300">
            <p className="mb-2">
              We do not sell, trade, or rent your personal information to any
              third parties. Data may be shared only under these exceptional
              circumstances:
            </p>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <span className="text-indigo-400">•</span>
                <p>
                  <strong>With GitHub:</strong> Only necessary access tokens are
                  used to interface with the GitHub API to execute the actions
                  you request.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-indigo-400">•</span>
                <p>
                  <strong>Legal Obligations:</strong> As required by law,
                  subpoena, or valid legal process.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-indigo-400">•</span>
                <p>
                  <strong>Safety & Rights:</strong> To protect the rights,
                  property, or safety of our service, its users, or the public.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-indigo-500" />
                <CardTitle className="text-xl font-semibold">
                  4. Data Security
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              Your password is protected using strong hashing techniques
              (bcrypt). We implement reasonable technical and organizational
              measures to protect the limited data we hold.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Cookie className="w-5 h-5 text-indigo-500" />
                <CardTitle className="text-xl font-semibold">
                  5. Cookies & Tracking
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              We may use minimal cookies (e.g., session cookies) or anonymous
              analytics tools. No personal data is sold or shared via tracking
              tools.
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-indigo-500" />
                <CardTitle className="text-xl font-semibold">
                  6. Your Rights (Access and Deletion)
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              You can request Access, Correction, or Deletion of your account
              data.
              <p className="mt-2">
                Contact us at{" "}
                <Link
                  href="mailto:support@repomanager.com"
                  className="text-blue-500 dark:text-blue-400 hover:underline font-medium"
                >
                  support@repomanager.com
                </Link>{" "}
                to exercise these rights.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              7. Changes to Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 dark:text-gray-300">
            We may update this policy periodically. Your continued use
            constitutes acceptance of any updates. We recommend reviewing this
            page periodically.
          </CardContent>
        </Card>
      </div>

      <Separator className="my-12" />

      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <p>Last Updated: October 2025</p>
        <p>
          © {new Date().getFullYear()} GitHub Repo Manager. All rights reserved.
        </p>
        <Badge variant="secondary">Minimal Data</Badge>
      </div>
    </div>
  );
}