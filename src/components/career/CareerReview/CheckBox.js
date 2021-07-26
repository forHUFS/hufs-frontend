import React, {useState} from 'react';

const CheckBox = (props) => {

       const [checked, setChecked] = useState([])

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked]

        if(currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }

   const filter = ['IT','창업','어문']

    const renderCheckBoxLists = () => filter.map((value, index)=>
            <div key={index}>
                <span style={{color : '#030a66',fontWeight: 'bold'}}>{value}</span> &nbsp;
                <input
                    type="checkbox"
                    onChange={()=>handleToggle(value)}
                    checked={checked.indexOf(value) !== -1 }
                    value={value}
                />
                &nbsp;&nbsp;&nbsp;
            </div>
            
    );



    return (
        <>
            <form style={{display:"flex"}}>
                {renderCheckBoxLists()}
            </form>
        </>
    );
};

export default CheckBox;