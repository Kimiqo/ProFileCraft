import { useRef } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import ProfessionalExperience from "./form/ProfessionalExperience";
import ExperiencePreview from "./preview/ExperiencePreview";
import Skills from "./form/Skills";
import SkillsPreview from "./preview/SkillsPreview";
import Projects from "./form/Projects";
import ProjectsPreview from "./preview/ProjectsPreview";
import Certifications from "./form/Certifications";
import CertificationsPreview from "./preview/CertificationsPreview";
import Education from "./form/Education";
import EducationPreview from "./preview/EducationPreview";
import DownloadButton from "./DownloadButton";

export default function InfoPage() {
  const previewRef = useRef(null);
  
  // Use local storage for all state
  const [experienceList, setExperienceList] = useLocalStorage('experienceList', []);
  const [skillsList, setSkillsList] = useLocalStorage('skillsList', []);
  const [projectsList, setProjectsList] = useLocalStorage('projectsList', []);
  const [certificationsList, setCertificationsList] = useLocalStorage('certificationsList', []);
  const [educationList, setEducationList] = useLocalStorage('educationList', []);
  const [personalDetails, setPersonalDetails] = useLocalStorage('personalDetails', {
    name: "",
    job: "",
    telephone: "",
    email: "",
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setPersonalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleRemoveEducation(index) {
    setEducationList((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex text-white">
      {/* Left Section */}
      <section className="w-2/5 min-h-screen border-y-4 border-yellow-300 p-5">
        <div className="flex justify-center gap-2 mb-5">
          <img src="" alt="Logo" />
          <h2 className="text-center text-2xl font-bold">ProFile Kraft</h2>
        </div>

        {/* Personal Details Form */}
        <h3 className="text-lg font-semibold">Personal Details</h3>
        <form className="flex flex-col w-full text-slate-950 gap-3">
          <div className="grid grid-cols-2 grid-rows-2 gap-5">
            <PersonalInfo
              type="text"
              name="name"
              placeholder="Fullname"
              value={personalDetails.name}
              onChange={handleChange}
            />
            <PersonalInfo
              type="text"
              name="job"
              placeholder="Job Description"
              value={personalDetails.job}
              onChange={handleChange}
            />
            <PersonalInfo
              type="tel"
              name="telephone"
              placeholder="Telephone no."
              value={personalDetails.telephone}
              onChange={handleChange}
            />
            <PersonalInfo
              type="email"
              name="email"
              placeholder="Email"
              value={personalDetails.email}
              onChange={handleChange}
            />
          </div>
          <textarea
            placeholder="Write about yourself"
            name="description"
            value={personalDetails.description}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
        </form>

        {/* Education Section */}
        <Education
          educationList={educationList}
          setEducationList={setEducationList}
        />

        {/* Professional Experience Section */}
        <ProfessionalExperience
          experienceList={experienceList}
          setExperienceList={setExperienceList}
        />

        {/* Skills Section */}
        <Skills
          skillsList={skillsList}
          setSkillsList={setSkillsList}
        />

        {/* Projects Section */}
        <Projects
          projectsList={projectsList}
          setProjectsList={setProjectsList}
        />

        {/* Certifications Section */}
        <Certifications
          certificationsList={certificationsList}
          setCertificationsList={setCertificationsList}
        />


      </section>

      {/* Preview Section */}
      <section ref={previewRef} className="w-3/5 min-h-screen border-y-4 border-yellow-300 bg-white p-8 shadow-lg overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              {personalDetails.name || 'Your Name'}
            </h1>
            <h2 className="text-xl text-slate-600 mb-4">
              {personalDetails.job || 'Your Title'}
            </h2>
            <div className="flex justify-center gap-4 text-sm text-slate-600">
              {personalDetails.email && (
                <span className="flex items-center gap-1">
                  📧 {personalDetails.email}
                </span>
              )}
              {personalDetails.telephone && (
                <span className="flex items-center gap-1">
                  📱 {personalDetails.telephone}
                </span>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {personalDetails.description && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 border-b-2 border-yellow-300 pb-2 mb-4">
                Professional Summary
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {personalDetails.description}
              </p>
            </div>
          )}

          {/* Experience Section */}
          {experienceList.length > 0 && (
            <ExperiencePreview experienceList={experienceList} />
          )}

          {/* Skills Section */}
          {skillsList.length > 0 && (
            <SkillsPreview skillsList={skillsList} />
          )}

          {/* Projects Section */}
          {projectsList.length > 0 && (
            <ProjectsPreview projectsList={projectsList} />
          )}

          {/* Certifications Section */}
          {certificationsList.length > 0 && (
            <CertificationsPreview certificationsList={certificationsList} />
          )}

          {/* Education Section */}
          {educationList.length > 0 && (
            <EducationPreview educationList={educationList} />
          )}
        </div>
      </section>
      <div className="fixed bottom-8 right-8 flex gap-4">
        <button
          onClick={() => {
            // Clear all data from local storage
            localStorage.clear();
            // Reset all state
            setExperienceList([]);
            setSkillsList([]);
            setProjectsList([]);
            setCertificationsList([]);
            setEducationList([]);
            setPersonalDetails({
              name: "",
              job: "",
              telephone: "",
              email: "",
              description: "",
            });
          }}
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 
            transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Reset
        </button>
        <DownloadButton previewRef={previewRef} />
      </div>
    </div>
  );
}

// Personal Info Input Component
const PersonalInfo = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="p-2 border border-gray-300 rounded"
    />
  );
};

// Education Info Component
const EducationInfo = ({ setEducationList, educationList }) => {
  const [formDetails, setFormDetails] = useState({
    course: "",
    uni: "",
    yearStart: "",
    yearEnd: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    setEducationList([...educationList, formDetails]);
    setFormDetails({ course: "", uni: "", yearStart: "", yearEnd: "" });
    alert("Education details saved!");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-60 text-slate-950 gap-3"
    >
      <input
        type="text"
        name="course"
        value={formDetails.course}
        onChange={handleChange}
        placeholder="Course Name"
        required
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="uni"
        value={formDetails.uni}
        onChange={handleChange}
        placeholder="University"
        required
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="yearStart"
        value={formDetails.yearStart}
        onChange={handleChange}
        placeholder="Start Year"
        required
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="yearEnd"
        value={formDetails.yearEnd}
        onChange={handleChange}
        placeholder="End Year"
        required
        className="p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 mt-3"
      >
        Save Education
      </button>
    </form>
  );
};
