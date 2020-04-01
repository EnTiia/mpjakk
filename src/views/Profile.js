import React, { useContext, useEffect, useState } from "react";
import { MediaContext } from "../contexts/MediaContext";
import {
  Card,
  CardMedia,
  CardContent,
  makeStyles,
  Typography
} from "@material-ui/core/";
import {getAvatarImage} from '../hooks/ApiHooks';

const mediaUrl = "http://media.mw.metropolia.fi/wbma/uploads/";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [user] = useContext(MediaContext);
  const [avatar, setAvatar] = useState([]);
  useEffect(() => {
    (async () => {
      if (user !== null) {
        setAvatar(await getAvatarImage(user.user_id));
      }
    })();
  }, [user]);

  return (
    <>
      {user !== null && avatar.length > 0 && (
        <Card>
          <CardMedia
            className={classes.media}
            image={mediaUrl + avatar[0].filename}
            title="Avatar image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Profile
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {user.username}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {user.email}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {user.full_name}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Profile;
