import React, { useMemo } from 'react';
import AttributeTests from './AttributeTests';
import AttributeProject from './AttributeProject';
import EmptyState from './EmptyState';

export type AttributeProps = {
  record: Aha.RecordUnion;
  fields: IExtensionFields;
};

const Attribute = ({ fields, record }: AttributeProps) => {
  const hasPipelines = useMemo(() => Object.keys(fields ?? {}).length > 0, [fields]);

  return (
    <aha-flex align-items="left" direction="column" gap="5px" style={{ padding: '0 5px' }}>
      {hasPipelines ? (
        <>
          {Object.values(fields).map((field, index) => {
            return (
              <div key={index}>
                <AttributeProject project={field.project} />
                <AttributeTests tests={Object.values(field?.tests ?? [])} project={field.project} />
              </div>
            );
          })}
        </>
      ) : (
        <EmptyState record={record} />
      )}
    </aha-flex>
  );
};

export default Attribute;
