import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin } from "lucide-react";

export default function CustomerCard({ customer }) {
  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="flex flex-col">
          <CardTitle className="text-xl">{customer.name}</CardTitle>
          <Badge variant="secondary" className="w-fit mt-1">ID: {customer.id}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 opacity-70" />
          <span className="text-muted-foreground">{customer.email}</span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="h-4 w-4 opacity-70 mt-1" />
          <span className="text-muted-foreground">{customer.address}</span>
        </div>
      </CardContent>
    </Card>
  );
} 