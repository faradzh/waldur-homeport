export default class ExpertBidUtilsService {
  // @ngInject
  constructor($rootScope, expertBidsService, ncUtilsFlash) {
    this.$rootScope = $rootScope;
    this.expertBidsService = expertBidsService;
    this.ncUtilsFlash = ncUtilsFlash;
  }

  acceptBid(bid_url) {
    return this.expertBidsService.accept(bid_url).then(() => {
      this.expertBidsService.clearAllCacheForCurrentEndpoint();
      this.$rootScope.$broadcast('reloadExpertRequest');
    }).catch(response => {
      this.ncUtilsFlash.errorFromResponse(response, gettext('Proposal could not be accepted.'));
    });
  }

  deleteBid(bid_url) {
    if (!confirm(gettext('Do you really want to delete this proposal? This action cannot be undone.'))) {
      return;
    }
    return this.expertBidsService.$deleteByUrl(bid_url).then(() => {
      this.expertBidsService.clearAllCacheForCurrentEndpoint();
      this.$rootScope.$broadcast('reloadExpertRequest');
    }).catch(response => {
      this.ncUtilsFlash.errorFromResponse(response, gettext('Proposal could not be cancelled.'));
    });
  }
}
