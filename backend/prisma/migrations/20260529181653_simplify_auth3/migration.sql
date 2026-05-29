-- AlterTable
ALTER TABLE "refresh_tokens" ADD COLUMN     "browser" VARCHAR(50),
ADD COLUMN     "deviceName" VARCHAR(255),
ADD COLUMN     "lastUsedAt" TIMESTAMP(3),
ADD COLUMN     "os" VARCHAR(50),
ADD COLUMN     "revokedReason" VARCHAR(255);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "mfaEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mfaSecret" TEXT;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
