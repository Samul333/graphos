"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiPrisma,
  SiPostgresql,
} from "react-icons/si";
import { Cpu } from "lucide-react";

export default function BuiltWith() {
  const tech = [
    {
      name: "Next.js",
      icon: <SiNextdotjs size={28} />,
      desc: "Fast, scalable full-stack React framework powering the app.",
    },
    {
      name: "shadcn/ui",
      icon: <Cpu size={26} />,
      desc: "Beautiful, modern UI components for a polished product.",
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss size={28} className="text-sky-500" />,
      desc: "Utility-first styling that keeps development fast & clean.",
    },
    {
      name: "Prisma",
      icon: <SiPrisma size={28} className="text-teal-600" />,
      desc: "Type-safe ORM for seamless database access.",
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql size={28} className="text-blue-600" />,
      desc: "Reliable and powerful relational database for all form data.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full mt-5 px-6">
      <h2 className="text-3xl font-bold text-indigo-800 text-center mb-10">
        Built With
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {tech.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="rounded-2xl shadow-md hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="text-indigo-700">{t.icon}</div>

                <h3 className="font-semibold text-indigo-900 text-lg">
                  {t.name}
                </h3>

                <p className="text-indigo-600 text-sm">{t.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
