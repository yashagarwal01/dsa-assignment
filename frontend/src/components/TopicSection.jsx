import { useMemo, useState } from "react";
import ProblemItem from "./ProblemItem";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function TopicSection({
  topic,
  problems,
  completed,
  onToggle,
}) {
  const [open, setOpen] = useState(true);

  const completedCount = useMemo(
    () => problems.filter((p) => completed.includes(p._id)).length,
    [problems, completed]
  );

  const progressPercent =
    problems.length === 0
      ? 0
      : Math.round((completedCount / problems.length) * 100);

      console.log(progressPercent)

  return (
    <div className="border rounded-xl p-5 space-y-4 bg-card">
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div>
          <h2 className="text-xl font-semibold">{topic.title}</h2>
          <p className="text-sm text-muted-foreground">
            {completedCount} / {problems.length} completed
          </p>
        </div>

        {open ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </div>

      <Progress
        value={progressPercent}
        className="h-2 bg-muted w-full"
      />


      {/* Problems */}
      {open && (
        <div className="space-y-3 pt-2">
          {problems.map((problem) => (
            <ProblemItem
              key={problem._id}
              problem={problem}
              checked={completed.includes(problem._id)}
              onToggle={() => onToggle(problem._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
