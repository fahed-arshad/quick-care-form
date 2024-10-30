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
import DataPrivacyModal from "../../components/DataPrivacyModal";
import { useState } from "react";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SignUpStepper from "@/app/components/SignUpStepper";

export default function Home() {
  const theme = useTheme();
  const router = useRouter();
  const { handleSubmit } = useForm();
  const [open, setModalOpen] = useState<boolean>(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  const onSubmit = () => {
    sessionStorage.clear();
    router.push("/check-postcode");
  };

  return (
    <Stack alignItems="center" marginTop={5}>
      <SignUpStepper activeStep={0} />
      <Fade in timeout={300}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={5}
            justifyContent="center"
            sx={{ padding: { xs: 2, sm: 6 } }}
            marginTop={10}
          >
            <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
              <Box
                component="img"
                src="https://i.imgur.com/QRVEoaF.png"
                alt="KinWell logo"
                width={300}
                sx={{ [theme.breakpoints.down("sm")]: { width: 200 } }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography
                fontSize={32}
                textAlign="center"
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: 24,
                  },
                }}
              >
                Tap the button below to begin your free consultation! 👇
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
          </Grid>
        </form>
      </Fade>
      <DataPrivacyModal open={open} handleClose={handleClose} />
    </Stack>
  );
}
