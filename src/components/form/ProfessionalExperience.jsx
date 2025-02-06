import { useState } from 'react';

export default function ProfessionalExperience({ experienceList, setExperienceList }) {
  const [showExperience, setShowExperience] = useState(false);
  const [currentExperience, setCurrentExperience] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    responsibilities: [''],
    achievements: ['']
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentExperience(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // If current is checked, clear end date
    if (name === 'current' && checked) {
      setCurrentExperience(prev => ({ ...prev, endDate: '' }));
    }
  };

  const handleListChange = (index, field, value) => {
    setCurrentExperience(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addListItem = (field) => {
    setCurrentExperience(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeListItem = (field, index) => {
    setCurrentExperience(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setExperienceList(prev => [...prev, currentExperience]);
    setCurrentExperience({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: [''],
      achievements: ['']
    });
    setShowExperience(false);
  };

  const removeExperience = (index) => {
    setExperienceList(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Professional Experience</h3>
        <button
          onClick={() => setShowExperience(!showExperience)}
          className="px-4 py-2 bg-yellow-300 text-black rounded-md hover:bg-yellow-400 transition-colors"
        >
          {showExperience ? 'Cancel' : 'Add Experience'}
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experienceList.map((exp, index) => (
          <div key={index} className="bg-slate-700 p-4 rounded-lg relative group">
            <button
              onClick={() => removeExperience(index)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
            >
              ✕
            </button>
            <h4 className="font-medium text-yellow-300">{exp.position}</h4>
            <p className="text-sm text-gray-300">{exp.company} • {exp.location}</p>
            <p className="text-xs text-gray-400">
              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
            </p>
          </div>
        ))}
      </div>

      {/* Add Experience Form */}
      {showExperience && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 bg-slate-800 p-6 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="company"
              value={currentExperience.company}
              onChange={handleInputChange}
              placeholder="Company Name"
              className="px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
              required
            />
            <input
              type="text"
              name="position"
              value={currentExperience.position}
              onChange={handleInputChange}
              placeholder="Position"
              className="px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
              required
            />
            <input
              type="text"
              name="location"
              value={currentExperience.location}
              onChange={handleInputChange}
              placeholder="Location"
              className="px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
              required
            />
            <div className="flex gap-4">
              <input
                type="month"
                name="startDate"
                value={currentExperience.startDate}
                onChange={handleInputChange}
                className="flex-1 px-4 py-2 rounded bg-slate-700 text-white"
                required
              />
              <input
                type="month"
                name="endDate"
                value={currentExperience.endDate}
                onChange={handleInputChange}
                className="flex-1 px-4 py-2 rounded bg-slate-700 text-white"
                disabled={currentExperience.current}
                required={!currentExperience.current}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="current"
              checked={currentExperience.current}
              onChange={handleInputChange}
              className="rounded bg-slate-700"
            />
            <label className="text-sm text-gray-300">I currently work here</label>
          </div>

          {/* Responsibilities */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Key Responsibilities</label>
            {currentExperience.responsibilities.map((resp, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) => handleListChange(index, 'responsibilities', e.target.value)}
                  placeholder="Add responsibility"
                  className="flex-1 px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => removeListItem('responsibilities', index)}
                  className="text-red-500 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addListItem('responsibilities')}
              className="text-sm text-yellow-300 hover:text-yellow-400"
            >
              + Add Responsibility
            </button>
          </div>

          {/* Achievements */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Key Achievements</label>
            {currentExperience.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => handleListChange(index, 'achievements', e.target.value)}
                  placeholder="Add achievement"
                  className="flex-1 px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => removeListItem('achievements', index)}
                  className="text-red-500 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addListItem('achievements')}
              className="text-sm text-yellow-300 hover:text-yellow-400"
            >
              + Add Achievement
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-300 text-black rounded-md hover:bg-yellow-400 transition-colors"
          >
            Save Experience
          </button>
        </form>
      )}
    </div>
  );
}
