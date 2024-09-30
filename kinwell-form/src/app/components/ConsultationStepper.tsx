import {
  Box,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from "@mui/material";
import { steps } from "../page";
import React from "react";

export default function ConsultationStepper({
  activeStep,
}: {
  activeStep: number;
}) {
  const theme = useTheme();
  return (
    <Box sx={{ width: "100%", position: "sticky", top: 0, zIndex: 1 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ marginBottom: 2 }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              <Typography
                sx={{
                  fontSize: "24px",
                  [theme.breakpoints.down("sm")]: { fontSize: "20px" },
                }}
              >
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Divider />
    </Box>
  );
}
