import { useMemo } from "react";
import { useAuth } from "@/auth/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminDashboard = () => {
  const { users } = useAuth();

  const summary = useMemo(() => {
    const total = users.length;
    const admins = users.filter(u => u.role === "admin").length;
    const newest = [...users].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
    return { total, admins, newestEmail: newest?.email || "-" };
  }, [users]);

  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
          <CardHeader><CardTitle>Total Users</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{summary.total}</CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
          <CardHeader><CardTitle>Admins</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{summary.admins}</CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
          <CardHeader><CardTitle>Newest User</CardTitle></CardHeader>
          <CardContent className="text-lg">{summary.newestEmail}</CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
        <CardHeader><CardTitle>Recent Accounts</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.slice(-10).reverse().map(u => (
                <TableRow key={u.id}>
                  <TableCell>{u.email}</TableCell>
                  <TableCell className="capitalize">{u.role}</TableCell>
                  <TableCell>{new Date(u.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">No users yet</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;




