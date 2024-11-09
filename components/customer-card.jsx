'use client'

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import { EnvelopeClosedIcon, PersonIcon } from "@radix-ui/react-icons"

export function CustomerCardJsx({ customer = {
  id: "C12345",
  name: "Jane Doe",
  email: "jane.doe@example.com",
  address: "123 Main St, Anytown, AN 12345"
} }) {
  return (
    (<Card
      className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{customer.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              <PersonIcon className="h-4 w-4 inline mr-1" />
              {customer.id}
            </p>
          </div>
          <Badge variant="secondary">Customer</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2 text-sm">
          <EnvelopeClosedIcon className="h-4 w-4 opacity-70" />
          <span className="text-muted-foreground">{customer.email}</span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="h-4 w-4 opacity-70 mt-1" />
          <span className="text-muted-foreground">{customer.address}</span>
        </div>
      </CardContent>
    </Card>)
  );
}