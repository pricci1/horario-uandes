import React, { useState, useEffect } from "react";

const Tests = ({ courses, testTypes, title }) => {
  const [tests, setTests] = useState([]);
  useEffect(() => {
    setTests(testsReducer(courses, testTypes));
  }, [JSON.stringify(courses)]);
  return (
    <div>
      <h1>{title}</h1>
      <table
        class="pure-table pure-table-horizontal"
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <thead>
          <tr>
            <th>Mes</th>
            <th>Día</th>
            <th>Horario</th>
            <th>Ramo</th>
          </tr>
        </thead>
        <tbody>
          {tests.map(({ title, time, date }) => (
            <tr key={`${title}-${date.toISOString()}`}>
              <td>{monthNames[date.getUTCMonth()]}</td>
              <td>{date.getUTCDate()}</td>
              <td>{time}</td>
              <td>{title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

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
      tests.push({ title: event["titulo"], date, time });
    }
  });
  const orderedTests = orderTestsByDate(tests);
  return [...new Set(orderedTests)];
};

// https://stackoverflow.com/a/22352911
function ExcelDateToJSDate(date) {
  return new Date(Math.round((date - 25569) * 86400 * 1000));
}

function orderTestsByDate(tests) {
  return tests.sort((a, b) => a.date.getTime() - b.date.getTime());
}

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default Tests;
