import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tippy";
import "purecss";
import "react-tippy/dist/tippy.css";

const horarioEmpty = {
  lunes: [],
  martes: [],
  miercoles: [],
  jueves: [],
  viernes: [],
  sabado: [],
};

const days = ["lunes", "martes", "miercoles", "jueves", "viernes"];
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
      <table
        className="pure-table pure-table-bordered "
        // border="1"
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <thead>
          <tr>
            <td></td>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
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
      <td scope="row">{rowHeader}</td>
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

  courses.forEach((event) => {
    const eventTypes = ["OLIN", "AYON", "LBON"];
    if (eventTypes.includes(event["tipo"])) {
      placeEventInHorario(event, horario);
    }
  });
  return horario;
};

function placeEventInHorario(event, horario) {
  const days = ["lunes", "martes", "miercoles", "jueves", "viernes"];

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
          teacher: event["profesor"],
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

// Converts 08:30 - 11:30 to [0, 1, 2]
// 8 - 8 = 0, 11 - 9 = 2
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
  const bgColor = {
    OLIN: "green",
    AYON: "yellow",
    LBON: "cyan",
    TUTR: "orange",
  };
  if (typeof events === "object") {
    const courseBlock = events.map((event) => {
      return (
        <Tooltip
          interactive
          html={
            <div>
              <span>{event["nrc"]}</span>
              <br />
              <span>{event["title"]}</span>
              <br />
              <span>{event["type"]}</span>
              <br />
              <span>{event["teacher"]}</span>
            </div>
          }
        >
          <div
            style={{
              backgroundColor: bgColor[event["type"]],
            }}
          >
            {event["nrc"]}
            <br />
            {event["title"].substr(0, 18)}
          </div>
        </Tooltip>
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
