import { parsePrices, templateParser } from '../utils';
import template from './openstack-tenant-prices.html';

export const openstackFlavorColumns = [
  {
    name: 'name',
    label: 'Flavor'
  },
  {
    name: 'cores',
    label: 'vCPU'
  },
  {
    name: 'ram',
    label: 'RAM',
    filter: 'filesize'
  },
  {
    name: 'disk',
    label: 'Storage',
    filter: 'filesize'
  },
  {
    name: 'dailyPrice',
    label: '1 day',
    filter: 'defaultCurrency'
  },
  {
    name: 'monthlyPrice',
    label: '1 month',
    filter: 'defaultCurrency'
  },
  {
    name: 'annualPrice',
    label: '1 year',
    filter: 'defaultCurrency'
  }
];

const parseFlavors = (prices, flavors) => {
  return flavors.map(flavor => {
    const { name, cores, ram, disk } = flavor;
    const cpuPrice = cores * prices.cores;
    const ramPrice = ram * prices.ram;
    const diskPrice = disk * prices.disk;
    const dailyPrice = cpuPrice + ramPrice + diskPrice;
    const monthlyPrice = dailyPrice * 30;
    const annualPrice = dailyPrice * 365;
    return {
      name,
      cores,
      ram,
      disk,
      dailyPrice,
      monthlyPrice,
      annualPrice,
    };
  });
};

const openstackTenantPrices = {
  template,
  bindings: {
    provider: '<'
  },
  controller: class OpenstackTenantPricesController {
    // @ngInject
    constructor($q, packageTemplatesService, openstackFlavorsService) {
      this.$q = $q;
      this.packageTemplatesService = packageTemplatesService;
      this.openstackFlavorsService = openstackFlavorsService;
      this.columns = openstackFlavorColumns;
    }

    $onInit() {
      this.loading = true;
      this.loadData().finally(this.loading = false);
    }

    loadData() {
      return this.$q.all([
        this.loadTemplate(), this.loadFlavors()
      ])
      .then(([template, flavors]) => {
        this.template = templateParser(template);
        this.prices = parsePrices(template.components);
        this.flavors = parseFlavors(this.prices, flavors);
      })
      .catch(response => {
        this.error = response.data;
      });
    }

    loadFlavors() {
      return this.openstackFlavorsService.getAll({
        settings: this.provider.settings
      });
    }

    loadTemplate() {
      return this.packageTemplatesService.getAll({
        openstack_package_service_settings_uuid: this.provider.settings_uuid
      }).then(templates => {
        if (templates.length !== 1) {
          return this.$q.reject({
            data: 'Provider package is not defined.'
          });
        } else {
          return templates[0];
        }
      });
    }
  }
};

export default openstackTenantPrices;
