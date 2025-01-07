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

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex text-white">
      <section className="w-2/5 min-h-screen border-y-4 border-yellow-300 p-5">
        <div className="flex justify-center gap-2 mb-5">
          <img src="" alt="Logo" />
          <h2 className="text-center text-2xl font-bold">ProFile Craft</h2>
        </div>

        <h3 className="text-lg font-semibold">Personal Details</h3>
        <form className="flex flex-col w-full text-slate-950 gap-3">
          <div className="grid grid-cols-2 grid-rows-2 gap-5">
          </div>
          <textarea placeholder="Write about yourself" value={personalDetails.description}/>
        </form>

        <h3 className="text-lg font-semibold mt-10">Education</h3>
        <button
          onClick={() => setShowEducation(!showEducation)}
          className="p-2 m-3 bg-green-500 text-white rounded-lg hover:bg-green-700"
        >
          {showEducation ? "Hide Education Form" : "Add Education"}
        </button>

        {showEducation && <EducationInfo />}
      </section>

      <section className="w-3/5 min-h-screen border-y-4 border-red-700 bg-slate-50 p-5">
        <p className="text-black text-center">
          Your CV Preview will appear here.
        </p>
      </section>
    </div>
  );
}

const personalInfo = ({type, placeholder, value, onChange}) => {
    return(
        <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
    );
}

const EducationInfo = () => {
  const [formDetails, setFormDetails] = useState({
    course: "",
    uni: "",
    yearStart: "",
    yeadEnd: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Education form details", formDetails);
    alert("Details Saved...");
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
      />
      <input
        type="text"
        name="uni"
        value={formDetails.uni}
        onChange={handleChange}
        placeholder="University"
        required
      />
      <input
        type="text"
        name="yearStart"
        value={formDetails.yearStart}
        onChange={handleChange}
        placeholder="Start Year"
        required
      />
      <input
        type="text"
        name="yearEnd"
        value={formDetails.yearEnd}
        onChange={handleChange}
        placeholder="End Year"
        required
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 mt-3"
      >
        Save Education
      </button>
    </form>
  );
}
