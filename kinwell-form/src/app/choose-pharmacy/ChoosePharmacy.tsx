"use client";
import {
  Stack,
  Fade,
  Box,
  Typography,
  Button,
  Link,
  FormHelperText,
  InputLabel,
  Autocomplete,
  TextField,
} from "@mui/material";
import ConsultationStepper from "../components/ConsultationStepper";
import { theme } from "../theme/theme";
import { Pharmacy } from "./page";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import EastRoundedIcon from "@mui/icons-material/EastRounded";

interface PharmacyFormData {
  pharmacy: Pharmacy;
}

export default function ChoosePharmacyForm({
  pharmacies,
}: {
  pharmacies: Array<Pharmacy>;
}) {
  const router = useRouter();
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(
    null
  );
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<PharmacyFormData>();

  const onSubmit = async (formData: PharmacyFormData) => {
    if (formData.pharmacy) {
      return router.push(`/?pharmacy=${formData.pharmacy.name}`);
    }
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
            sx={{ padding: { xs: 2, sm: 6 }, marginTop: { xs: 10, md: 1 } }}
            marginTop={10}
          >
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="pharmacy" required margin="dense">
                Pick a Pharmacy for Your Consultation
              </InputLabel>
              <Controller
                name="pharmacy"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    fullWidth
                    autoHighlight
                    options={pharmacies}
                    getOptionLabel={({ name }) => name}
                    value={selectedPharmacy}
                    onChange={(_, newValue) => {
                      setSelectedPharmacy(newValue);
                      field.onChange(newValue);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value?.id
                    }
                    clearOnEscape
                    renderInput={(params) => <TextField {...params} required />}
                    renderOption={(props, option) => {
                      const { key, ...optionProps } = props;
                      return (
                        <Stack key={option.id} component="li" {...optionProps}>
                          <Typography fontSize={20}>{option.name}</Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            fontSize={16}
                          >
                            {option.board.name}
                          </Typography>
                        </Stack>
                      );
                    }}
                  />
                )}
              />
              <FormHelperText>
                ⓘ Start typing in the name of the Pharmacy this form is
                configured for ☝️
              </FormHelperText>
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
    </Stack>
  );
}
