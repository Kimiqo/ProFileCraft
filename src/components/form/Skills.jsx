import { useState } from 'react';

const SKILL_CATEGORIES = [
  'Technical Skills',
  'Soft Skills',
  'Languages',
  'Tools & Technologies',
  'Certifications',
  'Other'
];

const PROFICIENCY_LEVELS = [
  { label: 'Beginner', value: 1 },
  { label: 'Intermediate', value: 2 },
  { label: 'Advanced', value: 3 },
  { label: 'Expert', value: 4 }
];

export default function Skills({ skillsList, setSkillsList }) {
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [currentSkill, setCurrentSkill] = useState({
    name: '',
    category: SKILL_CATEGORIES[0],
    proficiency: PROFICIENCY_LEVELS[1].value,
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSkill(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSkillsList(prev => [...prev, currentSkill]);
    setCurrentSkill({
      name: '',
      category: SKILL_CATEGORIES[0],
      proficiency: PROFICIENCY_LEVELS[1].value,
      description: ''
    });
    setShowSkillForm(false);
  };

  const removeSkill = (index) => {
    setSkillsList(prev => prev.filter((_, i) => i !== index));
  };

  // Group skills by category
  const groupedSkills = skillsList.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Skills</h3>
        <button
          onClick={() => setShowSkillForm(!showSkillForm)}
          className="px-4 py-2 bg-yellow-300 text-black rounded-md hover:bg-yellow-400 transition-colors"
        >
          {showSkillForm ? 'Cancel' : 'Add Skill'}
        </button>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <div key={category} className="bg-slate-800 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-300 mb-2">{category}</h4>
            <div className="grid grid-cols-1 gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="bg-slate-700 p-3 rounded relative group">
                  <button
                    onClick={() => removeSkill(skillsList.findIndex(s => s === skill))}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">{skill.name}</span>
                    <div className="flex gap-1">
                      {[...Array(skill.proficiency)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full bg-yellow-300"
                        />
                      ))}
                      {[...Array(4 - skill.proficiency)].map((_, i) => (
                        <div
                          key={i + skill.proficiency}
                          className="w-2 h-2 rounded-full bg-slate-500"
                        />
                      ))}
                    </div>
                  </div>
                  {skill.description && (
                    <p className="text-sm text-gray-300 mt-1">{skill.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Form */}
      {showSkillForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 bg-slate-800 p-6 rounded-lg">
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={currentSkill.name}
                onChange={handleInputChange}
                placeholder="Skill name"
                className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <select
                name="category"
                value={currentSkill.category}
                onChange={handleInputChange}
                className="px-4 py-2 rounded bg-slate-700 text-white"
              >
                {SKILL_CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                name="proficiency"
                value={currentSkill.proficiency}
                onChange={handleInputChange}
                className="px-4 py-2 rounded bg-slate-700 text-white"
              >
                {PROFICIENCY_LEVELS.map(level => (
                  <option key={level.label} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <textarea
                name="description"
                value={currentSkill.description}
                onChange={handleInputChange}
                placeholder="Brief description or keywords (optional)"
                className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400 resize-none"
                rows="2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-300 text-black rounded-md hover:bg-yellow-400 transition-colors"
          >
            Add Skill
          </button>
        </form>
      )}
    </div>
  );
}
