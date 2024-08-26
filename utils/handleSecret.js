import { makeAdmin, makeMember } from '#src/db/queries/secretQueries.js';

const handleSecret = async (secret, userID, req) => {
  const isSecret = secret === process.env.SECRET;
  const isAdminSecret = secret === process.env.ADMIN_SECRET;

  if (isSecret) {
    await makeMember(userID);
    if (req) {
      req.user = { ...req.user, is_member: true };
    }
  }

  if (isAdminSecret) {
    await makeAdmin(userID);
    if (req) {
      req.user = { ...req.user, is_admin: true };
    }
  }

  return isSecret || isAdminSecret;
};

export default handleSecret;
