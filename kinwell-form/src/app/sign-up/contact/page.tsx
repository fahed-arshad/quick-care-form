import { getGpSurgeries } from "../../api/surgery/getGpSurgeries";
import SignUpContactForm from "./SignUpContactForm";

export type GpSurgery = {
  id: number;
  gpPracticeName: string;
  addressLine4: string;
  addressLine3: string;
};

export default async function SignUpContactPage() {
  // Fetch GP surgeries on the server side
  const gpSurgeries: Array<GpSurgery> = await getGpSurgeries();

  const unknownGpSurgery: GpSurgery = {
    id: 0,
    gpPracticeName: "I don't know my GP surgery",
    addressLine3: "Select this if you don't know your GP surgery",
    addressLine4: "Select this if you don't know your GP surgery",
  };

  // Sort surgeries: unknown first, then Nairn, then the rest alphabetically
  const gpSurgeriesWithManualOptions = [
    unknownGpSurgery,
    ...gpSurgeries.sort((a, b) => {
      if (a.gpPracticeName === "Nairn Healthcare Group") return -1;
      if (b.gpPracticeName === "Nairn Healthcare Group") return 1;
      return a.gpPracticeName.localeCompare(b.gpPracticeName);
    }),
  ];

  return <SignUpContactForm gpSurgeries={gpSurgeriesWithManualOptions} />;
}
