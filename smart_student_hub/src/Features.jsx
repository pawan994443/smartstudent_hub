import { useState } from "react";
import {
  LayoutGrid,
  ClipboardCheck,
  Users,
  Download,
  BarChart2,
  Link,
} from "lucide-react";
import FeatureModal from "./FeatureModal";
import { useNavigate } from "react-router-dom";

const featuresBottom = [
  {
    icon: <LayoutGrid className="text-blue-600 w-8 h-8" />,
    title: "Dynamic Student Dashboard",
    subtitle:
      "Real-time updates on academic performance, attendance, and activities with intuitive visualizations.",
    tag: "Core Feature",
  },
  {
    icon: <ClipboardCheck className="text-green-500 w-8 h-8" />,
    title: "Activity Tracker",
    subtitle:
      "Upload and validate participation in seminars, conferences, MOOCs, internships, and more.",
    tag: "Popular",
  },
  {
    icon: <Users className="text-yellow-500 w-8 h-8" />,
    title: "Faculty Approval Panel",
    subtitle:
      "Faculty & admin approval system to maintain credibility and verify all uploaded records.",
    tag: "Verified",
  },
  {
    icon: <Download className="text-blue-600 w-8 h-8" />,
    title: "Auto-Generated Portfolio",
    subtitle:
      "Downloadable & shareable verified student portfolio in PDF format or web link.",
    tag: "Essential",
  },
  {
    icon: <BarChart2 className="text-green-500 w-8 h-8" />,
    title: "Analytics & Reporting",
    subtitle:
      "Generate reports for NAAC, AICTE, NIRF accreditation or internal evaluations.",
    tag: "Analytics",
  },
  {
    icon: <Link className="text-yellow-500 w-8 h-8" />,
    title: "Integration Support",
    subtitle:
      "Seamlessly connect with LMS, ERP systems, and digital university platforms.",
    tag: "Enterprise",
  },
];

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setSelectedFeature(null);
    navigate("/login"); 
  }

  return (
    <section className="py-16 bg-gray-50">
     
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold">
          Everything You Need for{" "}
          <span className="text-blue-600">Academic Success</span>
        </h2>
        <p className="text-gray-600 mt-3">
          From tracking achievements to generating verified portfolios, our
          platform provides all the tools students and institutions need for
          complete academic management.
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {featuresBottom.map((feature, i) => (
          <div
            key={i}
            className="bg-white shadow-sm rounded-xl p-6 hover:shadow-lg transition relative cursor-pointer"
            onClick={() => setSelectedFeature(feature)}
          >
            <div className="flex items-center space-x-4">
              {feature.icon}
              <h3 className="text-lg font-semibold">{feature.title}</h3>
            </div>
            <span className="absolute top-4 right-4 text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full font-medium">
              {feature.tag}
            </span>
            <p className="text-gray-600 mt-4 text-sm">{feature.subtitle}</p>
            <span className="text-blue-600 text-sm mt-3 inline-flex items-center">
              Learn more →
            </span>
          </div>
        ))}
      </div>

      
      {selectedFeature && (
        <FeatureModal
          feature={selectedFeature}
          onClose={() => setSelectedFeature(null)}
          onGetStarted={handleGetStarted}
        />
      )}
    </section>
  );
}
