import React, { useContext } from "react";
import PropTypes from "prop-types";
import useLoginForm from "../hooks/LoginHooks";
import { login } from "../hooks/ApiHooks";
import { withRouter } from "react-router-dom";
import { MediaContext } from "../contexts/MediaContext";
import { Button, TextField, Grid, Typography } from "@material-ui/core";

const LoginForm = ({ history }) => {
  const [user, setUser] = useContext(MediaContext);
  const doLogin = async () => {
    try {
      const userdata = await login(inputs);
      setUser(userdata.user);
      //Tallenna token
      localStorage.setItem("token", userdata.token);
      //Siirry etusivulle
      history.push("/home");
    } catch (e) {
      console.log(e.message);
    }
  };
  
  const { inputs, handleInputChange, handleSubmit } = useLoginForm(doLogin);
  return (
    <Grid 
      container 
      direction="column"
    >
      <Grid item xs>
        <Typography gutterBottom variant="h5" component="h2">
          Login
        </Typography>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid item xs>
          <TextField
            fullWidth
            type="text"
            name="username"
            label="Username"
            onChange={handleInputChange}
            value={inputs.username}
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            type="password"
            name="password"
            label="Password"
            onChange={handleInputChange}
            value={inputs.password}
          />
        </Grid>
        <Grid item xs>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

LoginForm.propTypes = {
  history: PropTypes.object
};

export default withRouter(LoginForm);
