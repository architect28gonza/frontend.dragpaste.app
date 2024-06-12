import { useState } from "react"
import { labelTextStyle } from "../../../public/css/styles"

const InLabel: React.FC = () => {
    const [valueInput, setValueInput] = useState<string>("Texto label")
    return (
        <div>
            <input type="text" style={labelTextStyle} value={valueInput}
                onClick={() => setValueInput("")}
                onChange={e => setValueInput(e.target.value.toUpperCase())} />
        </div>
    )
}

export default InLabel;