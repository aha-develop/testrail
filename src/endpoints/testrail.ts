import { getRecord } from '@helpers/getRecord';
import { saveTestToRecord } from '@helpers/saveTestToRecord';

/**
 * Webhook Listener
 *
 */
aha.on('testrailHook', async ({ headers, payload }: { payload: Webhook.Payload; headers: any }) => {
  const { event_type } = payload as Webhook.Payload;

  switch (event_type) {
    case 'created':
    case 'updated':
      await handleTestCompleted(payload);
      break;
    default:
      break;
  }
});

/**
 * Handle Build Complete Event
 *
 * @param payload
 * @returns
 */
const handleTestCompleted = async (payload: Webhook.Payload) => {
  const recordField = parsePayloadToTest(payload);
  if (!recordField) {
    return;
  }

  const [test] = Object.values(recordField?.tests ?? {});

  // Make sure the Test is linked to its record.
  let record = await getRecord(test?.refs);
  if (!record) {
    record = await getRecord(test?.name);
  }

  if (!record) {
    return;
  }

  await saveTestToRecord(record, recordField);
};

/**
 * Parse webhook payload to extension field by Resource Version
 *
 * @param payload
 * @returns
 */
const parsePayloadToTest = (payload: Webhook.Payload): IExtensionFieldTest => {
  let test: IExtensionFieldTest;

  test = {
    project: {
      id: `${payload?.project_id}`,
      name: payload?.project_id,
      url: payload?.url
    },
    tests: {
      [payload.id]: {
        id: payload?.id,
        name: payload?.name,
        description: payload?.description,
        refs: payload?.refs,
        url: payload?.url,
        event_created: Number(payload?.event_created ?? 0),
        entity_created: Number(payload?.entity_created ?? 0),
        estimate: Number(payload?.estimate ?? 0),
        completed_on: Number(payload?.completed_on ?? 0),
        case_type: payload?.case_type,
        case_priority: payload?.case_priority,
        event_type: payload?.event_type
      }
    }
  };

  return test;
};
