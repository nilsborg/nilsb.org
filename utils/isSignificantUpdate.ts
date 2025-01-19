export function isSignificantUpdate(
  createdTime: string,
  editedTime: string,
): boolean {
  const created = new Date(createdTime).getTime();
  const edited = new Date(editedTime).getTime();
  const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  return edited - created > ONE_DAY;
}
