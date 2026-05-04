import { Laptop, Cpu, Monitor, HardDrive, MemoryStick, Layout, Box, Fan, Zap } from 'lucide-react';

export const CATEGORIES = [
  { id: 'computers', icon: <HardDrive size={20} />, key: 'sidebar.computers' },
  { id: 'laptops', icon: <Laptop size={20} />, key: 'sidebar.laptops' },
  { id: 'cpus', icon: <Cpu size={20} />, key: 'sidebar.cpus' },
  { id: 'gpus', icon: <Monitor size={20} />, key: 'sidebar.gpus' },
  { id: 'motherboards', icon: <Layout size={20} />, key: 'sidebar.motherboards' },
  { id: 'ram', icon: <MemoryStick size={20} />, key: 'sidebar.ram' },
  { id: 'storage', icon: <HardDrive size={20} />, key: 'sidebar.storage' },
  { id: 'cases', icon: <Box size={20} />, key: 'sidebar.cases' },
  { id: 'cooling', icon: <Fan size={20} />, key: 'sidebar.cooling' },
  { id: 'psus', icon: <Zap size={20} />, key: 'sidebar.psus' },
];
