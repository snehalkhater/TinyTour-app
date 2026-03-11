import React, { useState } from 'react'
import Input from './Input'


function MultiSelect({ selectedItems, placeholder, onRemoveItem, onAddItem }) {
    const [newItem, setNewItem] = useState("");

    return (
        <div>
            {selectedItems.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="border border-gray-600 mx-2 px-2 rounded-full bg-gray-200 inline-block min-w-[90px] my-1 text-center"
                    >
                        {item}{""}

                        <span
                            className="ml-2 cursor-pointer"
                            onClick={() => onRemoveItem(item)}
                        >
                            ❌
                        </span>
                    </div>
                );
            })}
            <Input type="text"
                placeholder={placeholder}
                value={newItem}
                onChange={(e) => {
                    setNewItem(e.target.value)
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onAddItem(e.target.value);
                        setNewItem("")
                    }
                }}
            />
        </div>
    )
}

export default MultiSelect