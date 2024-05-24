import React from "react";
import { ArrowCircleDown, ArrowCircleLeft, ArrowCircleRight, ArrowCircleUp } from "@mui/icons-material";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";

const ButtonIconArrow = ({ arrowDirection, color, buttonSize, iconSize, onClick }) => {
  return (
    <IconButton aria-label={ arrowDirection } color={ (arrowDirection === "Right" || arrowDirection === "Up") ? "primary" : "secondary" } size={ buttonSize } onClick={ onClick }>
      { (arrowDirection === "Right") && <ArrowCircleRight fontSize={ iconSize } htmlColor={ color }/> }
      { (arrowDirection === "Left") && <ArrowCircleLeft fontSize={ iconSize } htmlColor={ color }/> }
      { (arrowDirection === "Up") && <ArrowCircleUp fontSize={ iconSize } htmlColor={ color }/> }
      { (arrowDirection === "Down") && <ArrowCircleDown fontSize={ iconSize } htmlColor={ color }/> }
    </IconButton>
  )
};

ButtonIconArrow.defaultProps = {
  arrowDirection: "Right",
  color: "#3ea2b3",
  buttonSize: "small",
  iconSize: "large",
  onClick: () => {}
};

ButtonIconArrow.propTypes = {
  arrowDirection: PropTypes.oneOf(["Right", "Left", "Up", "Down"]),
  buttonSize: PropTypes.oneOf(["large", "medium", "small"]),
  iconSize: PropTypes.oneOf(["large", "medium", "small"])
};

export default ButtonIconArrow;