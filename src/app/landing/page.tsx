'use client'

import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  Users, 
  DollarSign, 
  Shield, 
  Zap, 
  Globe, 
  BarChart3, 
  CheckCircle, 
  Star, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Calendar,
  Target,
  Brain,
  Cpu,
  Cloud,
  Database,
  Activity,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  Rocket,
  Settings
} from 'lucide-react'

export default function LandingPage() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const features = [
    {
      icon: <ShoppingCart className="h-8 w-8 text-blue-600" />,
      title: 'POS + Billing System',
      description: 'Fast, compliant POS system with age verification and real-time inventory',
      points: ['Age verification', 'Multi-payment support', 'Real-time inventory', 'Compliance reporting'],
      color: 'bg-blue-100 text-blue-800'
    },
    {
      icon: <Package className="h-8 w-8 text-green-600" />,
      title: 'Inventory Management',
      description: 'Real-time stock tracking with batch management and compliance',
      points: ['Real-time tracking', 'Batch management', 'Low stock alerts', 'Compliance reporting'],
      color: 'bg-green-100 text-green-800'
    },
    {
      icon: <Truck className="h-8 w-8 text-red-600" />,
      title: 'Delivery Management',
      description: 'Complete delivery tracking with driver management and customer verification',
      points: ['Real-time tracking', 'Driver assignment', 'Route optimization', 'Customer verification', 'Automated dispatch'],
      color: 'bg-red-100 text-red-800'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: 'Customer Management',
      description: 'Comprehensive customer profiles with purchase history and preferences',
      points: ['Customer profiles', 'Purchase history', 'Loyalty programs', 'Communication tools'],
      color: 'bg-purple-100 text-purple-800'
    },
    {
      icon: <DollarSign className="h-8 w-8 text-yellow-600" />,
      title: 'Accounting System',
      description: 'Complete expense management with real-time profit & loss calculations',
      points: ['Expense tracking', 'Real-time P&L', 'Financial reporting', 'Tax management'],
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      title: 'Compliance & Security',
      description: 'Enterprise-grade security with comprehensive compliance tracking',
      points: ['Age verification', 'Audit trails', 'Compliance reporting', 'Data encryption'],
      color: 'bg-indigo-100 text-indigo-800'
    }
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$99',
      period: '/month',
      yearly: '$999',
      description: 'Perfect for small dispensaries',
      features: [
        'Up to 3 Users',
        'POS System',
        'Inventory Management',
        'Basic Reporting',
        'Email Support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$299',
      period: '/month',
      yearly: '$2,999',
      description: 'Great for growing businesses',
      features: [
        'Up to 10 Users',
        'POS + Complete Accounting',
        'QR Tracking',
        'Delivery Management',
        'Multi-Store Support',
        'Priority Support'
      ],
      popular: true
    },
    {
      name: 'Growth',
      price: '$599',
      period: '/month',
      yearly: '$5,999',
      description: 'Advanced features for scaling',
      features: [
        'Unlimited Users',
        'Complete Suite',
        'Advanced Analytics',
        'API Access',
        'White-Label Options',
        'Dedicated Support'
      ],
      popular: false
    },
    {
      name: 'Enterprise',
      price: '$1,299',
      period: '/month',
      yearly: '$12,999',
      description: 'Full-featured for large operations',
      features: [
        'Everything in Growth',
        'Custom Integrations',
        'On-Premise Option',
        'SLA Guarantee',
        'Custom Training',
        '24/7 Phone Support'
      ],
      popular: false
    }
  ]

  const stats = [
    { label: 'Active Dispensaries', value: '500+', icon: <Store className="h-5 w-5" /> },
    { label: 'Monthly Transactions', value: '2.5M+', icon: <ShoppingCart className="h-5 w-5" /> },
    { label: 'Compliance Rate', value: '99.9%', icon: <Shield className="h-5 w-5" /> },
    { label: 'Customer Satisfaction', value: '4.9/5', icon: <Star className="h-5 w-5" /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🌿</span>
                </div>
                <span className="text-xl font-bold text-gray-900">CannabiOS</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
              <Link href="/consultants" className="text-gray-600 hover:text-gray-900">For Consultants</Link>
            </div>

            <div className="flex items-center space-x-4">
              {session ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Welcome, {session.user?.name}</span>
                  <Button variant="outline" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button variant="outline" onClick={() => signIn()}>
                    Sign In
                  </Button>
                  <Button onClick={() => signIn()}>
                    Get Started
                  </Button>
                </div>
              )}
              
              <Button
                variant="ghost"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="#features" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link href="/dashboard" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Dashboard</Link>
            <Link href="/consultants" className="block px-3 py-2 text-gray-600 hover:text-gray-900">For Consultants</Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">🌿</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Complete Dispensery Management System
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your cannabis dispensery operations with our all-in-one platform. 
              From POS to compliance, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {session ? (
                <Button size="lg" onClick={() => window.location.href = '/dashboard'}>
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <>
                  <Button size="lg" onClick={() => signIn()}>
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => window.location.href = '#pricing'}>
                    View Pricing
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center items-center mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Run Your Dispensery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform covers all aspects of dispensery management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{plan.yearly} per year</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? 'bg-blue-600 text-white' : ''}`}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Dispensery?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join hundreds of dispensaries using CannabiOS to streamline their operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => signIn()}>
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🌿</span>
                </div>
                <span className="text-xl font-bold">CannabiOS</span>
              </div>
              <p className="text-gray-400">
                Complete dispensery management system for modern cannabis businesses
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link href="#pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link href="/notifications" className="text-gray-400 hover:text-white">Real-time Notifications</Link></li>
                <li><Link href="/drivers" className="text-gray-400 hover:text-white">Driver Management</Link></li>
                <li><Link href="/verification" className="text-gray-400 hover:text-white">Customer Verification</Link></li>
                <li><Link href="/payments" className="text-gray-400 hover:text-white">Payment Processing</Link></li>
                <li><Link href="/predictive" className="text-gray-400 hover:text-white">Predictive Analytics</Link></li>
                <li><Link href="/integrations" className="text-gray-400 hover:text-white">Integration Hub</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/partners" className="text-gray-400 hover:text-white">Partner Program</Link></li>
                <li><Link href="/security" className="text-gray-400 hover:text-white">Security</Link></li>
                <li><Link href="/compliance" className="text-gray-400 hover:text-white">Compliance</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <Globe className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <Mail className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <Phone className="h-5 w-5" />
                  </Link>
                </div>
                <p className="text-gray-400">
                  © 2024 CannabiOS. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
