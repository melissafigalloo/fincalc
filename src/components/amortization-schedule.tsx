"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import type { ScheduleRow } from "@/lib/mortgage";

function totals(schedule: ScheduleRow[]) {
  return schedule.reduce(
    (acc, row) => ({
      payment: acc.payment + row.payment,
      interest: acc.interest + row.interest,
      principal: acc.principal + row.principal,
    }),
    { payment: 0, interest: 0, principal: 0 },
  );
}

export function AmortizationSchedule({
  schedule,
  periodType,
  className,
}: {
  schedule: ScheduleRow[];
  periodType: string;
  className?: string;
}) {
  if (schedule.length === 0) {
    return null;
  }

  const total = totals(schedule);
  const endingBalance = schedule[schedule.length - 1].balance;

  return (
    <Card className={cn("gap-0", className)}>
      <CardHeader>
        <CardTitle>Amortisation Schedule</CardTitle>
        <CardDescription>
          Every {periodType}, broken down by interest and principal.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-y-auto rounded-md border">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow className="hover:bg-transparent">
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Payment Amount</TableHead>
                <TableHead className="text-right">Interest</TableHead>
                <TableHead className="text-right">Principal</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((row) => (
                <TableRow key={row.period}>
                  <TableCell className="font-medium">#{row.period}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatCurrency(row.payment)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatCurrency(row.interest)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatCurrency(row.principal)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatCurrency(row.balance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="hover:bg-transparent">
                <TableCell>Total</TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCurrency(total.payment)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCurrency(total.interest)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCurrency(total.principal)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCurrency(endingBalance)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
