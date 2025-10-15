import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface SymptomFormProps {
  onAnalysisComplete: (result: any) => void;
}

export const SymptomForm = ({ onAnalysisComplete }: SymptomFormProps) => {
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!symptoms.trim()) {
      toast.error("Please describe your symptoms");
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-symptoms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ symptoms: symptoms.trim() }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      const result = await response.json();
      onAnalysisComplete({ symptoms, ...result });
      toast.success("Analysis complete");
    } catch (error) {
      console.error("Error analyzing symptoms:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to analyze symptoms"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="p-6 shadow-[var(--shadow-card)]">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="symptoms" className="text-sm font-medium">
            Describe Your Symptoms
          </label>
          <Textarea
            id="symptoms"
            placeholder="E.g., I have a headache, fever, and sore throat for the past two days..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="min-h-[120px] resize-none"
            disabled={isAnalyzing}
          />
        </div>

        <div className="flex items-start gap-2 p-3 bg-accent/50 rounded-md border border-border">
          <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            This tool provides educational information only. Always consult a
            healthcare professional for medical advice, diagnosis, or treatment.
          </p>
        </div>

        <Button
          type="submit"
          disabled={isAnalyzing || !symptoms.trim()}
          className="w-full"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Symptoms"
          )}
        </Button>
      </form>
    </Card>
  );
};