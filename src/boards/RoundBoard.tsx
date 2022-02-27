import React, { ReactElement } from "react";

import "../styles/board.css";

type RoundProps = {
  round: number;
};

export const RoundBoard = ({ round }: RoundProps): ReactElement => {
  return (
    <div>
      <h1 className="heading">Round Number</h1>
      <div className="msg">{round}</div>
    </div>
  );
};