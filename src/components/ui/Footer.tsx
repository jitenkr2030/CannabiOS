'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Leaf, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  ArrowUp,
  Shield,
  FileText,
  Users,
  Building,
  BookOpen,
  HelpCircle,
  Activity,
  ChevronRight,
  Package,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Handle scroll to top button visibility
  useEffect(() => {
    setIsClient(true)
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Handle newsletter subscription
      console.log('Subscribing email:', email)
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const footerLinks = {
    product: [
      { name: 'Point of Sale', href: '/pos', icon: '💳' },
      { name: 'Inventory Management', href: '/inventory', icon: '📦' },
      { name: 'Accounting System', href: '/accounting', icon: '🧾' },
      { name: 'Delivery Management', href: '/delivery', icon: '🚚' },
      { name: 'QR Authentication', href: '/qr', icon: '📱' },
      { name: 'Compliance Reports', href: '/compliance', icon: '📊' },
      { name: 'Mobile App', href: '/mobile', icon: '📲' },
      { name: 'API Documentation', href: '/api-docs', icon: '🔌' }
    ],
    features: [
      { name: 'Multi-Store Support', href: '/features/multi-store', icon: '🏪' },
      { name: 'Real-Time Analytics', href: '/features/analytics', icon: '📈' },
      { name: 'Voice Recognition', href: '/features/voice', icon: '🎤' },
      { name: 'Batch Tracking', href: '/features/batch-tracking', icon: '🔍' },
      { name: 'Age Verification', href: '/features/age-verification', icon: '🔞' },
      { name: 'Delivery Tracking', href: '/features/delivery-tracking', icon: '📍' },
      { name: 'White-Label Solution', href: '/features/white-label', icon: '🏷️' },
      { name: 'Offline Mode', href: '/features/offline', icon: '📴' }
    ],
    pricing: [
      { name: 'Pricing Plans', href: '/pricing', icon: '💰' },
      { name: 'Basic Plan', href: '/pricing/basic', icon: '🌱' },
      { name: 'Growth Plan', href: '/pricing/growth', icon: '📊' },
      { name: 'Consultant Plan', href: '/pricing/consultant', icon: '👥' },
      { name: 'Enterprise Plan', href: '/pricing/enterprise', icon: '🏢' },
      { name: 'Yearly Billing', href: '/pricing/yearly', icon: '📅' },
      { name: 'Custom Quotes', href: '/pricing/custom', icon: '💬' },
      { name: 'Free Trial', href: '/trial', icon: '🎁' }
    ],
    security: [
      { name: 'Security Overview', href: '/security', icon: '🔒' },
      { name: 'Data Protection', href: '/security/data-protection', icon: '🛡️' },
      { name: 'GDPR Compliance', href: '/security/gdpr', icon: '🇪🇺' },
      { name: 'SOC 2 Type II', href: '/security/soc2', icon: '🏅' },
      { name: 'Encryption', href: '/security/encryption', icon: '🔐' },
      { name: 'Access Control', href: '/security/access-control', icon: '🔑' },
      { name: 'Audit Logs', href: '/security/audit-logs', icon: '📝' },
      { name: 'Security Updates', href: '/security/updates', icon: '🔄' }
    ],
    compliance: [
      { name: 'Compliance Overview', href: '/compliance', icon: '✅' },
      { name: 'Health Canada', href: '/compliance/health-canada', icon: '🇨🇦' },
      { name: 'State Regulations', href: '/compliance/state', icon: '🗽' },
      { name: 'Metrc Integration', href: '/compliance/metrc', icon: '🔗' },
      { name: 'Seed-to-Sale', href: '/compliance/seed-to-sale', icon: '🌱' },
      { name: 'Audit Trails', href: '/compliance/audit-trails', icon: '📋' },
      { name: 'Reporting', href: '/compliance/reporting', icon: '📊' },
      { name: 'License Management', href: '/compliance/licenses', icon: '📜' }
    ],
    company: [
      { name: 'About Us', href: '/about', icon: '🏢' },
      { name: 'Our Team', href: '/team', icon: '👥' },
      { name: 'Careers', href: '/careers', icon: '💼' },
      { name: 'Press', href: '/press', icon: '📰' },
      { name: 'Partners', href: '/partners', icon: '🤝' },
      { name: 'Contact', href: '/contact', icon: '📞' },
      { name: 'Locations', href: '/locations', icon: '📍' },
      { name: 'Awards', href: '/awards', icon: '🏆' }
    ],
    about: [
      { name: 'Our Story', href: '/about/story', icon: '📖' },
      { name: 'Mission & Values', href: '/about/mission', icon: '🎯' },
      { name: 'Leadership Team', href: '/about/leadership', icon: '👔' },
      { name: 'Company Culture', href: '/about/culture', icon: '🎨' },
      { name: 'Diversity & Inclusion', href: '/about/diversity', icon: '🌈' },
      { name: 'Sustainability', href: '/about/sustainability', icon: '🌱' },
      { name: 'Innovation', href: '/about/innovation', icon: '💡' },
      { name: 'Impact', href: '/about/impact', icon: '🌍' }
    ],
    blog: [
      { name: 'Latest Posts', href: '/blog', icon: '📝' },
      { name: 'Industry News', href: '/blog/industry', icon: '📰' },
      { name: 'Product Updates', href: '/blog/updates', icon: '🚀' },
      { name: 'Customer Stories', href: '/blog/stories', icon: '👤' },
      { name: 'Tips & Tricks', href: '/blog/tips', icon: '💡' },
      { name: 'Regulatory Updates', href: '/blog/regulatory', icon: '⚖️' },
      { name: 'Technology', href: '/blog/technology', icon: '💻' },
      { name: 'Guest Posts', href: '/blog/guest', icon: '✍️' }
    ],
    careers: [
      { name: 'Open Positions', href: '/careers', icon: '🔍' },
      { name: 'Engineering', href: '/careers/engineering', icon: '⚙️' },
      { name: 'Sales', href: '/careers/sales', icon: '💼' },
      { name: 'Marketing', href: '/careers/marketing', icon: '📢' },
      { name: 'Customer Success', href: '/careers/customer-success', icon: '😊' },
      { name: 'Design', href: '/careers/design', icon: '🎨' },
      { name: 'Product', href: '/careers/product', icon: '📱' },
      { name: 'Internships', href: '/careers/internships', icon: '🎓' }
    ],
    contact: [
      { name: 'Sales Team', href: '/contact/sales', icon: '💰' },
      { name: 'Support', href: '/contact/support', icon: '🛟️' },
      { name: 'Partnerships', href: '/contact/partnerships', icon: '🤝' },
      { name: 'Media Inquiries', href: '/contact/media', icon: '📺' },
      { name: 'Investor Relations', href: '/contact/investors', icon: '📈' },
      { name: 'Technical Support', href: '/contact/technical', icon: '🔧' },
      { name: 'Billing', href: '/contact/billing', icon: '💳' },
      { name: 'Feedback', href: '/contact/feedback', icon: '💬' }
    ],
    support: [
      { name: 'Help Center', href: '/help', icon: '❓' },
      { name: 'Documentation', href: '/docs', icon: '📚' },
      { name: 'API Reference', href: '/api-docs', icon: '🔌' },
      { name: 'Video Tutorials', href: '/tutorials', icon: '🎥' },
      { name: 'Webinars', href: '/webinars', icon: '🎓' },
      { name: 'Community Forum', href: '/community', icon: '💬' },
      { name: 'FAQ', href: '/faq', icon: '❓' },
      { name: 'System Status', href: '/status', icon: '🟢' }
    ],
    helpCenter: [
      { name: 'Getting Started', href: '/help/getting-started', icon: '🚀' },
      { name: 'User Guide', href: '/help/user-guide', icon: '📖' },
      { name: 'Admin Guide', href: '/help/admin-guide', icon: '👤' },
      { name: 'Troubleshooting', href: '/help/troubleshooting', icon: '🔧' },
      { name: 'Best Practices', href: '/help/best-practices', icon: '✨' },
      { name: 'Video Library', href: '/help/videos', icon: '🎥' },
      { name: 'Glossary', href: '/help/glossary', icon: '📝' },
      { name: 'Release Notes', href: '/help/releases', icon: '📋' }
    ],
    documentation: [
      { name: 'API Documentation', href: '/docs/api', icon: '🔌' },
      { name: 'SDK Documentation', href: '/docs/sdk', icon: '💻' },
      { name: 'Integration Guides', href: '/docs/integrations', icon: '🔗' },
      { name: 'Developer Portal', href: '/developers', icon: '👨‍💻' },
      { name: 'Webhooks', href: '/docs/webhooks', icon: '🪝' },
      { name: 'Authentication', href: '/docs/auth', icon: '🔐' },
      { name: 'Rate Limits', href: '/docs/rate-limits', icon: '⚡' },
      { name: 'Changelog', href: '/docs/changelog', icon: '📝' }
    ],
    status: [
      { name: 'System Status', href: '/status', icon: '🟢' },
      { name: 'Uptime History', href: '/status/uptime', icon: '📊' },
      { name: 'Incident Reports', href: '/status/incidents', icon: '⚠️' },
      { name: 'Scheduled Maintenance', href: '/status/maintenance', icon: '🔧' },
      { name: 'Performance Metrics', href: '/status/performance', icon: '⚡' },
      { name: 'Service Updates', href: '/status/updates', icon: '🔄' },
      { name: 'API Status', href: '/status/api', icon: '🔌' },
      { name: 'Subscribe to Updates', href: '/status/subscribe', icon: '📧' }
    ],
    terms: [
      { name: 'Terms of Service', href: '/terms', icon: '📜' },
      { name: 'Privacy Policy', href: '/privacy', icon: '🔒' },
      { name: 'Cookie Policy', href: '/cookies', icon: '🍪' },
      { name: 'Acceptable Use', href: '/acceptable-use', icon: '✅' },
      { name: 'SLA', href: '/sla', icon: '📊' },
      { name: 'DPA', href: '/dpa', icon: '🛡️' },
      { name: 'Compliance', href: '/compliance', icon: '⚖️' },
      { name: 'Licenses', href: '/licenses', icon: '📄' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com/cannabisos', icon: Facebook, color: 'hover:bg-blue-600' },
    { name: 'Twitter', href: 'https://twitter.com/cannabisos', icon: Twitter, color: 'hover:bg-sky-500' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/cannabisos', icon: Linkedin, color: 'hover:bg-blue-700' },
    { name: 'Instagram', href: 'https://instagram.com/cannabisos', icon: Instagram, color: 'hover:bg-pink-600' },
    { name: 'YouTube', href: 'https://youtube.com/cannabisos', icon: Youtube, color: 'hover:bg-red-600' }
  ]

  const FooterSection = ({ title, links, icon }: { title: string; links: any[]; icon: React.ReactNode }) => (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              href={link.href} 
              className="text-gray-400 hover:text-green-400 transition-colors flex items-center group text-sm"
            >
              <span className="mr-2">{link.icon}</span>
              <span className="group-hover:underline">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <footer className="bg-gray-900 text-white">
      {/* Scroll to Top Button */}
      {showScrollTop && isClient && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Leaf className="h-10 w-10 text-green-400" />
              <span className="text-2xl font-bold text-white">CannabiOS</span>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>1-800-CANNABIS</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>support@cannabisos.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Toronto, ON, Canada</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-white">Stay Updated</h4>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={isSubscribed}
                >
                  {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                </Button>
              </form>
              <p className="text-xs text-gray-400 mt-2">
                Get the latest updates and exclusive offers
              </p>
            </div>
          </div>

          {/* Footer Links - Organized by Category */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <FooterSection 
                title="Product" 
                links={footerLinks.product} 
                icon={<Package className="h-5 w-5 text-green-400" />} 
              />
              
              <FooterSection 
                title="Features" 
                links={footerLinks.features} 
                icon={<Activity className="h-5 w-5 text-green-400" />} 
              />
              
              <FooterSection 
                title="Pricing" 
                links={footerLinks.pricing} 
                icon={<DollarSign className="h-5 w-5 text-green-400" />} 
              />
              
              <FooterSection 
                title="Security" 
                links={footerLinks.security} 
                icon={<Shield className="h-5 w-5 text-green-400" />} 
              />
              
              <FooterSection 
                title="Compliance" 
                links={footerLinks.compliance} 
                icon={<FileText className="h-5 w-5 text-green-400" />} 
              />
              
              <FooterSection 
                title="Company" 
                links={footerLinks.company} 
                icon={<Building className="h-5 w-5 text-green-400" />} 
              />
              
              <FooterSection 
                title="Support" 
                links={footerLinks.support} 
                icon={<HelpCircle className="h-5 w-5 text-green-400" />} 
              />
              
              <FooterSection 
                title="Legal" 
                links={footerLinks.terms} 
                icon={<FileText className="h-5 w-5 text-green-400" />} 
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} CannabiOS. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-green-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-green-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-green-400 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/compliance" className="hover:text-green-400 transition-colors">
                Compliance
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-600 text-white text-xs">
                SOC 2 Type II Certified
              </Badge>
              <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
                HIPAA Compliant
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-1">
                Ready to transform your dispensary?
              </h3>
              <p className="text-gray-400 text-sm">
                Join 500+ dispensaries using CannabiOS to streamline operations
              </p>
            </div>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                className="border-gray-600 text-white hover:bg-gray-800"
                onClick={() => isClient && (window.location.href = '/demo')}
              >
                Schedule Demo
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => isClient && (window.location.href = '/trial')}
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}