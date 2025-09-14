-- Enums
CREATE TYPE "ProposalStatus" AS ENUM ('draft', 'submitted', 'approved', 'rejected');

-- Proposal table
CREATE TABLE "Proposal" (
  "id" TEXT PRIMARY KEY,
  "projectId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "status" "ProposalStatus" NOT NULL DEFAULT 'draft',
  "publicToken" TEXT NOT NULL,
  "submittedAt" TIMESTAMP(3),
  "approvedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Proposal_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "Proposal_publicToken_key" ON "Proposal"("publicToken");
CREATE INDEX "Proposal_projectId_idx" ON "Proposal"("projectId");

-- ProposalItem table
CREATE TABLE "ProposalItem" (
  "id" TEXT PRIMARY KEY,
  "proposalId" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "qty" INTEGER NOT NULL,
  "unitPriceCents" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ProposalItem_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "ProposalItem_proposalId_idx" ON "ProposalItem"("proposalId");

