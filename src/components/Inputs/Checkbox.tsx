import React, { ChangeEvent, useState } from 'react';
import InLabel from './Label';

import { Button, Checkbox } from 'antd';
import { PropsIGeneric } from '../../types/types.export';
import { getProps } from '../../props';
import { labelTextStyle } from '../../../public/css/styles';
import { getColumnRowFromEvent, isValidColumn } from '../../position.element';
import { objectLocalStorage, updateLocalStorageObject } from '../../local.storage';
import { openNotificationWithIcon } from '../../util/Message.alert'

interface CheckboxItem {
	position: number;
	value: string;
	isCheck: boolean;
}

const InCheckbox: React.FC<PropsIGeneric> = ({ propsComponent }) => {
	const { label, body, row, column, isPositionNegative } = getProps(propsComponent);
	const initialItems: CheckboxItem[] | string = body || [{ position: 1, value: '', isCheck: false }];

	const [items, setItems] = useState<CheckboxItem[]>((typeof initialItems !== "string") ? initialItems : []);
	const [event, setEvent] = useState<ChangeEvent<HTMLInputElement>>();

	const addItem = () => {
		setItems(prevItems => [
			...prevItems,
			{ position: prevItems.length > 0 ? prevItems[prevItems.length - 1].position + 1 : 1, value: '', isCheck: false }
		]);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>, position: number) => {
		if (!event) {
			console.error("Evento esta indefinido");
			return;
		}
		const newValue = e.target.value;
		const { column: indexColumn, row: indexRow } = isPositionNegative() ? { column, row } : getColumnRowFromEvent(event);
		const updatedItems = items.map(item => item.position === position ? { ...item, value: newValue } : item);
		setItems(updatedItems);

		const object = objectLocalStorage(indexRow, indexColumn);
		if (object) {
			object.body = updatedItems;
			updateLocalStorageObject(object, indexRow, indexColumn);
		}

	};

	const onChange = (item: CheckboxItem) => {
		if (!event) {
			console.error("Evento esta indefinido");
			return;
		}

		const { column: indexColumn, row: indexRow } = isPositionNegative() ? { column, row } : getColumnRowFromEvent(event);
		if (!isValidColumn(indexColumn)) {
			console.error("La columna no es válida - Check");
			return;
		}

		const updatedItems = items.map(it => it.position === item.position ? { ...it, isCheck: !it.isCheck } : it);
		setItems(updatedItems);

		const object = objectLocalStorage(indexRow, indexColumn);
		if (object) {
			object.body = updatedItems;
			updateLocalStorageObject(object, indexRow, indexColumn);
		} else openNotificationWithIcon();
	};

	return (
		<div className='container-in-checkbox'>
			<InLabel setEvent={setEvent} text={label} />
			{items.map((item) => (
				<Checkbox
					key={item.position}
					defaultChecked={item.isCheck}
					onChange={() => onChange(item)}>
					<input
						key={item.position}
						placeholder='escribir item'
						value={item.value}
						type="text"
						onChange={(e) => handleInputChange(e, item.position)}
						style={{ ...labelTextStyle }}
					/>
				</Checkbox>
			))}
			<br />
			<Button
				onClick={addItem}
				size='small'
				style={{ padding: 3 }}>
				+
			</Button>
		</div>
	);
};

export default InCheckbox;
