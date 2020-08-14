import React, { Component } from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaBone, FaRegCalendarAlt, FaCog, FaUser, FaUserNurse } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";
import * as ROUTES from '../../constants/routes';

import 'font-awesome/css/font-awesome.min.css';

export class Sidebar extends Component {
  render() {
    return (
      <ProSidebar>
        <SidebarHeader>
          <div
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            Pet Buddy Dashboard
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<FaTachometerAlt />}>Dashboard<Link to={ROUTES.DASHBOARD}></Link></MenuItem>
            <MenuItem icon={<FaUser />}>Customers<Link to={ROUTES.CUSTOMERS}></Link></MenuItem>
            <MenuItem icon={<FaUserNurse />}>Pet Sitters<Link to={ROUTES.PETSITTERS}></Link></MenuItem>
            <MenuItem icon={<FaBone />}>Services<Link to={ROUTES.SERVICES}></Link></MenuItem>
            <MenuItem icon={<FaRegCalendarAlt />}>Bookings<Link to={ROUTES.BOOKINGS}></Link></MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <MenuItem icon={<FaCog />}>Account Settings<Link to={ROUTES.SETTINGS}></Link></MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter style={{ textAlign: 'center' }}>
          <div className="sidebar-btn-wrapper" style={{ padding: '25px' }}>
            <Link to={ROUTES.LOGOUT} className="sidebar-btn"><FiLogOut /><span>Logout</span></Link>
          </div>
        </SidebarFooter>
      </ProSidebar>
    );
  }
}

export default Sidebar;
