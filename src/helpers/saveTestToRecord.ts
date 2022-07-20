import { IDENTIFIER } from './config';
import { setExtensionFields } from './setExtensionFields';

/**
 * Save Test Data to Record Field
 *
 * @param record
 * @param test
 */
export const saveTestToRecord = async (record: Aha.RecordUnion, test: IExtensionFieldTest): Promise<void> => {
  if (!test?.project?.id) {
    throw new Error('Undefined Project Id');
  }
  const oldTest: IExtensionFieldTest = await record.getExtensionField(IDENTIFIER, test.project.id);
  if (oldTest) {
    test = {
      ...oldTest,
      tests: {
        ...oldTest.tests,
        ...test.tests
      }
    };
  }

  await setExtensionFields(record, {
    [test.project.id]: test
  });
};
