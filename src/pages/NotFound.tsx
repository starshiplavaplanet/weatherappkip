
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CloudOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="glass-card p-12 text-center max-w-md animate-fade-up">
        <CloudOff className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-4xl font-light mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Weather forecast not found</p>
        <Button asChild className="rounded-full px-6">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
