import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Video, Calendar, Clock, User, Award, CheckCircle } from "lucide-react";

interface Student {
  id: string;
  student_id: string;
  user_id: string;
}

interface LMSCourse {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
}

interface ClassItem {
  id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  class_type: string;
  scheduled_at: string | null;
  duration_minutes: number | null;
  course_id: string;
  lms_courses: LMSCourse | null;
}

interface Certificate {
  id: string;
  certificate_id: string;
  student_name: string;
  course_title: string;
  issued_at: string;
}

interface Attendance {
  id: string;
  class_id: string;
  status: string;
  attended_at: string;
  classes: {
    title: string;
    class_type: string;
  } | null;
}

const LMSPortal = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchStudentData();
    }
  }, [user]);

  const fetchStudentData = async () => {
    setIsLoading(true);
    try {
      // Fetch student record
      const { data: studentData } = await supabase
        .from("students")
        .select("*")
        .eq("user_id", user?.id)
        .maybeSingle();

      setStudent(studentData);

      // Fetch all classes with course info
      const { data: classesData } = await supabase
        .from("classes")
        .select("*, lms_courses(id, title, description, thumbnail_url)")
        .order("scheduled_at", { ascending: false });

      setClasses(classesData || []);

      // Fetch certificates if student exists
      if (studentData) {
        const { data: certsData } = await supabase
          .from("certificates")
          .select("*")
          .eq("student_id", studentData.id);

        setCertificates(certsData || []);

        // Fetch attendance
        const { data: attendanceData } = await supabase
          .from("attendance")
          .select("*, classes(title, class_type)")
          .eq("student_id", studentData.id);

        setAttendance(attendanceData || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const recordedClasses = classes.filter((c) => c.class_type === "recorded");
  const liveClasses = classes.filter((c) => c.class_type === "live");

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-foreground">Loading your portal...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome to Your Learning Portal</h1>
              {student && (
                <p className="text-muted-foreground">
                  Student ID: <span className="font-mono text-primary">{student.student_id}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <Tabs defaultValue="recorded" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="recorded" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Recorded Sessions
            </TabsTrigger>
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Live Sessions
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Certificates
            </TabsTrigger>
          </TabsList>

          {/* Recorded Sessions */}
          <TabsContent value="recorded">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recordedClasses.length > 0 ? (
                recordedClasses.map((classItem) => (
                  <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <Badge variant="secondary">Recorded</Badge>
                        {classItem.duration_minutes && (
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {classItem.duration_minutes} min
                          </span>
                        )}
                      </div>
                      <CardTitle className="mt-2">{classItem.title}</CardTitle>
                      <CardDescription>
                        {classItem.lms_courses?.title || "General"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {classItem.description || "No description available"}
                      </p>
                      {classItem.video_url ? (
                        <a
                          href={classItem.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                        >
                          <Play className="h-4 w-4" />
                          Watch Now
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-sm">Coming soon</span>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No recorded sessions available yet.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Live Sessions */}
          <TabsContent value="live">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveClasses.length > 0 ? (
                liveClasses.map((classItem) => (
                  <Card key={classItem.id} className="hover:shadow-lg transition-shadow border-primary/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <Badge className="bg-red-500">Live</Badge>
                        {classItem.scheduled_at && (
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(classItem.scheduled_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <CardTitle className="mt-2">{classItem.title}</CardTitle>
                      <CardDescription>
                        {classItem.lms_courses?.title || "General"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {classItem.description || "No description available"}
                      </p>
                      {classItem.scheduled_at && (
                        <p className="text-sm font-medium text-foreground mb-4">
                          {new Date(classItem.scheduled_at).toLocaleString()}
                        </p>
                      )}
                      {classItem.video_url ? (
                        <a
                          href={classItem.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                        >
                          <Play className="h-4 w-4" />
                          Join Live
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-sm">Link will be available before session</span>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No live sessions scheduled yet.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Attendance */}
          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Your Attendance Record</CardTitle>
                <CardDescription>Track your class attendance history</CardDescription>
              </CardHeader>
              <CardContent>
                {attendance.length > 0 ? (
                  <div className="space-y-4">
                    {attendance.map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{record.classes?.title || "Unknown Class"}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(record.attended_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          variant={
                            record.status === "present"
                              ? "default"
                              : record.status === "late"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No attendance records yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates */}
          <TabsContent value="certificates">
            <div className="grid md:grid-cols-2 gap-6">
              {certificates.length > 0 ? (
                certificates.map((cert) => (
                  <Card key={cert.id} className="border-2 border-primary/20">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Award className="h-6 w-6 text-primary" />
                        <CardTitle>{cert.course_title}</CardTitle>
                      </div>
                      <CardDescription>
                        Issued to: {cert.student_name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="text-muted-foreground">Certificate ID:</span>{" "}
                          <span className="font-mono text-primary">{cert.certificate_id}</span>
                        </p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">Issued on:</span>{" "}
                          {new Date(cert.issued_at).toLocaleDateString()}
                        </p>
                        <a
                          href={`/verify-certificate?id=${cert.certificate_id}`}
                          className="inline-flex items-center gap-2 text-primary hover:underline text-sm mt-2"
                        >
                          Verify Certificate
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No certificates earned yet.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Complete courses to earn your certificates!
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LMSPortal;