import React from "react";
import { CalendarMonthRounded, DateRangeRounded, FindInPageRounded, PersonSearchRounded, SearchOutlined, TableViewOutlined, WatchLaterOutlined } from "@mui/icons-material";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";

const ButtonIconHelp = ({ iconType, color, buttonSize, iconSize, onClick, disabled }) => {
  return (
    <IconButton aria-label={ iconType } color={ (iconType === "search") ? "primary" : "secondary" } size={ buttonSize } onClick={ onClick } disabled={ disabled } >
      { (iconType === "search") && <SearchOutlined fontSize={ iconSize } htmlColor={ disabled ? "#40486b" : color } /> }
      { (iconType === "nmsSearch" || iconType === "nms") && <FindInPageRounded fontSize={ iconSize } htmlColor={ disabled ? "#40486b" : color } /> }
      { (iconType === "chargeSearch" || iconType === "charge") && <PersonSearchRounded fontSize={ iconSize } htmlColor={ disabled ? "#40486b" : color } /> }
      { (iconType === "dateRange") && <DateRangeRounded fontSize={ iconSize } htmlColor={ disabled ? "#40486b" : color } /> }
      { (iconType === "datePicker"  || iconType === "date") && <CalendarMonthRounded fontSize={ iconSize } htmlColor={ disabled ? "#40486b" : color } /> }
      { (iconType === "scheduleSearch" || iconType === "schedule" || iconType === "crontab") && <WatchLaterOutlined fontSize={ iconSize } htmlColor={ disabled ? "#40486b" : color } /> }
      { (iconType === "db" || iconType === "tb" || iconType === "dbtb") && <TableViewOutlined fontSize={ iconSize } htmlColor={ disabled ? "#40486b" : color } /> }
    </IconButton>
  )
};

ButtonIconHelp.defaultProps = {
  iconType: "search",
  color: "#82c2fa", // #42a6fd, #82c2fa, #b4dafc
  buttonSize: "small",
  iconSize: "small",
  disabled: false,
  onClick: () => {}
};

ButtonIconHelp.propTypes = {
  iconType: PropTypes.oneOf(["search", "nmsSearch", "chargeSearch", "dateRange", "datePicker", "scheduleSearch", "nms", "charge", "date", "schedule", "crontab", "db", "tb", "dbtb"]),
  buttonSize: PropTypes.oneOf(["large", "medium", "small"]),
  iconSize: PropTypes.oneOf(["large", "medium", "small"])
};

export default ButtonIconHelp;