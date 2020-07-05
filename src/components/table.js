import React, { useEffect, useState } from "react";

const horarioEmpty = {
  lunes: [],
  martes: [],
  miercoles: [],
  jueves: [],
  viernes: [],
  sabado: [],
};

const days = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
const hours = [
  "8:30 - 9:20",
  "9:30 - 10:20",
  "10:30 - 11:20",
  "11:30 - 12:20",
  "12:30 - 13:20",
  "13:30 - 14:20",
  "14:30 - 15:20",
  "15:30 - 16:20",
  "16:30 - 17:20",
  "17:30 - 18:20",
  "18:30 - 19:20",
  "19:30 - 20:20",
];

const Table = ({ courses }) => {
  const [horario, setHorario] = useState(horarioEmpty);
  useEffect(() => {
    var newHorario = horarioBuilder(courses);
    setHorario(newHorario);
  }, [JSON.stringify(courses)]);

  return (
    (horario.lunes && (
      <table border="1" style={{ tableLayout: "fixed", border: "1" }}>
        <thead>
          <tr>
            <td></td>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
            <th>Sábado</th>
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <TableRow
              horario={horario}
              rowHeader={hour}
              hourIndex={hours.indexOf(hour)}
            />
          ))}
        </tbody>
      </table>
    )) ||
    ""
  );
};

const TableRow = ({ horario, rowHeader, hourIndex }) => {
  return (
    <tr>
      <th scope="row">{rowHeader}</th>
      {days.map((day) => (
        <td>{getEventsTitles(horario[day][hourIndex])}</td>
      ))}
    </tr>
  );
};

const horarioBuilder = (courses) => {
  const horario = {
    lunes: [],
    martes: [],
    miercoles: [],
    jueves: [],
    viernes: [],
    sabado: [],
  };
  const days = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

  courses.forEach((event) => {
    if (
      event["tipo"] === "OLIN" ||
      event["tipo"] === "AYON" ||
      event["tipo"] === "LBON"
    ) {
      for (const day in days) {
        const dayName = days[day];
        if (event.hasOwnProperty(dayName)) {
          const hour = event[dayName];
          const hourBlockIds = getHourBlocksIds(hour);
          hourBlockIds.forEach((id) => {
            const eventObj = {
              title: event["titulo"],
              type: event["tipo"],
              nrc: event["nrc"],
            };
            if (typeof horario[dayName][id] === "object") {
              horario[dayName][id].push(eventObj);
            } else {
              horario[dayName][id] = [eventObj];
            }
          });
        }
      }
    }
  });
  return horario;
};

function getHourBlocksIds(hourStr) {
  const [start, end] = hourStr.split("-");
  const startInt = parseInt(start.split(":")[0]) - 8;
  const endInt = parseInt(end.split(":")[0]) - 9;
  const spawnIds = [];
  for (let id = startInt; id <= endInt; id++) {
    spawnIds.push(id);
  }
  return spawnIds;
}

function getEventsTitles(events) {
  const bgColor = { OLIN: "green", AYON: "yellow", LBON: "cyan" };
  if (typeof events === "object") {
    const courseBlock = events.map((event) => {
      return (
        <div style={{ backgroundColor: bgColor[event["type"]] }}>
          {event["nrc"]}
          <br />
          {event["title"]}
        </div>
      );
    });
    if (courseBlock.length > 1) {
      return (
        <div style={{ borderColor: "red", borderStyle: "solid" }}>
          {courseBlock}
        </div>
      );
    }
    return courseBlock;
  }
  return;
}

export { Table };
