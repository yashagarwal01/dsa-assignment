import { useEffect, useState } from "react";
import API from "@/api/api";
import TopicSection from "@/components/TopicSection";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Dashboard({ onLogout }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/dsa").then((res) => setData(res.data));
  }, []);

  const toggleProgress = async (problemId) => {
    const res = await API.post("/dsa/progress", { problemId });
    setData({ ...data, completed: res.data });
  };

  const logout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  if (!data) {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">DSA Sheet</h1>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>

      {data.topics.map((topic) => (
        <TopicSection
          key={topic._id}
          topic={topic}
          problems={data.problems.filter(
            (p) => p.topicId === topic._id
          )}
          completed={data.completed}
          onToggle={toggleProgress}
        />
      ))}
    </div>
  );
}
