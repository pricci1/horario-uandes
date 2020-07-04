import React from "react";

const Exams = ({ courses }) => (
  <div>
    <h1>Fecha Exámenes</h1>
    <ul>
      {examsReducer(courses).map(({ title, date, time }) => (
        <li key={title}>{`${title} ${date} ${time}`}</li>
      ))}
    </ul>
  </div>
);

const examsReducer = (courses) => {
  const exams = [];
  const days = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

  courses.forEach((event) => {
    if (event["tipo"] === "EXON") {
      var time;
      days.forEach((day) => {
        if (event[day]) {
          time = event[day];
          return;
        }
      });
      exams.push({ title: event["titulo"], date: event["fecha_inicio"], time });
    }
  });
  return exams;
};

export default Exams;
