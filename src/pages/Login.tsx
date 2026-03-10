import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center p-6 space-y-8 bg-cover bg-center"
      style={{ backgroundImage: "url(/auth-bg.jpg)" }}
    >
      <div className="absolute inset-0 bg-background/70" />
      <div className="relative text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">Sentiment AI</h1>
        <p className="text-muted-foreground max-w-xl">
          Advanced sentiment analysis for your reviews
        </p>
      </div>
      <Card className="relative w-full max-w-xl bg-card/80 backdrop-blur border-border/50">
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-semibold">Sign in</h2>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground">
            No account? <Link className="text-primary underline" to="/signup">Sign up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;


