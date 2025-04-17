'use client';

import type { ReactNode } from 'react';
import { Footer } from '../components/footer';
import  Header  from '../components/header';

type LayoutProps = {
    children: ReactNode;
};
  
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
        <Header/>
            {children}
      
    </div>
  )
}
