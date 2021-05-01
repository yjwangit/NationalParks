import React from "react";

import Park from "./Park";

function Results({ results }) {
  console.log("results", results);
  return (
    <div className="results">
      {results.map((park) => (
        <Park park={park} />
      ))}
    </div>
  );
}

export default Results;
