declare interface IExtensionFields {
  [index: string]: IExtensionFieldTest;
}

declare interface IExtensionFieldTest {
  project?: IProject;
  tests?: {
    [index: string]: ITest;
  };
}

declare interface IProject {
  id: string;
  name?: string;
  url?: string;
}

declare interface ITest {
  id: string;
  name?: string;
  description?: string;
  event_created?: number;
  estimate?: number;
  entity_created?: number;
  due_on?: number;
  completed_on?: number;
  case_type?: string;
  url?: string;
  refs?: string;
  case_priority?: string;
  event_type?: string;
}
