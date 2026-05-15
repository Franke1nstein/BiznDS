import { formatMoney } from '../../utils/money';
import dayjs from 'dayjs';
export function OrderHeader({ order }) {
	return (
		<div
			className='order-header bg-white border border-[#dedede] flex items-center justify-between p-5 md:px-6.25 rounded-t-[5px] 
            max-[575px]:flex-col max-[575px]:items-start max-[575px]:leading-5.75 max-[575px]:p-3.75'
		>
			<div className='order-header-left-section flex shrink-0 max-[575px]:flex-col'>
				<div className='order-date show-order-text'>
					<div className='order-header-label font-bold max-[575px]:mr-1.25'>Order Placed:</div>
					<div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
				</div>
				<div className='order-total show-order-text'>
					<div className='order-header-label font-bold max-[575px]:mr-1.25 '>Total:</div>
					<div className='text-[#198754] font-bold'>{formatMoney(order.totalCostCents)}</div>
				</div>
			</div>

			<div className='order-header-right-section shrink max-[575px]:grid max-[575px]:grid-cols-[auto_1fr]'>
				<div className='order-header-label font-bold max-[575px]:mr-1.25'>Order ID:</div>
				<div>{order.id}</div>
			</div>
		</div>
	);
}
