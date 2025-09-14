import { CheckCircle, Circle, Trophy, X, LayoutGrid } from "lucide-react";

export default function FeatureModal({ feature, onClose, onGetStarted }) {
  if (!feature) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-600 p-3 rounded-xl text-white">
            <LayoutGrid size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{feature.title}</h2>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
              {feature.tag}
            </span>
          </div>
        </div>

        
        <p className="text-gray-600 mb-6">{feature.subtitle}</p>

        
        <div className="flex justify-end gap-4 border-t pt-4">
          <button
            onClick={onGetStarted}
            className="px-5 py-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:opacity-90"
          >
            Get Started
          </button>
          
        </div>
      </div>
    </div>
  );
}
