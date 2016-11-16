import sparkline from './components/sparkline/sparkline';
import visibleIf from './components/visibleIf/visibleIf';
import appstoreCategorySelector from './components/appstore/category-selector';
import teamModule from './components/team/module';
import issuesModule from './components/issues/module';
import userModule from './components/user/module';
import providersModule from './components/providers/module';
import projectModule from './components/project/module';
import actionsModule from './components/actions/module';
import navigationModule from './components/navigation/module';
import resourceModule from './components/resource/module';
import invoicesModule from './components/invoices/module';
import authModule from './components/auth/module';

const module = angular.module('ncsaas');

module.directive('sparkline', sparkline);
module.directive('visibleIf', visibleIf);
module.directive('appstoreCategorySelector', appstoreCategorySelector);
teamModule(module);
issuesModule(module);
userModule(module);
providersModule(module);
projectModule(module);
actionsModule(module);
navigationModule(module);
resourceModule(module);
invoicesModule(module);
authModule(module);
