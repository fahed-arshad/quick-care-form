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

export interface TreatmentsTriedData {
  experiencedSymptomsBefore: string;
  previousSymptomsDetails: string;
}

export default function Symptoms() {
  const router = useRouter();
  const [alignment, setAlignment] = useState<string | null>(null);
  const [display, setDisplay] = useState<string>("none");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TreatmentsTriedData>();

  useEffect(() => {
    const existingData: TreatmentsTriedData = JSON.parse(
      sessionStorage.getItem("treatmentsTried") || "{}"
    );

    if (existingData) {
      setValue(
        "experiencedSymptomsBefore",
        existingData.experiencedSymptomsBefore
      );
      setAlignment(existingData.experiencedSymptomsBefore);
      setValue("previousSymptomsDetails", existingData.previousSymptomsDetails);
      console.log(existingData.experiencedSymptomsBefore);
      if (existingData.experiencedSymptomsBefore === "Yes") {
        setDisplay("block");
      }
    }
  }, [setValue]);

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

  const onSubmit = (formData: TreatmentsTriedData) => {
    if (formData.experiencedSymptomsBefore === "No") {
      formData.previousSymptomsDetails = "";
    }
    if (formData.previousSymptomsDetails) {
      formData.previousSymptomsDetails =
        formData.previousSymptomsDetails.trim();
    }
    sessionStorage.setItem("treatmentsTried", JSON.stringify(formData));
    router.push("/additional-information");
  };
  return (
    <Stack alignItems="center" marginTop={5} marginBottom={10}>
      <ConsultationStepper activeStep={0} />
      <Fade in timeout={300}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid container spacing={2} justifyContent="center" padding={2}>
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
                    router.push("/duration");
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
