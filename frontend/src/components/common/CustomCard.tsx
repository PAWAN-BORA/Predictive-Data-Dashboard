import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export type CustomCardProps = {
  label:string,
  value:string,
  icon:LucideIcon,
  iconBg:string,
  iconColor:string,
}
export default function CustomCard({label, value, icon:Icon, iconBg, iconColor}:CustomCardProps){
  return(
    <Card
      key={label}
      className="rounded-2xl border border-gray-100 shadow-sm"
    >
      <CardContent className="flex flex-col gap-3 p-5">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={1.8} />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
