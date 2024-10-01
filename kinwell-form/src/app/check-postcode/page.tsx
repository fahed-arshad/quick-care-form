/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Button,
  Fade,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import ConsultationStepper from "../components/ConsultationStepper";
import { useState } from "react";
import axios from "axios";
import { LoadingButton } from "@mui/lab";

interface FormData {
  postcode: string;
  fullAddress: string;
}

export interface AddressData {
  DPA: {
    UPRN: string;
    UDPRN: string;
    ADDRESS: string;
    BUILDING_NUMBER: string;
    THOROUGHFARE_NAME: string;
    POST_TOWN: string;
    POSTCODE: string;
    RPC: string;
    X_COORDINATE: number;
    Y_COORDINATE: number;
    STATUS: string;
    LOGICAL_STATUS_CODE: string;
    CLASSIFICATION_CODE: string;
    CLASSIFICATION_CODE_DESCRIPTION: string;
    LOCAL_CUSTODIAN_CODE: 9051;
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: string;
    COUNTRY_CODE: string;
    COUNTRY_CODE_DESCRIPTION: string;
    POSTAL_ADDRESS_CODE: string;
    POSTAL_ADDRESS_CODE_DESCRIPTION: string;
    BLPU_STATE_CODE: string;
    BLPU_STATE_CODE_DESCRIPTION: string;
    TOPOGRAPHY_LAYER_TOID: string;
    WARD_CODE: string;
    LAST_UPDATE_DATE: string;
    ENTRY_DATE: string;
    BLPU_STATE_DATE: string;
    LANGUAGE: string;
    MATCH: number;
    MATCH_DESCRIPTION: string;
    DELIVERY_POINT_SUFFIX: string;
  };
}

export interface AddressDataSession {
  UPRN: string;
  UDPRN: string;
  ADDRESS: string;
  BUILDING_NUMBER: string;
  THOROUGHFARE_NAME: string;
  POST_TOWN: string;
  POSTCODE: string;
  RPC: string;
  X_COORDINATE: number;
  Y_COORDINATE: number;
  STATUS: string;
  LOGICAL_STATUS_CODE: string;
  CLASSIFICATION_CODE: string;
  CLASSIFICATION_CODE_DESCRIPTION: string;
  LOCAL_CUSTODIAN_CODE: 9051;
  LOCAL_CUSTODIAN_CODE_DESCRIPTION: string;
  COUNTRY_CODE: string;
  COUNTRY_CODE_DESCRIPTION: string;
  POSTAL_ADDRESS_CODE: string;
  POSTAL_ADDRESS_CODE_DESCRIPTION: string;
  BLPU_STATE_CODE: string;
  BLPU_STATE_CODE_DESCRIPTION: string;
  TOPOGRAPHY_LAYER_TOID: string;
  WARD_CODE: string;
  LAST_UPDATE_DATE: string;
  ENTRY_DATE: string;
  BLPU_STATE_DATE: string;
  LANGUAGE: string;
  MATCH: number;
  MATCH_DESCRIPTION: string;
  DELIVERY_POINT_SUFFIX: string;
}

export default function CheckPostcode() {
  const [loading, setLoading] = useState<boolean>(false);
  const [display, setDisplay] = useState<string>("none");
  const [addressOptions, setAddressOptions] = useState<AddressData[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (formData: FormData) => {
    try {
      if (formData.fullAddress) {
        sessionStorage.clear();
        sessionStorage.setItem("address", formData.fullAddress);
        return router.push("/describe-symptoms");
      }
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/postcode-check`,
        {
          postcode: formData.postcode,
        }
      );
      if (data === false) {
        setLoading(false);
        return setError("postcode", {
          type: "validate",
          message:
            "Sorry! We only offer these services in Scotland. If you have any concerns, KinWell Pharmacy staff are always happy to help.",
        });
      }
      const addresses = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/os-places`,
        {
          postcode: formData.postcode,
        }
      );
      setAddressOptions(addresses.data);
      setDisplay("block");
      setLoading(false);
    } catch (error) {}
  };

  return (
    <Stack alignItems="center" marginTop={5}>
      <ConsultationStepper activeStep={0} />
      <Fade in timeout={300}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid container spacing={2} padding={2}>
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="postcode" required margin="dense">
                To find out if you&apos;re eligible for these NHS services,
                please provide your postcode.
              </InputLabel>
              <TextField
                id="postcode"
                fullWidth
                required
                slotProps={{
                  htmlInput: {
                    style: { textTransform: "uppercase" },
                  },
                }}
                {...register("postcode", {
                  required: true,
                  pattern:
                    /^\s*(([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2}))\s*$/,
                })}
                placeholder="Enter postcode (e.g. IV12 4AG)"
                error={errors.postcode ? true : false}
                onChange={() => {
                  setDisplay("none");
                }}
                helperText={
                  errors.postcode?.type === "pattern"
                    ? "Please provide a valid UK postcode"
                    : errors.postcode?.type === "validate"
                    ? errors.postcode.message
                    : null
                }
              ></TextField>
            </Grid>
            {display === "block" && (
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth sx={{ height: "100%" }}>
                  <InputLabel id="address-label">
                    Select your address *
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="address-label"
                    label="Select your address *"
                    required
                    {...register("fullAddress", { required: true })}
                    sx={{
                      backgroundColor: "white",
                      whiteSpace: "normal!important",
                      "& .MuiSelect-select": { whiteSpace: "normal!important" },
                    }}
                    error={!!errors.fullAddress?.message}
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                  >
                    {addressOptions.map((address, index) => (
                      <MenuItem
                        key={index}
                        value={JSON.stringify(address.DPA)}
                        sx={{ whiteSpace: "normal", fontSize: "24px" }}
                      >
                        {address?.DPA?.ADDRESS}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.fullAddress?.message ? (
                    <FormHelperText>
                      <Typography color="error">
                        Please select an address
                      </Typography>
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>
            )}

            <Grid
              container
              size={{ xs: 12 }}
              spacing={2}
              direction={{ xs: "row-reverse" }}
            >
              <Grid size={{ md: 6, xs: 12 }}>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  loading={loading}
                  endIcon={<EastRoundedIcon />}
                >
                  {display === "block" ? "Next" : "Check"}
                </LoadingButton>
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
                    router.push("/");
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
