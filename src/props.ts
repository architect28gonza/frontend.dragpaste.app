export const getProps = (propsComponent: any) => {
    const labelValue: string = propsComponent?.label?.value ?? "";
    const bodyValue: string = propsComponent?.body?.value ?? "";
    const final_row: number = propsComponent?.row ?? -1;
    const final_column: number = propsComponent?.column ?? -1;
    return {
        label: labelValue,
        body: bodyValue,
        row: final_row,
        column: final_column,
        isPositionNegative: () => (final_row >= 0 && final_column > 0)
    }
}