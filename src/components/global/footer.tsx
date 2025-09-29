import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 bg-primary rounded flex items-center justify-center text-primary-foreground text-sm font-bold">
                N
              </div>
              <span className="font-bold text-lg">Nextrip</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your ultimate travel companion for discovering amazing
              destinations worldwide.
            </p>
            <div className="flex space-x-2">
              <Badge variant="secondary">Travel</Badge>
              <Badge variant="secondary">Adventure</Badge>
              <Badge variant="secondary">Explore</Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Button
                variant="link"
                className="p-0 h-auto text-sm text-muted-foreground justify-start"
              >
                About Us
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-sm text-muted-foreground justify-start"
              >
                Destinations
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-sm text-muted-foreground justify-start"
              >
                Travel Guides
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-sm text-muted-foreground justify-start"
              >
                Blog
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-sm text-muted-foreground justify-start"
              >
                FAQ
              </Button>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <div className="space-y-2">
              <Button
                variant="link"
                className="p-0 h-auto text-sm text-muted-foreground justify-start"
              >
                Customer Service
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-sm text-muted-foreground justify-start"
              >
                Booking Help
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-sm text-muted-foreground justify-start"
              >
                Cancellation Policy
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-sm text-muted-foreground justify-start"
              >
                Travel Insurance
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-sm text-muted-foreground justify-start"
              >
                Contact Us
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📧 support@nextrip.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Travel Street, City, State 12345</p>
              <p>🕒 24/7 Customer Support</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 Nextrip. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Button
              variant="link"
              className="p-0 h-auto text-sm text-muted-foreground"
            >
              Privacy Policy
            </Button>
            <Button
              variant="link"
              className="p-0 h-auto text-sm text-muted-foreground"
            >
              Terms of Service
            </Button>
            <Button
              variant="link"
              className="p-0 h-auto text-sm text-muted-foreground"
            >
              Cookie Policy
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
