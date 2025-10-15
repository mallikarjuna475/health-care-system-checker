import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { History, Clock } from "lucide-react";
import { format } from "date-fns";

interface Query {
  id: string;
  symptoms: string;
  created_at: string;
}

export const QueryHistory = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("symptom_queries")
        .select("id, symptoms, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      setQueries(data || []);
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 mb-4">
          <History className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Recent Queries</h3>
        </div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </Card>
    );
  }

  if (queries.length === 0) {
    return (
      <Card className="p-6 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 mb-4">
          <History className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Recent Queries</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          No previous queries. Your symptom checks will appear here.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 mb-4">
        <History className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Recent Queries</h3>
      </div>
      <div className="space-y-3">
        {queries.map((query) => (
          <div
            key={query.id}
            className="p-3 border rounded-md hover:bg-accent/50 transition-colors"
          >
            <p className="text-sm line-clamp-2 mb-2">{query.symptoms}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {format(new Date(query.created_at), "MMM d, yyyy 'at' h:mm a")}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};