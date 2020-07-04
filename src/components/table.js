import React, { useEffect, useReducer, useState } from "react";

const horarioEmpty = {
  lunes: [],
  martes: [],
  miercoles: [],
  jueves: [],
  viernes: [],
  sabado: [],
};

const Table = ({ courses }) => {
  //   const [horario, dispatchHorario] = useReducer(horarioBuilder, horarioEmpty);
  const [horario, setHorario] = useState(horarioEmpty);
  useEffect(() => {
    // dispatchHorario(courses);
    var newHorario = horarioBuilder(courses);
    setHorario(newHorario);
    console.log(horario);
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
          <tr>
            <th scope="row">8:30 - 9:20</th>
            <td>{getEventsTitles(horario["lunes"][0])}</td>
            <td>{getEventsTitles(horario["martes"][0])}</td>
            <td>{getEventsTitles(horario["miercoles"][0])}</td>
            <td>{getEventsTitles(horario["jueves"][0])}</td>
            <td>{getEventsTitles(horario["viernes"][0])}</td>
            <td>{getEventsTitles(horario["sabado"][0])}</td>
          </tr>
          <tr>
            <th scope="row">9:30 - 10:20</th>
            <td>{getEventsTitles(horario["lunes"][1])}</td>
            <td>{getEventsTitles(horario["martes"][1])}</td>
            <td>{getEventsTitles(horario["miercoles"][1])}</td>
            <td>{getEventsTitles(horario["jueves"][1])}</td>
            <td>{getEventsTitles(horario["viernes"][1])}</td>
            <td>{getEventsTitles(horario["sabado"][1])}</td>
          </tr>
          <tr>
            <th scope="row">10:30 - 11:20</th>
            <td>{getEventsTitles(horario["lunes"][2])}</td>
            <td>{getEventsTitles(horario["martes"][2])}</td>
            <td>{getEventsTitles(horario["miercoles"][2])}</td>
            <td>{getEventsTitles(horario["jueves"][2])}</td>
            <td>{getEventsTitles(horario["viernes"][2])}</td>
            <td>{getEventsTitles(horario["sabado"][2])}</td>
          </tr>
          <tr>
            <th scope="row">11:30 - 12:20</th>
            <td>{getEventsTitles(horario["lunes"][3])}</td>
            <td>{getEventsTitles(horario["martes"][3])}</td>
            <td>{getEventsTitles(horario["miercoles"][3])}</td>
            <td>{getEventsTitles(horario["jueves"][3])}</td>
            <td>{getEventsTitles(horario["viernes"][3])}</td>
            <td>{getEventsTitles(horario["sabado"][3])}</td>
          </tr>
          <tr>
            <th scope="row">12:30 - 13:20</th>
            <td>{getEventsTitles(horario["lunes"][4])}</td>
            <td>{getEventsTitles(horario["martes"][4])}</td>
            <td>{getEventsTitles(horario["miercoles"][4])}</td>
            <td>{getEventsTitles(horario["jueves"][4])}</td>
            <td>{getEventsTitles(horario["viernes"][4])}</td>
            <td>{getEventsTitles(horario["sabado"][4])}</td>
          </tr>
          <tr>
            <th scope="row">13:30 - 14:20</th>
            <td>{getEventsTitles(horario["lunes"][5])}</td>
            <td>{getEventsTitles(horario["martes"][5])}</td>
            <td>{getEventsTitles(horario["miercoles"][5])}</td>
            <td>{getEventsTitles(horario["jueves"][5])}</td>
            <td>{getEventsTitles(horario["viernes"][5])}</td>
            <td>{getEventsTitles(horario["sabado"][5])}</td>
          </tr>
          <tr>
            <th scope="row">14:30 - 15:20</th>
            <td>{getEventsTitles(horario["lunes"][6])}</td>
            <td>{getEventsTitles(horario["martes"][6])}</td>
            <td>{getEventsTitles(horario["miercoles"][6])}</td>
            <td>{getEventsTitles(horario["jueves"][6])}</td>
            <td>{getEventsTitles(horario["viernes"][6])}</td>
            <td>{getEventsTitles(horario["sabado"][6])}</td>
          </tr>
          <tr>
            <th scope="row">15:30 - 16:20</th>
            <td>{getEventsTitles(horario["lunes"][7])}</td>
            <td>{getEventsTitles(horario["martes"][7])}</td>
            <td>{getEventsTitles(horario["miercoles"][7])}</td>
            <td>{getEventsTitles(horario["jueves"][7])}</td>
            <td>{getEventsTitles(horario["viernes"][7])}</td>
            <td>{getEventsTitles(horario["sabado"][7])}</td>
          </tr>
          <tr>
            <th scope="row">16:30 - 17:20</th>
            <td>{getEventsTitles(horario["lunes"][8])}</td>
            <td>{getEventsTitles(horario["martes"][8])}</td>
            <td>{getEventsTitles(horario["miercoles"][8])}</td>
            <td>{getEventsTitles(horario["jueves"][8])}</td>
            <td>{getEventsTitles(horario["viernes"][8])}</td>
            <td>{getEventsTitles(horario["sabado"][8])}</td>
          </tr>
          <tr>
            <th scope="row">17:30 - 18:20</th>
            <td>{getEventsTitles(horario["lunes"][9])}</td>
            <td>{getEventsTitles(horario["martes"][9])}</td>
            <td>{getEventsTitles(horario["miercoles"][9])}</td>
            <td>{getEventsTitles(horario["jueves"][9])}</td>
            <td>{getEventsTitles(horario["viernes"][9])}</td>
            <td>{getEventsTitles(horario["sabado"][9])}</td>
          </tr>
          <tr>
            <th scope="row">18:30 - 19:20</th>
            <td>{getEventsTitles(horario["lunes"][10])}</td>
            <td>{getEventsTitles(horario["martes"][10])}</td>
            <td>{getEventsTitles(horario["miercoles"][10])}</td>
            <td>{getEventsTitles(horario["jueves"][10])}</td>
            <td>{getEventsTitles(horario["viernes"][10])}</td>
            <td>{getEventsTitles(horario["sabado"][10])}</td>
          </tr>
          <tr>
            <th scope="row">19:30 - 20:20</th>
            <td>{getEventsTitles(horario["lunes"][11])}</td>
            <td>{getEventsTitles(horario["martes"][11])}</td>
            <td>{getEventsTitles(horario["miercoles"][11])}</td>
            <td>{getEventsTitles(horario["jueves"][11])}</td>
            <td>{getEventsTitles(horario["viernes"][11])}</td>
            <td>{getEventsTitles(horario["sabado"][11])}</td>
          </tr>
        </tbody>
      </table>
    )) ||
    ""
  );
};

const horarioBuilder = (courses) => {
  //   horario["lunes"][0] = [Date.now()];
  //   return horario;
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
    console.log("aca1");
    if (event["tipo"] === "OLIN" || event["tipo"] === "AYON") {
      for (const day in days) {
        const dayName = days[day];
        if (event.hasOwnProperty(dayName)) {
          const hour = event[dayName];
          const hourBlockIds = getHourBlocksIds(hour);
          hourBlockIds.forEach((id) => {
            const eventObj = { title: event["titulo"], type: event["tipo"] };
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
  const startInt = parseInt(start.split(":")[0]);
  const endInt = parseInt(end.split(":")[0]);
  const spawnIds = [];
  for (let id = startInt; id <= endInt; id++) {
    spawnIds.push(id - 8);
  }
  return spawnIds;
}

function getEventsTitles(events) {
  const bgColor = { OLIN: "green", AYON: "yellow" };
  if (typeof events === "object") {
    const courseBlock = events.map((event) => {
      return (
        <div style={{ backgroundColor: bgColor[event["type"]] }}>
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
