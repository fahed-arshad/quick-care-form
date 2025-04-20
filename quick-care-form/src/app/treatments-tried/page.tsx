"use client";
import {
  Stack,
  Fade,
  Typography,
  Button,
  InputLabel,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  FormHelperText,
  useTheme,
} from "@mui/material";
import ConsultationStepper from "../components/ConsultationStepper";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Data, useFormStore } from "../utils/store";

export interface TreatmentsTriedData {
  experiencedSymptomsBefore: string;
  previousSymptomsDetails: string;
}

export default function Symptoms() {
  const router = useRouter();
  const [alignment, setAlignment] = useState<string | null>(null);
  const [display, setDisplay] = useState<string>("none");

  const { formData, updateForm } = useFormStore();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Data>({
    defaultValues: {
      experiencedSymptomsBefore: formData.experiencedSymptomsBefore,
      previousSymptomsDetails: formData.previousSymptomsDetails,
    },
  });

  useEffect(() => {
    setAlignment(formData.experiencedSymptomsBefore);
    if (formData.experiencedSymptomsBefore === "Yes") {
      setDisplay("block");
    }
  }, [formData.experiencedSymptomsBefore]);

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

  const onSubmit = (formData: Data) => {
    if (formData.experiencedSymptomsBefore === "No") {
      formData.previousSymptomsDetails = "";
    }
    if (
      formData.experiencedSymptomsBefore === "Yes" &&
      !formData.previousSymptomsDetails.trim()
    ) {
      return setError("previousSymptomsDetails", {
        type: "required",
        message: "Please describe the treatments you have tried",
      });
    }
    if (formData.previousSymptomsDetails) {
      formData.previousSymptomsDetails =
        formData.previousSymptomsDetails.trim();
    }
    updateForm({
      experiencedSymptomsBefore: formData.experiencedSymptomsBefore,
      previousSymptomsDetails: formData.previousSymptomsDetails,
    });
    router.push("/additional-information");
  };
  return (
    <Stack alignItems="center" marginTop={5} marginBottom={10}>
      <ConsultationStepper activeStep={2} useSymptomsSteps />
      <Fade in timeout={300}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ padding: { xs: 2, sm: 6 } }}
          >
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="priorSymptoms" required margin="dense">
                Have you tried any treatment for these symptoms yet? 💊
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
                <ToggleButton value="No" sx={{ borderLeft: "1px solid black" }}>
                  No
                </ToggleButton>
              </ToggleButtonGroup>
              {errors.experiencedSymptomsBefore ? (
                <FormHelperText>
                  <Typography color="error" marginTop={1}>
                    ⓘ Please select an option
                  </Typography>
                </FormHelperText>
              ) : (
                <FormHelperText>
                  <Typography marginTop={1}>
                    ⓘ Tap to select an option
                  </Typography>
                </FormHelperText>
              )}
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
                  onChange={() => clearErrors("previousSymptomsDetails")}
                  error={errors.previousSymptomsDetails ? true : false}
                  helperText={
                    errors.previousSymptomsDetails?.type === "required"
                      ? errors.previousSymptomsDetails.message
                      : null
                  }
                />
              </Grid>
            )}
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
