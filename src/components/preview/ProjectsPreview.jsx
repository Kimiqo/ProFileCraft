export default function ProjectsPreview({ projectsList }) {
  if (projectsList.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-slate-800 border-b-2 border-yellow-300 pb-2 mb-4">
        Projects
      </h2>

      <div className="space-y-6">
        {projectsList.map((project, index) => (
          <div key={index} className="relative pl-4">
            {/* Timeline dot */}
            <div className="absolute left-0 top-2 w-2 h-2 bg-yellow-300 rounded-full"></div>
            
            {/* Timeline line */}
            {index !== projectsList.length - 1 && (
              <div className="absolute left-[3px] top-4 w-[2px] h-[calc(100%+1.5rem)] bg-slate-200"></div>
            )}

            <div>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-lg font-semibold text-slate-700">
                    {project.title}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-sm text-yellow-500 hover:text-yellow-600"
                      >
                        ↗
                      </a>
                    )}
                  </h3>
                  <p className="text-sm text-slate-500">{project.type}</p>
                </div>
                <span className="text-sm text-slate-500">
                  {project.startDate} - {project.current ? 'Present' : project.endDate}
                </span>
              </div>

              <p className="text-slate-600 mb-2">{project.description}</p>

              {project.highlights.length > 0 && project.highlights[0] !== '' && (
                <ul className="list-disc list-inside text-sm text-slate-600 mb-2 space-y-1">
                  {project.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              )}

              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
