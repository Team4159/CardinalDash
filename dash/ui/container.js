import React from "react";

const Container = ({ children }) => {
    return (
        <div className="container-fluid text-center fill">
            <div className="row content fill">
                {
                    children
                }
            </div>
      </div>
  );
};

export default Container;
