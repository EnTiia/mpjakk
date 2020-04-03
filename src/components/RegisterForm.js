import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import useSignUpForm from "../hooks/RegisterHooks";
import { checkUserAvailable, login, register } from "../hooks/ApiHooks";
import { withRouter } from "react-router-dom";
import { MediaContext } from "../contexts/MediaContext";
import { Button, Grid, Typography } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const RegisterForm = ({ history }) => {
  const [user, setUser] = useContext(MediaContext);
  
  const doRegister = async () => {
    try {
      delete inputs.confirm;
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

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== inputs.password) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule("isAvailable", async value => {
      try {
        const response = await checkUserAvailable(value);
        return response.available;
      } catch (e) {
        console.log(e.message);
        return true;
      }
    });
  }, [inputs]);

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography gutterBottom variant="h5" component="h2">
          Register
        </Typography>
      </Grid>
      <Grid item>
        <ValidatorForm
          onSubmit={handleSubmit}
          instantValidate={false}
          noValidate
        >
          <Grid container>
            <Grid container item>
              <TextValidator
                fullWidth
                type="text"
                name="username"
                label="Username"
                onChange={handleInputChange}
                value={inputs.username}
                validators={["required", "minStringLength:3", "isAvailable"]}
                errorMessages={[
                  "this field is required",
                  "minimum 3 charaters",
                  "username is not available"
                ]}
              />
            </Grid>

            <Grid container item>
              <TextValidator
                fullWidth
                type="password"
                name="password"
                label="Password"
                onChange={handleInputChange}
                value={inputs.password}
                validators={["minStringLength:5", "required"]}
                errorMessages={[
                  "minimum length 5 characters",
                  "this field is required"
                ]}
              />
            </Grid>

            <Grid container item>
              <TextValidator
                fullWidth
                type="password"
                name="confirm"
                label="Confirm password"
                onChange={handleInputChange}
                value={inputs.confirm}
                validators={["isPasswordMatch", "required"]}
                errorMessages={["password mismatch", "this field is required"]}
              />
            </Grid>

            <Grid container item>
              <TextValidator
                fullWidth
                type="email"
                name="email"
                label="Email"
                onChange={handleInputChange}
                value={inputs.email}
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
              />
            </Grid>

            <Grid container item>
              <TextValidator
                fullWidth
                type="text"
                name="full_name"
                label="Full name"
                onChange={handleInputChange}
                value={inputs.full_name}
                validators={[
                  "matchRegexp:^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"
                ]}
                errorMessages={["text only"]}
              />
            </Grid>

            <Grid container item>
              <Button
                fullWidth
                color="primary"
                type="submit"
                variant="contained"
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Grid>
    </Grid>
  );
};

RegisterForm.propTypes = {
  history: PropTypes.object
};

export default withRouter(RegisterForm);
