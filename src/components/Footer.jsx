import { Link } from "react-router-dom";
import Button from "./ui/Button";
import { Card } from "./ui/card";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      {/* CTA Section */}
      <section id="contact" className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Alumni Network?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join the digital revolution in alumni management. Connect with
            thousands of institutions already using our platform.
          </p>

          <Card className="p-8 bg-white/10 backdrop-blur-md border-white/20 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Get Started Today</h3>
            <div className="space-y-4">
              <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-white">
                Request Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="w-full border-white/30 hover:text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer Links */}
      <div className="border-t border-white/20 py-16 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">AM</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Alumni Connect</h3>
                <p className="text-sm text-white/70">Government of Punjab</p>
              </div>
            </div>
            <p className="text-white/70 mb-4">
              Digital platform for centralized alumni data management and
              engagement.
            </p>
            <p className="text-sm text-white/60">Smart India Hackathon 2025</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Platform</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Alumni Portal
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Institute ERP
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Mobile App
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Support Center
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  System Status
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3 text-white/70">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>contact@alumniconnect.gov.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>+91-172-XXXXXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>Chandigarh, Punjab</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/20 py-6 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-white/60">
          <p>&copy; 2025 Government of Punjab. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-white transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
