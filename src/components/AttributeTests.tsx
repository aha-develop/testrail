import React, { useMemo, useCallback } from 'react';
import { calcTimeElapsed } from '@helpers/calcTimeElapsed';
import { isValidExternalLink } from '@helpers/isValidExternalLink';

import IconText from './IconText';
import StatusIcon from './StatusIcon';
import CardLabel from './CardLabel';

export type AttributeTestsProps = {
  project?: IProject;
  tests?: ITest[];
};

const AttributeTests = ({ tests = [], project }: AttributeTestsProps) => {
  const sortedTests = useMemo(
    () => tests.sort((a, b) => new Date(b.completed_on).getTime() - new Date(a.completed_on).getTime()),
    [tests]
  );

  const handleProjectClick = useCallback(
    (test: ITest) => {
      if (!isValidExternalLink(project?.url)) {
        return;
      }
      window.open(`${test.url}`, '_blank', 'noopener,noreferrer');
      return;
    },
    [project]
  );

  return (
    <div
      style={{
        flexGrow: 1,
        padding: '8px 0',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
      {sortedTests.map((test, index) => (
        <aha-tooltip type="popover" hover-show hover-hide style={{ width: '100%' }}>
          <div slot="trigger" style={{ width: '100%' }}>
            <aha-flex
              justify-content="space-between"
              align-items="center"
              gap="8px"
              onClick={() => handleProjectClick(test)}
              style={{ padding: '8px 0', borderTop: index === 0 ? '' : '1px solid var(--theme-light-border)' }}>
              <IconText
                icon="fa-regular fa-code-branch"
                text={test.name}
                style={{ flexGrow: 1 }}
                iconStyle={{ color: '#1082d5' }}
              />
              <StatusIcon status={test.completed_on ? 'completed' : 'created'} />
              <IconText
                icon="fa-regular fa-clock type-icon"
                text={calcTimeElapsed(test.completed_on ? test.completed_on : test.entity_created)}
                iconStyle={{ color: '#1082d5' }}
              />
            </aha-flex>
          </div>
          <aha-flex direction="column">
            <CardLabel title="Name" value={test.name} />
            <CardLabel title="Priority" value={test.case_priority} />
            <CardLabel title="Case Type" value={test.case_type} />
          </aha-flex>
        </aha-tooltip>
      ))}
    </div>
  );
};

export default AttributeTests;
