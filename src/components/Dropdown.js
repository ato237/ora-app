import React, {useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform } from 'react-native';

function Dropdown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Withdrawal', value: 'withdraw'},
    {label: 'Client Transfer', value: 'send'},
    {label: 'non-Client Transfer', value: 'sendnone'},


  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      stickyHeader={true}
      placeholder="Select Transaction Type"
      dropDownDirection= {Platform.OS == "ios"? "TOP": "AUTO"}
      bottomOffset={100}
    />
  );
}

export default Dropdown