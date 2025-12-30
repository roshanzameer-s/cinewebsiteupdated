import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Rocket, 
  Monitor, 
  Briefcase, 
  Target,
  MessageSquare,
  GraduationCap,
  Film,
  Palette,
  Shield,
  Code,
  Cloud,
  Star,
  Quote
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
const BASE = import.meta.env.BASE_URL;

const Home = () => {
  const stats = [
    { icon: Users, label: "Students Trained", value: "100+" },
    { icon: Rocket, label: "Career Tracks", value: "10+" },
    { icon: Monitor, label: "Practical Training", value: "100%" },
    { icon: Briefcase, label: "Job Success Rate", value: "95%" },
  ];

  const features = [
    { 
      icon: Target, 
      title: "Industry-Ready Projects",
      description: "Work on real-world projects that showcase your skills to employers"
    },
    { 
      icon: MessageSquare, 
      title: "1-on-1 Doubt Support",
      description: "Get personalized guidance from industry experts whenever you need it"
    },
    { 
      icon: Briefcase, 
      title: "Job Assistance",
      description: "From portfolio building to interview prep, we help you land your dream job"
    },
    { 
      icon: Film, 
      title: "Film & Design Focused",
      description: "Specialized curriculum for creative industries and cutting-edge tech"
    },
    { 
      icon: GraduationCap, 
      title: "Hybrid Learning Mode",
      description: "Flexible online and offline sessions that fit your schedule"
    },
    { 
      icon: Users, 
      title: "Small Batch Teaching",
      description: "Personal attention with limited students per batch for better learning"
    },
  ];

  const courseHighlights = [
    { icon: Film, name: "VFX & Animation", color: "text-purple-400" },
    { icon: Palette, name: "Graphic Design", color: "text-pink-400" },
    { icon: Shield, name: "Cybersecurity", color: "text-red-400" },
    { icon: Code, name: "Programming", color: "text-green-400" },
    { icon: Cloud, name: "Cloud Engineering", color: "text-blue-400" },
  ];

  const reviews = [
    {
      name: "Rajesh kumar",
      role: "VFX Artist at Prime Focus",
      image: `${BASE}roshan.jpg`,
      rating: 5,
      review: "CineSlice transformed my career! The hands-on VFX training and industry connections helped me land my dream job within 3 months of completing the course."
    },
    {
      name: "Rahul",
      role: "Cybersecurity Analyst",
      image: `${BASE}mohith.jpg`,
      rating: 5,
      review: "The cybersecurity course was incredibly comprehensive. The practical labs and real-world scenarios prepared me perfectly for industry challenges."
    },
    {
      name: "Ananya Reddy",
      role: "Graphic Designer",
      image: "/jahnavi.jpg",
      rating: 5,
      review: "The small batch size meant I got personalized attention. My mentor helped me build an amazing portfolio that stands out to employers."
    },
    {
      name: "Karthik Nair",
      role: "Full Stack Developer",
      image: "/arshad.jpg",
      rating: 5,
      review: "From zero coding knowledge to a full-stack developer in 6 months. The hybrid learning mode fit perfectly with my schedule."
    },
  ];

  return (
    <div className="flex flex-col mt-6">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 hero-gradient opacity-90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl ml-auto  mx-auto space-y-8 animate-fade-in text-center align-center">
            
            
            <img src="/logo.png" className="ml-8 mt-5"></img>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Advance Your Career with{" "}
              <span className="text-gradient">Creative Tech Courses</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Learn VFX, Design, Programming, Cybersecurity and more — with expert guidance, 
              hybrid learning, and job support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/courses">Start for Free</Link>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <Link to="/courses">Explore Courses</Link>
              </Button>
            </div>

            {/* Course highlights */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 mb-5">
              {courseHighlights.map((course, index) => (
                <div key={index} className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                  <course.icon size={16} className={course.color} />
                  <span className="text-sm font-medium">{course.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                  <stat.icon size={24} className="text-accent" />
                </div>
                <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose CineSlice */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">CineSlice</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're not just another online course platform. We're your career transformation partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-gradient border-border/50 hover:border-accent/50 transition-smooth group">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4 group-hover:bg-accent/20 transition-smooth">
                    <feature.icon size={24} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="text-gradient">Students Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from our alumni who have successfully transformed their careers through our workshops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="card-gradient border-border/50 hover:border-accent/50 transition-smooth group relative overflow-hidden">
                <CardContent className="p-8">
                  <Quote className="absolute top-4 right-4 w-12 h-12 text-accent/10" />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={review.image} 
                      alt={review.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-accent/30"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">{review.name}</h4>
                      <p className="text-muted-foreground text-sm">{review.role}</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{review.review}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Your <span className="text-gradient">Tech Journey</span>?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of students who have transformed their careers with CineSlice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" asChild>
                <Link to="/courses">Explore All Courses</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://wa.me/918074425755" target="_blank" rel="noopener noreferrer">Talk to an Advisor</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;