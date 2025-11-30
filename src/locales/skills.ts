import type { Language } from "../contexts/LanguageContext";

export interface SkillCategory {
  category: string;
  skills: string[];
  color: string;
}

export interface SkillsData {
  title: string;
  categories: SkillCategory[];
}

export const skillsData: Record<Language, SkillsData> = {
  en: {
    title: "Technical Skills",
    categories: [
      {
        category: "Languages",
        skills: ["C#", "Ruby", "C++", "Zig", "Go", "Typescript"],
        color: "bg-tn-blue/10 text-tn-blue border-tn-blue/20",
      },
      {
        category: "Frontend & Frameworks",
        skills: [
          "Unity",
          "Clean Architecture",
          "MVP / DDD",
          "Addressable Asset System",
          "IAP",
          "WebGL",
          "Photon",
          "Steam",
          "fingger",
          "React Native",
          "React",
          "Expo",
          "Flutter",
        ],
        color: "bg-tn-cyan/10 text-tn-cyan border-tn-cyan/20",
      },
      {
        category: "Backend & Frameworks",
        skills: [
          "Ruby on Rails",
          "MySQL",
          "PostgreSQL",
          "Q4M",
          "Memcached",
          "Hono",
          "Node.js",
          "Layered Architecture",
          "MVC",
        ],
        color: "bg-tn-green/10 text-tn-green border-tn-green/20",
      },
      {
        category: "Cloud & Infrastructure",
        skills: ["AWS", "GCP"],
        color: "bg-tn-magenta/10 text-tn-magenta border-tn-magenta/20",
      },
      {
        category: "DevOps",
        skills: ["GitHub Actions", "Jenkins"],
        color: "bg-tn-yellow/10 text-tn-yellow border-tn-yellow/20",
      },
      {
        category: "Role",
        skills: ["Tech Lead", "Team Management (2-10 engineers)", "Architect"],
        color: "bg-tn-red/10 text-tn-red border-tn-red/20",
      },
    ],
  },
  ja: {
    title: "技術スキル",
    categories: [
      {
        category: "プログラミング言語",
        skills: ["C#", "Ruby", "C++", "Go", "Typescript"],
        color: "bg-tn-blue/10 text-tn-blue border-tn-blue/20",
      },
      {
        category: "フロントエンド・フレームワーク",
        skills: [
          "Unity",
          "Clean Architecture",
          "MVP / DDD",
          "Addressable Asset System",
          "IAP",
          "WebGL",
          "Photon",
          "Steam",
          "fingger",
          "React Native",
          "React",
          "Expo",
          "Flutter",
        ],
        color: "bg-tn-cyan/10 text-tn-cyan border-tn-cyan/20",
      },
      {
        category: "バックエンド・フレームワーク",
        skills: ["Ruby on Rails", "MySQL", "PostgreSQL", "Memcached", "Hono", "Node.js", "Layered Architecture", "MVC"],
        color: "bg-tn-green/10 text-tn-green border-tn-green/20",
      },
      {
        category: "クラウド・インフラ",
        skills: ["AWS", "GCP"],
        color: "bg-tn-magenta/10 text-tn-magenta border-tn-magenta/20",
      },
      {
        category: "DevOps",
        skills: ["GitHub Actions", "Jenkins"],
        color: "bg-tn-yellow/10 text-tn-yellow border-tn-yellow/20",
      },
      {
        category: "ロール",
        skills: ["テックリード", "チームマネジメント（2 - 10 名）", "アーキテクト"],
        color: "bg-tn-red/10 text-tn-red border-tn-red/20",
      },
    ],
  },
};
