"use client";
import { Stack, Fade, Button, Typography, Box, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SignUpStepper from "@/app/components/SignUpStepper";

export default function Success() {
  const theme = useTheme();

  return (
    <Stack alignItems="center" marginTop={5}>
      <SignUpStepper activeStep={3} />
      <Fade in timeout={300}>
        <form style={{ width: "100%" }}>
          <Grid
            container
            spacing={5}
            justifyContent="center"
            sx={{ padding: { xs: 2, sm: 6 } }}
          >
            <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
              <Box
                component="img"
                src="https://i.imgur.com/ScHdu9S.png"
                alt="KinWell logo"
                width={300}
                sx={{ [theme.breakpoints.down("sm")]: { width: 200 } }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography textAlign="center" variant="h4" component="h2">
                Thanks for switching to KinWell Pharmacy! 😊
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography textAlign="center" variant="h4" component="h2">
                We&apos;ll contact your GP and let them know you&apos;ve chosen
                us to handle your prescriptions.
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Fade>
    </Stack>
  );
}
