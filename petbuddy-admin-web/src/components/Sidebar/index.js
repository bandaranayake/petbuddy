import React, { useEffect, useState } from 'react';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaRegCalendarAlt, FaCog, FaUser, FaUserNurse } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { auth } from '../../lib/firebase';
import * as ROUTES from '../../constants/routes';

function Sidebar(props) {
  const [activeTag, setActiveTag] = useState(-1);

  useEffect(() => {
    const pathName = props.location.pathname;

    if (pathName === ROUTES.DASHBOARD) {
      setActiveTag(2);
    } else if (pathName === ROUTES.CUSTOMERS) {
      setActiveTag(3);
    } else if (pathName === ROUTES.PETSITTERS) {
      setActiveTag(4);
    } else if (pathName === ROUTES.BOOKINGS) {
      setActiveTag(5);
    } else if (pathName === ROUTES.SETTINGS) {
      setActiveTag(6);
    }

  }, [props.location.pathname])

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
          <MenuItem icon={<FaTachometerAlt />} active={activeTag === 2}>Dashboard<Link to={ROUTES.DASHBOARD}></Link></MenuItem>
          <MenuItem icon={<FaUser />} active={activeTag === 3}>Customers<Link to={ROUTES.CUSTOMERS}></Link></MenuItem>
          <MenuItem icon={<FaUserNurse />} active={activeTag === 4}>Pet Sitters<Link to={ROUTES.PETSITTERS}></Link></MenuItem>
          <MenuItem icon={<FaRegCalendarAlt />} active={activeTag === 6}>Bookings<Link to={ROUTES.BOOKINGS}></Link></MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <MenuItem icon={<FaCog />} active={activeTag === 7}>Account Settings<Link to={ROUTES.SETTINGS}></Link></MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter style={{ textAlign: 'center' }}>
        <div className="sidebar-btn-wrapper" style={{ padding: '25px' }}>
          <Link to={ROUTES.HOME} className="sidebar-btn" onClick={() => auth.signOut()}><FiLogOut /><span>Logout</span></Link>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
}

export default Sidebar;
