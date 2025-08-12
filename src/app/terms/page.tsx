import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Scale, FileText, Clock } from "lucide-react"

export default function TermsPage() {
  const lastUpdated = "January 15, 2024"

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Header */}
      <section className="py-12 lg:py-16 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 mb-6">
              <Scale className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-900">Legal Terms</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Please read these terms carefully before using Intervue
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
            
            {/* Agreement */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                  1. Agreement to Terms
                </h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  By accessing and using Intervue ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <p>
                  These Terms of Service ("Terms") govern your use of our website located at intervue.com (the "Service") operated by Intervue ("us", "we", or "our").
                </p>
              </CardContent>
            </Card>

            {/* Use License */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">2. Use License</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Permission is granted to temporarily download one copy of Intervue per device for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
                <p>
                  This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.
                </p>
              </CardContent>
            </Card>

            {/* User Accounts */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">3. User Accounts</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>
                <p>
                  We reserve the right to refuse service, terminate accounts, or cancel orders in our sole discretion.
                </p>
              </CardContent>
            </Card>

            {/* Subscription Services */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">4. Subscription Services</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis (such as daily, weekly, monthly or annually), depending on the type of subscription plan you select.
                </p>
                <p>
                  Subscription fees are non-refundable except as required by law or as otherwise provided in these Terms.
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mt-6">Billing</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You shall provide current, complete and accurate purchase and account information</li>
                  <li>You shall promptly update your account and other information</li>
                  <li>You acknowledge that we store payment method information</li>
                </ul>
              </CardContent>
            </Card>

            {/* Content Ownership */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">5. Content Ownership</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  You retain ownership of any content you submit, post or display on or through the Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such content.
                </p>
                <p>
                  We reserve the right to remove any content that violates these Terms or is otherwise objectionable.
                </p>
              </CardContent>
            </Card>

            {/* Privacy Policy */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">6. Privacy Policy</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <Link href="/privacy">
                    <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-100">
                      View Privacy Policy
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Prohibited Uses */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">7. Prohibited Uses</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>You may not use our Service:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>For any unlawful purpose or to solicit others to commit unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                </ul>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">8. Disclaimer</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms.
                </p>
                <p>
                  Intervue does not guarantee the success of any job interview preparation or employment outcomes.
                </p>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">9. Limitation of Liability</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  In no event shall Intervue, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, punitive, consequential, or special damages.
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">10. Termination</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation.
                </p>
                <p>
                  If you wish to terminate your account, you may simply discontinue using the Service.
                </p>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">11. Governing Law</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  These Terms shall be interpreted and governed by the laws of the United States, without regard to its conflict of law provisions.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">12. Changes to Terms</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <ul className="space-y-2">
                    <li>Email: legal@intervue.com</li>
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