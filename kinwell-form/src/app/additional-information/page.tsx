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

interface AdditionalInfoData {
  additionalInfo: string;
  additionalInfoToggle: string;
}

export default function AdditionalInformation() {
  const theme = useTheme();
  const router = useRouter();
  const [alignment, setAlignment] = useState<string | null>(null);
  const [display, setDisplay] = useState<string>("hidden");

  const existingData = JSON.parse(
    sessionStorage.getItem("additionalInfo") || ""
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AdditionalInfoData>({
    defaultValues: {
      additionalInfo: existingData ?? null,
    },
  });

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

  const onSubmit = (formData: AdditionalInfoData) => {
    sessionStorage.setItem(
      "additionalInfo",
      JSON.stringify(formData.additionalInfo)
    );
    router.push("/personal-details");
  };

  return (
    <Stack alignItems="center" marginTop={5}>
      <ConsultationStepper activeStep={0} />
      <Fade in timeout={300}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} justifyContent="center" padding={2}>
            <Grid size={{ xs: 12 }}>
              <InputLabel
                htmlFor="additionalInfoToggle"
                required
                margin="dense"
              >
                Do you have any existing conditions, any medications for those
                existing conditions and any allergies to medication?
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
                  <Typography color="error">Please select an option</Typography>
                </FormHelperText>
              ) : null}
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
                    router.push("/symptoms");
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
