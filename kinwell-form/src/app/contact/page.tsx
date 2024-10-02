import { getGpSurgeries } from "../api/surgery/getGpSurgeries";
import ContactForm from "./ContactForm";

export type GpSurgery = {
  id: number;
  gpPracticeName: string;
  addressLine4: string;
  addressLine3: string;
};

export default async function OnboardFormPage() {
  // Fetch GP surgeries on the server side
  const gpSurgeries: Array<GpSurgery> = await getGpSurgeries();

  const unknownGpSurgery: GpSurgery = {
    id: 0,
    gpPracticeName: "I don't know my GP surgery",
    addressLine3: "Select this if you don't know your GP surgery",
    addressLine4: "Select this if you don't know your GP surgery",
  };

  const gpSurgeriesWithManualOptions = [unknownGpSurgery, ...gpSurgeries];

  return <ContactForm gpSurgeries={gpSurgeriesWithManualOptions} />;
}
