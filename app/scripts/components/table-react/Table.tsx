import * as React from 'react';

import { LoadingSpinner } from '@waldur/core/LoadingSpinner';
import { TranslateProps } from '@waldur/i18n/types';

import TableInfo from './TableInfo';
import TablePagination from './TablePagination';
import TableBody from './TableBody';
import TableButtons from './TableButtons';
import TableRefreshButton from './TableRefreshButton';
import TableHeader from './TableHeader';
import TablePlaceholder from './TablePlaceholder';
import TableQuery from './TableQuery';
import { Column, Pagination, TableState } from './types';

type Props = TranslateProps & TableState & {
  fetch: () => void,
  gotoPage?: (page: number) => void,
  hasQuery?: boolean,
  setQuery?: (query: string) => void,
  columns?: Array<Column>,
  exportAs?: Function,
  actions?: React.ReactNode,
  verboseName?: string,
};

class Table extends React.Component<Props> {
  static defaultProps = {
    rows: [],
    columns: [],
    hasQuery: false,
  };

  render() {
    return (
      <div className='dataTables_wrapper'>
        <TableButtons {...this.props}/>
        {this.props.hasQuery && (
          <TableQuery
            query={this.props.query}
            setQuery={this.props.setQuery}
            translate={this.props.translate}/>
        )}
        <TableInfo {...this.props.pagination} translate={this.props.translate}/>
        {this.renderBody()}
        <TablePagination
          {...this.props.pagination}
          gotoPage={this.props.gotoPage}
          translate={this.props.translate}/>
      </div>
    );
  }

  renderBody() {
    if (this.props.loading) {
      return <LoadingSpinner/>;
    }

    if (this.props.error) {
      return (
        <div>
          <p>{this.props.translate('Unable to fetch data.')}</p>
          <TableRefreshButton {...this.props}/>
        </div>
      );
    }

    if (this.props.rows.length === 0) {
      return (
        <TablePlaceholder
          query={this.props.query}
          verboseName={this.props.verboseName}
          translate={this.props.translate}/>
      );
    }

    return (
      <table className='table table-striped dataTable'>
        <TableHeader columns={this.props.columns}/>
        <TableBody rows={this.props.rows} columns={this.props.columns}/>
      </table>
    );
  }

  componentWillMount() {
    this.props.fetch();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.pagination.currentPage !== this.props.pagination.currentPage) {
      this.props.fetch();
    }
    if (nextProps.query !== this.props.query) {
      this.props.fetch();
    }
  }
}

export default Table;