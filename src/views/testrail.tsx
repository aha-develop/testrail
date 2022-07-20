import React from 'react';
import Attribute from '@components/Attribute';

aha.on('testrailAttribute', ({ record, fields, onUnmounted }, { identifier, settings }) => {
  return <Attribute fields={fields} record={record} />;
});
