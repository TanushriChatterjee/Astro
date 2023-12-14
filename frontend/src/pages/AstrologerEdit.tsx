import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/AstrologerForm.css";
import {
  useUpdateAstrologerMutation,
  useGetAstrologerQuery,
} from "../services/astrologers";
import "./css/AstrologerForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AstrologerEditForm: React.FC = () => {
  const { id } = useParams();
  console.log(id);
  const { data: astrologer, error } = useGetAstrologerQuery(id ?? "");
  const [updateAstrologer, { isLoading }] = useUpdateAstrologerMutation();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [isLanguagesDropdownOpen, setIsLanguagesDropdownOpen] = useState(false);
  const [isSpecialitiesDropdownOpen, setIsSpecialitiesDropdownOpen] =
    useState(false);

  const navigate = useNavigate();

  const languagesDropdownRef = useRef<HTMLDivElement>(null);
  const specialtiesDropdownRef = useRef<HTMLDivElement>(null);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isGenderValid, setIsGenderValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [nameErrorMessage, setNameErrorMessage] = useState<string>("");
  const [genderErrorMessage, setGenderErrorMessage] = useState<string>("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");

  const languageOptions = [
    "Assamese",
    "Bengali",
    "Bodo",
    "Dogri",
    "English",
    "Gujrati",
    "Hindi",
    "Kannada",
    "Kashmiri",
    "Konkani",
    "Maithili",
    "Malayalam",
    "Manipuri",
    "Marathi",
    "Nepali",
    "Odia",
    "Punjabi",
    "Santali",
    "Sindhi",
    "Tamil",
    "Telegu",
    "Urdu",
  ];
  const specialtyOptions = [
    "Astrology",
    "Numerology",
    "Palmistry",
    "Tarot",
    "Vastu",
    "Vedic",
  ];

  useEffect(() => {
    if (astrologer) {
      console.log("astrologer data:", astrologer);
      setName(astrologer?.name || "");
      setGender(astrologer?.gender || "");
      setEmail(astrologer?.email || "");
      setLanguages(astrologer?.languages || []);
      setSpecialties(astrologer?.specialties || []);
    }
  }, [astrologer]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const languagesDropdown = languagesDropdownRef.current;
      const specialtiesDropdown = specialtiesDropdownRef.current;

      if (
        languagesDropdown &&
        !languagesDropdown.contains(event.target as Node) &&
        specialtiesDropdown &&
        !specialtiesDropdown.contains(event.target as Node)
      ) {
        // Clicked outside both dropdowns, close them
        setIsLanguagesDropdownOpen(false);
        setIsSpecialitiesDropdownOpen(false);
      }
    };

    // Add the event listener
    window.addEventListener("click", handleOutsideClick);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleLanguagesDropdownClick = () => {
    // Close specialties dropdown when languages dropdown is clicked
    setIsSpecialitiesDropdownOpen(false);
    setIsLanguagesDropdownOpen(!isLanguagesDropdownOpen);
  };

  const handleSpecialtiesDropdownClick = () => {
    // Close languages dropdown when specialties dropdown is clicked
    setIsLanguagesDropdownOpen(false);
    setIsSpecialitiesDropdownOpen(!isSpecialitiesDropdownOpen);
  };

  const handleLanguageChange = (option: string) => {
    const updatedLanguages = languages.includes(option)
      ? languages.filter((lang) => lang !== option)
      : [...languages, option];
    setLanguages(updatedLanguages);
  };

  const handleSpecialtyChange = (option: string) => {
    const updatedSpecialties = specialties.includes(option)
      ? specialties.filter((spec) => spec !== option)
      : [...specialties, option];
    setSpecialties(updatedSpecialties);
  };

  const handleNameChange = (value: string) => {
    let errorMessage = "";

    // Modify the input value to capitalize the first letter of each word
    const formattedValue = value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Clear error if input is empty
    if (formattedValue === "") {
      setIsNameValid(true);
      errorMessage = "";
    } else {
      // Validation for name: Only alphabets, minimum length 3, capitalize first letter, and allow only single spaces between names
      const regex = /^[A-Z][a-zA-Z]*([ ]{1}[a-zA-Z]+)*$/;

      if (/^\s/.test(formattedValue)) {
        errorMessage = "Name should not start with a space";
      } else if (!regex.test(formattedValue)) {
        errorMessage = "Only alphabets are allowed";
      } else if (formattedValue.length < 3) {
        errorMessage = "Name should be at least 3 characters long";
      } else if (!/^[A-Z]/.test(formattedValue)) {
        errorMessage = "First letter of the name should be capitalized";
      }

      setIsNameValid(errorMessage === ""); // Set validity based on the error message
    }

    setName(formattedValue);
    setNameErrorMessage(errorMessage);
  };

  const handleGenderChange = (value: string) => {
    let errorMessage = "";

    // Modify the input value to capitalize the first letter of each word
    const formattedValue = value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Clear error if input is empty
    if (formattedValue === "") {
      setIsGenderValid(true);
      errorMessage = "";
    } else {
      // Validation for name: Only alphabets, minimum length 3, capitalize first letter, and allow only single spaces between names
      const regex = /^(male|female)$/i;

      if (/^\s/.test(formattedValue)) {
        errorMessage = "Gender should not start with a space";
      } else if (!regex.test(formattedValue)) {
        errorMessage = "Invalid gender";
      }

      setIsGenderValid(errorMessage === ""); // Set validity based on the error message
    }

    setGender(formattedValue);
    setGenderErrorMessage(errorMessage);
  };

  const handleEmailChange = async (value: string) => {
    let errorMessage = "";

    // Validation for email: Use a regular expression for a simple email validation
    const emailRegex = /^[\w.%+-]+@gmail\.com$/i;
    const isValidEmail = emailRegex.test(value);

    if (value.trim() === "") {
      setIsEmailValid(true);
      errorMessage = "";
    } else if (!isValidEmail) {
      errorMessage = "Invalid email format";
    } else {
      try {
        // Fetch all astrologers from the API
        const response = await axios.get(
          "http://localhost:5000/api/astrologers"
        );
        const astrologers = response.data;

        // Check if the entered email already exists among astrologers
        const emailExists = astrologers.some(
          (astrologer: { email: string }) => astrologer.email === value
        );
        if (emailExists) {
          errorMessage = "Duplicate email. Please choose a unique email.";
        }
      } catch (error) {
        console.error(error);
      }
    }

    setIsEmailValid(errorMessage === ""); // Set validity based on the error message
    setEmail(value);
    setEmailErrorMessage(errorMessage);
  };

  const handleUpdateAstrologer = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate that at least one field is not empty
    const isAnyFieldNotEmpty =
      name.trim() !== "" &&
      gender.trim() !== "" &&
      email.trim() !== "" &&
      languages.length > 0 &&
      specialties.length > 0;

    if (isAnyFieldNotEmpty) {
      // Additional validation for specific fields (name, gender, email)
      const isFormValid = isNameValid && isGenderValid && isEmailValid;

      if (isFormValid) {
        try {
          const result = await updateAstrologer({
            id: id || "",
            data: { name, gender, email, languages, specialties },
          });

          console.log("result:", result);

          toast.success("Astrologer updated successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });

          setTimeout(() => {
            navigate("/astrologers");
          }, 3000);
        } catch (error) {
          toast.error("Failed to update astrologer. Please try again.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          console.error("Update failed:", error);
        }
      }
    } else {
      // Show toast error message when all fields are empty
      toast.error("Please fill all the field.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="astrologer-form-container">
        <h2 style={{fontWeight: '900'}}>EDIT ASTROLOGER</h2>
        <form className="astrologer-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </div>
          <div className="error-container">
            {!isNameValid && (
              <span className="error-message">{nameErrorMessage}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <input
              type="text"
              id="gender"
              value={gender}
              onChange={(e) => handleGenderChange(e.target.value)}
            />
          </div>
          <div className="error-container">
            {!isGenderValid && (
              <span className="error-message">{genderErrorMessage}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
          </div>
          <div className="error-container">
            {!isEmailValid && (
              <span className="error-message">{emailErrorMessage}</span>
            )}
          </div>

          <div className="drop">
            <div className="form-group">
              <label htmlFor="languages">Languages:</label>
              <div className="dropdown" ref={languagesDropdownRef}>
                <button
                  type="button"
                  className="dropdown-trigger"
                  onClick={handleLanguagesDropdownClick}
                >
                  Select Languages
                </button>
                {isLanguagesDropdownOpen && (
                  <div className="checkbox-group">
                    {languageOptions.map((option) => (
                      <div key={option} className="checkbox-option">
                        <input
                          type="checkbox"
                          value={option}
                          checked={languages.includes(option)}
                          onChange={() => handleLanguageChange(option)}
                        />
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="specialties">Specialties:</label>
              <div className="dropdown" ref={specialtiesDropdownRef}>
                <button
                  type="button"
                  className="dropdown-trigger"
                  onClick={handleSpecialtiesDropdownClick}
                >
                  Select Specialities
                </button>
                {isSpecialitiesDropdownOpen && (
                  <div className="checkbox-group">
                    {specialtyOptions.map((option) => (
                      <div key={option} className="checkbox-option">
                        <input
                          type="checkbox"
                          value={option}
                          checked={specialties.includes(option)}
                          onChange={() => handleSpecialtyChange(option)}
                        />
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="submit-button"
            onClick={handleUpdateAstrologer}
          >
            Update Astrologer
          </button>
        </form>
      </div>
    </>
  );
};

export default AstrologerEditForm;
