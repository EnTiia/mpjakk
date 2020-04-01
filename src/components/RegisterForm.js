import React, { useContext } from "react";
import PropTypes from "prop-types";
import useSignUpForm from "../hooks/RegisterHooks";
import { checkUserAvailable, login, register } from "../hooks/ApiHooks";
import { withRouter } from "react-router-dom";
import { MediaContext } from "../contexts/MediaContext";
import { Button, TextField, Grid, Typography } from "@material-ui/core";

const RegisterForm = ({ history }) => {
  const [user, setUser] = useContext(MediaContext);
  const doRegister = async () => {
    try {
      await checkUserAvailable(inputs.username);
      await register(inputs);
      //Kirjaudu automaattisesti
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

  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(doRegister);
  return (
    <Grid 
    container
    direction="column">
      <Grid item xs>
        <Typography gutterBottom variant="h5" component="h2">
        Register
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
        <TextField
        fullWidth
          type="email"
          name="email"
          label="Email"
          onChange={handleInputChange}
          value={inputs.email}
        />
        </Grid>
        <Grid item xs>
        <TextField
        fullWidth
          type="text"
          name="full_name"
          label="Full name"
          onChange={handleInputChange}
          value={inputs.full_name}
        />
        </Grid>
        <Grid item xs>
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
        </Grid>
      </form>
    </Grid>
  );
};

RegisterForm.propTypes = {
  history: PropTypes.object
};

export default withRouter(RegisterForm);
