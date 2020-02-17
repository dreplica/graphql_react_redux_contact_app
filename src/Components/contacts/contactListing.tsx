import React, { useEffect, useState } from 'react';
import { userState, dataType } from '../../Redux/Reducer/userReducer';
import { connect } from 'react-redux';

interface Iprops{
  data: string | number | Array<object>
}

const ShowContacts: React.FC<Iprops> = ({ data }) => {
  const [Contacts , setContacts] = useState(data)
  console.log(data)
  useEffect(() => {
    if (data) { 
      setContacts(data)
     }
   }, [data])
  console.log(typeof Contacts)
    // Contacts.map((value:object,index:string)=><li key={index} id={value.id}>value</li>)

  return (
    <>
    
    </>
  );
}

const mapStateToProps = ({ userReducer}:{userReducer:userState}) => ({
  data:userReducer.data.Profile[0].Contacts
})


const Connecting = connect(mapStateToProps)(ShowContacts);

export default Connecting;