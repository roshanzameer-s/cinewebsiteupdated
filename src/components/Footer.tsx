import { Link } from "react-router-dom";
import { Youtube, Instagram, Linkedin, Twitter } from "lucide-react";
import cinesliceLogo from "@/assets/cineslice-logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={cinesliceLogo} alt="CineSlice" className="h-8 w-auto" />
              <span className="text-xl font-bold text-gradient">CineSlice</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Advance your career with creative tech courses. Learn VFX, Design, Programming, and more.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-accent transition-smooth">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-smooth">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-smooth">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-smooth">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/courses" className="block text-muted-foreground hover:text-accent transition-smooth text-sm">
                Courses
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-accent transition-smooth text-sm">
                About
              </Link>
              <Link to="/community" className="block text-muted-foreground hover:text-accent transition-smooth text-sm">
                Community
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-accent transition-smooth text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-accent transition-smooth text-sm">
                Help Center
              </a>
              <a href="#" className="block text-muted-foreground hover:text-accent transition-smooth text-sm">
                Career Guidance
              </a>
              <a href="#" className="block text-muted-foreground hover:text-accent transition-smooth text-sm">
                Student Portal
              </a>
              <a href="#" className="block text-muted-foreground hover:text-accent transition-smooth text-sm">
                Job Assistance
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Hyderabad, India</p>
              <p>hello@cineslice.com</p>
              <p>+91 9876543210</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 CineSlice. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;