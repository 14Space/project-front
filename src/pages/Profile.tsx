import React from 'react';
import { useAppContext } from '../context/AppContext';
import UserProfile from './profiles/UserProfile';
import AdminProfile from './profiles/AdminProfile';
import ManagerProfile from './profiles/ManagerProfile';

const Profile: React.FC = () => {
  const { user } = useAppContext();

  if (!user) return null;

  switch (user.role) {
    case 'admin':
      return <AdminProfile />;
    case 'manager':
      return <ManagerProfile />;
    default:
      return <UserProfile />;
  }
};

export default Profile;
