import { makeAdmin, makeMember } from '../db/queries/secretQueries.js';

const handleSecret = async (secret, userID) => {
  const isSecret = secret === process.env.SECRET;
  const isAdminSecret = secret === process.env.ADMIN_SECRET;

  if (isSecret) {
    await makeMember(userID);
  }

  if (isAdminSecret) {
    await makeAdmin(userID);
  }

  return isSecret || isAdminSecret;
};

export default handleSecret;
