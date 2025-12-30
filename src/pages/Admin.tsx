import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Calendar, Eye, EyeOff } from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
  read: boolean;
}

const Admin = () => {
  const { user, loading } = useAuth();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();
      
      setIsAdmin(!!data);
      setCheckingRole(false);
    };

    if (user) {
      checkAdminRole();
    }
  }, [user]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!isAdmin) return;
      
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setSubmissions(data);
      }
    };

    if (isAdmin) {
      fetchSubmissions();
    }
  }, [isAdmin]);

  const toggleRead = async (id: string, currentRead: boolean) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ read: !currentRead })
      .eq('id', id);
    
    if (!error) {
      setSubmissions(prev => 
        prev.map(s => s.id === id ? { ...s, read: !currentRead } : s)
      );
    }
  };

  if (loading || checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">
              You don't have permission to view this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Contact Submissions</h1>
          <p className="text-muted-foreground">
            View and manage contact form submissions
          </p>
        </div>

        {submissions.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No submissions yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card key={submission.id} className={submission.read ? "opacity-60" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{submission.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={submission.read ? "secondary" : "default"}>
                        {submission.read ? "Read" : "New"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleRead(submission.id, submission.read)}
                      >
                        {submission.read ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Mail size={14} />
                      {submission.email}
                    </span>
                    {submission.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={14} />
                        {submission.phone}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(submission.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-foreground whitespace-pre-wrap">{submission.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
