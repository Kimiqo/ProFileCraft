import { useState } from 'react';

const CERTIFICATION_TYPES = [
  'Professional Certification',
  'Technical Certification',
  'Academic Certificate',
  'License',
  'Course Completion',
  'Award'
];

export default function Certifications({ certificationsList, setCertificationsList }) {
  const [showForm, setShowForm] = useState(false);
  const [currentCert, setCurrentCert] = useState({
    name: '',
    type: CERTIFICATION_TYPES[0],
    organization: '',
    issueDate: '',
    expiryDate: '',
    neverExpires: false,
    credentialId: '',
    credentialUrl: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentCert(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'neverExpires' && checked) {
      setCurrentCert(prev => ({ ...prev, expiryDate: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCertificationsList(prev => [...prev, currentCert]);
    setCurrentCert({
      name: '',
      type: CERTIFICATION_TYPES[0],
      organization: '',
      issueDate: '',
      expiryDate: '',
      neverExpires: false,
      credentialId: '',
      credentialUrl: '',
      description: ''
    });
    setShowForm(false);
  };

  const removeCertification = (index) => {
    setCertificationsList(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Certifications & Awards</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-yellow-300 text-black rounded-md hover:bg-yellow-400 transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Certification'}
        </button>
      </div>

      {/* Certifications List */}
      <div className="space-y-4">
        {certificationsList.map((cert, index) => (
          <div key={index} className="bg-slate-700 p-4 rounded-lg relative group">
            <button
              onClick={() => removeCertification(index)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
            >
              ✕
            </button>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-yellow-300">{cert.name}</h4>
                <p className="text-sm text-gray-300">{cert.organization}</p>
                <p className="text-xs text-gray-400">{cert.type}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-300">Issued: {cert.issueDate}</p>
                {!cert.neverExpires && cert.expiryDate && (
                  <p className="text-sm text-gray-300">Expires: {cert.expiryDate}</p>
                )}
              </div>
            </div>
            {cert.description && (
              <p className="text-sm text-gray-300 mt-2">{cert.description}</p>
            )}
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-yellow-300 hover:text-yellow-400 mt-2 inline-block"
              >
                View Credential ↗
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Add Certification Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 bg-slate-800 p-6 rounded-lg">
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={currentCert.name}
              onChange={handleInputChange}
              placeholder="Certification Name"
              className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <select
                name="type"
                value={currentCert.type}
                onChange={handleInputChange}
                className="px-4 py-2 rounded bg-slate-700 text-white"
              >
                {CERTIFICATION_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <input
                type="text"
                name="organization"
                value={currentCert.organization}
                onChange={handleInputChange}
                placeholder="Issuing Organization"
                className="px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="month"
                name="issueDate"
                value={currentCert.issueDate}
                onChange={handleInputChange}
                className="px-4 py-2 rounded bg-slate-700 text-white"
                required
              />
              <input
                type="month"
                name="expiryDate"
                value={currentCert.expiryDate}
                onChange={handleInputChange}
                className="px-4 py-2 rounded bg-slate-700 text-white"
                disabled={currentCert.neverExpires}
                required={!currentCert.neverExpires}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="neverExpires"
                checked={currentCert.neverExpires}
                onChange={handleInputChange}
                className="rounded bg-slate-700"
              />
              <label className="text-sm text-gray-300">This certification does not expire</label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="credentialId"
                value={currentCert.credentialId}
                onChange={handleInputChange}
                placeholder="Credential ID (optional)"
                className="px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
              />
              <input
                type="url"
                name="credentialUrl"
                value={currentCert.credentialUrl}
                onChange={handleInputChange}
                placeholder="Credential URL (optional)"
                className="px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
              />
            </div>

            <textarea
              name="description"
              value={currentCert.description}
              onChange={handleInputChange}
              placeholder="Brief description or key learnings (optional)"
              className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400 resize-none"
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-300 text-black rounded-md hover:bg-yellow-400 transition-colors"
          >
            Save Certification
          </button>
        </form>
      )}
    </div>
  );
}
