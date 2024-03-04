import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { MdBarChart, MdPeople } from "react-icons/md";

import { columnsDataCheck } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import tableDataCheck from "./variables/tableDataCheck.json";
import { useEffect, useState } from "react";
import api from "http/ApiServices";

const Dashboard = () => {
  const [Datas,setDatas]=useState({})
  useEffect(()=>{
    (
      async ()=>{
      const result= await api.getDatas('admin/misc/dataServices')
      setDatas(result)
    }
    )()
  },[])

  //  console.log(Datas.allOrders)
   const allOdersUser=Datas&&Datas?.allOrders?.map((orders)=>{
    return{
      userId:orders?.user?._id
    }
   })
   const uniqueTotalOrdersUsers=[...new Set(allOdersUser?.map(user=>user.userId))]

  return (

    <div>
      {/* Card widget */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdPeople className="h-7 w-7" />}
          title={"Users"}
          subtitle={Datas.users}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Orders"}
          subtitle={Datas.orders}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Products"}
          subtitle={Datas.products}
        />
      
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>

        {/* Traffic chart & Pie Chart */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
