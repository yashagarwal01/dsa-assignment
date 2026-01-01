import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Youtube, BookOpen, Code } from "lucide-react";

export default function ProblemItem({ problem, checked, onToggle }) {
  const levelColor =
    problem.level === "Easy"
      ? "bg-green-100 text-green-700 border-green-300"
      : problem.level === "Medium"
      ? "bg-yellow-100 text-yellow-700 border-yellow-300"
      : "bg-red-100 text-red-700 border-red-300";

  return (
    <div className="flex flex-col gap-3 border rounded-lg p-4 hover:bg-muted/50 transition">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={checked}
            onCheckedChange={onToggle}
            className="mt-1"
          />

          <div>
            <p className="font-medium text-base">{problem.title}</p>
          </div>
        </div>

        <Badge className={`border ${levelColor}`}>
          {problem.level}
        </Badge>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-2 ml-7">
        <Button
          variant="outline"
          size="sm"
          asChild
        >
          <a
            href={problem.youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube className="w-4 h-4 mr-1" />
            Video
          </a>
        </Button>

        <Button
          variant="outline"
          size="sm"
          asChild
        >
          <a
            href={problem.practiceLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Code className="w-4 h-4 mr-1" />
            Practice
          </a>
        </Button>

        <Button
          variant="outline"
          size="sm"
          asChild
        >
          <a
            href={problem.articleLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookOpen className="w-4 h-4 mr-1" />
            Article
          </a>
        </Button>
      </div>
    </div>
  );
}
