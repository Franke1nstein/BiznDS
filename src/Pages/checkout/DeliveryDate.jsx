import dayjs from 'dayjs';

export function DeliveryDate({ cartItem, deliveryOptions }) {
	const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
		return deliveryOption.id === cartItem.deliveryOptionId;
	});
	return (
		<div className='delivery-date text-[#198754] font-bold text-[19px] mt-1.25 mb-5.5'>
			Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd,MMMM D')}
		</div>
	);
}
