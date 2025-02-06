import { useState } from 'react';

const EDUCATION_LEVELS = [
  'High School',
  'Associate Degree',
  "Bachelor's Degree",
  "Master's Degree",
  'Ph.D.',
  'Certification',
  'Other'
];

export default function Education({ educationList, setEducationList }) {
  const [showForm, setShowForm] = useState(false);
  const [currentEducation, setCurrentEducation] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    level: EDUCATION_LEVELS[2],
    startDate: '',
    endDate: '',
    current: false,
    location: '',
    description: '',
    achievements: ['']
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentEducation(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'current' && checked) {
      setCurrentEducation(prev => ({ ...prev, endDate: '' }));
    }
  };

  const handleAchievements = (index, value) => {
    setCurrentEducation(prev => ({
      ...prev,
      achievements: prev.achievements.map((item, i) => i === index ? value : item)
    }));
  };

  const addAchievement = () => {
    setCurrentEducation(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }));
  };

  const removeAchievement = (index) => {
    setCurrentEducation(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out empty achievements
    const cleanedEducation = {
      ...currentEducation,
      achievements: currentEducation.achievements.filter(a => a.trim() !== '')
    };
    setEducationList(prev => [...prev, cleanedEducation]);
    setCurrentEducation({
      school: '',
      degree: '',
      fieldOfStudy: '',
      level: EDUCATION_LEVELS[2],
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      description: '',
      achievements: ['']
    });
    setShowForm(false);
  };

  const removeEducation = (index) => {
    setEducationList(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Education</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-yellow-300 text-black rounded-md hover:bg-yellow-400 transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Education'}
        </button>
      </div>

      {/* Education List */}
      <div className="space-y-4">
        {educationList.map((edu, index) => (
          <div key={index} className="bg-slate-700 p-4 rounded-lg relative group">
            <button
              onClick={() => removeEducation(index)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
            >
              ✕
            </button>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-yellow-300">{edu.school}</h4>
                <p className="text-sm text-gray-300">
                  {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                </p>
                <p className="text-xs text-gray-400">{edu.level}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-300">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </p>
                {edu.location && (
                  <p className="text-xs text-gray-400">{edu.location}</p>
                )}
              </div>
            </div>
            {edu.description && (
              <p className="text-sm text-gray-300 mt-2">{edu.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Add Education Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 bg-slate-800 p-6 rounded-lg">
          <div className="space-y-4">
            <input
              type="text"
              name="school"
              value={currentEducation.school}
              onChange={handleInputChange}
              placeholder="School/Institution Name"
              className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <select
                name="level"
                value={currentEducation.level}
                onChange={handleInputChange}
                className="px-4 py-2 rounded bg-slate-700 text-white"
              >
                {EDUCATION_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              <input
                type="text"
                name="location"
                value={currentEducation.location}
                onChange={handleInputChange}
                placeholder="Location (optional)"
                className="px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="degree"
                value={currentEducation.degree}
                onChange={handleInputChange}
                placeholder="Degree/Certificate Name"
                className="px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
                required
              />

              <input
                type="text"
                name="fieldOfStudy"
                value={currentEducation.fieldOfStudy}
                onChange={handleInputChange}
                placeholder="Field of Study"
                className="px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="month"
                name="startDate"
                value={currentEducation.startDate}
                onChange={handleInputChange}
                className="px-4 py-2 rounded bg-slate-700 text-white"
                required
              />
              <input
                type="month"
                name="endDate"
                value={currentEducation.endDate}
                onChange={handleInputChange}
                className="px-4 py-2 rounded bg-slate-700 text-white"
                disabled={currentEducation.current}
                required={!currentEducation.current}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="current"
                checked={currentEducation.current}
                onChange={handleInputChange}
                className="rounded bg-slate-700"
              />
              <label className="text-sm text-gray-300">I am currently studying here</label>
            </div>

            <textarea
              name="description"
              value={currentEducation.description}
              onChange={handleInputChange}
              placeholder="Description or summary (optional)"
              className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400 resize-none"
              rows="3"
            />

            {/* Achievements */}
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Achievements/Activities</label>
              {currentEducation.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => handleAchievements(index, e.target.value)}
                    placeholder="Add achievement"
                    className="flex-1 px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => removeAchievement(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addAchievement}
                className="text-sm text-yellow-300 hover:text-yellow-400"
              >
                + Add Achievement
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-300 text-black rounded-md hover:bg-yellow-400 transition-colors"
          >
            Save Education
          </button>
        </form>
      )}
    </div>
  );
}
