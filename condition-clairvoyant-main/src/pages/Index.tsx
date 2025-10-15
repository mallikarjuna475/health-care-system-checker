import { useState } from "react";
import { SymptomForm } from "@/components/SymptomForm";
import { AnalysisResults } from "@/components/AnalysisResults";
import { QueryHistory } from "@/components/QueryHistory";
import { Activity, Heart, Shield } from "lucide-react";

interface AnalysisResult {
  symptoms: string;
  conditions: any[];
  recommendations: string;
  disclaimer: string;
}

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/20 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-[var(--shadow-card)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <Activity className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">HealthCheck AI</h1>
              <p className="text-xs text-muted-foreground">
                Educational Symptom Analysis
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-3 py-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              AI-Powered Symptom Analysis
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get educational information about your symptoms using advanced AI
              technology. Learn about possible conditions and next steps.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
            <div className="flex items-center gap-3 p-4 bg-card rounded-lg border shadow-[var(--shadow-card)]">
              <Shield className="h-8 w-8 text-secondary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Educational Only</h3>
                <p className="text-xs text-muted-foreground">
                  For learning purposes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-card rounded-lg border shadow-[var(--shadow-card)]">
              <Activity className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">AI-Powered</h3>
                <p className="text-xs text-muted-foreground">
                  Advanced analysis
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-card rounded-lg border shadow-[var(--shadow-card)]">
              <Heart className="h-8 w-8 text-destructive flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Instant Results</h3>
                <p className="text-xs text-muted-foreground">
                  Get insights quickly
                </p>
              </div>
            </div>
          </div>

          {/* Symptom Form */}
          <SymptomForm onAnalysisComplete={setAnalysisResult} />

          {/* Analysis Results */}
          {analysisResult && (
            <AnalysisResults
              symptoms={analysisResult.symptoms}
              conditions={analysisResult.conditions}
              recommendations={analysisResult.recommendations}
              disclaimer={analysisResult.disclaimer}
            />
          )}

          {/* Query History */}
          <QueryHistory />

          {/* Footer Disclaimer */}
          <div className="text-center text-xs text-muted-foreground pt-8 pb-4 border-t">
            <p>
              <strong>Important:</strong> This tool is for educational purposes
              only and does not provide medical advice. Always consult with a
              qualified healthcare professional for diagnosis and treatment.
              In case of emergency, call your local emergency services
              immediately.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;