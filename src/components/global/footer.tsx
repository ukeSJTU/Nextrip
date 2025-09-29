import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li>
              <li>Destinations</li>
              <li>Travel Guides</li>
              <li>Blog</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Customer Service</li>
              <li>Booking Help</li>
              <li>Cancellation Policy</li>
              <li>Travel Insurance</li>
              <li>Contact Us</li>
            </ul>
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
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
