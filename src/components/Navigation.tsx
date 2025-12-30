import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import LoginDialog from "./LoginDialog";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, loading } = useAuth();
  const { toast } = useToast();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Community", path: "/community" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-smooth">
            <img src="/logo.png" alt="CineSlice" className="h-8 w-auto" />
            <span className="text-xl font-bold text-gradient">CineSlice</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-smooth hover:text-accent ${
                  isActive(item.path) ? "text-accent" : "text-muted-foreground"
                }`}
                onClick={() => window.scrollTo(0, 0)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button and Login/Logout */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="cta" size="sm">
              Start Learning
            </Button>
            {!loading && (
              user ? (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut size={20} />
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsLoginOpen(true)}
                  title="Login"
                >
                  <User size={20} />
                </Button>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-smooth hover:text-accent ${
                    isActive(item.path) ? "text-accent" : "text-muted-foreground"
                  }`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center gap-2">
                <Button variant="cta" size="sm" className="w-fit">
                  Start Learning
                </Button>
                {!loading && (
                  user ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsLoginOpen(true);
                      }}
                    >
                      <User size={16} className="mr-2" />
                      Login
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <LoginDialog 
        open={isLoginOpen} 
        onOpenChange={setIsLoginOpen} 
      />
    </nav>
  );
};

export default Navigation;
