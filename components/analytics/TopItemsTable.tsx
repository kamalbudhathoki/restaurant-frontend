interface TopItem {
  itemName: string;
  totalQuantity: number;
  totalRevenue: number;
}

interface TopItemsTableProps {
  items: TopItem[];
}

export default function TopItemsTable({ items }: TopItemsTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Top Selling Items
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-gray-500 uppercase border-b border-gray-100">
            <th className="pb-2 text-left">Item</th>
            <th className="pb-2 text-right">Qty Sold</th>
            <th className="pb-2 text-right">Revenue</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {items.map((item, index) => (
            <tr key={item.itemName}>
              <td className="py-2.5 text-gray-800 flex items-center gap-2">
                <span className="text-xs text-gray-400 w-4">{index + 1}</span>
                {item.itemName}
              </td>
              <td className="py-2.5 text-right text-gray-600">
                {item.totalQuantity}
              </td>
              <td className="py-2.5 text-right font-medium text-gray-800">
                ${item.totalRevenue.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}