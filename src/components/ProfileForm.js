import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useProfileForm from "../hooks/ProfileHooks";
import {
  checkToken,
  checkUserAvailable,
  updateProfile
} from "../hooks/ApiHooks";
import { withRouter } from "react-router-dom";
import { MediaContext } from "../contexts/MediaContext";
import { Button, Grid, Typography } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const ProfileForm = ({ history }) => {
  const [user, setUser] = useContext(MediaContext);
  const [toggle, setToggle] = useState(false);

  const showHide = () => {
    setToggle(!toggle);
  };

  const doProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      await updateProfile(inputs, token);
      const userdata = await checkToken(token);
      console.log(userdata);
      setUser(userdata);
    } catch (e) {
      console.log(e.message);
    }
  };

  const { inputs, setInputs, handleInputChange, handleSubmit } = useProfileForm(
    doProfile
  );

  useEffect(() => {
    setInputs(user);
    ValidatorForm.addValidationRule("isAvailable", async value => {
      console.log(value);
      try {
        if (value !== user.username) {
          const response = await checkUserAvailable(value);
          console.log(response);
          return response.available;
        } else {
          return true;
        }
      } catch (e) {
        console.log(e.message);
        return true;
      }
    });
  }, [user, setInputs]);

  return (
    <Grid container>
      <Grid item>
        <Button fullWidth color="primary" onClick={showHide}>
          Update profile
        </Button>
      </Grid>

      {toggle && (
        <>
          <Grid item>
            <Typography gutterBottom variant="h5" component="h2">
              Update profile
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
                    validators={[
                      "required",
                      "minStringLength:3",
                      "isAvailable"
                    ]}
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
                    type="email"
                    name="email"
                    label="Email"
                    onChange={handleInputChange}
                    value={inputs.email}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "this field is required",
                      "email is not valid"
                    ]}
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
                  <TextValidator
                    fullWidth
                    type="file"
                    name="test"
                    validators={[
                      "allowedExtensions:image/png,image/jpeg,image/jpg",
                    ]}
                    errorMessages={["images only"]}
                  />
                </Grid>

                <Grid container item>
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    variant="contained"
                  >
                    Save profile
                  </Button>
                </Grid>
              </Grid>
            </ValidatorForm>
          </Grid>
        </>
      )}
    </Grid>
  );
};

ProfileForm.propTypes = {
  history: PropTypes.object
};

export default withRouter(ProfileForm);