/**
 * reservation controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::reservation.reservation', ({ strapi }) => ({
  async create(ctx) {
    // Call the default create
    const response = await super.create(ctx);
    // Ensure code is included in the response
    if (response?.data?.attributes && ctx.request.body?.data) {
      response.data.attributes.code = response.data.attributes.code ?? null;
    }
    return response;
  },
  async findOne(ctx) {
    const response = await super.findOne(ctx);
    if (response?.data?.attributes) {
      response.data.attributes.code = response.data.attributes.code ?? null;
    }
    return response;
  },
  async find(ctx) {
    const response = await super.find(ctx);
    if (response?.data) {
      response.data = response.data.map((item) => {
        if (item?.attributes) {
          item.attributes.code = item.attributes.code ?? null;
        }
        return item;
      });
    }
    return response;
  },
}));
