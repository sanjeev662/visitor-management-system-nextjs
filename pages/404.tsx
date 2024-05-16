import Link from "next/link";
import { Card, CardHeader, CardContent } from "@mui/material";

export default function NotFound() {
  return (
    <Card
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1>Sorry Page Not Found</h1>
      <p>Could not find the requested resource</p>
      <Link href="/">Return To Dashboard</Link>
    </Card>
  );
}
