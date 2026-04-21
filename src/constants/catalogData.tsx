import { Laptop, Cpu, Monitor, Mouse, Gamepad2, Gift, HardDrive, Wifi, Armchair, Wrench, PcCase } from 'lucide-react';
import React from 'react';

export interface CatalogCategory {
  icon: React.ReactNode;
  key: string;
}

const ComputerIcon = () => (
  <div style={{ position: 'relative', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Monitor size={16} style={{ position: 'absolute', top: '0', left: '0' }} />
    <PcCase size={12} style={{ position: 'absolute', bottom: '0', right: '0', backgroundColor: 'inherit', borderRadius: '1px', padding: '1px' }} />
  </div>
);

export const CATEGORIES: CatalogCategory[] = [
  { icon: <ComputerIcon />, key: 'sidebar.computers' },
  { icon: <Laptop size={20} />, key: 'sidebar.laptops' },
  { icon: <HardDrive size={20} />, key: 'sidebar.components' },
  { icon: <Monitor size={20} />, key: 'sidebar.monitors' },
  { icon: <Mouse size={20} />, key: 'sidebar.peripherals' },
  { icon: <Gamepad2 size={20} />, key: 'sidebar.consoleGaming' },
  { icon: <Wifi size={20} />, key: 'sidebar.networking' },
  { icon: <Armchair size={20} />, key: 'sidebar.furniture' },
  { icon: <Gift size={20} />, key: 'sidebar.merch' },
  { icon: <Wrench size={20} />, key: 'sidebar.services' },
];

