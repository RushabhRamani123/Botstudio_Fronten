import { useState } from 'react';
import { DragDropContext } from "@hello-pangea/dnd";
import {Header} from './Header';
import {MainContent} from './MainContent';
import {Sidebar} from './Sidebar';

export function Dashboard() {
  const initialAgents = {
    new: [
      { id: '205175503', name: 'Melissa Henderson', lastActive: '20-Aug', device: 'iPhone XR', amount: '$35.99' },
      { id: '143888943', name: 'Nicholas Lawrence', lastActive: '29-Mar', device: 'iPhone XS', amount: '$102.39' }
    ],
    inProgress: [
      { id: '283144855', name: 'Kyle Bryant', lastActive: '21-May', device: 'iPad Pro 12.9"', amount: '$377.99' },
      { id: '247342318', name: 'Brenda Parker', lastActive: '7-May', device: 'Mac 2017', amount: '$12.83' }
    ],
    awaiting: [
      { id: '984833294', name: 'Rafael Fitzgerald', lastActive: '30-May', device: 'Mac Pro', amount: '$1,426.80' }
    ],
    done: [
      { id: '927987285', name: 'Melissa Henderson', lastActive: '1-May', device: 'iPhone 11 Pro', amount: '$406.56' },
      { id: '564859712', name: 'Melissa Henderson', lastActive: '28-May', device: 'iPhone XR', amount: '$159.43' }
    ],
    closed: [
      { id: '581895152', name: 'Nicholas Lawr', lastActive: '23-Apr', device: 'iPhone XS', amount: '$32.85' },
      { id: '954188882', name: 'Brenda Parker', lastActive: '21-Apr', device: 'iPad Pro 11"', amount: '$258.61' }
    ]
  };
  const [agents, setAgents] = useState(initialAgents);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const sourceCol = result.source.droppableId;
    const destCol = result.destination.droppableId;
    
    if (sourceCol === destCol) return;

    const sourceAgents = [...agents[sourceCol]];
    const [removed] = sourceAgents.splice(result.source.index, 1);
    const newAgents = {
      ...agents,
      [sourceCol]: sourceAgents,
      [destCol]: [...agents[destCol], removed]
    };

    setAgents(newAgents);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f4f8] to-[#e0e8f0]">
      <Header />
      <main className="grid flex-1 items-start gap-4 p-6 md:grid-cols-[1fr_300px]">
        <DragDropContext onDragEnd={onDragEnd}>
          <MainContent agents={agents} />
          <Sidebar />
        </DragDropContext>
      </main>
    </div>
  );
}