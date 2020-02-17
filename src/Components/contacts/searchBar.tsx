import React, { useState, ChangeEvent } from 'react';
import { dataType, userState } from '../../Redux/Reducer/userReducer';
import { connect } from 'react-redux';

interface Iprops{
    data:dataType
}

const Search: React.FC<Iprops> = ({ data }) => {
    const [searchdata, setsearchdata] = useState<Array<{ [key: string]: string }>>()
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(e.target?.value.length)
        const reg = new RegExp(`${(e.target?.value)}`, 'ig')
        const Contact = data.Profile[0].Contacts as Array<{ [key: string]: string }>
        const filter = Contact.filter((x,i) =>x.fname.match(reg))
        setsearchdata(filter)
        if ((e.target?.value).length === 0) {
                setsearchdata([])
                }
    }
  return (
      <>
          <label>Search
            <input type='search' name='search' onChange={handleChange} />
              {searchdata?.map((x,i) => <li key={i}>{x?.fname}</li>)}
          </label>
    </>
  );
}

const mapStateToProps = ({ userReducer }:{ userReducer: userState }) => ({
    data:userReducer.data
})

export default connect(mapStateToProps)(Search)