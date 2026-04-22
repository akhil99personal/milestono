import { React, useState } from "react";
import "./UnderConstructionPage.css";
import underconstruction from "../images/uconstruction.png";

function UnderConstructionPage() {
  return (
    <>
      <header className="underconstructionbody">
        <section className="underconstruction">
          <h1>
            This page is in under Construction...<br></br>
            <button
              onClick={() => {
                window.history.back();
              }}
              className="learn-more underconstructionbtn"
            >
              <span>Go Back</span>
            </button>
          </h1>
          <img src={underconstruction} alt="" />
        </section>
      </header>
    </>
  );
}

export default UnderConstructionPage;
