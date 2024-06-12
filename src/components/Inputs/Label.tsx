import { useState } from "react"
import { labelTextStyle } from "../../../public/css/styles"

const InLabel: React.FC = () => {
    const [valueInput, setValueInput] = useState<string>("Texto label")
    return (
        <div className="container-label">
            <input  
                className='label-text-global'
                type="text" style={labelTextStyle} value={valueInput}
                onClick={() => setValueInput("")}
                onChange={e => setValueInput(e.target.value.toUpperCase())} />
        </div>
    )
}

export default InLabel;