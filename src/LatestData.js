import React from 'react';

function LatestData({ data }) {
  return (
    <div>
      <h2>Latest Data</h2>
      <div>
        <strong>Company Name:</strong> {data.companyName}
      </div>
      <div>
        <strong>Full Name:</strong> {data.fullName}
      </div>
      <div>
        <strong>Position:</strong> {data.position}
      </div>
      <div>
        <strong>Email:</strong> {data.email}
      </div>
      <div>
        <strong>Phone:</strong> {data.phone}
      </div>
      <div>
        <strong>UEN:</strong> {data.uen}
      </div>
      {/* Add more fields as needed */}
    </div>
  );
}

export default LatestData;
