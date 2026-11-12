"use strict";
const form = document.querySelector("#student-survey");
const birthDate = document.querySelector("#birth-date");
const resume = document.querySelector("#resume");
const interest = document.querySelector("#interest");
const result = document.querySelector("#result");
const now = new Date();
birthDate.max = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
interest.addEventListener("input", () => { document.querySelector("#interest-value").value = interest.value; });
resume.addEventListener("change", () => {
  const file = resume.files[0];
  const error = file && file.size > 5 * 1024 * 1024 ? "The resume must not exceed 5 MB." :
    file && !/\.(pdf|docx?|txt)$/i.test(file.name) ? "Choose a PDF, DOC, DOCX or TXT file." : "";
  resume.setCustomValidity(error);
});
form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const rows = [
    ["Full Name", data.get("full_name")], ["Email", data.get("email")],
    ["Password", "Entered; not displayed or saved"], ["Age", data.get("age")],
    ["Date of Birth", data.get("birth_date")], ["Gender", data.get("gender")],
    ["Languages Known", data.getAll("languages").join(", ") || "None selected"],
    ["Country", data.get("country")], ["College Subjects", data.getAll("subjects").join(", ")],
    ["Interest", `${data.get("interest")} / 10`], ["Skills", data.get("skills")],
    ["Resume", resume.files[0]?.name || "Not selected"],
    ["Favorite Color", data.get("favorite_color")], ["Study Time", data.get("study_time") || "Not specified"]
  ];
  const answers = document.querySelector("#answers");
  answers.replaceChildren();
  rows.forEach(([label,value]) => {
    const term = document.createElement("dt"); const detail = document.createElement("dd");
    term.textContent = label; detail.textContent = value;
    answers.append(term,detail);
  });
  result.hidden = false; result.focus();
});
