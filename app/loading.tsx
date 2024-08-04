import { Fragment } from "react";

export default function PageLoading() {
  return (
    <Fragment>
      <div className="flex flex-col gap-3 sm:flex-row justify-between items-baseline">
        <div className="animate-pulse">
          <div className="w-28 h-9 border border-gray-200">
            <div className="h-9 bg-gray-200"></div>
          </div>
          <div className="w-36 h-[13px] mt-3 border border-gray-200">
            <div className="h-[13px] bg-gray-200"></div>
          </div>
        </div>
        <div className="animate-pulse">
          <div className="w-36 rounded-lg h-6 border border-gray-200">
            <div className="h-6 bg-gray-200"></div>
          </div>
        </div>
      </div>
      <div>
        <table className="min-w-full overflow-x-auto rounded-bl-xl divide-y divide-gray-200">
          <thead className="bg-01 text-white">
            <tr className="divide-y *:text-center animate-pulse *:border  divide-gray-200 text-sm sm:text-base">
              <th className="px-4 py-2 border border-gray-200">
                {""}
                <div className="h-4 bg-gray-200 rounded"></div>
              </th>
              <th className="px-4 py-2 border border-gray-200">
                {""}
                <div className="h-4 bg-gray-200 rounded"></div>
              </th>
              <th className="px-4 py-2 border border-gray-200">
                {""}
                <div className="h-4 bg-gray-200 rounded"></div>
              </th>
              <th className="px-4 py-2 border border-gray-200">
                {""}
                <div className="h-4 bg-gray-200 rounded"></div>
              </th>
              <th className="px-4 py-2 border border-gray-200">
                {""}
                <div className="h-4 bg-gray-200 rounded"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-4 py-2 border border-gray-200">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
