import React from "react";
import Header from "./header";

const Main = ({ children }) => {
    return (
        <div className="wrapper fill">
            <div className="main fill">
                <Header />
                {
                    children
                }
            </div>
        </div>
  );
};

export default Main;
