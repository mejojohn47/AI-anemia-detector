import React from 'react';

const EducationModule: React.FC = () => {
  const tips = [
    {
      title: "Iron-Rich Diet",
      color: "bg-emerald-50 border-emerald-100",
      textColor: "text-emerald-800",
      icon: "🥬",
      content: "Include spinach, lentils, red meat, and fortified cereals in your daily meals."
    },
    {
      title: "Vitamin C Boost",
      color: "bg-orange-50 border-orange-100",
      textColor: "text-orange-800",
      icon: "🍊",
      content: "Eat citrus fruits (oranges, lemons) with iron foods to increase absorption by 3x."
    },
    {
      title: "Avoid Tea/Coffee",
      color: "bg-stone-50 border-stone-200",
      textColor: "text-stone-800",
      icon: "☕",
      content: "Avoid drinking tea or coffee with meals as they can block iron absorption."
    }
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-900/20 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4">Prevent Anemia</h3>
          <p className="opacity-90 text-base leading-relaxed max-w-2xl">
            Anemia is often caused by iron deficiency. Simple diet changes can make a huge difference in your energy levels and health. Understanding your nutritional needs is the first step towards a healthier life.
          </p>
        </div>
        <div className="text-6xl">🍎</div>
      </div>

      <div>
        <h4 className="font-bold text-slate-800 text-xl mb-6">Daily Health Tips</h4>
        <div className="grid gap-6 md:grid-cols-3">
          {tips.map((tip, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border ${tip.color} flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300`}>
              <div className="text-4xl mb-2">{tip.icon}</div>
              <div>
                <h5 className={`font-bold text-lg ${tip.textColor} mb-2`}>{tip.title}</h5>
                <p className="text-slate-600 text-sm leading-relaxed">{tip.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 mt-8 flex items-start gap-4">
        <div className="text-3xl">👶</div>
        <div>
          <h4 className="font-bold text-blue-800 text-lg mb-1">For Mothers & Children</h4>
          <p className="text-blue-700 text-sm leading-relaxed">
            Government schemes provide free Iron & Folic Acid supplements (IFA) at local Anganwadi centers. Regular check-ups are essential for early detection and prevention. Ask your ASHA worker today about available support programs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationModule;