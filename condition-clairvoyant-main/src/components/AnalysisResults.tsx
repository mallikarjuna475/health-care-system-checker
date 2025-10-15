import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Condition {
  name: string;
  likelihood: "high" | "medium" | "low";
  description: string;
}

interface AnalysisResultsProps {
  symptoms: string;
  conditions: Condition[];
  recommendations: string;
  disclaimer: string;
}

export const AnalysisResults = ({
  symptoms,
  conditions,
  recommendations,
  disclaimer,
}: AnalysisResultsProps) => {
  useEffect(() => {
    // Save to database
    const saveQuery = async () => {
      try {
        await supabase.from("symptom_queries").insert([
          {
            symptoms,
            conditions: conditions as any,
            recommendations,
          },
        ]);
      } catch (error) {
        console.error("Error saving query:", error);
      }
    };

    saveQuery();
  }, [symptoms, conditions, recommendations]);

  const getLikelihoodColor = (likelihood: string) => {
    switch (likelihood) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  const getLikelihoodIcon = (likelihood: string) => {
    switch (likelihood) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />;
      case "medium":
        return <Info className="h-4 w-4" />;
      case "low":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <Card className="p-6 shadow-[var(--shadow-card)]">
        <h3 className="text-lg font-semibold mb-3">Your Symptoms</h3>
        <p className="text-muted-foreground">{symptoms}</p>
      </Card>

      {conditions && conditions.length > 0 && (
        <Card className="p-6 shadow-[var(--shadow-card)]">
          <h3 className="text-lg font-semibold mb-4">Possible Conditions</h3>
          <div className="space-y-4">
            {conditions.map((condition, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg space-y-2 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{condition.name}</h4>
                  <Badge
                    variant={getLikelihoodColor(condition.likelihood)}
                    className="flex items-center gap-1"
                  >
                    {getLikelihoodIcon(condition.likelihood)}
                    {condition.likelihood}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {condition.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-6 shadow-[var(--shadow-card)]">
        <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
        <p className="text-muted-foreground whitespace-pre-wrap">
          {recommendations}
        </p>
      </Card>

      <Card className="p-4 bg-accent/30 border-primary/20 shadow-[var(--shadow-card)]">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-sm mb-1">Medical Disclaimer</h4>
            <p className="text-xs text-muted-foreground">{disclaimer}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};