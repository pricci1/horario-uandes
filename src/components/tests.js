import React from "react";

const Tests = ({ courses, testTypes, title }) => (
  <div>
    <h1>{title}</h1>
    <ul>
      {testsReducer(courses, testTypes).map(
        ({ title, formattedDate, time }) => (
          <li key={title}>{`${title} ${formattedDate} ${time}`}</li>
        )
      )}
    </ul>
  </div>
);

const testsReducer = (courses, testTypes) => {
  const tests = [];
  const days = ["lunes", "martes", "miercoles", "jueves", "viernes"];

  courses.forEach((event) => {
    if (testTypes.includes(event["tipo"])) {
      var time;
      days.forEach((day) => {
        if (event[day]) {
          time = event[day];
          return;
        }
      });
      const date = ExcelDateToJSDate(event["inicio"]);
      const formattedDate = `${date.getUTCDate()}/${date.getUTCMonth() + 1}`;
      tests.push({ title: event["titulo"], date, formattedDate, time });
    }
  });
  const orderedTests = orderTestsByDate(tests);
  return orderedTests;
};

// https://stackoverflow.com/a/22352911
function ExcelDateToJSDate(date) {
  return new Date(Math.round((date - 25569) * 86400 * 1000));
}

function orderTestsByDate(tests) {
  return tests.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export default Tests;
