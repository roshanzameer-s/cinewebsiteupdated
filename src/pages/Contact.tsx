import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message
      });
    
    if (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: ["Anantapur, India", "New Town"],
      color: "text-blue-400"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["coo@cineslice.com", "cto@cineslice.com"],
      color: "text-green-400"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 9959240315", "Mon-Fri 9AM-6PM IST"],
      color: "text-purple-400"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM"],
      color: "text-yellow-400"
    }
  ];

  const commonQuestions = [
    {
      question: "Course Information",
      description: "Learn about our programs, curriculum, and enrollment process"
    },
    {
      question: "Career Guidance",
      description: "Get advice on choosing the right career path in tech"
    },
    {
      question: "Technical Support",
      description: "Need help with platform access or course materials?"
    },
    {
      question: "Partnership Opportunities",
      description: "Interested in collaborating or corporate training programs?"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our courses? Need career guidance? We're here to help you 
            take the next step in your creative technology journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-gradient border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="text-accent" size={24} />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your query..."
                      rows={6}
                      required
                      className="bg-background/50 resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="cta" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send size={16} className="ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Common Questions */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Common Questions We Can Help With</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commonQuestions.map((item, index) => (
                  <Card key={index} className="card-gradient border-border/50 hover:border-accent/50 transition-smooth cursor-pointer group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold mb-1">{item.question}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <ArrowRight size={16} className="text-muted-foreground group-hover:text-accent transition-smooth" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="card-gradient border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                        <info.icon size={24} className={info.color} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{info.title}</h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-muted-foreground text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Response Promise */}
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-6 text-center">
                <CheckCircle className="text-success mx-auto mb-4" size={32} />
                <h3 className="font-semibold mb-2">Quick Response Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </CardContent>
            </Card>

            {/* Alternative Contact */}
            <Card className="card-gradient border-border/50">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-4">Prefer to Talk?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Schedule a free 15-minute consultation with our career advisors
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://wa.me/918074425755" target="_blank" rel="noopener noreferrer">Book a Call</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section (Placeholder) */}
        <section className="mt-20">
          <Card className="overflow-hidden">
            <div className="h-64 bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Visit Our Campus</h3>
                <p className="text-muted-foreground">Located in the heart of Hyderabad's tech district</p>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Contact;
