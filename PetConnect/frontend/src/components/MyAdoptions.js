





// // MyAdoptions.js





// frontend/src/components/MyAdoptions.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyAdoptions.css';

export default function MyAdoptions() {
  const [requests, setRequests] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) fetchRequests();
  }, [userId]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/adoptions/my-requests/${userId}`);
      setRequests(res.data);
    } catch (err) {
      alert('Failed to load adoption requests');
    }
  };

  const handlePayment = async (requestId, deliveryRequested) => {
    const confirm = window.confirm("Confirm payment?");
    if (!confirm) return;

    try {
      await axios.put(`http://localhost:5000/api/adoptions/pay/${requestId}`, {
        platformFeePaid: true,
        deliveryFeePaid: deliveryRequested
      });

      alert("Payment successful!");
      fetchRequests(); // Refresh list
    } catch (err) {
      alert("Payment failed.");
    }
  };

  return (
    <div className="my-adoptions">
      <h2>My Adoption Requests</h2>

      {requests.length === 0 ? (
        <p>You haven’t submitted any requests yet.</p>
      ) : (
        <div className="adoption-list">
          {requests.map((req) => (
            <div className="adoption-card" key={req._id}>
              <img src={`http://localhost:5000${req.petId?.image}`} alt={req.petId?.name} />
              <h3>{req.petId?.name}</h3>
              <p><strong>Breed:</strong> {req.petId?.breed}</p>
              <p><strong>Age:</strong> {req.petId?.age}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p><strong>Platform Fee:</strong> ৳200</p>
              {req.deliveryRequested && <p><strong>Delivery Fee:</strong> ৳300</p>}

              {req.status === 'approved' && !req.platformFeePaid && (
                <button
                  className="pay-btn"
                  onClick={() => handlePayment(req._id, req.deliveryRequested)}
                >
                  Pay Now
                </button>
              )}

              {req.platformFeePaid && <p className="paid-label">Payment Complete ✅</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './MyAdoptions.css';

// export default function MyAdoptions({ userId }) {
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/adoptions/my-requests/${userId}`);
//       setRequests(res.data);
//     } catch (err) {
//       alert('Failed to load adoption requests');
//     }
//   };

//   const handlePayment = async (requestId, deliveryRequested) => {
//     const confirm = window.confirm("Confirm payment?");
//     if (!confirm) return;

//     try {
//       await axios.put(`http://localhost:5000/api/adoptions/pay/${requestId}`, {
//         platformFeePaid: true,
//         deliveryFeePaid: deliveryRequested
//       });

//       alert("Payment successful!");
//       fetchRequests(); // Refresh list
//     } catch (err) {
//       alert("Payment failed.");
//     }
//   };

//   return (
//     <div className="my-adoptions">
//       <h2>My Adoption Requests</h2>

//       {requests.length === 0 ? (
//         <p>You haven’t submitted any requests yet.</p>
//       ) : (
//         <div className="adoption-list">
//           {requests.map((req) => (
//             <div className="adoption-card" key={req._id}>
//               <img src={`http://localhost:5000${req.petId?.image}`} alt={req.petId?.name} />
//               <h3>{req.petId?.name}</h3>
//               <p><strong>Breed:</strong> {req.petId?.breed}</p>
//               <p><strong>Age:</strong> {req.petId?.age}</p>
//               <p><strong>Status:</strong> {req.status}</p>
//               <p><strong>Platform Fee:</strong> ৳200</p>
//               {req.deliveryRequested && <p><strong>Delivery Fee:</strong> ৳300</p>}

//               {req.status === 'approved' && !req.platformFeePaid && (
//                 <button
//                   className="pay-btn"
//                   onClick={() => handlePayment(req._id, req.deliveryRequested)}
//                 >
//                   Pay Now
//                 </button>
//               )}

//               {req.platformFeePaid && <p className="paid-label">Payment Complete ✅</p>}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
