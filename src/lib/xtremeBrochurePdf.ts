import { generateMasterBrochurePdf } from "./masterBrochurePdf";
import { XtremeProposalContent } from "../types/xtremeProposal";

export async function downloadXtremeTitleSponsorBrochurePdf(
  xtremeContent: XtremeProposalContent
): Promise<void> {
  await generateMasterBrochurePdf("xtreme", xtremeContent);
}
