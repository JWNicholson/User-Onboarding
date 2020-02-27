import React, { useState } from "react";


function UserList() {
   const [users, setUsers] = useState([]);

   const addNewMember = member => {
     const newMember = {
       name: member.name,
       email: member.email,
       password: member.role
     };
     setUsers([...users, newUser]);
   };

   return (
   
     <div className="member-list">
       <h1>Members List</h1>
       {/* pass a function down as a prop */}
       <MemberForm addNewMember={addNewMember} />
       <h2>Members:</h2>
       <Members members={members} />
     </div>
   );
}

export default UserList;