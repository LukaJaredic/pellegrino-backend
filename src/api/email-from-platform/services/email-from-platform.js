'use strict';

/**
 * email-from-platform service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::email-from-platform.email-from-platform');
