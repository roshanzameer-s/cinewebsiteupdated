import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const BASE = import.meta.env.BASE_URL;
import { 
  Award, 
  Target, 
  Users, 
  Lightbulb,
  Star,
  Trophy,
  Rocket
} from "lucide-react";

const About = () => {
  const teamMembers = [
  {
    name: "Subramanyam Chowdary",
    role: "Founder & CEO",
    skills: ["Strategic Leadership", "Product Vision", "Business Development"],
    image: `${BASE}subbu.png`,
  },
  {
    name: "Harshini",
    role: "Managing Director",
    skills: ["Organizational Management", "Business Strategy", "Team Coordination"],
    image: `${BASE}harshini.jpg`,
  },
  {
    name: "Bhavya Sree",
    role: "Co-Founder & CMO",
    skills: ["Product Strategy", "User Experience", "Creative Direction"],
    image: `${BASE}bhavya.jpg`,
  },
  {
    name: "K. Mohith",
    role: "Director of Operations / COO",
    skills: ["Operations Management", "Process Optimization", "Quality Assurance"],
    image: `${BASE}mohith.jpg`,
  },
  {
    name: "Mahesh",
    role: "Lecturer (Cloud Engineering)",
    skills: ["Cloud Computing", "DevOps", "Teaching & Mentorship"],
    image: `${BASE}mahesh.jpeg`,
  },
  {
    name: "Roshan Zameer",
    role: "Backend & AI Specialist / CTO",
    skills: ["Technical Architecture", "Software Development", "Artificial Intelligence"],
    image: `${BASE}roshan.jpg`,
  },
  {
    name: "Sailaja Reddy",
    role: "Mentor & UX Developer",
    skills: ["UX Design", "Frontend Development", "Student Mentorship"],
    image: `${BASE}sai-lalith.jpg`,
  },
  {
    name: "Harini",
    role: "Technical Assistant",
    skills: ["Technical Support", "Documentation", "Research Assistance"],
    image: `${BASE}harini.jpg`,
  },
  {
    name: "Balaji",
    role: "Project Manager",
    skills: ["Project Planning", "Team Leadership", "Agile Methodologies"],
    image: `${BASE}balaji.jpg`,
  },
  {
    name: "Arshad",
    role: "Head of Growth",
    skills: ["Growth Strategy", "Market Research", "Business Expansion"],
    image: `${BASE}arshad.jpg`,
  },
  {
    name: "Meda",
    role: "Chief Financial Officer (CFO)",
    skills: ["Financial Planning", "Risk Management", "Budgeting"],
    image: `${BASE}medhavs.jpg`,
  },
  {
    name: "Jahanvi",
    role: "Junior Design Mentor",
    skills: ["Graphic Design", "UI Design", "Creative Thinking"],
    image: `${BASE}jahnavi.jpg`,
  },
];

  const achievements = [
    {
      icon: Trophy,
      title: "Google for Startups",
      description: "Selected for Google for Startups accelerator program",
      color: "text-yellow-400"
    },
    {
      icon: Award,
      title: "Startup India Recognition",
      description: "Officially recognized by Government of India's Startup India initiative",
      color: "text-green-400"
    },
    {
      icon: Rocket,
      title: "Innovation Hub Partner",
      description: "Strategic partnership with leading innovation and incubation centers",
      color: "text-blue-400"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence in Education",
      description: "We believe in providing world-class education that transforms careers"
    },
    {
      icon: Users,
      title: "Student-Centric Approach",
      description: "Every decision we make puts our students' success at the center"
    },
    {
      icon: Lightbulb,
      title: "Innovation & Creativity",
      description: "We foster creative thinking and innovative problem-solving"
    },
    {
      icon: Star,
      title: "Industry Relevance",
      description: "Our curriculum stays current with industry trends and demands"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">CineSlice</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're passionate about bridging the gap between creative talent and industry demands 
            through innovative education and hands-on training.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <Card className="max-w-4xl mx-auto bg-card/50 border-accent/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To democratize access to high-quality creative technology education, empowering individuals 
                with the skills, knowledge, and industry connections needed to thrive in the digital economy. 
                We combine cutting-edge curriculum with personalized mentorship to create transformative 
                learning experiences.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CEO Achievements */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recognition & Achievements</h2>
            <p className="text-muted-foreground">
              Our leadership has been recognized by leading organizations in the startup ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="card-gradient border-border/50 hover:border-accent/50 transition-smooth text-center group">
                <CardContent className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6 group-hover:scale-110 transition-bounce`}>
                    <achievement.icon size={32} className={achievement.color} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{achievement.title}</h3>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-gradient border-border/50 hover:border-accent/50 transition-smooth group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-smooth">
                      <value.icon size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground">
              The passionate educators and industry experts behind CineSlice
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="card-gradient border-border/50 hover:border-accent/50 transition-smooth group overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-accent font-medium mb-4">{member.role}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20">
          <Card className="max-w-3xl mx-auto bg-card/50 border-accent/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Join Our <span className="text-gradient">Learning Community</span>?
              </h2>
              <p className="text-muted-foreground mb-8">
                Connect with our team and discover how CineSlice can accelerate your career in creative technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 accent-gradient text-accent-foreground font-semibold rounded-md hover:scale-105 shadow-glow transition-bounce">
                  Start Your Journey
                </button>
                <a href="https://wa.me/918074425755" target="_blank" rel="noopener noreferrer" className="px-8 py-3 glass-card text-foreground hover:bg-card/60 border border-border/30 rounded-md transition-smooth">
                  Schedule a Call
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;