import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Film, 
  Palette, 
  Shield, 
  Figma, 
  Video, 
  Cloud, 
  Code2, 
  Brain,
  Clock,
  Users,
  Star
} from "lucide-react";

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      title: "VFX & Animation",
      description: "Master visual effects and 3D animation for films and commercials",
      icon: Film,
      tools: ["After Effects", "Cinema 4D", "Nuke", "Blender"],
      duration: "6 months",
      level: "Beginner to Advanced",
      projects: 8,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      details: {
        overview: "Comprehensive VFX training covering motion graphics, 3D modeling, compositing, and visual effects for film and television.",
        curriculum: [
          "Motion Graphics and 2D Animation",
          "3D Modeling and Texturing",
          "Lighting and Rendering",
          "Compositing and Color Grading",
          "Advanced VFX Techniques",
          "Industry Pipeline Workflow"
        ],
        outcomes: [
          "Create professional VFX shots",
          "Master industry-standard software",
          "Build an impressive showreel",
          "Understand production pipelines"
        ]
      }
    },
    {
      id: 2,
      title: "Graphic Design",
      description: "Create stunning visuals, branding, and design thinking solutions",
      icon: Palette,
      tools: ["Adobe Creative Suite", "Branding", "Design Thinking"],
      duration: "4 months",
      level: "Beginner to Intermediate",
      projects: 6,
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      details: {
        overview: "Complete graphic design program covering visual identity, branding, and creative problem-solving.",
        curriculum: [
          "Design Fundamentals and Theory",
          "Typography and Layout Design",
          "Brand Identity and Logo Design",
          "Print and Digital Design",
          "Design Thinking Process",
          "Portfolio Development"
        ],
        outcomes: [
          "Design professional brand identities",
          "Create marketing materials",
          "Develop design thinking skills",
          "Build a strong portfolio"
        ]
      }
    },
    {
      id: 3,
      title: "Cybersecurity",
      description: "Learn ethical hacking, network security, and penetration testing",
      icon: Shield,
      tools: ["Ethical Hacking", "Network Security", "Penetration Testing"],
      duration: "8 months",
      level: "Intermediate to Advanced",
      projects: 10,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      details: {
        overview: "Comprehensive cybersecurity training covering ethical hacking, penetration testing, and security analysis.",
        curriculum: [
          "Network Security Fundamentals",
          "Ethical Hacking Techniques",
          "Penetration Testing Methodologies",
          "Vulnerability Assessment",
          "Incident Response",
          "Security Compliance and Governance"
        ],
        outcomes: [
          "Conduct professional penetration tests",
          "Identify and mitigate security vulnerabilities",
          "Implement security best practices",
          "Prepare for industry certifications"
        ]
      }
    },
    {
      id: 4,
      title: "UI/UX Design",
      description: "Design user-centered experiences with modern tools and research",
      icon: Figma,
      tools: ["Figma", "User Research", "Prototyping"],
      duration: "5 months",
      level: "Beginner to Advanced",
      projects: 7,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      details: {
        overview: "End-to-end UX/UI design program focusing on user research, interface design, and prototyping.",
        curriculum: [
          "UX Research and User Psychology",
          "Information Architecture",
          "Wireframing and Prototyping",
          "Visual Interface Design",
          "Usability Testing",
          "Design Systems and Style Guides"
        ],
        outcomes: [
          "Design intuitive user interfaces",
          "Conduct user research and testing",
          "Create interactive prototypes",
          "Build comprehensive design systems"
        ]
      }
    },
    {
      id: 5,
      title: "Video Editing",
      description: "Professional video editing and storytelling techniques",
      icon: Video,
      tools: ["Premiere Pro", "DaVinci Resolve", "Storytelling Techniques"],
      duration: "3 months",
      level: "Beginner to Intermediate",
      projects: 5,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      details: {
        overview: "Complete video editing course covering technical skills and storytelling for various media formats.",
        curriculum: [
          "Video Editing Fundamentals",
          "Advanced Editing Techniques",
          "Color Correction and Grading",
          "Audio Post-Production",
          "Motion Graphics Integration",
          "Content Creation Strategy"
        ],
        outcomes: [
          "Edit professional video content",
          "Master color grading workflows",
          "Create compelling narratives",
          "Understand content distribution"
        ]
      }
    },
    {
      id: 6,
      title: "Cloud Engineering",
      description: "Master cloud platforms, DevOps, and scalable infrastructure",
      icon: Cloud,
      tools: ["AWS", "Azure", "DevOps"],
      duration: "7 months",
      level: "Intermediate to Advanced",
      projects: 9,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      details: {
        overview: "Comprehensive cloud engineering program covering major platforms and DevOps practices.",
        curriculum: [
          "Cloud Computing Fundamentals",
          "AWS/Azure Platform Mastery",
          "Infrastructure as Code",
          "Container Orchestration",
          "CI/CD Pipeline Development",
          "Cloud Security and Monitoring"
        ],
        outcomes: [
          "Design scalable cloud architectures",
          "Implement DevOps workflows",
          "Manage cloud infrastructure",
          "Prepare for cloud certifications"
        ]
      }
    },
    {
      id: 7,
      title: "CS Fundamentals",
      description: "Strong foundation in computer science concepts and algorithms",
      icon: Brain,
      tools: ["Data Structures", "Algorithms", "OS", "DBMS"],
      duration: "6 months",
      level: "Beginner to Intermediate",
      projects: 8,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      details: {
        overview: "Solid computer science fundamentals covering core concepts essential for any tech career.",
        curriculum: [
          "Data Structures and Algorithms",
          "Operating Systems Concepts",
          "Database Management Systems",
          "Computer Networks",
          "System Design Basics",
          "Problem Solving Techniques"
        ],
        outcomes: [
          "Master fundamental CS concepts",
          "Solve complex algorithmic problems",
          "Understand system architecture",
          "Prepare for technical interviews"
        ]
      }
    },
    {
      id: 8,
      title: "Programming",
      description: "Full-stack development with modern languages and frameworks",
      icon: Code2,
      tools: ["Full-Stack Development", "Python", "JavaScript"],
      duration: "8 months",
      level: "Beginner to Advanced",
      projects: 12,
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
      details: {
        overview: "Complete programming bootcamp covering front-end, back-end, and full-stack development.",
        curriculum: [
          "Programming Fundamentals",
          "Front-end Development (HTML, CSS, JavaScript)",
          "Back-end Development (Python, Node.js)",
          "Database Design and Management",
          "API Development and Integration",
          "Deployment and DevOps Basics"
        ],
        outcomes: [
          "Build full-stack web applications",
          "Master multiple programming languages",
          "Understand software architecture",
          "Deploy applications to production"
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Courses</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our industry-focused programs designed to accelerate your career in creative technology.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="card-gradient border-border/50 hover:border-accent/50 transition-smooth group h-full">
              <CardHeader>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${course.bgColor} mb-4 group-hover:scale-110 transition-bounce`}>
                  <course.icon size={32} className={course.color} />
                </div>
                <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{course.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Course Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    {course.projects} projects
                  </div>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-2">
                  {course.tools.map((tool, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>

                {/* CTA */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full group-hover:border-accent transition-smooth">
                      Learn More
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${course.bgColor}`}>
                          <course.icon size={24} className={course.color} />
                        </div>
                        {course.title}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* Overview */}
                      <div>
                        <h3 className="font-semibold mb-2">Course Overview</h3>
                        <p className="text-muted-foreground">{course.details.overview}</p>
                      </div>

                      {/* Course Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-1">Duration</h4>
                          <p className="text-muted-foreground">{course.duration}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Level</h4>
                          <p className="text-muted-foreground">{course.level}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Projects</h4>
                          <p className="text-muted-foreground">{course.projects} hands-on projects</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Tools</h4>
                          <p className="text-muted-foreground">{course.tools.join(", ")}</p>
                        </div>
                      </div>

                      {/* Curriculum */}
                      <div>
                        <h3 className="font-semibold mb-3">What You'll Learn</h3>
                        <div className="grid grid-cols-1 gap-2">
                          {course.details.curriculum.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Star size={14} className="text-accent" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Outcomes */}
                      <div>
                        <h3 className="font-semibold mb-3">Learning Outcomes</h3>
                        <div className="grid grid-cols-1 gap-2">
                          {course.details.outcomes.map((outcome, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Star size={14} className="text-success" />
                              <span className="text-sm">{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button variant="cta" className="flex-1">
                          Enroll Now
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Download Syllabus
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <Card className="max-w-3xl mx-auto bg-card/50 border-accent/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Can't Decide? <span className="text-gradient">We're Here to Help</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Book a free consultation with our career advisors to find the perfect course for your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="cta" size="lg" asChild>
                  <a href="https://wa.me/918074425755" target="_blank" rel="noopener noreferrer">Book Free Consultation</a>
                </Button>
                <Button variant="outline" size="lg">
                  Download Course Catalog
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Courses;