"use client"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'
import { github } from '../utils/icons';
import ThemeDropdown from './ThemeDropdown/ThemeDropdown';
import SearhDialog from './SearhDialog/SearhDialog';
import { useGlobalContext } from '../contex/globalContext';



function Navbar() {
  const router = useRouter();
  const { state } = useGlobalContext();

  return (
    <div className="w-full py-4 flex items-center justify-between">
        <div className="left"></div>
        <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
          <SearhDialog></SearhDialog>
          <div className="btn-group flex items-center gap-2">
          <ThemeDropdown></ThemeDropdown>    
          </div>   
        </div>
    </div>
  );
}

export default Navbar;
