import { trainingModules } from "@/lib/training-data";
import ModuleDetailClient from "./module-detail-client";

export function generateStaticParams() {
  return trainingModules.map((m) => ({ moduleId: m.id }));
}

export default function ModuleDetailPage() {
  return <ModuleDetailClient />;
}
