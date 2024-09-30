/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Box,
  Button,
  Fade,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DataPrivacyModal from "./components/DataPrivacyModal";
import { useState } from "react";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import ConsultationStepper from "./components/ConsultationStepper";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Home() {
  const theme = useTheme();
  const router = useRouter();
  const { handleSubmit } = useForm();
  const [open, setModalOpen] = useState<boolean>(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  const onSubmit = () => {
    router.push("/check-postcode");
  };

  return (
    <Stack alignItems="center" marginTop={5}>
      <ConsultationStepper activeStep={0} />
      <Fade in timeout={300}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} justifyContent="center" padding={2}>
            <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
              <Box
                component="img"
                src="https://i.imgur.com/ScHdu9S.png"
                alt="KinWell logo"
                width={200}
                sx={{ [theme.breakpoints.down("sm")]: { width: 100 } }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant={theme.breakpoints.down("sm") ? "h4" : "h2"}
                component="h1"
                color={theme.palette.primary.main}
                textAlign="center"
              >
                We&apos;re here to offer quick, free medical advice or treatment
                without the GP wait. 👋
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography fontSize={20} textAlign="center">
                By continuing, you consent to our collection of personal health
                data to improve your experience.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Link href="#">
                <Typography
                  fontSize={20}
                  onClick={() => setModalOpen(true)}
                  textAlign="center"
                  gutterBottom
                >
                  Click here to learn more.
                </Typography>
              </Link>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                endIcon={<EastRoundedIcon />}
                fullWidth
                sx={{ fontSize: 24 }}
                type="submit"
              >
                <b>Click Here to Start Consultation</b>
              </Button>
            </Grid>
          </Grid>
        </form>
      </Fade>
      <DataPrivacyModal open={open} handleClose={handleClose} />
    </Stack>
  );
}
