"use client";
import {
  Stack,
  Fade,
  Typography,
  Button,
  InputLabel,
  TextField,
  OutlinedInput,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  FormHelperText,
} from "@mui/material";
import ConsultationStepper from "../components/ConsultationStepper";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface DescribeSymptomData {
  symptoms: string;
}

export default function Symptoms() {
  const router = useRouter();

  const [pharmacy, setPharmacy] = useState<string>();

  const [channel, setChannel] = useState<string>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DescribeSymptomData>();

  useEffect(() => {
    const existingData: DescribeSymptomData = JSON.parse(
      sessionStorage.getItem("symptoms") || "{}"
    );

    const pharmacy = sessionStorage.getItem("pharmacy") || undefined;

    setPharmacy(pharmacy);

    const channel = sessionStorage.getItem("channel") || undefined;

    setChannel(channel);

    if (existingData) {
      setValue("symptoms", existingData.symptoms);
    }
  }, [setValue]);

  const onSubmit = (formData: DescribeSymptomData) => {
    formData.symptoms = formData.symptoms.trim();
    sessionStorage.setItem("symptoms", JSON.stringify(formData));
    router.push("/duration");
  };
  return (
    <Stack alignItems="center" marginTop={5} marginBottom={10}>
      <ConsultationStepper activeStep={0} useSymptomsSteps />
      <Fade in timeout={300}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ padding: { xs: 2, sm: 6 } }}
          >
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="symptoms" required margin="dense">
                Could you clearly describe the symptoms you&apos;re currently
                experiencing? 🤒
              </InputLabel>
              <TextField
                id="symptoms"
                minRows={2}
                multiline
                fullWidth
                required
                {...register("symptoms", {
                  required: true,
                })}
                placeholder="Enter symptoms"
                error={errors.symptoms ? true : false}
                helperText={
                  errors.symptoms?.type === "required"
                    ? "Please describe your symptoms"
                    : null
                }
              ></TextField>
            </Grid>
            <Grid
              container
              size={{ xs: 12 }}
              spacing={2}
              direction={{ xs: "row-reverse" }}
              marginTop={3}
            >
              <Grid size={{ md: 6, xs: 12 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  endIcon={<EastRoundedIcon />}
                >
                  Next
                </Button>
              </Grid>
              <Grid size={{ md: 6, xs: 12 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: "white",
                    ":hover": { backgroundColor: "white" },
                  }}
                  onClick={() => {
                    router.push(
                      `/check-postcode?pharmacy=${pharmacy}&channel=${channel}`
                    );
                  }}
                >
                  Previous
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Fade>
    </Stack>
  );
}
