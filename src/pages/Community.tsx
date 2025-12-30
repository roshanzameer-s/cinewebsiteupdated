import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Youtube, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Users, 
  MessageCircle,
  BookOpen,
  Zap,
  TrendingUp,
  Heart,
  Share2,
  Play
} from "lucide-react";

const Community = () => {
  const socialStats = [
    {
      platform: "YouTube",
      icon: Youtube,
      subscribers: "1K+",
      description: "Video tutorials, project walkthroughs, and industry insights",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      link: "#",
      content: "Tutorial Videos & Live Sessions"
    },
    {
      platform: "Instagram",
      icon: Instagram,
      subscribers: "5K+",
      description: "Creative inspiration, student work showcase, and behind-the-scenes",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      link: "#",
      content: "Creative Community"
    },
    {
      platform: "LinkedIn",
      icon: Linkedin,
      subscribers: "1K+",
      description: "Professional networking, career advice, and industry updates",
      color: "text-blue-600",
      bgColor: "bg-blue-600/10",
      link: "#",
      content: "Professional Network"
    },
    {
      platform: "Twitter",
      icon: Twitter,
      subscribers: "1K+",
      description: "Tech trends, quick tips, and community discussions",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      link: "#",
      content: "Tech Enthusiasts"
    }
  ];

  const communityFeatures = [
    {
      icon: Users,
      title: "Peer Learning",
      description: "Connect with fellow learners, form study groups, and collaborate on projects",
      color: "text-purple-400"
    },
    {
      icon: MessageCircle,
      title: "Expert Guidance",
      description: "Get answers from industry professionals and experienced mentors",
      color: "text-green-400"
    },
    {
      icon: BookOpen,
      title: "Resource Sharing",
      description: "Access exclusive tutorials, templates, and learning resources",
      color: "text-blue-400"
    },
    {
      icon: Zap,
      title: "Live Sessions",
      description: "Join interactive workshops, Q&A sessions, and guest expert talks",
      color: "text-yellow-400"
    },
    {
      icon: TrendingUp,
      title: "Career Support",
      description: "Portfolio reviews, job referrals, and career guidance from our network",
      color: "text-cyan-400"
    },
    {
      icon: Heart,
      title: "Success Stories",
      description: "Celebrate achievements and get inspired by community success stories",
      color: "text-red-400"
    }
  ];

  const upcomingEvents = [
    {
      title: "VFX Pipeline Workshop",
      date: "Dec 15, 2024",
      time: "7:00 PM IST",
      platform: "YouTube Live",
      type: "Workshop"
    },
    {
      title: "Career in Cybersecurity",
      date: "Dec 18, 2024",
      time: "8:00 PM IST",
      platform: "LinkedIn Live",
      type: "Expert Talk"
    },
    {
      title: "Portfolio Review Session",
      date: "Dec 22, 2024",
      time: "6:00 PM IST",
      platform: "Instagram Live",
      type: "Review"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Join Our <span className="text-gradient">Community</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with thousands of creative professionals, share your journey, 
            and get the support you need to succeed in tech.
          </p>
        </div>

        {/* Social Media Stats */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Follow Us Across Platforms</h2>
            <p className="text-muted-foreground">
              Get daily inspiration, tutorials, and updates from our growing community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialStats.map((social, index) => (
              <Card key={index} className="card-gradient border-border/50 hover:border-accent/50 transition-smooth group">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${social.bgColor} mb-4 group-hover:scale-110 transition-bounce`}>
                    <social.icon size={32} className={social.color} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{social.platform}</h3>
                  <div className="text-3xl font-bold text-accent mb-2">{social.subscribers}</div>
                  <Badge variant="secondary" className="mb-4">
                    {social.content}
                  </Badge>
                  <p className="text-muted-foreground text-sm mb-6">{social.description}</p>
                  <Button variant="outline" size="sm" className="w-full group-hover:border-accent transition-smooth">
                    <Share2 size={16} className="mr-2" />
                    Follow
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Community Features */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Join Our Community?</h2>
            <p className="text-muted-foreground">
              More than just followers - we're a supportive ecosystem for your growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityFeatures.map((feature, index) => (
              <Card key={index} className="card-gradient border-border/50 hover:border-accent/50 transition-smooth group">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4 group-hover:bg-accent/20 transition-smooth">
                    <feature.icon size={24} className={feature.color} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-muted-foreground">
              Join our live sessions for learning, networking, and career guidance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="card-gradient border-border/50 hover:border-accent/50 transition-smooth group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{event.type}</Badge>
                    <Play size={16} className="text-accent group-hover:scale-110 transition-bounce" />
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <p>📅 {event.date}</p>
                    <p>⏰ {event.time}</p>
                    <p>📺 {event.platform}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full group-hover:border-accent transition-smooth">
                    Set Reminder
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Join Community CTA */}
        <section>
          <Card className="max-w-4xl mx-auto bg-card/50 border-accent/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Connect with <span className="text-gradient">Like-Minded Creators</span>?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of creative professionals who share tips, tutorials, job opportunities, 
                and support each other's growth journey. Your network is your net worth!
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {socialStats.map((social, index) => (
                  <Button key={index} variant="outline" className="flex items-center gap-2 hover:border-accent transition-smooth">
                    <social.icon size={16} className={social.color} />
                    <span className="hidden sm:inline">{social.platform}</span>
                  </Button>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="cta" size="lg">
                  Join All Channels
                </Button>
                <Button variant="glass" size="lg">
                  Newsletter Signup
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Community;