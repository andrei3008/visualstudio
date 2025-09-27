'use client'

import Link from 'next/link'
import { FileText, Shield, CheckCircle, AlertTriangle, Clock, Money, Mail, Phone } from 'lucide-react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function TermsPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the Romanian version if accessed directly
    // But for now, we'll serve the content here
  }, [router])

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-8 w-8" />
            <h1 className="text-4xl font-bold text-white">Terms and Conditions</h1>
          </div>
          <p className="text-xl text-purple-100 max-w-3xl">
            Terms and conditions for using the services provided by VISUAL STUDIO CONCEPT SRL
          </p>
        </div>
      </div>

      {/* Language selector */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-center gap-4">
            <Link href="/terms" className="px-4 py-2 bg-purple-600 text-white rounded-lg">
              English
            </Link>
            <Link href="/termeni-si-conditii" className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50">
              Română
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-left">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-purple-600" />
              1. Introduction and Acceptance
            </h2>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These Terms and Conditions govern the use of the website <strong>www.visualstudio.ro</strong>
                and the services provided by <strong>VISUAL STUDIO CONCEPT SRL</strong> ("we", "the company" or "Visual Studio").
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                By accessing and using our website, you agree to these Terms. If you do not agree with these Terms,
                please do not use our services.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Company details:</strong> VISUAL STUDIO CONCEPT SRL, CUI: 43527366, Reg. No.: J16/53/2021
                </p>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-purple-600" />
              2. Services Provided
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Custom Software Development",
                  description: "Web, mobile, and desktop applications customized to client requirements"
                },
                {
                  title: "Technical Consulting",
                  description: "Expertise in technology selection, architecture, and best practices"
                },
                {
                  title: "Project Management",
                  description: "Project coordination, planning, monitoring, and reporting"
                },
                {
                  title: "Maintenance and Support",
                  description: "Updates, bug fixes, optimizations, and technical support"
                },
                {
                  title: "System Integration",
                  description: "Connection with existing systems, APIs, and third-party services"
                },
                {
                  title: "Training and Documentation",
                  description: "User training and technical documentation creation"
                }
              ].map((service, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Client Obligations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-purple-600" />
              3. Client Obligations
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
              <div className="space-y-4 text-yellow-800 dark:text-yellow-200">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Providing accurate information:</h4>
                  <p>You are responsible for the accuracy of the information provided and for updating it in a timely manner.</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Account security:</h4>
                  <p>Maintain the confidentiality of your access credentials and notify us immediately in case of unauthorized access.</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Compliance with laws:</h4>
                  <p>Ensure that your projects and requirements comply with applicable laws, including GDPR and copyright laws.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6 text-purple-600" />
              4. Intellectual Property
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="space-y-4 text-blue-800 dark:text-blue-200">
                <div>
                  <h4 className="font-semibold mb-2">Our rights:</h4>
                  <p>The website, design, source code, texts, images, and other materials are our intellectual property
                  and are protected by copyright and intellectual property laws.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Usage license:</h4>
                  <p>We grant you a limited, non-exclusive, revocable license to use the website and our services
                  in accordance with these Terms.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Source code ownership:</h4>
                  <p>The source code developed for you belongs to you after full payment of services, except for
                  reusable components or our internal libraries.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Documents</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/privacy-policy" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all hover:scale-105">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Policy
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Privacy policy</p>
              </Link>
              <Link href="/gdpr" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all hover:scale-105">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  GDPR
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Personal data protection</p>
              </Link>
              <Link href="/cookie-policy" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all hover:scale-105">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  🍪
                  Cookies
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Cookie usage policy</p>
              </Link>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Mail className="h-6 w-6 text-purple-600" />
              5. Contact
            </h2>
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                For questions or clarifications regarding these Terms and Conditions, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Contact information:</h4>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p className="flex items-center gap-2">
                      📧 contact@visualstudio.ro
                    </p>
                    <p className="flex items-center gap-2">
                      🌐 www.visualstudio.ro
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Company details:</h4>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p><strong>Name:</strong> VISUAL STUDIO CONCEPT SRL</p>
                    <p><strong>CUI:</strong> 43527366</p>
                    <p><strong>Reg. No.:</strong> J16/53/2021</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Have questions about these Terms and Conditions?
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="mailto:contact@visualstudio.ro"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Contact us
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg transition-colors"
                >
                  📞 Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}