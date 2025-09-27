import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Mail, Server, Shield, Clock } from "lucide-react";

function Deliver() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Email Deliverability Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Monitor and optimize your email delivery performance
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Delivery Status</CardTitle>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-2">98.5%</div>
                <p className="text-sm text-muted-foreground">Successful deliveries</p>
                <Badge variant="secondary" className="mt-2">Excellent</Badge>
              </CardContent>
            </Card>

            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">DNS Health</CardTitle>
                  <Server className="w-6 h-6 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 mb-2">Healthy</div>
                <p className="text-sm text-muted-foreground">All DNS records valid</p>
                <Badge variant="secondary" className="mt-2">SPF, DKIM, DMARC</Badge>
              </CardContent>
            </Card>

            <Card className="border-orange-200 dark:border-orange-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Reputation</CardTitle>
                  <Shield className="w-6 h-6 text-orange-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600 mb-2">Good</div>
                <p className="text-sm text-muted-foreground">Sender reputation</p>
                <Badge variant="secondary" className="mt-2">Monitor Daily</Badge>
              </CardContent>
            </Card>
          </div>

          {/* DNS Configuration */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                DNS Configuration Status
              </CardTitle>
              <CardDescription>
                Current status of your domain's email authentication records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">SPF Record</p>
                      <p className="text-sm text-muted-foreground">
                        v=spf1 include:sendgrid.net ~all
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">DKIM Record</p>
                      <p className="text-sm text-muted-foreground">
                        Domain key authentication configured
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium">DMARC Record</p>
                      <p className="text-sm text-muted-foreground">
                        v=DMARC1; p=quarantine; rua=mailto:admin@achek.digital
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">Monitor</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Email Activity
              </CardTitle>
              <CardDescription>
                Latest email sending activity and delivery status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Welcome Email Campaign</p>
                      <p className="text-sm text-muted-foreground">
                        Sent 2 hours ago • 1,234 recipients
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Delivered
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Newsletter - Weekly Update</p>
                      <p className="text-sm text-muted-foreground">
                        Sent 1 day ago • 856 recipients
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Delivered
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Order Confirmation</p>
                      <p className="text-sm text-muted-foreground">
                        Sent 3 days ago • 45 recipients
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Delivered
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Deliver;
