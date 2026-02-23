const API_URL = "http://localhost:5000/api";

export async function registerUser({ name, email, password, role }) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });

  const data = await res.json();
  console.log("Register response:", data); // optional debug
  return data;
}

export async function loginUser({ email, password, role }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  });
  return res.json();
}


// export async function createTicket(ticketData, token) {
//   const res = await fetch(`${API_URL}/tickets`, {
//     method: 'POST',
//     headers: {
//       // 'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: FormData,
//   })
//   return res.json()
// }


export async function createTicket(payload, token, formData) {
  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("category", payload.category);
  formData.append("application", payload.application);
  formData.append("priority", payload.priority);

  const res = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
}


export async function getAllTickets(token) {
  const res = await fetch(`${API_URL}/tickets`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function updateTicketStatus(ticketId, status, token) {
  const res = await fetch(`${API_URL}/tickets/${ticketId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  return res.json();
}

export async function addTicketComment(ticketId, comment, token) {
  const res = await fetch(`${API_URL}/tickets/${ticketId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comment }),
  });
  return res.json();
}

// export async function getTickets(token) {
//   const res = await fetch(`${API_URL}/tickets/my`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.json();
// }

export async function getTickets(token) {
  const res = await fetch(`${API_URL}/tickets/my`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to fetch tickets: ${res.status} ${text}`)
  }

  const data = await res.json()
  console.log('Fetched tickets:', data) // <- debug
  return data
}