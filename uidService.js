// uidService.js

export function generateUserId() {
  return crypto.randomUUID();
}
