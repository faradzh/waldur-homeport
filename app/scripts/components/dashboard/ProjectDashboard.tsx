import * as React from 'react';

import { withFeature, FeatureProps } from '@waldur/features/connect';
import { connectAngularComponent } from '@waldur/store/connect';

import { ProjectChart } from './chart/ProjectChart';
import { ProjectEventsFeed } from './ProjectEventsFeed';
import { Project } from './types';

interface Props extends FeatureProps {
  project: Project;
}

const PureProjectDashboard = ({ project }: Props) => (
  <div className="wrapper wrapper-content m-l-n">
    <ProjectChart project={project} />
    <div className="row">
      <div className="col-md-6">
        <ProjectEventsFeed project={project} />
      </div>
    </div>
  </div>
);

const ProjectDashboard = withFeature(PureProjectDashboard);

export {
  PureProjectDashboard,
  ProjectDashboard,
};

export default connectAngularComponent(ProjectDashboard, ['project']);
