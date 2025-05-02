import React from 'react';
import Link from 'next/link';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <nav className="dashboard-nav">
        <ul>
          <li>
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <a>Settings</a>
            </Link>
          </li>
          <li>
            <Link href="/resume-upload">
              <a>Resume Upload</a>
            </Link>
          </li>
        </ul>
      </nav>
      <main className="dashboard-content">{children}</main>
    </div>
  );
};

export default DashboardLayout;
