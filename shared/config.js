const config = {
  buildUri(subscription, resourceGroup, appName, command) {
    return `/subscriptions/${subscription}/resourceGroups/${resourceGroup}/providers/Microsoft.Web/staticSites/${appName}/config/${command}?api-version=2019-12-01-preview`;
  },
};

module.exports = config;
