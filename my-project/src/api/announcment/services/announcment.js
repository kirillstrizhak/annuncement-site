'use strict';

/**
 * announcment service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::announcment.announcment');
