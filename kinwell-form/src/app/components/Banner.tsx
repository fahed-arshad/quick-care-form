import { Box, Typography, Grid2 as Grid, useTheme } from "@mui/material";

export default function Banner() {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        marginTop: { xs: 2 },
        marginBottom: { xs: 2 },
        backgroundColor: theme.palette.primary.light,
      }}
    >
      <Grid
        size={{ xs: 12, sm: 8, md: 10 }}
        sx={{
          padding: { xs: 2, sm: 6 },
        }}
      >
        <Typography color="white">
          New to KinWell Pharmacy? Switch today and enjoy a quick, hassle-free
          sign-up!
        </Typography>
      </Grid>
      <Grid
        size={{ xs: 12, sm: 4, md: 2 }}
        sx={{
          display: { xs: "none", sm: "flex" },
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: theme.palette.primary.main,
          borderTopLeftRadius: "100px",
          borderBottomLeftRadius: "100px",
        }}
      >
        <Box
          component="img"
          src="https://i.imgur.com/VWiRroB.png"
          height="100%"
          maxHeight="120px"
        ></Box>
      </Grid>
    </Grid>
  );
}
