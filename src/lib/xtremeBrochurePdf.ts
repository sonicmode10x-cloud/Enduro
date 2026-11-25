import { generateMasterBrochurePdf } from "./masterBrochurePdf";

export {
  CHAMPIONSHIP_EXPERIENCES,
  COMMERCIAL_ECOSYSTEM_ITEMS,
  XTREME_DIGITAL_DELIVERABLES,
  XTREME_TITLE_PILLARS
} from "../data/brochureData";

export async function downloadXtremeTitleSponsorBrochurePdf(): Promise<void> {
  await generateMasterBrochurePdf("xtreme");
}
