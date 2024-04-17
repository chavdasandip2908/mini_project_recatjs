import React from 'react';
import { FaRegSadTear } from 'react-icons/fa'; // Importing an icon from react-icons library

const NoRecordsPage = () => {
  return (
    <div className="container text-center">
      <FaRegSadTear className="text-muted" style={{ fontSize: '72px', marginTop: '50px' }} />
      <h2 className="mt-3">No Records Found</h2>
      <p className="text-muted mt-3">Looks like you haven't added any data yet.</p>
      <p className="text-muted">Start by adding some records to view them here.</p>
    </div>
  );
}

export default NoRecordsPage;
