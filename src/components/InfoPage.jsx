import { useState } from "react";

export default function InfoPage() {
  const [showEducation, setShowEducation] = useState(false);

  const [personalDetails, setPersonalDetails] = useState({
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

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex text-white">
      {/* Left Section */}
      <section className="w-2/5 min-h-screen border-y-4 border-yellow-300 p-5">
        <div className="flex justify-center gap-2 mb-5">
          <img src="" alt="Logo" />
          <h2 className="text-center text-2xl font-bold">ProFile Craft</h2>
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
        <h3 className="text-lg font-semibold mt-10">Education</h3>
        <button
          onClick={() => setShowEducation(!showEducation)}
          className="p-2 m-3 bg-green-500 text-white rounded-lg hover:bg-green-700"
        >
          {showEducation ? "Hide Education Form" : "Add Education"}
        </button>

        {showEducation && <EducationInfo />}
      </section>

      {/* Preview Section */}
      <section className="w-3/5 min-h-screen border-y-4 border-red-700 bg-slate-50 p-5">
        <p className="text-black text-center font-bold text-lg mb-5">
          Your CV Preview
        </p>
        {Object.entries(personalDetails).map(([key, value]) => (
          <p key={key} className="text-black text-left">
            {/* <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "} */}
            {value || "Not Provided"}
          </p>
        ))}
      </section>
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
const EducationInfo = () => {
  const [formDetails, setFormDetails] = useState({
    course: "",
    uni: "",
    yearStart: "",
    yearEnd: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Education form details", formDetails);
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
