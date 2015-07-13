var auth = require('../helpers/auth.js'),
  helpers = require('../helpers/helpers.js'),
  testData = [
    {
      user: auth.getUser('Charlie'),
      projects: ['bells.org'],
      customer: 'Ministry of Bells'
    },
    {
      user: auth.getUser('Bob'),
      projects: ['bells.org'],
      customer: 'Ministry of Bells'
    }
  ];

for(var i = 0; i < testData.length; i++) {
  var data = testData[i];

  (function(user, projects, customer) {
    describe('Project list test for user ' + user.username + ':', function() {

      it('I should be able to login', function() {
        auth.login(user);
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/dashboard/');
      });

      it('I should be able to go to projects list', function() {
        element(by.css('.dropdown.project-dropdown .project-context')).click();
        element(by.cssContainingText('.dropdown.project-dropdown .nav-sublist li a', 'Manage projects')).click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/projects/');
        helpers.chooseCustomer(customer);
      });


      for(var j = 0; j < data.projects.length; j++) {
        (function(project) {
          it('I should be able to see ' + project + ' at projects list page', function() {
            element(by.model('ProjectList.searchInput')).sendKeys(project);
            expect(element(by.cssContainingText('h3.item-title a', project)).isPresent()).toBe(true);
          });
        })(data.projects[j]);
      }

      it('I should be able to logout', function() {
        auth.logout();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/');
      });

    });
  })(data.user, data.projects, data.customer);

}

var addProjectTestData = [
  {
    user: auth.getUser('Walter'),
    customer: 'Ministry of Whistles'
  },
  {
    user: auth.getUser('Alice'),
    customer: 'Ministry of Bells'
  }
];

for(var i = 0; i < addProjectTestData.length; i++) {
  var data = addProjectTestData[i],
    user = data.user,
    projectName = helpers.getUUID();

  (function(data, user, projectName) {
    describe('Project creation test for customer owner(' + user.username + '):', function() {
      it('I should be able to login', function() {
        auth.login(user);
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/dashboard/');
        helpers.chooseCustomer(data.customer);
      });

      it('I should be able to go to "project add" page', function() {
        element(by.css('.dropdown.project-dropdown .project-context')).click();
        element(by.cssContainingText('.dropdown.project-dropdown .nav-sublist li a', 'Manage projects')).click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/projects/');

        element(by.css('li.add-something > a')).click();
        element(by.cssContainingText('li.add-something li a.project', 'Add project')).click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/projects/add/');
      });

      it('I should be able to add new project', function() {
        // fill name
        element(by.model('ProjectAdd.project.name')).sendKeys(projectName);

        element(by.cssContainingText('a.button-apply', 'Create project')).click();

        expect(element(by.cssContainingText('h2.app-title', projectName)).isPresent()).toBe(true);
      });

      it('I should be able to see ' + projectName + ' at projects list page', function() {
        element(by.css('.dropdown.project-dropdown .project-context')).click();
        element(by.cssContainingText('.dropdown.project-dropdown .nav-sublist li a', 'Manage projects')).click();
        element(by.model('ProjectList.searchInput')).sendKeys(projectName);
      });

      it('I should be able to logout', function() {
        auth.logout();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/');
      });
    });
  })(data, user, projectName);
}

var addUserToProjectTestData = [
  {
    user: auth.getUser('Walter'),
    customer: 'Ministry of Bells',
    adminUser: 'Alice Lebowski',
    managerUser: 'Charlie Lebowski'
  }
];

for(var i = 0; i < addUserToProjectTestData.length; i++) {
  var data = addUserToProjectTestData[i],
    user = data.user,
    projectUrl;

  (function(data, user) {
    describe('Customer owner(' + user.username + ') should be able to add user to project:', function() {
      it('I should be able to login', function() {
        auth.login(user);
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/dashboard/');
      });

      it('I should be able to go to "users tab" at project "' + projectName + '"', function() {
        helpers.chooseCustomer(data.customer);
        element(by.css('.dropdown.project-dropdown .project-context')).click();
        element(by.cssContainingText('.dropdown.project-dropdown .nav-sublist li a', 'Manage projects')).click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/projects/');
        element(by.model('ProjectList.searchInput')).sendKeys(projectName);
        element(by.cssContainingText('h3.item-title', projectName)).click();
        projectUrl = browser.getCurrentUrl();

        element(by.cssContainingText('.tabs-nav li', 'Users')).click();
        expect(element(by.cssContainingText('.add-or-remove .app-title', 'Administrator')).isPresent()).toBe(true);
      });

      it('I should be able to add user to project', function() {
        element(by.css('#admin input')).sendKeys(data.adminUser);
        element(by.cssContainingText('#admin .angucomplete-row .angucomplete-title', data.adminUser)).click();
        expect(element(by.cssContainingText('.add-or-remove .added', data.adminUser)).isPresent()).toBe(true);
        element(by.cssContainingText('.add-or-remove .added', data.adminUser)).click();
        browser.switchTo().alert().accept();
        expect(element(by.cssContainingText('.add-or-remove .added', data.adminUser)).isPresent()).toBe(false);

        element(by.css('#manager input')).sendKeys(data.managerUser);
        element(by.cssContainingText('#manager .angucomplete-row .angucomplete-title', data.managerUser)).click();
        expect(element(by.cssContainingText('.add-or-remove .added', data.managerUser)).isPresent()).toBe(true);
        element(by.cssContainingText('.add-or-remove .added', data.managerUser)).click();
        browser.switchTo().alert().accept();
        expect(element(by.cssContainingText('.add-or-remove .added', data.managerUser)).isPresent()).toBe(false);
      });

      it('I should be able to logout', function() {
        auth.logout();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/');
      });
    });
  })(data, user);
}
