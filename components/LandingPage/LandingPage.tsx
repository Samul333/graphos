"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {FiEdit3, FiLink, FiCheckCircle, FiGithub, FiLinkedin, FiCode } from "react-icons/fi";
import BuiltWith from "../BuiltWith/BuiltWith";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      className="w-full"
    >
      <Card className="rounded-3xl shadow-xl hover:shadow-2xl transition-all bg-white/80 backdrop-blur-md border border-indigo-100">
        <CardContent className="flex flex-col items-center text-center gap-6 py-10 px-6">
          <motion.div
            whileHover={{ rotate: -10, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="p-4 rounded-full bg-gradient-to-tr from-indigo-50 to-indigo-100"
          >
            {icon}
          </motion.div>

          <h3 className="text-2xl font-bold text-indigo-800 drop-shadow-sm">{title}</h3>
          <p className="text-indigo-700 text-sm leading-relaxed max-w-xs">{desc}</p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-indigo-300 rounded-full mt-2"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};
export default function LandingPage() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col">
        {/* Navbar */}
        <header className="w-full py-6 px-8 flex justify-between items-center">
          <div className="flex flex-row items-center">
            <img src="/doggo-logo-min.png" className="w-[90px] object-contain" alt="" />
  
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-700 text-transparent bg-clip-text">
              Graphos
            </h1>
          </div>
  
          <div className="flex gap-4">
            <Link href="/sign-up" passHref>
              <Button variant="ghost" className="text-indigo-700 font-medium">
                Sign In
              </Button>
            </Link>
  
            <Link href="/sign-up" passHref>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
                Sign Up
              </Button>
            </Link>
          </div>
        </header>
  
        {/* Hero Section */}
        <main className="flex flex-col items-center mt-20 text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold text-indigo-800 mb-6 max-w-3xl"
          >
            Create beautiful forms. Share instantly. Collect responses effortlessly.
          </motion.h2>
  
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-indigo-700 mb-10 max-w-2xl"
          >
            A simple and powerful way to build forms — with shareable links, realtime submissions, and a delightful builder.
          </motion.p>
  
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="flex gap-4"
          >
            <Link href="/test-builder" className="cursor-pointer" passHref>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-2xl shadow-xl cursor-pointer">
                Try Out the Demo
              </Button>
            </Link>
          </motion.div>
        </main>
  
        {/* Features */}
        <section
          id="features"
          className="mt-24 px-8 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full pb-16"
        >
          <FeatureCard
            icon={<FiEdit3 size={36} className="text-indigo-600" />}
            title="Easy Form Builder"
            desc="Drag & drop or click to build forms in seconds. No coding needed."
          />
  
          <FeatureCard
            icon={<FiLink size={36} className="text-indigo-600" />}
            title="Instant Share Links"
            desc="Share a unique link instantly and let others fill out your form — works on mobile and desktop."
          />
  
          <FeatureCard
            icon={<FiCheckCircle size={36} className="text-indigo-600" />}
            title="Real-Time Responses"
            desc="Track submissions live with clean, exportable data and webhooks for automation."
          />
        </section>
        <BuiltWith/>
        {/* Footer With Socials */}
        <footer className="w-full text-center py-10 text-sm text-indigo-700 flex flex-col items-center gap-4">
  
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/in/samul-shrestha-a10602244/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-900 transition"
            >
              <FiLinkedin size={24} />
            </a>
  
            <a
              href="https://github.com/Samul333"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-900 transition"
            >
              <FiGithub size={24} />
            </a>
  
            <a
              href="https://github.com/Samul333/graphos"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-900 transition"
            >
              <FiCode size={24} />
            </a>
          </div>
  

        </footer>
      </div>
    );
  }