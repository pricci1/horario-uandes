import React from "react";
import Select from "react-select";

const CourseSelect = ({ courses, selectedCallback, cachedValues }) => {
  const options = courses.map((course) => ({
    value: course["nrc"],
    label: `${course["nrc"]} - ${course["titulo"]}`,
  }));
  return (
    <Select
      isMulti
      name="Ramos"
      options={options}
      onChange={(value) => selectedCallback(value || [])}
      className="basic-multi-select"
      classNamePrefix="select"
      defaultValue={cachedValues}
    />
  );
};

export default CourseSelect;
