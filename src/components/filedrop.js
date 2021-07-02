import React, { useCallback } from "react";
import XLSX from "xlsx";
import { useDropzone } from "react-dropzone";

function Dropzone({ text, dataSetter }) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = (e) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, {
          header: [
            "plan de estudios",
            "nrc",
            "conector liga",
            "lista cruzada",
            "materia",
            "curso",
            "secc.",
            "titulo",
            "lunes",
            "martes",
            "miercoles",
            "jueves",
            "viernes",
            "inicio",
            "fin",
            "sala",
            "tipo",
            "rut profesor",
            "profesor",
          ],
        });
        /* Update state */
        // this.setState({ data: data, cols: make_cols(ws['!ref']) });
        window.xlsx = data;
        dataSetter(data);
        localStorage.setItem("xlsx_data", JSON.stringify(data));
      };
      if (rABS) reader.readAsBinaryString(file);
      else reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>{text}</p>}
    </div>
  );
}

export default Dropzone;
