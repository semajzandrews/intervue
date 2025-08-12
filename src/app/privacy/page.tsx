import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Shield, Lock, Eye, Database, Clock } from "lucide-react"

export default function PrivacyPage() {
  const lastUpdated = "January 15, 2024"

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Header */}
      <section className="py-12 lg:py-16 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 mb-6">
              <Shield className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-900">Privacy & Security</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Eye className="h-6 w-6 text-green-600" />
                  1. Introduction
                </h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Intervue ("we", "our", or "us") operates the intervue.com website (the "Service"). This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.
                </p>
                <p>
                  We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800 font-medium">
                    <Lock className="h-4 w-4 inline mr-2" />
                    We are committed to protecting your privacy and being transparent about our data practices.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Database className="h-6 w-6 text-blue-600" />
                  2. Information We Collect
                </h2>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                  <p>We collect the following personal information when you use our Service:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                    <li><strong>Account Information:</strong> Name, email address, profile picture</li>
                    <li><strong>Authentication Data:</strong> OAuth tokens from Google and LinkedIn</li>
                    <li><strong>Payment Information:</strong> Billing address, payment method details (processed by Stripe)</li>
                    <li><strong>Profile Data:</strong> Job preferences, experience level, career goals</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Information</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Interview Data:</strong> Job descriptions, generated questions, practice sessions</li>
                    <li><strong>Usage Analytics:</strong> Features used, time spent, session data</li>
                    <li><strong>Device Information:</strong> Browser type, device type, IP address</li>
                    <li><strong>Cookies:</strong> Session cookies, preference cookies, analytics cookies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">AI-Generated Content</h3>
                  <p>
                    Content generated through our AI features (questions, feedback, mock interviews) is stored to improve our Service and provide you with better recommendations.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>We use the collected information for various purposes:</p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Service Provision</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Generate personalized interview questions</li>
                      <li>• Provide AI-powered mock interviews</li>
                      <li>• Track your progress and usage</li>
                      <li>• Manage your account and subscriptions</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Improvement & Support</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Improve our AI algorithms</li>
                      <li>• Provide customer support</li>
                      <li>• Send important updates</li>
                      <li>• Analyze usage patterns</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">4. Data Sharing and Disclosure</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Service Providers</h4>
                    <p className="text-sm">We share data with trusted service providers who assist us in operating our website and providing services (e.g., Stripe for payments, OpenAI for AI features).</p>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Legal Requirements</h4>
                    <p className="text-sm">We may disclose your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.</p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Business Transfers</h4>
                    <p className="text-sm">In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">5. Data Security</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The security of your personal information is important to us. We implement a variety of security measures to maintain the safety of your personal information:
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Lock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Encryption</h4>
                    <p className="text-sm text-gray-600">All data transmitted is encrypted using SSL/TLS</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Secure Storage</h4>
                    <p className="text-sm text-gray-600">Data is stored in secure, access-controlled databases</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Access Control</h4>
                    <p className="text-sm text-gray-600">Limited access on a need-to-know basis</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">6. Your Rights</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>You have the following rights regarding your personal information:</p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Access</h4>
                        <p className="text-sm text-gray-600">Request a copy of your personal data</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Correction</h4>
                        <p className="text-sm text-gray-600">Update or correct your information</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Deletion</h4>
                        <p className="text-sm text-gray-600">Request deletion of your data</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-purple-600 text-sm font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Portability</h4>
                        <p className="text-sm text-gray-600">Export your data in a machine-readable format</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-purple-600 text-sm font-bold">5</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Objection</h4>
                        <p className="text-sm text-gray-600">Object to certain types of processing</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-purple-600 text-sm font-bold">6</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Restriction</h4>
                        <p className="text-sm text-gray-600">Restrict how we process your data</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">7. Cookies and Tracking</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>We use cookies and similar tracking technologies to enhance your experience:</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Cookie Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Purpose</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Essential</td>
                        <td className="border border-gray-300 px-4 py-2">Authentication, security, basic functionality</td>
                        <td className="border border-gray-300 px-4 py-2">Session</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">Functional</td>
                        <td className="border border-gray-300 px-4 py-2">Remember preferences and settings</td>
                        <td className="border border-gray-300 px-4 py-2">30 days</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Analytics</td>
                        <td className="border border-gray-300 px-4 py-2">Understand usage patterns and improve service</td>
                        <td className="border border-gray-300 px-4 py-2">90 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">8. Data Retention</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>We retain your personal information for different periods depending on the type of data:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Account Data:</strong> Until account deletion or 3 years of inactivity</li>
                  <li><strong>Usage Data:</strong> 2 years for analytics and improvement purposes</li>
                  <li><strong>Payment Data:</strong> As required by financial regulations (typically 7 years)</li>
                  <li><strong>Support Communications:</strong> 3 years for quality assurance</li>
                </ul>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">9. Children's Privacy</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Our Service is not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>
              </CardContent>
            </Card>

            {/* International Transfers */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">10. International Data Transfers</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ from those in your jurisdiction.
                </p>
                <p>
                  We ensure appropriate safeguards are in place to protect your personal information in accordance with this Privacy Policy.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Privacy Policy */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">11. Changes to This Privacy Policy</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50 border-green-100">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  If you have any questions about this Privacy Policy or want to exercise your rights, please contact us:
                </p>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <ul className="space-y-2">
                    <li>Email: privacy@intervue.com</li>
                    <li>Data Protection Officer: dpo@intervue.com</li>
                    <li>Support: <Link href="/support" className="text-blue-600 hover:underline">Visit our Support page</Link></li>
                  </ul>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </div>
  )
}