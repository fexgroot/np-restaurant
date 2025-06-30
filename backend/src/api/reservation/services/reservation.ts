/**
 * reservation service
 */

import { factories } from "@strapi/strapi";

function generateRandomCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

export default factories.createCoreService("api::reservation.reservation", ({ strapi }) => ({
  async create(params) {
    let code;
    let isUnique = false;
    // Try to generate a unique code
    while (!isUnique) {
      code = generateRandomCode();
      const existing = await strapi.entityService.findMany("api::reservation.reservation", {
        filters: { code },
      });
      if (!existing || existing.length === 0) {
        isUnique = true;
      }
    }
    // Attach the code to the data
    params.data.code = code;
    // Create the reservation
    const reservation = await super.create(params);
    // Optionally, trigger email sending here if not handled elsewhere
    return reservation;
  },
}));
