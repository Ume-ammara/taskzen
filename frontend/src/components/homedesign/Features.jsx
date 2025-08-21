import React from "react";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Organize Tasks Effortlessly",
    description:
      "Create, manage, and prioritize your tasks in one simple interface — no more chaos.",
  },
  {
    title: "Real-time Collaboration",
    description:
      "Work together with your team and see updates instantly, without refreshing.",
  },
  {
    title: "Stay on Track",
    description:
      "Get reminders and smart suggestions to keep you productive all day long.",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-background w-screen dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-foreground dark:text-white">
          Why Choose Taskzen?
        </h2>
        <p className="text-muted-foreground dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Taskzen gives you all the tools you need to organize your work, collaborate with your team, and stay productive.
        </p>

        <div className="grid  gap-10 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-secondary dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2text-foreground dark:text-white">
                {feature.title}
              </h3>
              <p className="text-muted-foreground dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
