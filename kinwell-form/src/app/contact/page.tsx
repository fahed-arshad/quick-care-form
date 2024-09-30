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

  return <ContactForm gpSurgeries={gpSurgeries} />;
}
