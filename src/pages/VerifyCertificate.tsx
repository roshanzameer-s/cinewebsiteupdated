import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Award, CheckCircle, XCircle, Search } from "lucide-react";

interface Certificate {
  certificate_id: string;
  student_name: string;
  course_title: string;
  issued_at: string;
}

const VerifyCertificate = () => {
  const [searchParams] = useSearchParams();
  const [certificateId, setCertificateId] = useState(searchParams.get("id") || "");
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setCertificateId(id);
      verifyCertificate(id);
    }
  }, [searchParams]);

  const verifyCertificate = async (id?: string) => {
    const searchId = id || certificateId;
    if (!searchId.trim()) return;

    setIsLoading(true);
    setSearched(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("certificates")
        .select("certificate_id, student_name, course_title, issued_at")
        .eq("certificate_id", searchId.trim().toUpperCase())
        .maybeSingle();

      if (fetchError) {
        setError("An error occurred while verifying the certificate.");
        setCertificate(null);
      } else {
        setCertificate(data);
      }
    } catch (err) {
      setError("An error occurred while verifying the certificate.");
      setCertificate(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyCertificate();
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <Award className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Certificate Verification</h1>
          <p className="text-muted-foreground">
            Enter a certificate ID to verify its authenticity
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <Input
                type="text"
                placeholder="Enter Certificate ID (e.g., CERT-2024-00001)"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  "Verifying..."
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Verify
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {searched && !isLoading && (
          <>
            {error ? (
              <Card className="border-destructive">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 text-destructive">
                    <XCircle className="h-8 w-8" />
                    <p>{error}</p>
                  </div>
                </CardContent>
              </Card>
            ) : certificate ? (
              <Card className="border-2 border-green-500">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-green-600">Certificate Verified!</CardTitle>
                      <CardDescription>This is a valid certificate issued by CineSlice</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Certificate ID</p>
                      <p className="font-mono text-primary font-medium">{certificate.certificate_id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Awarded To</p>
                      <p className="font-medium text-foreground">{certificate.student_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Course Completed</p>
                      <p className="font-medium text-foreground">{certificate.course_title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Issue Date</p>
                      <p className="font-medium text-foreground">
                        {new Date(certificate.issued_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-destructive">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <XCircle className="h-8 w-8 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-destructive">Certificate Not Found</p>
                      <p className="text-sm text-muted-foreground">
                        The certificate ID you entered does not exist in our records.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyCertificate;