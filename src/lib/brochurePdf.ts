import { generateMasterBrochurePdf } from "./masterBrochurePdf";
import { PrivateRateCard } from "../types/xtremeProposal";

export async function downloadHimalayanBrochurePdf(
  privateRateCard?: PrivateRateCard | null
): Promise<void> {
  await generateMasterBrochurePdf("general", undefined, privateRateCard);
}
