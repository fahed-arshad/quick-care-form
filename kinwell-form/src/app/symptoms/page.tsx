"use client";
import {
  Stack,
  Fade,
  Box,
  Typography,
  Button,
  useTheme,
  InputLabel,
  TextField,
  OutlinedInput,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Input,
  FormHelperText,
} from "@mui/material";
import Link from "next/link";
import ConsultationStepper from "../components/ConsultationStepper";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useState } from "react";
import { useRouter } from "next/navigation";

export interface SymptomData {
  symptoms: string;
  duration: number;
  experiencedSymptomsBefore: string;
  previousSymptomsDetails: string;
}

export default function Symptoms() {
  const theme = useTheme();
  const router = useRouter();
  const [alignment, setAlignment] = useState<string | null>(null);
  const [display, setDisplay] = useState<string>("none");

  const existingData: SymptomData = JSON.parse(
    sessionStorage.getItem("symptoms") || "{}"
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SymptomData>({
    defaultValues: {
      symptoms: existingData.symptoms ?? null,
      duration: existingData.duration ?? null,
      experiencedSymptomsBefore: existingData.experiencedSymptomsBefore ?? null,
      previousSymptomsDetails: existingData.previousSymptomsDetails ?? null,
    },
  });

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setValue("experiencedSymptomsBefore", newAlignment);
    if (newAlignment === "Yes") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
    setAlignment(newAlignment);
  };

  const onSubmit = (formData: SymptomData) => {
    formData.symptoms = formData.symptoms.trim();
    if (formData.previousSymptomsDetails) {
      formData.previousSymptomsDetails =
        formData.previousSymptomsDetails.trim();
    }
    sessionStorage.setItem("symptoms", JSON.stringify(formData));
    router.push("/additional-information");
  };
  return (
    <Stack alignItems="center" marginTop={5}>
      <ConsultationStepper activeStep={0} />
      <Fade in timeout={300}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} justifyContent="center" padding={2}>
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="symptoms" required margin="dense">
                Could you clearly describe the symptoms you're currently
                experiencing?
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
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="duration" required margin="dense">
                How many days have you been experiencing these symptoms for?
              </InputLabel>
              <OutlinedInput
                id="duration"
                type="number"
                fullWidth
                required
                endAdornment={
                  <InputAdornment position="end">
                    <Typography fontSize="24px">days</Typography>
                  </InputAdornment>
                }
                {...register("duration", {
                  required: true,
                  min: {
                    value: 1,
                    message: "Duration must be at least 1 day.",
                  },
                })}
                inputProps={{
                  min: 1,
                  onKeyDown: (e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault();
                    }
                  },
                }}
                placeholder="Enter duration"
                error={errors.duration ? true : false}
              ></OutlinedInput>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="priorSymptoms" required margin="dense">
                Have you tried any treatment for these symptoms yet?
              </InputLabel>
              <ToggleButtonGroup
                id="priorSymptoms"
                exclusive
                fullWidth
                value={alignment}
                {...register("experiencedSymptomsBefore", {
                  required: true,
                })}
                onChange={handleAlignment}
                aria-required
              >
                <ToggleButton value="Yes">Yes</ToggleButton>
                <ToggleButton value="No">No</ToggleButton>
              </ToggleButtonGroup>
              {errors.experiencedSymptomsBefore ? (
                <FormHelperText>
                  <Typography color="error">Please select an option</Typography>
                </FormHelperText>
              ) : null}
            </Grid>
            {display === "block" && (
              <Grid size={{ xs: 12 }}>
                <TextField
                  id="previousSymptomsDetails"
                  {...register("previousSymptomsDetails")}
                  multiline
                  fullWidth
                  minRows={2}
                  placeholder="Enter treatments here"
                />
              </Grid>
            )}
            <Grid
              container
              size={{ xs: 12 }}
              spacing={2}
              direction={{ xs: "row-reverse" }}
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
                    router.push("/check-postcode");
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
