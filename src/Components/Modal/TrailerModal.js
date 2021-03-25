import React from "react";
import Modal from "@material-ui/core/Modal";
import useStyles from "./Styles";
import CloseIcon from "@material-ui/icons/Close";

export default function TrailerModal({ trailer, setTrailer }) {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modalContainer}
      onClose={() => setTrailer(null)}
      open={trailer}
    >
      <div className={classes.modal}>
        <div className={classes.videoWrapper}>
          <iframe
            className={classes.video}
            src={`https://www.youtube.com/embed/${trailer}`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          ></iframe>
        </div>
        <CloseIcon
          className={classes.icon}
          fontSize="inherit"
          onClick={() => setTrailer(null)}
        />
      </div>
    </Modal>
  );
}
