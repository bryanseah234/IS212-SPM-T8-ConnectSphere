import {
  Bell,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Database,
  Mail,
  MapPinned,
  Server,
  Settings2,
  Users,
  Wrench,
} from 'lucide-react';

type StatusTone = 'success' | 'warning' | 'info' | 'danger';

type WorkItem = {
  id: string;
  title: string;
  owner: string;
  status: string;
  tone: StatusTone;
  due: string;
};

const queueItems: WorkItem[] = [
  {
    id: 'E02-S01',
    title: 'Annual sustainability forum',
    owner: 'Event Organiser',
    status: 'Awaiting review',
    tone: 'warning',
    due: 'Today',
  },
  {
    id: 'E05-S04',
    title: 'Venue suitability check',
    owner: 'Venue Staff',
    status: 'Conflict found',
    tone: 'danger',
    due: 'Tomorrow',
  },
  {
    id: 'E07-S01',
    title: 'AV equipment reservation',
    owner: 'Technical Support',
    status: 'Partially reserved',
    tone: 'info',
    due: 'Fri',
  },
  {
    id: 'E10-S02',
    title: 'Registration waitlist review',
    owner: 'Coordinator',
    status: 'Ready',
    tone: 'success',
    due: 'Next week',
  },
];

const roleCards = [
  {
    title: 'Organiser',
    icon: ClipboardList,
    text: 'Create requests, answer clarification, and track approvals.',
  },
  {
    title: 'Coordinator',
    icon: CalendarCheck,
    text: 'Review event requests, confirm readiness, and manage change requests.',
  },
  {
    title: 'Venue Staff',
    icon: MapPinned,
    text: 'Review booking requests, availability, and venue alternatives.',
  },
  {
    title: 'Technical Support',
    icon: Wrench,
    text: 'Reserve equipment, assign support staff, and flag shortfalls.',
  },
  {
    title: 'Attendee',
    icon: Users,
    text: 'Discover confirmed events, register, waitlist, and withdraw.',
  },
];

const integrationCards = [
  {
    title: 'Supabase',
    icon: Database,
    text: 'PostgreSQL, auth, and storage variables are read from server env.',
  },
  {
    title: 'Upstash Redis',
    icon: Server,
    text: 'Notification jobs use a Redis-backed queue for the free-tier plan.',
  },
  {
    title: 'Brevo',
    icon: Mail,
    text: 'Transactional email dispatch is wired through a server-only API key.',
  },
  {
    title: 'Vercel Cron',
    icon: Clock3,
    text: 'Cron endpoints drain queued jobs and future scheduled domain checks.',
  },
];

function StatusChip({ tone, children }: { tone: StatusTone; children: string }) {
  return <span className={`status status-${tone}`}>{children}</span>;
}

export function App() {
  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Role navigation">
        <div className="brand-mark">CS</div>
        <nav>
          <a className="nav-item nav-item-active" href="#overview">
            <ClipboardList size={18} aria-hidden="true" />
            Overview
          </a>
          <a className="nav-item" href="#queue">
            <Bell size={18} aria-hidden="true" />
            Work Queue
          </a>
          <a className="nav-item" href="#roles">
            <Users size={18} aria-hidden="true" />
            Roles
          </a>
          <a className="nav-item" href="#integrations">
            <Settings2 size={18} aria-hidden="true" />
            Integrations
          </a>
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Release 1 scaffold</p>
            <h1>ConnectSphere operations console</h1>
          </div>
          <StatusChip tone="info">Scaffold</StatusChip>
        </header>

        <section className="metric-grid" id="overview" aria-label="Overview metrics">
          <div className="metric-panel">
            <span>Requests in review</span>
            <strong>14</strong>
            <p>Coordinator queue across submitted and clarification states.</p>
          </div>
          <div className="metric-panel">
            <span>Venue conflicts</span>
            <strong>3</strong>
            <p>Items need an alternative room or timing proposal.</p>
          </div>
          <div className="metric-panel">
            <span>Queued emails</span>
            <strong>8</strong>
            <p>Redis-backed notification jobs awaiting cron processing.</p>
          </div>
        </section>

        <section className="work-panel" id="queue">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Shared work queue</p>
              <h2>Priority workflow states</h2>
            </div>
            <button className="icon-button" type="button" aria-label="Refresh queue">
              <Clock3 size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="queue-table" role="table" aria-label="Priority work items">
            <div className="queue-row queue-header" role="row">
              <span role="columnheader">Story</span>
              <span role="columnheader">Workflow</span>
              <span role="columnheader">Owner</span>
              <span role="columnheader">Status</span>
              <span role="columnheader">Due</span>
            </div>
            {queueItems.map((item) => (
              <div className="queue-row" role="row" key={item.id}>
                <span role="cell">{item.id}</span>
                <strong role="cell">{item.title}</strong>
                <span role="cell">{item.owner}</span>
                <span role="cell">
                  <StatusChip tone={item.tone}>{item.status}</StatusChip>
                </span>
                <span role="cell">{item.due}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card-grid" id="roles" aria-label="Role workflows">
          {roleCards.map(({ title, icon: Icon, text }) => (
            <article className="role-card" key={title}>
              <Icon size={22} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className="integration-strip" id="integrations">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Free-tier hosting seams</p>
              <h2>Provider boundaries</h2>
            </div>
            <CheckCircle2 size={22} aria-hidden="true" />
          </div>
          <div className="integration-grid">
            {integrationCards.map(({ title, icon: Icon, text }) => (
              <article key={title}>
                <Icon size={20} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
