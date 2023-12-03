import React from "react";
import { Link as MaterialUILink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const MaterialLink = ({ to, variant, text }) => {
  return (
    <MaterialUILink component={RouterLink} to={to} variant={variant}>
      {text}
    </MaterialUILink>
  );
};

export default MaterialLink;
