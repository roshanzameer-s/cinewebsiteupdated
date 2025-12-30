-- Create students table for LMS
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  student_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sequence for student ID generation
CREATE SEQUENCE public.student_id_seq START 1;

-- Function to generate student ID like CS2024001
CREATE OR REPLACE FUNCTION public.generate_student_id()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_id TEXT;
  year_part TEXT;
  seq_part TEXT;
BEGIN
  year_part := EXTRACT(YEAR FROM NOW())::TEXT;
  seq_part := LPAD(nextval('student_id_seq')::TEXT, 3, '0');
  new_id := 'CS' || year_part || seq_part;
  RETURN new_id;
END;
$$;

-- Create LMS courses table
CREATE TABLE public.lms_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create classes table (recorded and live sessions)
CREATE TABLE public.classes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.lms_courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  class_type TEXT NOT NULL DEFAULT 'recorded' CHECK (class_type IN ('recorded', 'live')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create courses_enrolled table
CREATE TABLE public.courses_enrolled (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.lms_courses(id) ON DELETE CASCADE NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  progress INTEGER DEFAULT 0,
  UNIQUE(student_id, course_id)
);

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE NOT NULL,
  attended_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late')),
  UNIQUE(student_id, class_id)
);

-- Create certificates table
CREATE TABLE public.certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_id TEXT NOT NULL UNIQUE,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.lms_courses(id) ON DELETE CASCADE NOT NULL,
  issued_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  student_name TEXT NOT NULL,
  course_title TEXT NOT NULL
);

-- Create sequence for certificate ID
CREATE SEQUENCE public.certificate_id_seq START 1;

-- Function to generate certificate ID
CREATE OR REPLACE FUNCTION public.generate_certificate_id()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_id TEXT;
  year_part TEXT;
  seq_part TEXT;
BEGIN
  year_part := EXTRACT(YEAR FROM NOW())::TEXT;
  seq_part := LPAD(nextval('certificate_id_seq')::TEXT, 5, '0');
  new_id := 'CERT-' || year_part || '-' || seq_part;
  RETURN new_id;
END;
$$;

-- Trigger to auto-generate student_id
CREATE OR REPLACE FUNCTION public.handle_new_student()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.student_id := generate_student_id();
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_student_created
  BEFORE INSERT ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_student();

-- Trigger to auto-generate certificate_id
CREATE OR REPLACE FUNCTION public.handle_new_certificate()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.certificate_id := generate_certificate_id();
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_certificate_created
  BEFORE INSERT ON public.certificates
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_certificate();

-- Auto-create student record when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user_student()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.students (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_student
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_student();

-- Enable RLS on all tables
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses_enrolled ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for students
CREATE POLICY "Users can view their own student record"
ON public.students FOR SELECT
USING (auth.uid() = user_id);

-- RLS Policies for lms_courses (public read)
CREATE POLICY "Anyone can view courses"
ON public.lms_courses FOR SELECT
USING (true);

CREATE POLICY "Admins can manage courses"
ON public.lms_courses FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for classes (public read)
CREATE POLICY "Anyone can view classes"
ON public.classes FOR SELECT
USING (true);

CREATE POLICY "Admins can manage classes"
ON public.classes FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for courses_enrolled
CREATE POLICY "Students can view their own enrollments"
ON public.courses_enrolled FOR SELECT
USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage enrollments"
ON public.courses_enrolled FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for attendance
CREATE POLICY "Students can view their own attendance"
ON public.attendance FOR SELECT
USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage attendance"
ON public.attendance FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for certificates
CREATE POLICY "Students can view their own certificates"
ON public.certificates FOR SELECT
USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Anyone can verify certificates by ID"
ON public.certificates FOR SELECT
USING (true);

CREATE POLICY "Admins can manage certificates"
ON public.certificates FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));