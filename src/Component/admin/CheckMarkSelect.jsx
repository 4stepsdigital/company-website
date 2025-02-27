import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function MultipleSelectCheckmarks({ packageCategories, onSelectedCategoryIdsChange ,selectedCategories1}) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    // console.log("selected categories here : ",packageCategories)
    useEffect(() => {
        setSelectedCategories(selectedCategories1||[]);
    }, [packageCategories,selectedCategories1]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedCategories(value);
        onSelectedCategoryIdsChange(value);
    };

    return (
        <div>
            {packageCategories && (
                <FormControl fullWidth sx={{ height: "40px", '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '1px solid black' } }}>
                    <Select
                        sx={{ fontSize: "12px", height: "40px" }}
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={selectedCategories}
                        onChange={handleChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => selected.map(path => packageCategories.find(category => category.path === path)?.title).join(', ')}
                        MenuProps={MenuProps}
                    >
                        {packageCategories.map((category) => (
                            <MenuItem sx={{ fontSize: '15px' }} key={category._id} value={category.path}>
                                <Checkbox style={{
                                    color: "black",
                                    width: 20,
                                    height: 20,
                                    margin: 4
                                }} checked={selectedCategories.includes(category.path)} />
                                {category.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </div>
    );
}
