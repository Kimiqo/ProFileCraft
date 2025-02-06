import { useState } from 'react';

const PROJECT_TYPES = [
  'Personal Project',
  'Professional Project',
  'Open Source',
  'Academic Project',
  'Hackathon',
  'Research Project'
];

export default function Projects({ projectsList, setProjectsList }) {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    title: '',
    type: PROJECT_TYPES[0],
    description: '',
    technologies: [],
    link: '',
    startDate: '',
    endDate: '',
    current: false,
    highlights: ['']
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentProject(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'current' && checked) {
      setCurrentProject(prev => ({ ...prev, endDate: '' }));
    }
  };

  const handleTechnologies = (e) => {
    const techs = e.target.value.split(',').map(tech => tech.trim());
    setCurrentProject(prev => ({
      ...prev,
      technologies: techs
    }));
  };

  const handleHighlights = (index, value) => {
    setCurrentProject(prev => ({
      ...prev,
      highlights: prev.highlights.map((item, i) => i === index ? value : item)
    }));
  };

  const addHighlight = () => {
    setCurrentProject(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  const removeHighlight = (index) => {
    setCurrentProject(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out empty highlights
    const cleanedProject = {
      ...currentProject,
      highlights: currentProject.highlights.filter(h => h.trim() !== ''),
      technologies: currentProject.technologies.filter(t => t.trim() !== '')
    };
    setProjectsList(prev => [...prev, cleanedProject]);
    setCurrentProject({
      title: '',
      type: PROJECT_TYPES[0],
      description: '',
      technologies: [],
      link: '',
      startDate: '',
      endDate: '',
      current: false,
      highlights: ['']
    });
    setShowProjectForm(false);
  };

  const removeProject = (index) => {
    setProjectsList(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Projects</h3>
        <button
          onClick={() => setShowProjectForm(!showProjectForm)}
          className="px-4 py-2 bg-yellow-300 text-black rounded-md hover:bg-yellow-400 transition-colors"
        >
          {showProjectForm ? 'Cancel' : 'Add Project'}
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projectsList.map((project, index) => (
          <div key={index} className="bg-slate-700 p-4 rounded-lg relative group">
            <button
              onClick={() => removeProject(index)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
            >
              ✕
            </button>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-yellow-300">{project.title}</h4>
                <p className="text-sm text-gray-300">{project.type}</p>
              </div>
              <span className="text-xs text-gray-400">
                {project.startDate} - {project.current ? 'Present' : project.endDate}
              </span>
            </div>
            <p className="text-sm text-gray-300 mt-2">{project.description}</p>
            {project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-slate-600 rounded-full text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-yellow-300 hover:text-yellow-400 mt-2 inline-block"
              >
                View Project ↗
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Add Project Form */}
      {showProjectForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 bg-slate-800 p-6 rounded-lg">
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              value={currentProject.title}
              onChange={handleInputChange}
              placeholder="Project Title"
              className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <select
                name="type"
                value={currentProject.type}
                onChange={handleInputChange}
                className="px-4 py-2 rounded bg-slate-700 text-white"
              >
                {PROJECT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <input
                type="url"
                name="link"
                value={currentProject.link}
                onChange={handleInputChange}
                placeholder="Project URL (optional)"
                className="px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="month"
                name="startDate"
                value={currentProject.startDate}
                onChange={handleInputChange}
                className="px-4 py-2 rounded bg-slate-700 text-white"
                required
              />
              <input
                type="month"
                name="endDate"
                value={currentProject.endDate}
                onChange={handleInputChange}
                className="px-4 py-2 rounded bg-slate-700 text-white"
                disabled={currentProject.current}
                required={!currentProject.current}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="current"
                checked={currentProject.current}
                onChange={handleInputChange}
                className="rounded bg-slate-700"
              />
              <label className="text-sm text-gray-300">This is an ongoing project</label>
            </div>

            <textarea
              name="description"
              value={currentProject.description}
              onChange={handleInputChange}
              placeholder="Project Description"
              className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400 resize-none"
              rows="3"
              required
            />

            <input
              type="text"
              value={currentProject.technologies.join(', ')}
              onChange={handleTechnologies}
              placeholder="Technologies used (comma-separated)"
              className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
            />

            {/* Project Highlights */}
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Key Highlights</label>
              {currentProject.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleHighlights(index, e.target.value)}
                    placeholder="Add highlight"
                    className="flex-1 px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addHighlight}
                className="text-sm text-yellow-300 hover:text-yellow-400"
              >
                + Add Highlight
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-300 text-black rounded-md hover:bg-yellow-400 transition-colors"
          >
            Save Project
          </button>
        </form>
      )}
    </div>
  );
}
