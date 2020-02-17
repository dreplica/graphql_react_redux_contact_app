import React, { useEffect} from 'react';
import { userState} from '../../Redux/Reducer/userReducer';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Search from './searchBar';

interface Iprops{
  data: string | number | Array<object>
  obj?:{[key:string]:string}
}

const ShowContacts: React.FC<Iprops> = ({ data }) => {
  const history = useHistory()
  const data_asArray = data as Array<Iprops['obj']>
  useEffect(() => {
    
   }, [data])
  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>)=>{
    e.preventDefault();
    const id = e.currentTarget.id
    history.push(`/contact/${id}`)
   }
  return (
    <>
      <ul>
        {data_asArray.map((value: Iprops['obj'], index: number) => <li key={index} id={value?.id} onClick={handleClick}>{value?.fname}</li>)}
      </ul>
      <Search />
    </>
  );
}

const mapStateToProps = ({ userReducer}:{userReducer:userState}) => ({
  data:userReducer.data.Profile[0].Contacts
})


const Connecting = connect(mapStateToProps)(ShowContacts);

export default Connecting;