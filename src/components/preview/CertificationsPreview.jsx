export default function CertificationsPreview({ certificationsList }) {
  if (certificationsList.length === 0) return null;

  // Group certifications by type
  const groupedCerts = certificationsList.reduce((acc, cert) => {
    if (!acc[cert.type]) {
      acc[cert.type] = [];
    }
    acc[cert.type].push(cert);
    return acc;
  }, {});

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-slate-800 border-b-2 border-yellow-300 pb-2 mb-4">
        Certifications & Awards
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {Object.entries(groupedCerts).map(([type, certs]) => (
          <div key={type}>
            <h3 className="text-lg font-semibold text-slate-700 mb-3">{type}</h3>
            <div className="space-y-4">
              {certs.map((cert, index) => (
                <div key={index} className="relative pl-4">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-2 h-2 bg-yellow-300 rounded-full"></div>
                  
                  {/* Timeline line */}
                  {index !== certs.length - 1 && (
                    <div className="absolute left-[3px] top-4 w-[2px] h-[calc(100%+1rem)] bg-slate-200"></div>
                  )}

                  <div>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-slate-700 font-medium">
                          {cert.name}
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-yellow-500 hover:text-yellow-600 text-sm"
                            >
                              ↗
                            </a>
                          )}
                        </h4>
                        <p className="text-sm text-slate-600">{cert.organization}</p>
                      </div>
                      <div className="text-right text-sm text-slate-500">
                        <div>Issued: {cert.issueDate}</div>
                        {!cert.neverExpires && cert.expiryDate && (
                          <div>Expires: {cert.expiryDate}</div>
                        )}
                      </div>
                    </div>

                    {cert.description && (
                      <p className="text-sm text-slate-600 mt-1">{cert.description}</p>
                    )}
                    
                    {cert.credentialId && (
                      <p className="text-xs text-slate-500 mt-1">
                        Credential ID: {cert.credentialId}
                      </p>
                    )}
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
