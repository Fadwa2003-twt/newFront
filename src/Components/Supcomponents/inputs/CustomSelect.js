import Select from 'react-select';
import "./CustomSelect.css"

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.data.color,
        color: state.data.color === 'yellow' ? 'black' : 'white',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '4px', // Add space between options
    }),
    singleValue: (provided, state) => ({
        ...provided,
        backgroundColor: state.data.color,
        color: state.data.color === 'yellow' ? 'black' : 'white',
        padding: '0',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
    }),
    control: (provided) => ({
        ...provided,
        border: '1px solid #d1d5db',
        boxShadow: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        minHeight: '28px', // Adjusted height
        padding: '0 0.25rem', // py-1 equivalent (1 rem / 4 = 0.25rem)
        boxSizing: 'border-box',
        backgroundColor: '#a6cdd766',
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '4px',
        marginTop: '0',
        maxHeight: '200px',
        backgroundColor: '#a6cdd766',
    }),
    menuList: (provided) => ({
        ...provided,
        padding: 0,
        maxHeight: '200px',
    }),
};




const options = [
    { value: 'danger', label: 'Danger', color: 'red' },
    { value: 'success', label: 'Success', color: 'green' },
    { value: 'warning', label: 'Warning', color: '#f1ce20' },
];

function MySelect() {
    return (
        <Select
            options={options}
            styles={customStyles}
            placeholder="الأهمية"
            isSearchable={false}
            getOptionLabel={(option) => (
                <div style={{ backgroundColor: option.color, padding: '4px', borderRadius: '4px',height:"100%"}}></div>
            )}
            components={{ SingleValue: ({ data }) => (
                    <div style={{ backgroundColor: data.color, padding: '4px', borderRadius: '4px', width: '100%', boxSizing: 'border-box',height:"100%" }}></div>
                )}}
        />
    );
}

export default MySelect;
