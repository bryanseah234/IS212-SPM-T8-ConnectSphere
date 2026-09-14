export const MODULE_KEYS = [
  'accessControl',
  'eventLifecycle',
  'venueBooking',
  'equipmentSupport',
  'registration',
  'changeManagement',
  'notificationDispatcher',
  'auditHistory',
] as const;

export type ModuleKey = (typeof MODULE_KEYS)[number];

export type ModuleDefinition = {
  key: ModuleKey;
  displayName: string;
  responsibility: string;
};

export const MODULE_REGISTRY: Record<ModuleKey, ModuleDefinition> = {
  accessControl: {
    key: 'accessControl',
    displayName: 'Identity and Access Control',
    responsibility: 'Authenticate users, expose roles, and enforce client-organisation scoping.',
  },
  eventLifecycle: {
    key: 'eventLifecycle',
    displayName: 'Event Lifecycle',
    responsibility: 'Own event request status changes and lifecycle business rules.',
  },
  venueBooking: {
    key: 'venueBooking',
    displayName: 'Venue and Booking',
    responsibility: 'Own venue catalogue, availability, suitability, and booking decisions.',
  },
  equipmentSupport: {
    key: 'equipmentSupport',
    displayName: 'Equipment and Support',
    responsibility: 'Own equipment requests, reservations, shortfalls, and support assignment.',
  },
  registration: {
    key: 'registration',
    displayName: 'Attendee Registration',
    responsibility: 'Own event publication, registration, waitlists, withdrawal, and attendance.',
  },
  changeManagement: {
    key: 'changeManagement',
    displayName: 'Change Management',
    responsibility: 'Own post-approval change requests and arrangement impact detection.',
  },
  notificationDispatcher: {
    key: 'notificationDispatcher',
    displayName: 'Notification Dispatcher',
    responsibility: 'Create durable notification deliveries and relay committed jobs to the queue.',
  },
  auditHistory: {
    key: 'auditHistory',
    displayName: 'Audit and History',
    responsibility: 'Append significant business actions to the immutable audit trail.',
  },
};
