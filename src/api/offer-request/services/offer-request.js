'use strict';

/**
 * offer-request service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::offer-request.offer-request');
