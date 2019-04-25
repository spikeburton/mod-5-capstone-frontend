import React from "react";
import { Grid } from "semantic-ui-react";
import SignupButton from "./SignupButton";

const Topbar = props => {
  return (
    <Grid relaxed stackable columns={2}>
      <Grid.Column>
        <div id="topbar">
          <h1>Take a Scenic Drive.</h1>
          <p>Choose from a list of scenic byways in your state, or add your own route. See what others have been upto.</p>
          <SignupButton />
        </div>
      </Grid.Column>
      <Grid.Column>
        <Grid columns={2} centered>
          <Grid.Column>
            <p>Placeholder content</p>
          </Grid.Column>
          <Grid.Column>
            <img
              id="bridge-img"
              src={require("../images/bridge.jpg")}
              alt="bridge"
            />
          </Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid>
  );
};

export default Topbar;
