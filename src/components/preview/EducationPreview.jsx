export default function EducationPreview({ educationList }) {
  if (educationList.length === 0) return null;

  // Sort education by date (most recent first)
  const sortedEducation = [...educationList].sort((a, b) => {
    const dateA = a.current ? new Date() : new Date(a.endDate);
    const dateB = b.current ? new Date() : new Date(b.endDate);
    return dateB - dateA;
  });

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-slate-800 border-b-2 border-yellow-300 pb-2 mb-4">
        Education
      </h2>

      <div className="space-y-6">
        {sortedEducation.map((edu, index) => (
          <div key={index} className="relative pl-4">
            {/* Timeline dot */}
            <div className="absolute left-0 top-2 w-2 h-2 bg-yellow-300 rounded-full"></div>
            
            {/* Timeline line */}
            {index !== sortedEducation.length - 1 && (
              <div className="absolute left-[3px] top-4 w-[2px] h-[calc(100%+1.5rem)] bg-slate-200"></div>
            )}

            <div>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-lg font-semibold text-slate-700">
                    {edu.school}
                  </h3>
                  <p className="text-slate-600">
                    {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                  </p>
                  <p className="text-sm text-slate-500">{edu.level}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="text-slate-600">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </p>
                  {edu.location && (
                    <p className="text-slate-500">{edu.location}</p>
                  )}
                </div>
              </div>

              {edu.description && (
                <p className="text-slate-600 text-sm mb-2">{edu.description}</p>
              )}

              {edu.achievements && edu.achievements.length > 0 && edu.achievements[0] !== '' && (
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                  {edu.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
