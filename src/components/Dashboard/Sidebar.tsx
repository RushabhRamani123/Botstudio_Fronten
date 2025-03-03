import {TutorialSection} from './TutorialSection';
import {SystemStatus} from './SystemStatus';

export function Sidebar() {
  return (
    <div className="grid gap-4">
      <TutorialSection />
      <SystemStatus />
    </div>
  );
}