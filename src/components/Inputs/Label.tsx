import { useState } from "react"
import { labelTextStyle } from "../../styles"

export const ILabel: React.FC = () => {
    const [valueInput, setValueInput] = useState<string>("Texto label")
    return (
        <div>
            <input type="text" style={labelTextStyle} value={valueInput}
                onClick={() => setValueInput("")}
                onChange={e => setValueInput(e.target.value.toUpperCase())} />
        </div>

    )
}