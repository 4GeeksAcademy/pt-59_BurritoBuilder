// BackgroundComponent.js

import React from "react";

const Backgroundpreviewer = () => {
  return (
    <div className="background">
        {/* Blue square */}
        <div style={{ width: '250px', height: '250px', backgroundColor: '#3b85fb', position: 'relative',borderRadius: '0px 0px 10px 10px', }}>
            {/* Light greyish-blue square */}
            <div style={{ width: '225px', height: '225px', backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',borderRadius: '0px 0px 7px 7px', }}></div>
        </div>
    </div>
);

};

export default Backgroundpreviewer;
