import { Loader2 } from "lucide-react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-9999 bg-black/30 flex flex-col items-center justify-center gap-3 backdrop-blur-sm pointer-events-none">
      <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      <p className="text-white text-sm opacity-80">Loading...</p>
    </div>
  );
}
