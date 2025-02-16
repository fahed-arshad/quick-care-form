import { getPharmacies } from "../api/pharmacies/getPharmacies";
import ChoosePharmacyForm from "./ChoosePharmacy";

export interface Pharmacy {
  id: number;
  name: string;
  email: string;
  gphcNumber: string;
  superIntendentRegNumber: string;
  phoneNumber: string;
  package: string;
  board: { id: number; name: string };
}

export default async function ChoosePharmacyPage() {
  const pharmacies: Array<Pharmacy> = await getPharmacies();

  return <ChoosePharmacyForm pharmacies={pharmacies} />;
}
