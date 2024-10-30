import {
  Box,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { steps } from "./helpers/steps";

const symptomsSteps = ["Symptoms", "Duration", "Treatments", "Allergies"];

export default function ConsultationStepper({
  activeStep,
  useSymptomsSteps = false, // New optional prop
}: {
  activeStep: number;
  useSymptomsSteps?: boolean; // Optional prop type
}) {
  const theme = useTheme();
  const stepsToUse = useSymptomsSteps ? symptomsSteps : steps; // Determine which steps to use

  return (
    <Box sx={{ width: "100%", position: "sticky", top: 0, zIndex: 1 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ marginBottom: 2 }}
      >
        {stepsToUse.map((label) => (
          <Step key={label}>
            <StepLabel style={{ wordBreak: "break-all" }}>
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
