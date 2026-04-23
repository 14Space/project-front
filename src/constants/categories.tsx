import { Laptop, Cpu, Monitor, Mouse, Gamepad2, Gift, HardDrive, Wifi, Armchair, Wrench } from 'lucide-react';

export const CATEGORIES = [
  { id: 'computers', icon: <Cpu size={20} />, key: 'sidebar.computers' },
  { id: 'laptops', icon: <Laptop size={20} />, key: 'sidebar.laptops' },
  { id: 'components', icon: <HardDrive size={20} />, key: 'sidebar.components' },
  { id: 'monitors', icon: <Monitor size={20} />, key: 'sidebar.monitors' },
  { id: 'peripherals', icon: <Mouse size={20} />, key: 'sidebar.peripherals' },
  { id: 'consoleGaming', icon: <Gamepad2 size={20} />, key: 'sidebar.consoleGaming' },
  { id: 'networking', icon: <Wifi size={20} />, key: 'sidebar.networking' },
  { id: 'furniture', icon: <Armchair size={20} />, key: 'sidebar.furniture' },
  { id: 'merch', icon: <Gift size={20} />, key: 'sidebar.merch' },
  { id: 'services', icon: <Wrench size={20} />, key: 'sidebar.services' },
];
