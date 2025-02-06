export default function ExperiencePreview({ experienceList }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-slate-800 border-b-2 border-yellow-300 pb-2 mb-4">
        Professional Experience
      </h2>
      
      <div className="space-y-6">
        {experienceList.map((exp, index) => (
          <div key={index} className="relative pl-4">
            {/* Timeline dot */}
            <div className="absolute left-0 top-2 w-2 h-2 bg-yellow-300 rounded-full"></div>
            
            {/* Timeline line */}
            {index !== experienceList.length - 1 && (
              <div className="absolute left-[3px] top-4 w-[2px] h-[calc(100%+1rem)] bg-slate-200"></div>
            )}
            
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-semibold text-slate-700">{exp.position}</h3>
                <span className="text-sm text-slate-500">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              
              <div className="text-sm text-slate-600 mb-2">
                {exp.company} • {exp.location}
              </div>
              
              {exp.responsibilities.length > 0 && exp.responsibilities[0] !== '' && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-slate-700 mb-1">Key Responsibilities:</h4>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {exp.achievements.length > 0 && exp.achievements[0] !== '' && (
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-1">Key Achievements:</h4>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
