'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Globe, 
  Zap, 
  Database, 
  Cloud, 
  Plug, 
  Settings, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  RefreshCw, 
  Eye, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  Activity, 
  Shield, 
  Key, 
  BarChart3,
  Link,
  Api,
  Webhook
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  type: string
  status: string
  provider: string
  description: string
  icon: string
  documentation: string
  statistics: {
    totalRequests: number
    successRate: number
    averageResponseTime: number
    lastSync: Date
    errors: number
  }
}

export default function IntegrationHub() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  useEffect(() => {
    const mockIntegrations: Integration[] = [
      {
        id: 'stripe_payments',
        name: 'Stripe Payments',
        type: 'payment',
        status: 'active',
        provider: 'Stripe',
        description: 'Complete payment processing with Stripe',
        icon: 'credit-card',
        documentation: 'https://stripe.com/docs',
        statistics: {
          totalRequests: 1250,
          successRate: 98.5,
          averageResponseTime: 234,
          lastSync: new Date('2024-01-16'),
          errors: 3
        }
      },
      {
        id: 'shipstation_shipping',
        name: 'ShipStation',
        type: 'shipping',
        status: 'active',
        provider: 'ShipStation',
        description: 'Shipping and fulfillment automation',
        icon: 'truck',
        documentation: 'https://www.shipstation.com/docs',
        statistics: {
          totalRequests: 456,
          successRate: 99.2,
          averageResponseTime: 456,
          lastSync: new Date('2024-01-16'),
          errors: 1
        }
      },
      {
        id: 'quickbooks_accounting',
        name: 'QuickBooks Online',
        type: 'accounting',
        status: 'active',
        provider: 'Intuit',
        description: 'Accounting and financial management',
        icon: 'calculator',
        documentation: 'https://developer.intuit.com/docs/quickbooks/v4',
        statistics: {
          totalRequests: 234,
          successRate: 97.8,
          averageResponseTime: 567,
          lastSync: new Date('2024-01-16'),
          errors: 2
        }
      },
      {
        id: 'slack_communication',
        name: 'Slack',
        type: 'communication',
        status: 'active',
        provider: 'Slack',
        description: 'Team communication and notifications',
        icon: 'message-circle',
        documentation: 'https://api.slack.com/docs',
        statistics: {
          totalRequests: 89,
          successRate: 100.0,
          averageResponseTime: 123,
          lastSync: new Date('2024-01-16'),
          errors: 0
        }
      },
      {
        id: 'google_analytics',
        name: 'Google Analytics',
        type: 'analytics',
        status: 'active',
        provider: 'Google',
        description: 'Web analytics and marketing insights',
        icon: 'bar-chart',
        documentation: 'https://developers.google.com/analytics/devguides',
        statistics: {
          totalRequests: 567,
          successRate: 99.8,
          averageResponseTime: 89,
          lastSync: new Date('2024-01-16'),
          errors: 0
        }
      },
      {
        id: 'aws_s3_storage',
        name: 'AWS S3',
        type: 'storage',
        status: 'active',
        provider: 'Amazon Web Services',
        description: 'Cloud storage and file management',
        icon: 'cloud',
        documentation: 'https://docs.aws.amazon.com/s3/',
        statistics: {
          totalRequests: 1234,
          successRate: 100.0,
          averageResponseTime: 45,
          lastSync: new Date('2024-01-16'),
          errors: 0
        }
      },
      {
        id: 'zapier_automation',
        name: 'Zapier',
        type: 'other',
        status: 'active',
        provider: 'Zapier',
        description: 'Workflow automation and integration platform',
        icon: 'zap',
        documentation: 'https://zapier.com/developer',
        statistics: {
          totalRequests: 234,
          successRate: 96.5,
          averageResponseTime: 234,
          lastSync: new Date('2024-01-16'),
          errors: 4
        }
      }
    ]

    setIntegrations(mockIntegrations)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getIntegrationIcon = (type: string) => {
    switch (type) {
      case 'payment': return <CreditCard className="h-5 w-5" />
      case 'shipping': return <Truck className="h-5 w-5" />
      case 'inventory': return <Package className="h-5 w-5" />
      case 'analytics': return <BarChart3 className="h-5 w-5" />
      case 'accounting': return <Calculator className="h-5 w-5" />
      case 'communication': return <Mail className="h-5 w-5" />
      case 'storage': return <Database className="h-5 w-5" />
      default: return <Plug className="h-5 w-5" />
    }
  }

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           integration.provider.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || integration.type === filterType
    const matchesStatus = filterStatus === 'all' || integration.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const testConnection = async (integrationId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.1)
      }, 1000 + Math.random() * 2000)
    })
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integration Hub</h1>
          <p className="text-gray-600">Connect and automate your business with powerful integrations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
          <Button variant="outline">
            <Zap className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Integrations</p>
                <p className="text-2xl font-bold text-gray-900">{integrations.filter(i => i.status === 'active').length}</p>
              </div>
              <Plug className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(integrations.reduce((acc, i) => acc + i.statistics.successRate, 0) / integrations.length * 100).toFixed(1)}%
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{integrations.reduce((acc, i) => acc + i.statistics.totalRequests, 0).toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Errors</p>
                <p className="text-2xl font-bold text-gray-900">{integrations.reduce((acc, i) => acc + i.statistics.errors, 0)}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrations.slice(0, 5).map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getStatusColor(integration.status)}`}>
                          {getIntegrationIcon(integration.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                          <p className="text-sm text-gray-500">{integration.provider}</p>
                          <p className="text-xs text-gray-400">{integration.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(integration.status)}>
                            {integration.status}
                          </Badge>
                          <p className="text-sm text-gray-500">
                            {(integration.statistics.successRate * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integration Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrations.map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          integration.statistics.successRate > 0.95 ? 'bg-green-500' :
                          integration.statistics.successRate > 0.85 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} />
                        <div>
                          <h3 className="font-semibold">{integration.name}</h3>
                          <p className="text-sm text-gray-500">
                            Status: {integration.status}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          <p>Success: {(integration.statistics.successRate * 100).toFixed(1)}%</p>
                          <p>Errors: {integration.statistics.errors}</p>
                          <p>Response: {integration.statistics.averageResponseTime}ms</p>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => testConnection(integration.id)}
                          >
                            Test
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search integrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Types</option>
                <option value="payment">Payment</option>
                <option value="shipping">Shipping</option>
                <option value="inventory">Inventory</option>
                <option value="analytics">Analytics</option>
                <option value="accounting">Accounting</option>
                <option value="communication">Communication</option>
                <option value="storage">Storage</option>
                <option value="other">Other</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => (
              <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getStatusColor(integration.status)}`}>
                        {getIntegrationIcon(integration.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                        <p className="text-sm text-gray-500">{integration.provider}</p>
                        <p className="text-xs text-gray-400">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Link className="h-4 w-4 text-blue-600" href={integration.documentation} target="_blank">
                          <Globe className="h-4 w-4" />
                        </Link>
                        <Button
                          size="sm"
                          variant="ghost"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600">Type</p>
                        <p className="font-medium capitalize">{integration.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Last Sync</p>
                        <p className="font-medium">{integration.statistics.lastSync.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Requests: {integration.statistics.totalRequests} | 
                          Success: {(integration.statistics.successRate * 100).toFixed(1)}% | 
                          Errors: {integration.statistics.errors}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => testConnection(integration.id)}
                          >
                            Test
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardContent className="p-12 text-center">
              <Zap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Integration Templates</h3>
              <p className="text-gray-600">Pre-built integration templates coming soon</p>
              <div className="mt-4">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.filter(i => i.statistics.errors > 0).map((integration) => (
                  <div key={integration.id} className="p-4 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div>
                          <h3 className="font-semibold text-red-900">{integration.name}</h3>
                          <p className="text-sm text-red-700">
                            {integration.statistics.errors} errors
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-red-100 text-red-800">
                          {integration.statistics.errors > 10 ? 'Critical' : 'Warning'}
                        </Badge>
                        <p className="text-xs text-gray-500">
                          Last error: {integration.statistics.lastSync.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button size="sm" variant="outline" className="w-full">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Retry Failed Operations
                      </Button>
                    </div>
                  </div>
                ))}
                {integrations.filter(i => i.statistics.errors === 0).length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">All Systems Healthy</h3>
                    <p className="text-gray-600">No errors detected in any integration</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
