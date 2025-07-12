/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Box,
  Button,
  Divider,
  Fade,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DataPrivacyModal from "./components/DataPrivacyModal";
import { useEffect, useState } from "react";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import ConsultationStepper from "./components/ConsultationStepper";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormStore } from "./utils/store";
import { usePharmacyStore } from "./utils/pharmacyStore";

export default function Home() {
  const theme = useTheme();
  const router = useRouter();
  const { handleSubmit } = useForm();
  const { resetForm } = useFormStore();
  const {
    data: { token },
    updatePharmacy,
  } = usePharmacyStore();
  const [open, setModalOpen] = useState<boolean>(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_CHANNEL === "Online") {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      if (token) {
        updatePharmacy({ token });
      } else {
        router.push("/login");
      }
    }
  }, [updatePharmacy, router]);

  const onSubmit = async () => {
    resetForm();
    return router.push(`check-postcode?token=${token}`);
  };

  return (
    <Stack alignItems="center" marginTop={5}>
      <ConsultationStepper activeStep={0} />
      <Fade in timeout={300}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={5}
            justifyContent="center"
            sx={{
              padding: { xs: 2, sm: 6 },
              marginTop: { xs: 0, sm: 0, md: 1 },
            }}
          >
            <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
              {process.env.NEXT_PUBLIC_WELL_PHARMACY === "true" ? (
                <Stack alignItems="center" direction="column" gap={2}>
                  <Box
                    component="img"
                    src="https://cdn11.bigcommerce.com/s-zbz0dr3ysm/stencil/2eddb9b0-21a3-013e-e4ac-22448c2cf10e/e/2e51a620-0381-013c-1bdc-022b92701f73/icons/logo-well-hale.svg"
                    alt="Well Pharmacy logo"
                    width={273}
                    sx={{
                      [theme.breakpoints.down("sm")]: { width: 180 },
                    }}
                  />
                </Stack>
              ) : process.env.NEXT_PUBLIC_SUPERDRUG_PHARMACY === "true" ? (
                <Stack alignItems="center" direction="column" gap={2}>
                  <Box
                    component="img"
                    src="https://imgur.com/TN3jFXD.png"
                    alt="Superdrug Pharmacy logo"
                    width={273}
                    sx={{
                      [theme.breakpoints.down("sm")]: { width: 180 },
                    }}
                  />
                </Stack>
              ) : (
                <Box
                  component="img"
                  src="https://quickcaredemo.s3.eu-west-2.amazonaws.com/QuickCare+LOGO.png"
                  alt="Quick Care logo"
                  width={600}
                  sx={{ [theme.breakpoints.down("sm")]: { width: 375 } }}
                />
              )}
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography
                fontSize={32}
                textAlign="center"
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: 20,
                  },
                }}
              >
                Tap the button below to begin your
                <br /> free consultation! 👇
              </Typography>
            </Grid>
            <Grid
              size={{ xs: 12 }}
              sx={{
                marginLeft: 7,
                marginRight: 7,
                [theme.breakpoints.down("sm")]: {
                  margin: 0,
                },
              }}
            >
              <Button
                variant="contained"
                endIcon={<EastRoundedIcon />}
                fullWidth
                sx={{
                  fontSize: 24,
                  paddingTop: 3,
                  paddingBottom: 3,
                  [theme.breakpoints.down("sm")]: {
                    fontSize: 20,
                    paddingTop: 2,
                    paddingBottom: 2,
                  },
                }}
                type="submit"
              >
                <b>Click Here to Start Consultation</b>
              </Button>
            </Grid>
            <Grid
              size={{ xs: 12 }}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box
                component="img"
                src="https://imgur.com/Sp48G3I.png"
                alt="NHS Scotland logo"
                width={150}
                sx={{ [theme.breakpoints.down("sm")]: { width: 150 } }}
              />
              <Typography textAlign="center">Providing NHS services</Typography>
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
          </Grid>
        </form>
      </Fade>
      <DataPrivacyModal open={open} handleClose={handleClose} />
    </Stack>
  );
}
