import React from 'react'

interface CountProps {
  updateItem: any[]; // หรือสามารถใช้ประเภทที่ถูกต้องแทน any[]
}

export const Count: React.FC<CountProps> = ({ updateItem }) => {
  return (
    <div>{Array.isArray(updateItem) ? updateItem.length : 0}</div>
  );
}