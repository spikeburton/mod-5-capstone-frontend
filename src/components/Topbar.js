import React from "react";
import { Grid, Image } from "semantic-ui-react";
import SignupButton from "./SignupButton";

const Topbar = props => {
  return (
    <Grid relaxed stackable columns={2}>
      <Grid.Column>
        <div id="topbar">
          <h1>Take a Scenic Drive.</h1>
          <p>
            Choose from a list of scenic byways in your state, or add your own
            route. See what others have been upto.
          </p>
          {localStorage.getItem("token") ? null : <SignupButton />}
        </div>
      </Grid.Column>
      <Grid.Column>
        <Grid columns={2} centered>
          <Grid.Column>
            {/* <div style={{ color: "white", textAlign: "justify" }}>
              <p></p>
            </div> */}
          </Grid.Column>
          <Grid.Column>
            <Image size="medium" src={require("../images/tesla2.png")} />
          </Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid>
  );
};

export default Topbar;
