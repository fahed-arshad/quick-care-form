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
} from "@mui/material";
import ConsultationStepper from "../components/ConsultationStepper";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Data, useFormStore } from "../utils/store";
import { usePharmacyStore } from "../utils/pharmacyStore";

export default function AdditionalInformation() {
  const router = useRouter();
  const [alignment, setAlignment] = useState<string | null>(null);
  const [display, setDisplay] = useState<string>("hidden");
  const { formData, updateForm } = useFormStore();
  const {
    data: { token },
  } = usePharmacyStore();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Data>({
    defaultValues: {
      additionalInfo: formData.additionalInfo,
      additionalInfoToggle: formData.additionalInfoToggle,
    },
  });

  useEffect(() => {
    if (formData.additionalInfoToggle === "yes") {
      setAlignment("yes");
      setDisplay("block");
    } else if (formData.additionalInfoToggle === "no") {
      setAlignment("no");
    } else {
      setDisplay("none");
      setAlignment(null);
    }
  }, [formData.additionalInfoToggle]);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setValue("additionalInfoToggle", newAlignment);
    if (newAlignment === "yes") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
    setAlignment(newAlignment);
  };

  const onSubmit = (formData: Data) => {
    if (formData.additionalInfo === undefined) {
      formData.additionalInfo = "";
    }
    if (
      formData.additionalInfoToggle === "yes" &&
      !formData.additionalInfo.trim()
    ) {
      return setError("additionalInfo", {
        type: "required",
        message: "Please enter additional information",
      });
    }
    if (formData.additionalInfoToggle === "no") {
      formData.additionalInfo = "";
    }
    updateForm({
      additionalInfo: formData.additionalInfo,
      additionalInfoToggle: formData.additionalInfoToggle,
    });
    if (process.env.NEXT_PUBLIC_CHANNEL) {
      return router.push(`/upload-image?token=${token}`);
    }
    return router.push(`/personal-details?token=${token}`);
  };

  return (
    <Stack alignItems="center" marginTop={5}>
      <ConsultationStepper activeStep={3} useSymptomsSteps />
      <Fade in timeout={300}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ padding: { xs: 2, sm: 6 } }}
          >
            <Grid size={{ xs: 12 }}>
              <InputLabel
                htmlFor="additionalInfoToggle"
                required
                margin="dense"
              >
                Do you have any existing conditions, any medications for those
                existing conditions and any allergies to medication? 🤧
              </InputLabel>
              <ToggleButtonGroup
                id="additionalInfoToggle"
                exclusive
                fullWidth
                value={alignment}
                {...register("additionalInfoToggle", {
                  required: true,
                })}
                onChange={handleAlignment}
                aria-required
              >
                <ToggleButton value="yes">Yes</ToggleButton>
                <ToggleButton value="no">No</ToggleButton>
              </ToggleButtonGroup>
              {errors.additionalInfoToggle ? (
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
                  id="additionalInfo"
                  {...register("additionalInfo")}
                  multiline
                  fullWidth
                  minRows={2}
                  placeholder="Enter additional information"
                  error={errors.additionalInfo ? true : false}
                  helperText={
                    errors.additionalInfo?.type === "required"
                      ? errors.additionalInfo.message
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
                    router.push(`/treatments-tried?token=${token}`);
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
