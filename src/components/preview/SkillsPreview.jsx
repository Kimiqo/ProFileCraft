export default function SkillsPreview({ skillsList }) {
  // Group skills by category
  const groupedSkills = skillsList.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  if (skillsList.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-slate-800 border-b-2 border-yellow-300 pb-2 mb-4">
        Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <div key={category} className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-700">{category}</h3>
            <div className="space-y-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <span className="text-slate-600 font-medium">{skill.name}</span>
                    {skill.description && (
                      <p className="text-sm text-slate-500">{skill.description}</p>
                    )}
                  </div>
                  <div className="flex gap-1 ml-4">
                    {[...Array(skill.proficiency)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-yellow-400"
                      />
                    ))}
                    {[...Array(4 - skill.proficiency)].map((_, i) => (
                      <div
                        key={i + skill.proficiency}
                        className="w-1.5 h-1.5 rounded-full bg-slate-200"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
