"use client";

import Link from "next/link";
import {
  FileText,
  Gavel,
  ShieldCheck,
  Zap,
  Lock,
  MessageSquare,
  Repeat2,
  AlertTriangle,
  Users,
  Code
} from "lucide-react"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center space-x-4 mb-8">
        <FileText className="w-10 h-10 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Terms of Service
        </h1>
      </div>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Welcome to <span className="font-bold text-primary">GitHub Repo Manager</span>! By accessing or using our services, you agree to be bound by these Terms of Service. Please read these terms carefully before proceeding.
      </p>

      <div className="space-y-10">
        
        {/* SECTION 1: Acceptance of Terms */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                1. Acceptance of Terms
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-gray-700 dark:text-gray-300">
            By accessing or using GitHub Repo Manager, you formally agree to be bound by these Terms of Service and our <Link href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>. If you do not agree to all these terms, you must not use our services.
          </CardContent>
        </Card>

        {/* SECTION 2: Use of Service */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Code className="w-5 h-5 text-indigo-500" />
              <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                2. Use of Service
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You are granted a limited, non-exclusive license to use GitHub Repo Manager to manage, monitor, and delete your own GitHub repositories. You bear full responsibility for your account and all actions performed under it.
            </p>
            <p className="font-semibold text-red-500 dark:text-red-400 mb-2">
              Prohibited Uses:
            </p>
            {/* Custom list layout */}
            <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border dark:border-gray-800">
              <div className="flex items-start space-x-3">
                <Gavel className="w-4 h-4 mt-1 flex-shrink-0 text-red-500" />
                <p className="text-gray-700 dark:text-gray-300">
                  Access other users’ repositories or accounts without explicit permission.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="w-4 h-4 mt-1 flex-shrink-0 text-red-500" />
                <p className="text-gray-700 dark:text-gray-300">
                  Attempt to disrupt, bypass, or compromise the security or integrity of the service.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 mt-1 flex-shrink-0 text-red-500" />
                <p className="text-gray-700 dark:text-gray-300">
                  Use the service for any illegal or unauthorized purpose.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION 3: Account Security & 4: Privacy */}
        <div className="grid md:grid-cols-2 gap-6">
            {/* SECTION 3: Account Security */}
            <Card>
                <CardHeader>
                    <div className="flex items-center space-x-3">
                        <Lock className="w-5 h-5 text-indigo-500" />
                        <CardTitle className="text-xl font-semibold">3. Account Security</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300">
                    You are responsible for maintaining the confidentiality of your credentials. You must notify us immediately if you suspect your account has been compromised.
                </CardContent>
            </Card>

            {/* SECTION 4: Privacy */}
            <Card>
                <CardHeader>
                    <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-indigo-500" />
                        <CardTitle className="text-xl font-semibold">4. Privacy</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300">
                    We handle your data in strict accordance with our dedicated <Link href="/privacy" className="text-blue-500 dark:text-blue-400 hover:underline">Privacy Policy</Link>. By using the service, you consent to this data handling.
                </CardContent>
            </Card>
        </div>

        {/* SECTION 5: Disclaimer & 6: Limitation of Liability */}
        <div className="grid md:grid-cols-2 gap-6">
            {/* SECTION 5: Disclaimer */}
            <Card>
                <CardHeader>
                    <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                        <CardTitle className="text-xl font-semibold">5. Disclaimer (As Is)</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300">
                    The service is provided “as is” without warranties of any kind. We are not responsible for any loss of data, service downtime, or issues resulting from your use.
                </CardContent>
            </Card>

            {/* SECTION 6: Limitation of Liability */}
            <Card>
                <CardHeader>
                    <div className="flex items-center space-x-3">
                        <Gavel className="w-5 h-5 text-orange-500" />
                        <CardTitle className="text-xl font-semibold">6. Limitation of Liability</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300">
                    GitHub Repo Manager and its affiliates will not be liable for any indirect, incidental, or consequential damages arising from or related to your use of the service.
                </CardContent>
            </Card>
        </div>

        {/* SECTION 7: Changes to Terms & 8: Contact */}
        <div className="grid md:grid-cols-2 gap-6">
            {/* SECTION 7: Changes to Terms */}
            <Card>
                <CardHeader>
                    <div className="flex items-center space-x-3">
                        <Repeat2 className="w-5 h-5 text-indigo-500" />
                        <CardTitle className="text-xl font-semibold">7. Changes to Terms</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300">
                    We may update these Terms from time to time. Continued use of the service after any update constitutes acceptance of the new terms.
                </CardContent>
            </Card>

            {/* SECTION 8: Contact */}
            <Card>
                <CardHeader>
                    <div className="flex items-center space-x-3">
                        <MessageSquare className="w-5 h-5 text-indigo-500" />
                        <CardTitle className="text-xl font-semibold">8. Contact</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300">
                    For any questions regarding these Terms of Service, please reach out to us directly via email: 
                    <a href="mailto:support@repomanager.com" className="text-blue-500 dark:text-blue-400 hover:underline ml-1 font-medium">
                        support@repomanager.com
                    </a>.
                </CardContent>
            </Card>
        </div>
      </div>

      <Separator className="my-12" />

      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <p>Last Updated: October 2025</p>
        <p>© {new Date().getFullYear()} GitHub Repo Manager. All rights reserved.</p>
        <Badge variant="secondary">Legal Notice</Badge>
      </div>
    </div>
  );
}