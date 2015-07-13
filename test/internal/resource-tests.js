var auth = require('../helpers/auth.js'),
  helpers = require('../helpers/helpers.js'),
  testData = [
    {
      user: auth.getUser('Charlie'),
      project: 'bells.org',
      service: 'Stratus',
      template: 'CentOS 7 64-bit',
      flavor: 'RAM: 0.5 GB',
      customer: 'Ministry of Bells'
    },
    {
      user: auth.getUser('Dave'),
      project: 'whistles.org',
      service: 'Cumulus',
      template: 'Windows 3.11 jWxL',
      flavor: 'RAM: 4 GB',
      customer: 'Ministry of Whistles'
    },
  ];

for(var i = 0; i < testData.length; i++) {
  var data = testData[i],
    user = data.user,
    resourceName = helpers.getUUID();

  (function(user, data, resourceName) {
    describe('Resource creation test for administrator(' + user.username + '):', function() {

      it('I should be able to login', function() {
        auth.login(user);
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/dashboard/');
      });

      it('I should be able to go to "resource add" page', function() {
        helpers.chooseCustomer(data.customer);
        element(by.cssContainingText('ul.nav-list.views li a', 'Resources')).click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/resources/');

        element(by.cssContainingText('li.right-sort span', 'Add resource')).click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/appstore/');
      });

      it('I should be able to add new resource', function() {
        element(by.model('AppStore.instance.name')).sendKeys(resourceName);
        // choose project
        element(by.cssContainingText('option', data.project)).click();
        // choose service
        element(by.cssContainingText('h3', data.service)).click();
        // choose template
        element(by.cssContainingText('option', data.template)).click();
        // choose flavor
        element(by.cssContainingText('li', data.flavor)).click();

        element(by.cssContainingText('a.button-apply', 'Checkout')).click();

        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/resources/');
      });

      it('I should be able to find added resource in resource list', function() {
        element(by.model('entityList.searchInput')).sendKeys(resourceName);
        expect(element(by.cssContainingText('h3.item-title a', resourceName)).isPresent()).toBe(true);
      });

      it('I should be able to logout', function() {
        auth.logout();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/');
      });

    });
  })(user, data, resourceName);

}

var customer = 'Ministry of Bells';
describe('Resource pagination test for Alice :', function() {

  var user = auth.getUser('Alice');

  it('I should be able to login', function() {
    auth.login(user);
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/dashboard/');
  });

  it('I should see 10 elements on page by default', function() {
    // Go to resources list
    helpers.chooseCustomer(customer);
    element(by.cssContainingText('ul.nav-list.views li a', 'Resources')).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/resources/');
    // checks elements count on page
    var elements = element.all(by.css('h3.item-title'));
    expect(elements.count()).toEqual(10);
  });

  it('After click on pagination size 5 I should see 5 elements on page', function() {
    // choose pagination size: 5
    element(by.cssContainingText('.pagination .column.right a', '5')).click();
    // check elements count on page
    var elements = element.all(by.css('h3.item-title'));
    expect(elements.count()).toEqual(5);
  });

  it('When I go to next page I need to see another 5 elements', function() {
    // Go to next page
    element(by.cssContainingText('div.pagination a', '2')).click();
    // check elements count on page
    var elements = element.all(by.css('h3.item-title'));
    expect(elements.count()).toEqual(5);
  });

  it('I should be able to logout', function() {
    auth.logout();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/');
  });


});
