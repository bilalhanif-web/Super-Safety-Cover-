import React from "react";
import { Droplets, Wind, Shield, Truck } from "lucide-react";

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Droplets,
      title: "Water Resistant",
      description: "High-density parachute and taped seams ensure water rolls off quickly during heavy monsoon rains.",
    },
    {
      icon: Wind,
      title: "Dust Protection",
      description: "Keeps fine urban soot, cement particles and sand off paint surfaces and mechanical components.",
    },
    {
      icon: Shield,
      title: "Durable Materials",
      description: "UV-stabilized tear-resistant fabrics with double-needle reinforcement built for long daily use.",
    },
    {
      icon: Truck,
      title: "Delivery Across Pakistan",
      description: "Swift door-to-door courier dispatch with Cash on Delivery to all cities, towns and villages.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#121212] border-b border-[#242424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#66743A] mb-1.5 block">
            Quality You Can Rely On
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F4F3ED] tracking-tight">
            Why Choose Super Safety Cover?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-[#1C1C1C] rounded-lg p-6 border border-[#2A2A2A] flex flex-col justify-between transition-colors hover:border-[#66743A]/60"
              >
                <div>
                  <div className="w-11 h-11 rounded-lg bg-[#262626] border border-[#333333] flex items-center justify-center text-[#66743A] mb-4">
                    <Icon className="w-5 h-5 stroke-[2] text-[#66743A]" />
                  </div>
                  <h3 className="text-base font-bold text-[#F4F3ED] mb-2">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F4F3ED]/75 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
