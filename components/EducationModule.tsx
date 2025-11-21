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
    <div className="space-y-8 pb-20 animate-fade-in">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl shadow-indigo-900/20 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="flex-1 space-y-6">
          <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
             Prevention First
          </div>
          <h3 className="text-3xl md:text-4xl font-bold leading-tight">Nutrition is your first line of defense against Anemia.</h3>
          <p className="opacity-90 text-lg leading-relaxed max-w-2xl">
            Anemia is often caused by iron deficiency. Simple diet changes can make a huge difference in your energy levels and health. Understanding your nutritional needs is the first step towards a healthier life.
          </p>
        </div>
        <div className="text-[8rem] drop-shadow-2xl filter">🍎</div>
      </div>

      <div>
        <h4 className="font-bold text-slate-800 text-2xl mb-6">Daily Health Tips</h4>
        <div className="grid gap-6 md:grid-cols-3">
          {tips.map((tip, idx) => (
            <div key={idx} className={`p-8 rounded-3xl border ${tip.color} flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300 cursor-default shadow-sm`}>
              <div className="text-5xl mb-2">{tip.icon}</div>
              <div>
                <h5 className={`font-bold text-xl ${tip.textColor} mb-2`}>{tip.title}</h5>
                <p className="text-slate-600 leading-relaxed">{tip.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100 mt-8 flex flex-col md:flex-row items-start md:items-center gap-8">
        <div className="text-6xl bg-white w-24 h-24 flex items-center justify-center rounded-full shadow-sm">👶</div>
        <div className="flex-1">
          <h4 className="font-bold text-blue-900 text-xl mb-2">Maternal & Child Health Initiative</h4>
          <p className="text-blue-800/80 text-lg leading-relaxed max-w-4xl">
            Government schemes provide free Iron & Folic Acid supplements (IFA) at local Anganwadi centers. Regular check-ups are essential for early detection and prevention. Ask your ASHA worker today about available support programs.
          </p>
        </div>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-colors whitespace-nowrap">
            Find Center
        </button>
      </div>
    </div>
  );
};

export default EducationModule;