declare namespace Webhook {
  interface Payload {
    id: string;
    name: string;
    description: string;
    assigned_to: string;
    case_priority: string;
    case_type: string;
    completed_on: number;
    config: string;
    custom_x: string;
    due_on: number;
    entity_created: number;
    entity_creator: string;
    estimate: number;
    event_created: number;
    event_creator: string;
    event_type: string;
    is_deleted: string;
    milestone_id: string;
    more_info: string;
    project_id: string;
    refs: string;
    section_id: string;
    stats: string;
    suite_id: string;
    template_name: string;
    url: string;
    secret: string;
  }
}
