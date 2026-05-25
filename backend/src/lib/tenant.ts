export function withTenant(
  companyId: number,
  extraWhere = {}
) {
  return {
    companyId,
    ...extraWhere
  }
}