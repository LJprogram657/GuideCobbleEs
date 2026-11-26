export interface TypeStyle {
  bg: string;
  text: string;
  border: string;
  glow: string;
  accent: string;
}

export const TYPE_STYLES: Record<string, TypeStyle> = {
  "Fuego": {
    bg: "bg-orange-500/15",
    text: "text-orange-400",
    border: "border-orange-500/30",
    glow: "rgba(249, 115, 22, 0.18)",
    accent: "#f97316"
  },
  "Agua": {
    bg: "bg-blue-500/15",
    text: "text-blue-400",
    border: "border-blue-500/30",
    glow: "rgba(59, 130, 246, 0.18)",
    accent: "#3b82f6"
  },
  "Planta": {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    glow: "rgba(16, 185, 129, 0.18)",
    accent: "#10b981"
  },
  "Eléctrico": {
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    border: "border-amber-500/30",
    glow: "rgba(245, 158, 11, 0.18)",
    accent: "#f59e0b"
  },
  "Hielo": {
    bg: "bg-cyan-500/15",
    text: "text-cyan-400",
    border: "border-cyan-500/30",
    glow: "rgba(6, 182, 212, 0.18)",
    accent: "#06b6d4"
  },
  "Lucha": {
    bg: "bg-red-600/15",
    text: "text-red-400",
    border: "border-red-600/30",
    glow: "rgba(220, 38, 38, 0.18)",
    accent: "#dc2626"
  },
  "Veneno": {
    bg: "bg-purple-500/15",
    text: "text-purple-400",
    border: "border-purple-500/30",
    glow: "rgba(168, 85, 247, 0.18)",
    accent: "#a855f7"
  },
  "Tierra": {
    bg: "bg-yellow-600/15",
    text: "text-yellow-400",
    border: "border-yellow-600/30",
    glow: "rgba(202, 138, 4, 0.18)",
    accent: "#ca8a04"
  },
  "Volador": {
    bg: "bg-sky-500/15",
    text: "text-sky-400",
    border: "border-sky-500/30",
    glow: "rgba(14, 165, 233, 0.18)",
    accent: "#0ea5e9"
  },
  "Psíquico": {
    bg: "bg-pink-500/15",
    text: "text-pink-400",
    border: "border-pink-500/30",
    glow: "rgba(236, 72, 153, 0.18)",
    accent: "#ec4899"
  },
  "Bicho": {
    bg: "bg-lime-500/15",
    text: "text-lime-400",
    border: "border-lime-500/30",
    glow: "rgba(132, 204, 22, 0.18)",
    accent: "#84cc16"
  },
  "Roca": {
    bg: "bg-stone-500/15",
    text: "text-stone-300",
    border: "border-stone-500/30",
    glow: "rgba(120, 113, 108, 0.18)",
    accent: "#78716c"
  },
  "Fantasma": {
    bg: "bg-violet-600/15",
    text: "text-violet-400",
    border: "border-violet-600/30",
    glow: "rgba(124, 58, 237, 0.18)",
    accent: "#7c3aed"
  },
  "Dragón": {
    bg: "bg-indigo-600/15",
    text: "text-indigo-400",
    border: "border-indigo-600/30",
    glow: "rgba(79, 70, 229, 0.18)",
    accent: "#4f46e5"
  },
  "Acero": {
    bg: "bg-slate-400/15",
    text: "text-slate-300",
    border: "border-slate-400/30",
    glow: "rgba(148, 163, 184, 0.18)",
    accent: "#94a3b8"
  },
  "Siniestro": {
    bg: "bg-zinc-700/20",
    text: "text-zinc-300",
    border: "border-zinc-600/30",
    glow: "rgba(82, 82, 91, 0.2)",
    accent: "#71717a"
  },
  "Hada": {
    bg: "bg-rose-500/15",
    text: "text-rose-400",
    border: "border-rose-500/30",
    glow: "rgba(244, 63, 94, 0.18)",
    accent: "#f43f5e"
  },
  "Normal": {
    bg: "bg-zinc-500/15",
    text: "text-zinc-300",
    border: "border-zinc-500/30",
    glow: "rgba(113, 113, 122, 0.15)",
    accent: "#a1a1aa"
  },
};

export function getTypeBadge(type: string) {
  return TYPE_STYLES[type] || {
    bg: "bg-zinc-700/20",
    text: "text-zinc-300",
    border: "border-zinc-700/40",
    glow: "rgba(100, 116, 139, 0.15)",
    accent: "#64748b"
  };
}
