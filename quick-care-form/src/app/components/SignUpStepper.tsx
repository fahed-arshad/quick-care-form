import {
  Box,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from "@mui/material";
import Banner from "./Banner";

export default function SignUpStepper({
  activeStep,
  showBanner = false,
}: {
  activeStep: number;
  showBanner?: boolean;
}) {
  const theme = useTheme();
  const stepsToUse = ["Personal", "Address", "Contact"];

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
      {showBanner && <Banner />}
      <Box
        sx={{
          paddingRight: { xs: 2, sm: 6 },
          paddingLeft: { xs: 2, sm: 6 },
        }}
      >
        <Divider />
      </Box>
    </Box>
  );
}
