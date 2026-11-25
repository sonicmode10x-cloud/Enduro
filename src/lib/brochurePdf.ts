import { generateMasterBrochurePdf } from "./masterBrochurePdf";

export async function downloadHimalayanBrochurePdf(): Promise<void> {
  await generateMasterBrochurePdf("general");
}
