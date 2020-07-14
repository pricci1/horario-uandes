import React, { useState, useEffect } from "react";
import GitHubForkRibbon from "react-github-fork-ribbon";
import "./styles.css";

import Dropzone from "./components/filedrop";
import { Table } from "./components/table";
import CourseSelect from "./components/select";
import Tests from "./components/tests";

export default function App() {
  const [xlsxData, setXlsxData] = useState(
    JSON.parse(localStorage.getItem("xlsx_data")) || []
  );
  const [coursesNrcs, setCoursesNrcs] = useState([]);
  const [selectedCoursesNrcs, setSelectedCoursesNrcs] = useState(
    JSON.parse(localStorage.getItem("selected_nrcs")) || []
  );
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    const tmpCourses = [];
    const nrcs = [];
    xlsxData.forEach((course) => {
      const { nrc, titulo } = course;
      if (!nrcs.includes(nrc)) {
        nrcs.push(nrc);
        tmpCourses.push({ nrc, titulo });
      }
    });
    setCoursesNrcs(tmpCourses);
  }, [xlsxData]);

  useEffect(() => {
    localStorage.setItem("selected_nrcs", JSON.stringify(selectedCoursesNrcs));
    const nrcs =
      (selectedCoursesNrcs && selectedCoursesNrcs.map((c) => c["value"])) || [];

    setSelectedCourses(xlsxData.filter(({ nrc }) => nrcs.includes(nrc)));
  }, [selectedCoursesNrcs]);

  return (
    <div className="App">
      <GitHubForkRibbon
        href="//github.com/pricci1/horario-uandes"
        target="_blank"
        position="right"
      >
        Fork me on GitHub
      </GitHubForkRibbon>
      <h1>Horario Ingeniería</h1>
      <a
        className="pure-button"
        href="https://saf.uandes.cl/ing/infogroup/download_content_file/376"
      >
        Descarga el hoario actualizado de SAF
      </a>
      {xlsxData.length > 2 && <h3>{xlsxData[1]["n"]}</h3>}
      <Dropzone
        text="Arrastra un XLSX o haz click aquí..."
        dataSetter={setXlsxData}
      />
      <br />
      <CourseSelect
        courses={coursesNrcs}
        // TODO: It shouldn't be necesarry to call localStorage here,
        //       but initial state not working
        cachedValues={JSON.parse(localStorage.getItem("selected_nrcs"))}
        selectedCallback={setSelectedCoursesNrcs}
      />
      <br />
      <Table courses={selectedCourses} />
      <br />
      <Tests
        title="Fecha Exámenes"
        testTypes={["EXON"]}
        courses={selectedCourses}
      />
      <br />
      <Tests
        title="Fecha Pruebas"
        testTypes={[1, 2, 3, 4, 5, 6, 7, 8, 9].map((nmbr) => `PRON ${nmbr}`)}
        courses={selectedCourses}
      />
    </div>
  );
}
