"use client";
import {
  Stack,
  Fade,
  Typography,
  Button,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import ConsultationStepper from "../components/ConsultationStepper";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useRouter } from "next/navigation";
import { Data, useFormStore } from "../utils/store";
import { usePharmacyStore } from "../utils/pharmacyStore";

export default function Symptoms() {
  const router = useRouter();

  const { formData, updateForm } = useFormStore();
  const {
    data: { token },
  } = usePharmacyStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Data>({
    defaultValues: {
      duration: formData.duration,
    },
  });

  const onSubmit = (formData: Data) => {
    updateForm({
      duration: formData.duration,
    });
    router.push(`/treatments-tried?token=${token}`);
  };
  return (
    <Stack alignItems="center" marginTop={5} marginBottom={10}>
      <ConsultationStepper activeStep={1} useSymptomsSteps />
      <Fade in timeout={300}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ padding: { xs: 2, sm: 6 } }}
          >
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="duration" required margin="dense">
                How many days have you been experiencing these symptoms for? 📆
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
                error={errors.duration ? true : false}
              ></OutlinedInput>
              <FormHelperText>ⓘ Enter a number</FormHelperText>
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
                    router.push(`/describe-symptoms?token=${token}`);
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
