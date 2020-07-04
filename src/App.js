import React, { useState, useEffect } from "react";
import GitHubForkRibbon from "react-github-fork-ribbon";
import "./styles.css";

import Dropzone from "./components/filedrop";
import { Table } from "./components/table";
import CourseSelect from "./components/select";
import Exams from "./components/exams";

export default function App() {
  const [xlsxData, setXlsxData] = useState(
    JSON.parse(localStorage.getItem("xlsx_data")) || []
  );
  const [coursesNrcs, setCoursesNrcs] = useState([]);
  const [selectedCoursesNrcs, setSelectedCoursesNrcs] = useState([]);
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
      {xlsxData.length > 2 && <h3>{xlsxData[1]["n"]}</h3>}
      <Dropzone text="Arrastrea un XLSX..." dataSetter={setXlsxData} />
      <br />
      <CourseSelect
        courses={coursesNrcs}
        selectedCallback={setSelectedCoursesNrcs}
      />
      <br />
      <Table courses={selectedCourses} />
      <br />
      <Exams courses={selectedCourses} />
    </div>
  );
}
