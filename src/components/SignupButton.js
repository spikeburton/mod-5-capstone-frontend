import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SignupButton = () => {
  return (
    <div style={{ paddingLeft: "20px", paddingTop: "5px" }}>
      <Link to="/signup">
        <Button color="black">Sign Up</Button>
      </Link>
    </div>
  );
};

export default SignupButton;
