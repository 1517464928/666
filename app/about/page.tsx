import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import PersonalExperience from "@/components/PersonalExperience";
import { readFileSync } from "fs";
import { join } from "path";

export const metadata = {
  title: "关于我 - 张攀岳",
  description: "张攀岳的个人经历与成长轨迹",
};

export default function AboutPage() {
  let initialData: Record<string, unknown> | null = null;
  try {
    const raw = readFileSync(join(process.cwd(), "public", "data.json"), "utf-8");
    initialData = JSON.parse(raw);
  } catch {}

  return (
    <main>
      <ErrorBoundary>
        <PersonalExperience initialData={initialData} />
      </ErrorBoundary>
    </main>
  );
}
