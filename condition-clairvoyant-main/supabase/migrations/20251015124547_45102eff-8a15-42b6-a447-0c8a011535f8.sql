-- Create symptom_queries table for storing symptom checker history
CREATE TABLE public.symptom_queries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  symptoms TEXT NOT NULL,
  conditions JSONB,
  recommendations TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.symptom_queries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (for demo/educational purposes)
CREATE POLICY "Anyone can insert symptom queries"
ON public.symptom_queries
FOR INSERT
WITH CHECK (true);

-- Create policy to allow anyone to view all queries (for demo purposes)
CREATE POLICY "Anyone can view symptom queries"
ON public.symptom_queries
FOR SELECT
USING (true);

-- Create index for faster queries by date
CREATE INDEX idx_symptom_queries_created_at ON public.symptom_queries(created_at DESC);