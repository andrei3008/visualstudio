CREATE TABLE "File" (
  "id" TEXT PRIMARY KEY,
  "projectId" TEXT NOT NULL,
  "uploaderId" TEXT NOT NULL,
  "originalName" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "size" INTEGER NOT NULL,
  "isInternal" BOOLEAN NOT NULL DEFAULT false,
  "path" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "File_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "File_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX "File_projectId_idx" ON "File"("projectId");
CREATE INDEX "File_uploaderId_idx" ON "File"("uploaderId");

