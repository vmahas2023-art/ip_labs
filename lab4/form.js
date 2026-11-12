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
  const error = file && file.size > 5 * 1024 * 1024 ? "Розмір резюме не повинен перевищувати 5 МБ." :
    file && !/\.(pdf|docx?|txt)$/i.test(file.name) ? "Оберіть файл у форматі PDF, DOC, DOCX або TXT." : "";
  resume.setCustomValidity(error);
});
form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const rows = [
    ["Прізвище, ім’я та по батькові", data.get("full_name")], ["Електронна пошта", data.get("email")],
    ["Пароль", "Введено; не відображається та не зберігається"], ["Вік", data.get("age")],
    ["Дата народження", data.get("birth_date")], ["Стать", data.get("gender")],
    ["Знання мов", data.getAll("languages").join(", ") || "Не обрано"],
    ["Країна", data.get("country")], ["Навчальні дисципліни", data.getAll("subjects").join(", ")],
    ["Інтерес до інформатики", `${data.get("interest")} / 10`], ["Навички", data.get("skills")],
    ["Резюме", resume.files[0]?.name || "Не обрано"],
    ["Улюблений колір", data.get("favorite_color")], ["Час для навчання", data.get("study_time") || "Не вказано"]
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

// Повідомлення вбудованої перевірки українською мовою.
const clearError = event => {
  if (event.target.type === "radio") {
    form.querySelectorAll('input[type="radio"]').forEach(field => {
      if (field.name === event.target.name) field.setCustomValidity("");
    });
    return;
  }
  if (event.target !== resume && typeof event.target.setCustomValidity === "function") {
    event.target.setCustomValidity("");
  }
};
form.addEventListener("input", clearError);
form.addEventListener("change", clearError);
form.addEventListener("invalid", event => {
  const field = event.target;
  const validity = field.validity;
  if (validity.customError) return;
  let message = "Перевірте правильність введених даних.";
  if (validity.valueMissing) message = "Заповніть це поле або оберіть значення.";
  else if (validity.typeMismatch) message = "Введіть коректну адресу електронної пошти.";
  else if (validity.rangeUnderflow) message = `Значення має бути не меншим за ${field.min}.`;
  else if (validity.rangeOverflow) message = field.type === "date" ? "Дата народження не може бути в майбутньому." : `Значення має бути не більшим за ${field.max}.`;
  else if (validity.tooShort) message = `Введіть щонайменше ${field.minLength} символів.`;
  else if (validity.tooLong) message = `Введіть не більше ${field.maxLength} символів.`;
  else if (validity.stepMismatch) message = "Введіть ціле число.";
  field.setCustomValidity(message);
}, true);
